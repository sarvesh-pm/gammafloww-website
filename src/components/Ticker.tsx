"use client";

import { useEffect, useState } from "react";
import { CoinIcon } from "./CoinIcon";

type Pair = { s: string; p: string; c: number };

const SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "AVAXUSDT", "LINKUSDT", "ADAUSDT", "LTCUSDT",
];

const FALLBACK: Pair[] = SYMBOLS.map((s) => ({ s: label(s), p: "—", c: 0 }));

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
  const [pairs, setPairs] = useState<Pair[]>(FALLBACK);

  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    let pollId: number | null = null;

    async function loadPrices() {
      // Primary: Binance REST
      try {
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(SYMBOLS))}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data: { symbol: string; lastPrice: string; priceChangePercent: string }[] = await res.json();
        if (cancelled || !Array.isArray(data)) return;
        const bySym = new Map(data.map((d) => [d.symbol, d]));
        setPairs(SYMBOLS.map((sym) => {
          const d = bySym.get(sym);
          return d ? { s: label(sym), p: fmtPrice(+d.lastPrice), c: +d.priceChangePercent } : { s: label(sym), p: "—", c: 0 };
        }));
        return;
      } catch {
        /* fall through to CoinMarketCap */
      }
      // Secondary: CoinMarketCap via our server proxy
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        const j = await res.json();
        if (cancelled || !j.available || !j.data) return;
        setPairs(SYMBOLS.map((sym) => {
          const q = j.data[sym.replace("USDT", "")];
          return q ? { s: label(sym), p: fmtPrice(q.price), c: q.change24h } : { s: label(sym), p: "—", c: 0 };
        }));
      } catch {
        /* keep current */
      }
    }
    const startPoll = () => { if (pollId == null) pollId = window.setInterval(() => { if (!document.hidden) loadPrices(); }, 30000); };
    const stopPoll = () => { if (pollId != null) { window.clearInterval(pollId); pollId = null; } };

    const connectWs = () => {
      try {
        const streams = SYMBOLS.map((s) => s.toLowerCase() + "@ticker").join("/");
        ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        ws.onmessage = (ev) => {
          try {
            const { data } = JSON.parse(ev.data);
            if (!data || !data.s) return;
            const s = label(data.s);
            setPairs((prev) => prev.map((p) => (p.s === s ? { s, p: fmtPrice(+data.c), c: +data.P } : p)));
            stopPoll(); // streaming confirmed
          } catch {
            /* ignore */
          }
        };
        ws.onerror = () => {
          try { ws?.close(); } catch { /* noop */ }
        };
        ws.onclose = () => { if (!cancelled) startPoll(); };
      } catch {
        startPoll();
      }
    };

    loadPrices(); // immediate baseline (Binance, else CoinMarketCap)
    connectWs(); // live stream

    return () => {
      cancelled = true;
      stopPoll();
      if (ws) {
        ws.onclose = null;
        ws.onmessage = null;
        ws.onerror = null;
        try { ws.close(); } catch { /* noop */ }
      }
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
