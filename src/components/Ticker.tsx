"use client";

import { useEffect, useState } from "react";

type Pair = { s: string; p: string; c: number };

// Binance symbols → display labels. Fallback values shown only if the feed fails.
const SYMBOLS = [
  "BTCUSDT",
  "ETHUSDT",
  "SOLUSDT",
  "BNBUSDT",
  "XRPUSDT",
  "DOGEUSDT",
  "AVAXUSDT",
  "LINKUSDT",
  "ADAUSDT",
  "LTCUSDT",
];

const FALLBACK: Pair[] = [
  { s: "BTC/USDT", p: "—", c: 0 },
  { s: "ETH/USDT", p: "—", c: 0 },
  { s: "SOL/USDT", p: "—", c: 0 },
  { s: "BNB/USDT", p: "—", c: 0 },
  { s: "XRP/USDT", p: "—", c: 0 },
  { s: "DOGE/USDT", p: "—", c: 0 },
  { s: "AVAX/USDT", p: "—", c: 0 },
  { s: "LINK/USDT", p: "—", c: 0 },
  { s: "ADA/USDT", p: "—", c: 0 },
  { s: "LTC/USDT", p: "—", c: 0 },
];

function fmtPrice(n: number) {
  if (n >= 100) return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (n >= 1) return n.toFixed(2);
  return n.toPrecision(4);
}

function label(symbol: string) {
  return symbol.replace("USDT", "/USDT");
}

function Row({ pairs }: { pairs: Pair[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {pairs.map((pair) => {
        const up = pair.c >= 0;
        return (
          <div key={pair.s} className="flex items-center gap-2 px-6 py-3">
            <span className="text-sm font-medium text-ink">{pair.s}</span>
            <span className="font-mono text-sm text-muted tabular-nums">{pair.p}</span>
            <span className={`font-mono text-xs tabular-nums ${up ? "text-up" : "text-down"}`}>
              {up ? "▲" : "▼"} {Math.abs(pair.c).toFixed(2)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function Ticker() {
  const [pairs, setPairs] = useState<Pair[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(SYMBOLS))}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const data: { symbol: string; lastPrice: string; priceChangePercent: string }[] = await res.json();
        if (cancelled || !Array.isArray(data)) return;
        const bySymbol = new Map(data.map((d) => [d.symbol, d]));
        const next = SYMBOLS.map((sym) => {
          const d = bySymbol.get(sym);
          return d
            ? { s: label(sym), p: fmtPrice(+d.lastPrice), c: +d.priceChangePercent }
            : { s: label(sym), p: "—", c: 0 };
        });
        setPairs(next);
      } catch {
        /* keep fallback */
      }
    }
    load();
    const poll = window.setInterval(() => {
      if (!document.hidden) load();
    }, 30000);
    return () => {
      cancelled = true;
      window.clearInterval(poll);
    };
  }, []);

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/50">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
        <Row pairs={pairs} />
        <Row pairs={pairs} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
