"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  buildCandles,
  tickCandles,
  TIMEFRAMES,
  type Candle,
  type TimeframeKey,
} from "@/lib/chart";
import { CoinIcon } from "./CoinIcon";

const W = 320;
const H = 176;
const N = 32;
const STEP = W / N;

const INTERVAL: Record<TimeframeKey, string> = { "1H": "1h", "1D": "1d", "1W": "1w" };

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

export function ExchangePanel() {
  const [tf, setTf] = useState<TimeframeKey>("1D");
  const config = useMemo(() => TIMEFRAMES.find((t) => t.key === tf)!, [tf]);
  const [candles, setCandles] = useState<Candle[]>(() =>
    buildCandles(20260709, N, config.base, config.vol),
  );
  const [isLive, setIsLive] = useState<boolean | null>(null);
  const [stats, setStats] = useState<{ price: number; changePct: number } | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const tickCount = useRef(0);

  // Live data: initial REST history, then a Binance WebSocket for tick-by-tick
  // updates (price + last candle). Falls back to REST polling if the socket
  // can't connect, and to a DEMO simulation if the feed is unavailable entirely.
  useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;
    let pollId: number | null = null;
    let klineStart: number | null = null;
    const interval = INTERVAL[tf];
    const base = "https://api.binance.com/api/v3";

    async function loadKlines() {
      const res = await fetch(`${base}/klines?symbol=BTCUSDT&interval=${interval}&limit=${N}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`klines ${res.status}`);
      const raw: unknown = await res.json();
      if (!Array.isArray(raw) || raw.length === 0) throw new Error("bad klines");
      if (cancelled) return;
      setCandles((raw as string[][]).map((k) => ({ o: +k[1], h: +k[2], l: +k[3], c: +k[4] })));
      setIsLive(true);
    }
    async function loadStats() {
      // Primary: Binance 24h ticker
      try {
        const t = await fetch(`${base}/ticker/24hr?symbol=BTCUSDT`, { cache: "no-store" });
        if (t.ok) {
          const j = await t.json();
          if (!cancelled) setStats({ price: +j.lastPrice, changePct: +j.priceChangePercent });
          return;
        }
      } catch {
        /* fall through to CoinMarketCap */
      }
      // Secondary: CoinMarketCap via our server proxy
      try {
        const r = await fetch("/api/market", { cache: "no-store" });
        const j = await r.json();
        if (!cancelled && j.available && j.data?.BTC) {
          setStats({ price: j.data.BTC.price, changePct: j.data.BTC.change24h });
        }
      } catch {
        /* header falls back to candle-derived values */
      }
    }

    const startPoll = () => {
      if (pollId == null) {
        pollId = window.setInterval(() => {
          if (!document.hidden) {
            loadKlines().catch(() => {});
            loadStats();
          }
        }, 20000);
      }
    };
    const stopPoll = () => {
      if (pollId != null) {
        window.clearInterval(pollId);
        pollId = null;
      }
    };

    const connectWs = () => {
      try {
        ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/btcusdt@kline_${interval}`);
        ws.onmessage = (ev) => {
          try {
            const { data } = JSON.parse(ev.data);
            if (!data) return;
            if (data.e === "24hrTicker") {
              setStats({ price: +data.c, changePct: +data.P });
            } else if (data.e === "kline") {
              const k = data.k;
              const kt: number = k.t;
              const candle: Candle = { o: +k.o, h: +k.h, l: +k.l, c: +k.c };
              setCandles((prev) => {
                const next = prev.slice();
                if (klineStart !== null && kt > klineStart) {
                  next.push(candle);
                  if (next.length > N) next.shift();
                } else {
                  next[next.length - 1] = candle;
                }
                return next;
              });
              klineStart = kt;
            }
            stopPoll(); // streaming confirmed — no need to poll
          } catch {
            /* ignore malformed frame */
          }
        };
        ws.onerror = () => {
          try {
            ws?.close();
          } catch {
            /* noop */
          }
        };
        ws.onclose = () => {
          if (!cancelled) startPoll();
        };
      } catch {
        startPoll();
      }
    };

    (async () => {
      try {
        await loadKlines();
        loadStats();
        connectWs();
      } catch {
        // Binance candles unavailable → DEMO chart, but still try for a real
        // header price (CMC) and keep polling in case Binance recovers.
        if (!cancelled) {
          setIsLive(false);
          loadStats();
          startPoll();
        }
      }
    })();

    return () => {
      cancelled = true;
      stopPoll();
      if (ws) {
        ws.onclose = null;
        ws.onmessage = null;
        ws.onerror = null;
        try {
          ws.close();
        } catch {
          /* noop */
        }
      }
    };
  }, [tf]);

  // DEMO fallback animation (only when the live feed is unavailable).
  useEffect(() => {
    if (isLive !== false || reduce) return;
    setCandles(buildCandles(20260709, N, config.base, config.vol));
    tickCount.current = 0;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      tickCount.current += 1;
      setCandles((prev) => tickCandles(prev, config.vol * 0.5, tickCount.current % config.rollEvery === 0));
    }, 1300);
    return () => window.clearInterval(id);
  }, [isLive, config, reduce]);

  const { min, max } = useMemo(() => {
    let mn = Infinity;
    let mx = -Infinity;
    for (const c of candles) {
      mn = Math.min(mn, c.l);
      mx = Math.max(mx, c.h);
    }
    const pad = (mx - mn) * 0.12 || 1;
    return { min: mn - pad, max: mx + pad };
  }, [candles]);

  const yFor = useCallback((price: number) => H - ((price - min) / (max - min)) * H, [min, max]);

  const last = candles[candles.length - 1];
  const first = candles[0];
  const price = stats?.price ?? last.c;
  const changePct = stats?.changePct ?? ((last.c - first.o) / first.o) * 100;
  const up = changePct >= 0;

  const linePath = useMemo(
    () =>
      candles
        .map((c, i) => `${i === 0 ? "M" : "L"}${(i * STEP + STEP / 2).toFixed(1)} ${yFor(c.c).toFixed(1)}`)
        .join(" "),
    [candles, yFor],
  );
  const areaPath = `${linePath} L${W} ${H} L${STEP / 2} ${H} Z`;

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    const idx = Math.max(0, Math.min(N - 1, Math.round(frac * (N - 1))));
    setHover(idx);
  };

  const hoverCandle = hover !== null ? candles[hover] : null;
  const hoverX = hover !== null ? hover * STEP + STEP / 2 : 0;
  const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-brand/20 via-cyan/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl glass shadow-glow">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <CoinIcon symbol="BTC" className="h-9 w-9" />
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                BTC/USDT
                <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-medium text-faint">PERP</span>
              </div>
              <div className="font-mono text-xs text-faint">Perpetual · 125x</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-mono text-sm font-semibold tabular-nums ${up ? "text-up" : "text-down"}`}>
              ${fmt(price)}
            </div>
            <div className={`font-mono text-xs tabular-nums ${up ? "text-up/80" : "text-down/80"}`}>
              {up ? "+" : ""}
              {changePct.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Timeframe toggle + status badge */}
        <div className="flex items-center gap-1 px-4 pt-3">
          {TIMEFRAMES.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTf(t.key)}
              aria-pressed={tf === t.key}
              className={`rounded-md px-2.5 py-1 font-mono text-xs transition-colors ${
                tf === t.key ? "bg-brand/15 text-brand" : "text-faint hover:text-ink"
              }`}
            >
              {t.key}
            </button>
          ))}
          {isLive === true && (
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-faint" title="Live BTC/USDT from Binance">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-up opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-up" />
              </span>
              LIVE
            </span>
          )}
          {isLive === false && (
            <span className="ml-auto font-mono text-[10px] text-faint" title="Live feed unavailable — showing an illustrative demo">
              DEMO
            </span>
          )}
        </div>

        {/* Chart */}
        <div className="relative px-3 pt-2">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="h-44 w-full touch-none"
            preserveAspectRatio="none"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--up)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--up)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {candles.map((c, i) => {
              const cu = c.c >= c.o;
              const bodyTop = yFor(Math.max(c.o, c.c));
              const bodyH = Math.max(Math.abs(yFor(c.o) - yFor(c.c)), 2);
              return (
                <g key={i} opacity={hover === null || hover === i ? 1 : 0.5}>
                  <line
                    x1={i * STEP + STEP / 2}
                    x2={i * STEP + STEP / 2}
                    y1={yFor(c.h)}
                    y2={yFor(c.l)}
                    stroke={cu ? "var(--up)" : "var(--down)"}
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <rect
                    x={i * STEP + 2}
                    y={bodyTop}
                    width={STEP - 4}
                    height={bodyH}
                    rx="1"
                    fill={cu ? "var(--up)" : "var(--down)"}
                    opacity="0.85"
                  />
                </g>
              );
            })}

            <path d={areaPath} fill="url(#area)" />
            <path d={linePath} fill="none" stroke="var(--up)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

            {hoverCandle && (
              <g>
                <line x1={hoverX} x2={hoverX} y1="0" y2={H} stroke="var(--muted)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                <line x1="0" x2={W} y1={yFor(hoverCandle.c)} y2={yFor(hoverCandle.c)} stroke="var(--muted)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
                <circle cx={hoverX} cy={yFor(hoverCandle.c)} r="3.5" fill="var(--up)" stroke="var(--surface)" strokeWidth="1.5" />
              </g>
            )}
          </svg>

          {hoverCandle && (
            <div
              className="pointer-events-none absolute top-2 z-10 -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-1.5 shadow-soft"
              style={{ left: `${((hoverX / W) * 100).toFixed(2)}%` }}
            >
              <div className="font-mono text-[11px] font-semibold text-ink tabular-nums">${fmt(hoverCandle.c)}</div>
              <div className={`font-mono text-[9px] tabular-nums ${hoverCandle.c >= hoverCandle.o ? "text-up" : "text-down"}`}>
                {hoverCandle.c >= hoverCandle.o ? "▲" : "▼"} {tf}
              </div>
            </div>
          )}
        </div>

        {/* Order row */}
        <div className="grid grid-cols-2 gap-3 p-5 pt-3">
          <button type="button" className="rounded-xl border border-up/30 bg-up/10 py-3 text-center transition-colors hover:bg-up/20">
            <div className="text-xs text-faint">Long</div>
            <div className="font-mono text-sm font-semibold text-up tabular-nums">{fmt(price - 1.5)}</div>
          </button>
          <button type="button" className="rounded-xl border border-down/30 bg-down/10 py-3 text-center transition-colors hover:bg-down/20">
            <div className="text-xs text-faint">Short</div>
            <div className="font-mono text-sm font-semibold text-down tabular-nums">{fmt(price + 1.5)}</div>
          </button>
        </div>
      </div>

      {/* Floating latency chip */}
      <div className="absolute -left-5 bottom-16 hidden rounded-xl glass px-3 py-2 shadow-glow sm:block">
        <div className="font-mono text-[11px] text-faint">Match latency</div>
        <div className="font-mono text-sm font-semibold text-cyan tabular-nums">0.8 ms</div>
      </div>
    </div>
  );
}
