"use client";

import { useEffect, useState } from "react";

export type Quote = { price: number; change24h: number };

/**
 * Live price + 24h change for one or more Binance symbols.
 * Fallback chain: Binance WebSocket → Binance REST → CoinMarketCap (/api/market).
 * Returns a map keyed by full symbol (e.g. "BTCUSDT"); empty until data arrives.
 */
export function usePriceFeed(symbols: string[]): Record<string, Quote> {
  const key = symbols.join(",");
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});

  useEffect(() => {
    const syms = key.split(",").filter(Boolean);
    if (syms.length === 0) return;

    let cancelled = false;
    let ws: WebSocket | null = null;
    let pollId: number | null = null;

    const apply = (updates: Record<string, Quote>) => {
      if (!cancelled) setQuotes((prev) => ({ ...prev, ...updates }));
    };

    async function loadRest() {
      // Primary: Binance REST
      try {
        const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(JSON.stringify(syms))}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error();
        const data: { symbol: string; lastPrice: string; priceChangePercent: string }[] = await res.json();
        if (!Array.isArray(data)) throw new Error();
        const out: Record<string, Quote> = {};
        for (const d of data) out[d.symbol] = { price: +d.lastPrice, change24h: +d.priceChangePercent };
        apply(out);
        return;
      } catch {
        /* fall through to CoinMarketCap */
      }
      // Secondary: CoinMarketCap via our server proxy
      try {
        const res = await fetch("/api/market", { cache: "no-store" });
        const j = await res.json();
        if (!j.available || !j.data) return;
        const out: Record<string, Quote> = {};
        for (const sym of syms) {
          const q = j.data[sym.replace("USDT", "")];
          if (q) out[sym] = { price: q.price, change24h: q.change24h };
        }
        apply(out);
      } catch {
        /* keep whatever we have */
      }
    }

    const startPoll = () => {
      if (pollId == null) pollId = window.setInterval(() => { if (!document.hidden) loadRest(); }, 30000);
    };
    const stopPoll = () => {
      if (pollId != null) { window.clearInterval(pollId); pollId = null; }
    };

    const connectWs = () => {
      try {
        const streams = syms.map((s) => s.toLowerCase() + "@ticker").join("/");
        ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        ws.onmessage = (ev) => {
          try {
            const { data } = JSON.parse(ev.data);
            if (!data || !data.s) return;
            apply({ [data.s]: { price: +data.c, change24h: +data.P } });
            stopPoll(); // streaming confirmed
          } catch {
            /* ignore malformed frame */
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

    loadRest();
    connectWs();

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
  }, [key]);

  return quotes;
}
