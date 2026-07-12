"use client";

import { useEffect, useRef, useState } from "react";
import { usePriceFeed } from "@/lib/usePriceFeed";
import { CoinIcon } from "./CoinIcon";

const SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "AVAXUSDT", "LINKUSDT", "ADAUSDT", "LTCUSDT",
];

type Pair = { s: string; p: string; c: number };

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
            <CoinIcon symbol={pair.s.split("/")[0]} className="h-4 w-4" />
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
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Only open the ticker's WebSocket while it's near the viewport, so it doesn't
  // add a socket + REST call to the initial load and idles when scrolled away.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const quotes = usePriceFeed(SYMBOLS, { enabled: visible });
  const pairs: Pair[] = SYMBOLS.map((sym) => {
    const q = quotes[sym];
    return q ? { s: label(sym), p: fmtPrice(q.price), c: q.change24h } : { s: label(sym), p: "—", c: 0 };
  });

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-border bg-surface/50">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
        <Row pairs={pairs} />
        <Row pairs={pairs} />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
