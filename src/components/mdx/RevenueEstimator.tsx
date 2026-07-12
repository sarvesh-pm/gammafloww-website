"use client";

import { useState } from "react";

function fmtUsd(n: number) {
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function RevenueEstimator() {
  const [volM, setVolM] = useState(50); // daily volume in $M
  const [takerBps, setTakerBps] = useState(5); // taker fee in basis points
  const [takerShare, setTakerShare] = useState(55); // % of volume that pays taker fee

  const dailyVolume = volM * 1e6;
  const feeRate = takerBps / 10000;
  const dailyRevenue = dailyVolume * (takerShare / 100) * feeRate;
  const monthly = dailyRevenue * 30;
  const annual = dailyRevenue * 365;

  return (
    <div className="my-8 rounded-3xl border border-border bg-surface p-6 shadow-soft not-prose">
      <div className="mb-1 text-sm font-semibold text-ink">Exchange fee-revenue estimator</div>
      <p className="mb-5 text-xs text-faint">
        A back-of-envelope model: daily volume × the share that pays taker fees × the fee rate. Illustrative only.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Field label="Daily trading volume" value={`${fmtUsd(dailyVolume)}`}>
            <input type="range" min={1} max={2000} step={1} value={volM} onChange={(e) => setVolM(+e.target.value)} className="gf-range" aria-label="Daily trading volume in millions" aria-valuetext={fmtUsd(dailyVolume)} />
          </Field>
          <Field label="Taker fee" value={`${takerBps} bps (${(takerBps / 100).toFixed(2)}%)`}>
            <input type="range" min={1} max={60} step={1} value={takerBps} onChange={(e) => setTakerBps(+e.target.value)} className="gf-range" aria-label="Taker fee in basis points" aria-valuetext={`${takerBps} bps, ${(takerBps / 100).toFixed(2)} percent`} />
          </Field>
          <Field label="Volume paying taker fee" value={`${takerShare}%`}>
            <input type="range" min={20} max={90} step={1} value={takerShare} onChange={(e) => setTakerShare(+e.target.value)} className="gf-range" aria-label="Share of volume paying taker fee" aria-valuetext={`${takerShare} percent`} />
          </Field>
        </div>

        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-border bg-bg-soft/60 p-6">
          <Stat label="Est. daily fee revenue" value={fmtUsd(dailyRevenue)} />
          <Stat label="Monthly" value={fmtUsd(monthly)} accent />
          <Stat label="Annualized" value={fmtUsd(annual)} accent />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-mono text-sm font-semibold text-ink tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between border-b border-border/60 pb-2 last:border-0">
      <span className="text-xs text-faint">{label}</span>
      <span className={`font-mono text-xl font-semibold tabular-nums ${accent ? "text-brand" : "text-ink"}`}>{value}</span>
    </div>
  );
}
