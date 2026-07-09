import { NextResponse } from "next/server";

// Server-side proxy to CoinMarketCap. The API key is secret and CMC blocks
// browser (CORS) calls, so this route holds the key (CMC_API_KEY env var) and
// the client fetches from here same-origin. Used only as a fallback when the
// primary (Binance) feed is unavailable.

const SYMBOLS = ["BTC", "ETH", "SOL", "BNB", "XRP", "DOGE", "AVAX", "LINK", "ADA", "LTC"];

// Run per-request so the secret env var is read at runtime (not baked in at
// build). The upstream CMC call is still cached 60s below to respect credits.
export const dynamic = "force-dynamic";

type Quote = { price: number; change24h: number };

export async function GET() {
  const key = process.env.CMC_API_KEY;
  if (!key) {
    return NextResponse.json({ available: false, reason: "no-key" });
  }

  try {
    const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${SYMBOLS.join(",")}&convert=USD`;
    const res = await fetch(url, {
      headers: { "X-CMC_PRO_API_KEY": key, Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return NextResponse.json({ available: false, reason: `upstream-${res.status}` });
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
    return NextResponse.json({ available: true, data: out });
  } catch {
    return NextResponse.json({ available: false, reason: "error" });
  }
}
