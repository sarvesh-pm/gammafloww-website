"use client";

import { motion } from "motion/react";

const candles = [
  { x: 12, o: 118, c: 96, h: 88, l: 126, up: true },
  { x: 34, o: 96, c: 104, h: 90, l: 112, up: false },
  { x: 56, o: 104, c: 78, h: 70, l: 110, up: true },
  { x: 78, o: 78, c: 86, h: 72, l: 96, up: false },
  { x: 100, o: 86, c: 60, h: 52, l: 92, up: true },
  { x: 122, o: 60, c: 70, h: 54, l: 82, up: false },
  { x: 144, o: 70, c: 44, h: 36, l: 76, up: true },
  { x: 166, o: 44, c: 54, h: 38, l: 66, up: false },
  { x: 188, o: 54, c: 32, h: 24, l: 60, up: true },
];

const line = "M6 130 L28 108 L50 116 L72 88 L94 96 L116 66 L138 74 L160 46 L182 54 L204 28 L228 34";

export function ExchangePanel() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 rounded-[28px] bg-gradient-to-tr from-brand/20 via-cyan/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl glass shadow-glow">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">
              ₿
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                BTC/USDT
                <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-faint">
                  PERP
                </span>
              </div>
              <div className="font-mono text-xs text-faint">Perpetual · 125x</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-sm font-semibold text-up">$67,412.80</div>
            <div className="font-mono text-xs text-up/80">+2.41%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="relative px-3 pt-4">
          <svg viewBox="0 0 232 150" className="h-44 w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--up)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--up)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Candles */}
            {candles.map((c, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
              >
                <line
                  x1={c.x}
                  x2={c.x}
                  y1={c.h}
                  y2={c.l}
                  stroke={c.up ? "var(--up)" : "var(--down)"}
                  strokeWidth="1.2"
                  opacity="0.55"
                />
                <rect
                  x={c.x - 5}
                  y={Math.min(c.o, c.c)}
                  width="10"
                  height={Math.max(Math.abs(c.o - c.c), 3)}
                  rx="1.5"
                  fill={c.up ? "var(--up)" : "var(--down)"}
                  opacity="0.85"
                />
              </motion.g>
            ))}

            {/* Trend line + area */}
            <motion.path
              d={`${line} L228 150 L6 150 Z`}
              fill="url(#area)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            />
            <motion.path
              d={line}
              fill="none"
              stroke="var(--up)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Order row */}
        <div className="grid grid-cols-2 gap-3 p-5">
          <div className="rounded-xl border border-up/30 bg-up/10 py-3 text-center">
            <div className="text-xs text-faint">Long</div>
            <div className="font-mono text-sm font-semibold text-up">67,410.5</div>
          </div>
          <div className="rounded-xl border border-down/30 bg-down/10 py-3 text-center">
            <div className="text-xs text-faint">Short</div>
            <div className="font-mono text-sm font-semibold text-down">67,413.0</div>
          </div>
        </div>
      </div>

      {/* Floating latency chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute -left-5 bottom-16 hidden rounded-xl glass px-3 py-2 shadow-glow sm:block"
      >
        <div className="font-mono text-[11px] text-faint">Match latency</div>
        <div className="font-mono text-sm font-semibold text-cyan">0.8 ms</div>
      </motion.div>
    </div>
  );
}
