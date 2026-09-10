// Crypto news aggregator — pulls public RSS feeds server-side, parses them
// without a dependency, and merges them into one recency-sorted feed.
//
// We show only a headline, a short snippet, the source, and a link back to the
// original article — the standard, syndication-intended use of an RSS feed.
// Full articles are never reproduced; every item links out to its publisher.

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  ts: number; // publish time (ms) for sorting
  iso: string; // ISO date for <time datetime>
  snippet: string;
  image?: string; // lead image, when the feed provides one
};

type Feed = { source: string; url: string };

// Reputable crypto news feeds, all verified as live RSS 2.0.
const FEEDS: Feed[] = [
  { source: "CoinDesk", url: "https://www.coindesk.com/arc/outboundfeeds/rss/" },
  { source: "Cointelegraph", url: "https://cointelegraph.com/rss" },
  { source: "The Block", url: "https://www.theblock.co/rss.xml" },
  { source: "Decrypt", url: "https://decrypt.co/feed" },
  { source: "CryptoSlate", url: "https://cryptoslate.com/feed/" },
  { source: "Bitcoin Magazine", url: "https://bitcoinmagazine.com/feed" },
  { source: "CoinGape", url: "https://coingape.com/feed/" },
];

export const NEWS_SOURCES = FEEDS.map((f) => f.source);

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  "#39": "'", "#8217": "’", "#8216": "‘", "#8220": "“",
  "#8221": "”", "#8230": "…", "#8211": "–", "#8212": "—",
};

function decodeEntities(s: string): string {
  return s.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, code: string) => {
    if (ENTITIES[code]) return ENTITIES[code];
    if (code[0] === "#") {
      const n = code[1] === "x" || code[1] === "X"
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return m;
  });
}

function stripCdata(s: string): string {
  return s.replace(/^\s*<!\[CDATA\[/, "").replace(/\]\]>\s*$/, "").trim();
}

function tag(block: string, name: string): string | null {
  const m = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return m ? stripCdata(m[1]) : null;
}

function toText(html: string): string {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " "),
  )
    // WordPress feeds append this boilerplate to every description.
    .replace(/The post\s[\s\S]+?appeared first on[\s\S]*$/i, "")
    .replace(/Continue reading[\s\S]*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function snippetOf(html: string, max = 180): string {
  const t = toText(html);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

function extractImage(block: string): string | undefined {
  let m =
    block.match(/<media:content\b[^>]*\burl="([^"]+)"/i) ||
    block.match(/<media:thumbnail\b[^>]*\burl="([^"]+)"/i);
  if (!m) {
    // <enclosure> only when it declares an image type
    const enc = block.match(/<enclosure\b[^>]*>/i);
    if (enc && /type="image/i.test(enc[0])) m = enc[0].match(/\burl="([^"]+)"/i);
  }
  if (!m) {
    const desc = tag(block, "content:encoded") || tag(block, "description") || "";
    m = desc.match(/<img\b[^>]*\bsrc="([^"]+)"/i);
  }
  if (!m) return undefined;
  const url = decodeEntities(m[1]).trim();
  // https-only to avoid mixed-content warnings on the site.
  return /^https:\/\/\S+$/.test(url) ? url : undefined;
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];
  const blocks = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) ?? [];
  for (const block of blocks) {
    const rawTitle = tag(block, "title");
    const rawLink =
      tag(block, "link") || tag(block, "guid") || "";
    const rawDate =
      tag(block, "pubDate") || tag(block, "dc:date") || tag(block, "published") || tag(block, "updated");
    const rawDesc = tag(block, "description") || tag(block, "content:encoded") || "";
    if (!rawTitle || !rawLink) continue;

    const ts = rawDate ? Date.parse(rawDate) : NaN;
    if (!Number.isFinite(ts)) continue;

    const link = decodeEntities(rawLink).trim();
    if (!/^https?:\/\//.test(link)) continue;

    items.push({
      title: toText(rawTitle),
      link,
      source,
      ts,
      iso: new Date(ts).toISOString(),
      snippet: snippetOf(rawDesc),
      image: extractImage(block),
    });
  }
  return items;
}

async function fetchFeed(feed: Feed): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; GammaFlowwBot/1.0; +https://www.gammafloww.com)" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    return parseFeed(await res.text(), feed.source);
  } catch {
    return []; // a single flaky feed must never break the page
  }
}

export type NewsResult = { items: NewsItem[]; sources: string[]; fetchedAt: string };

/** Aggregate all feeds into one recency-sorted list. Deduped by title. */
export async function getNews(limit = 60): Promise<NewsResult> {
  const settled = await Promise.all(FEEDS.map(fetchFeed));
  const seen = new Set<string>();
  const merged: NewsItem[] = [];
  for (const list of settled) {
    for (const item of list) {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      merged.push(item);
    }
  }
  merged.sort((a, b) => b.ts - a.ts);
  const items = merged.slice(0, limit);
  const sources = [...new Set(items.map((i) => i.source))];
  return { items, sources, fetchedAt: new Date().toISOString() };
}
