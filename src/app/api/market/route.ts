import { NextResponse } from "next/server";

// Server-side proxy to CoinMarketCap. The API key is secret and CMC blocks
// browser (CORS) calls, so this route holds the key (CMC_API_KEY env var) and
// the client fetches from here same-origin. Used only as a fallback when the
// primary (Binance) feed is unavailable.

const SYMBOLS = ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "AVAX", "LINK", "ADA", "LTC"];

// Run per-request so the secret env var is read at runtime, and never risk this
// route being prerendered at build with the key absent (which would cache a
// permanent "no-key" response). Upstream CMC credit protection is handled by the
// module-level TTL cache below, since force-dynamic disables Next's fetch cache.
export const dynamic = "force-dynamic";

type Quote = { price: number; change24h: number };
type MarketResult =
  | { available: true; data: Record<string, Quote> }
  | { available: false; reason: string };

// Cache the last successful upstream result for 60s across requests on this
// server instance, so bursts of visitors don't each spend a CMC credit.
const TTL_MS = 60_000;
let cache: { at: number; result: Extract<MarketResult, { available: true }> } | null = null;

export async function GET() {
  const key = process.env.CMC_API_KEY;
  if (!key) {
    return NextResponse.json({ available: false, reason: "no-key" } satisfies MarketResult);
  }

  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json(cache.result);
  }

  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${SYMBOLS.join(",")}&convert=USD`;
    const res = await fetch(url, {
      headers: { "X-CMC_PRO_API_KEY": key, Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ available: false, reason: `upstream-${res.status}` } satisfies MarketResult);
    }
    const json = await res.json();
    const out: Record<string, Quote> = {};
    for (const sym of SYMBOLS) {
      const node = json?.data?.[sym];
      const entry = Array.isArray(node) ? node[0] : node; // CMC may return an array for shared tickers
      const q = entry?.quote?.USD;
      if (q && typeof q.price === "number") {
        out[sym] = { price: q.price, change24h: q.percent_change_24h ?? 0 };
      }
    }
    const result = { available: true as const, data: out };
    cache = { at: Date.now(), result };
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ available: false, reason: "error" } satisfies MarketResult);
  }
}
