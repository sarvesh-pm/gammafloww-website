"use client";

import { useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Simplified isolated-margin liquidation estimate (excludes fees & funding):
//   Long  liq ≈ Entry × (1 − 1/Leverage + MMR)
//   Short liq ≈ Entry × (1 + 1/Leverage − MMR)
export function LiquidationCalculator() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [entry, setEntry] = useState(67500);
  const [leverage, setLeverage] = useState(20);
  const [mmr, setMmr] = useState(0.5); // maintenance margin rate, %

  const m = mmr / 100;
  const liq =
    side === "long" ? entry * (1 - 1 / leverage + m) : entry * (1 + 1 / leverage - m);
  const movePct = Math.abs((liq - entry) / entry) * 100;

  return (
    <div className="my-8 rounded-3xl border border-border bg-surface p-6 shadow-soft not-prose">
      <div className="mb-1 text-sm font-semibold text-ink">Liquidation price calculator</div>
      <p className="mb-5 text-xs text-faint">
        Simplified isolated-margin estimate. Excludes fees and funding. See the formula and source below.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-bg-soft p-1">
            {(["long", "short"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-pressed={side === s}
                className={`rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
                  side === s
                    ? s === "long"
                      ? "bg-up/15 text-up"
                      : "bg-down/15 text-down"
                    : "text-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="text-sm text-muted">
            <span className="mb-2 flex items-center justify-between">
              Entry price
              <span className="font-mono text-sm font-semibold text-ink">${fmt(entry)}</span>
            </span>
            <input
              type="range"
              min={1000}
              max={120000}
              step={100}
              value={entry}
              onChange={(e) => setEntry(+e.target.value)}
              className="gf-range"
              aria-label="Entry price"
            />
          </label>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              Leverage
              <span className="font-mono font-semibold text-brand">{leverage}x</span>
            </div>
            <input type="range" min={1} max={125} step={1} value={leverage} onChange={(e) => setLeverage(+e.target.value)} className="gf-range" aria-label="Leverage" />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              Maintenance margin rate
              <span className="font-mono font-semibold text-ink">{mmr.toFixed(1)}%</span>
            </div>
            <input type="range" min={0.1} max={2} step={0.1} value={mmr} onChange={(e) => setMmr(+e.target.value)} className="gf-range" aria-label="Maintenance margin rate" />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-bg-soft/60 p-6">
          <div className="text-xs text-faint">Est. liquidation price</div>
          <div className={`font-mono text-3xl font-semibold tabular-nums ${side === "long" ? "text-down" : "text-up"}`}>
            ${fmt(liq)}
          </div>
          <div className="text-sm text-muted">
            A <span className="font-semibold text-ink">{movePct.toFixed(2)}%</span> move against you triggers liquidation.
          </div>
        </div>
      </div>
    </div>
  );
}
