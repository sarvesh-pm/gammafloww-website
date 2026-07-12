"use client";

import { useState } from "react";

function fmtUsd(n: number) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
}

// Simplified linear-book model: how order size vs. available depth drives slippage.
// Not an exchange formula — an intuition tool for why liquidity matters.
export function SlippageCalculator() {
  const [orderK, setOrderK] = useState(100); // $ thousands
  const [depthK, setDepthK] = useState(500); // $ thousands of depth within ~1% of mid

  const order = orderK * 1000;
  const depth = depthK * 1000;
  const fillRatio = order / depth;
  // avg slippage grows with how much of the book you consume (illustrative)
  const slippagePct = Math.min(fillRatio * 0.5, 12);
  const cost = order * (slippagePct / 100);
  const rating = slippagePct < 0.2 ? "Deep" : slippagePct < 0.75 ? "Healthy" : slippagePct < 2 ? "Thin" : "Very thin";
  const ratingTone = slippagePct < 0.75 ? "text-up" : slippagePct < 2 ? "text-brand" : "text-down";

  return (
    <div className="my-8 rounded-3xl border border-border bg-surface p-6 shadow-soft not-prose">
      <div className="mb-1 text-sm font-semibold text-ink">Slippage vs. depth</div>
      <p className="mb-5 text-xs text-faint">
        A simplified model of why liquidity matters: the bigger your order relative to available depth, the more the price
        moves against you. Illustrative, not an exchange formula.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              Order size
              <span className="font-mono font-semibold text-ink tabular-nums">{fmtUsd(order)}</span>
            </div>
            <input type="range" min={1} max={2000} step={1} value={orderK} onChange={(e) => setOrderK(+e.target.value)} className="gf-range" aria-label="Order size" aria-valuetext={fmtUsd(order)} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              Book depth (within ~1%)
              <span className="font-mono font-semibold text-ink tabular-nums">{fmtUsd(depth)}</span>
            </div>
            <input type="range" min={10} max={5000} step={10} value={depthK} onChange={(e) => setDepthK(+e.target.value)} className="gf-range" aria-label="Book depth" aria-valuetext={fmtUsd(depth)} />
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 rounded-2xl border border-border bg-bg-soft/60 p-6">
          <div className="text-xs text-faint">Est. average slippage</div>
          <div className="font-mono text-3xl font-semibold text-ink tabular-nums">{slippagePct.toFixed(2)}%</div>
          <div className="mt-1 text-sm text-muted">
            ≈ <span className="font-mono font-semibold text-ink">{fmtUsd(cost)}</span> cost on this order
          </div>
          <div className="mt-2 text-sm">
            Book rating: <span className={`font-semibold ${ratingTone}`}>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
