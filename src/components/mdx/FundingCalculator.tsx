"use client";

import { useState } from "react";

function fmtUsd(n: number) {
  const abs = Math.abs(n);
  const s = abs >= 1000 ? abs.toLocaleString("en-US", { maximumFractionDigits: 0 }) : abs.toFixed(2);
  return `${n < 0 ? "−" : ""}$${s}`;
}

// Funding payment = notional × funding rate, per interval. Positive rate: longs pay shorts.
export function FundingCalculator() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [notionalK, setNotionalK] = useState(50); // $ thousands
  const [rateBps, setRateBps] = useState(1); // funding rate per interval, bps (1 bp = 0.01%)
  const [intervals, setIntervals] = useState(3); // 8h intervals (3 = 1 day)

  const notional = notionalK * 1000;
  const perInterval = notional * (rateBps / 10000);
  // positive rate: longs pay (negative cashflow), shorts receive (positive)
  const signed = side === "long" ? -perInterval : perInterval;
  const total = signed * intervals;

  return (
    <div className="my-8 rounded-3xl border border-border bg-surface p-6 shadow-soft not-prose">
      <div className="mb-1 text-sm font-semibold text-ink">Funding payment calculator</div>
      <p className="mb-5 text-xs text-faint">
        Assumes a positive funding rate (longs pay shorts). Funding is exchanged between traders, not paid to the venue.
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
                  side === s ? "bg-brand/15 text-brand" : "text-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <Row label="Position size (notional)" value={fmtUsd(notional)}>
            <input type="range" min={1} max={1000} step={1} value={notionalK} onChange={(e) => setNotionalK(+e.target.value)} className="gf-range" aria-label="Notional in thousands" aria-valuetext={fmtUsd(notional)} />
          </Row>
          <Row label="Funding rate / interval" value={`${rateBps} bps (${(rateBps / 100).toFixed(2)}%)`}>
            <input type="range" min={1} max={30} step={1} value={rateBps} onChange={(e) => setRateBps(+e.target.value)} className="gf-range" aria-label="Funding rate bps" aria-valuetext={`${rateBps} bps, ${(rateBps / 100).toFixed(2)} percent`} />
          </Row>
          <Row label="Intervals held (8h each)" value={`${intervals} (${(intervals * 8)}h)`}>
            <input type="range" min={1} max={30} step={1} value={intervals} onChange={(e) => setIntervals(+e.target.value)} className="gf-range" aria-label="Number of funding intervals" aria-valuetext={`${intervals} intervals, ${intervals * 8} hours`} />
          </Row>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-bg-soft/60 p-6">
          <div className="text-xs text-faint">Per interval you {side === "long" ? "pay" : "receive"}</div>
          <div className={`font-mono text-2xl font-semibold tabular-nums ${signed < 0 ? "text-down" : "text-up"}`}>
            {fmtUsd(signed)}
          </div>
          <div className="mt-2 text-xs text-faint">Total over {intervals} intervals</div>
          <div className={`font-mono text-3xl font-semibold tabular-nums ${total < 0 ? "text-down" : "text-up"}`}>
            {fmtUsd(total)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-muted">
        {label}
        <span className="font-mono text-sm font-semibold text-ink tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}
