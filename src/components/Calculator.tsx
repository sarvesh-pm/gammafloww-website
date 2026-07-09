"use client";

import { useMemo, useState } from "react";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const ENTRY = 67412.8;

function fmt(n: number, digits = 2) {
  return n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function Calculator() {
  const [side, setSide] = useState<"long" | "short">("long");
  const [margin, setMargin] = useState(500);
  const [leverage, setLeverage] = useState(25);

  const { position, qty, liq, maintenance } = useMemo(() => {
    const position = margin * leverage;
    const qty = position / ENTRY;
    // Simplified isolated-margin liquidation estimate (excludes fees/funding)
    const liq =
      side === "long" ? ENTRY * (1 - 1 / leverage) : ENTRY * (1 + 1 / leverage);
    const maintenance = position * 0.005;
    return { position, qty, liq, maintenance };
  }, [margin, leverage, side]);

  return (
    <section id="engine" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[360px] w-[620px] -translate-x-1/2 rounded-full bg-brand/5 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="The engine, live"
          title={
            <>
              The math your traders will feel on{" "}
              <span className="text-gradient">every position</span>
            </>
          }
          description="This is the same margin logic that runs inside a GammaFloww venue. Drag the sliders — position size, notional, and liquidation price recompute instantly."
        />

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 rounded-3xl card-soft p-6 sm:p-8 lg:grid-cols-2">
            {/* Controls */}
            <div className="flex flex-col gap-7">
              {/* Side toggle */}
              <div>
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-faint">
                  Direction
                </div>
                <div className="grid grid-cols-2 gap-2 rounded-xl border border-border bg-bg-soft p-1">
                  {(["long", "short"] as const).map((s) => {
                    const active = side === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSide(s)}
                        aria-pressed={active}
                        className={`rounded-lg py-2 text-sm font-semibold capitalize transition-colors ${
                          active
                            ? s === "long"
                              ? "bg-up/15 text-up"
                              : "bg-down/15 text-down"
                            : "text-muted hover:text-ink"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Margin */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="margin" className="text-sm text-muted">
                    Margin
                  </label>
                  <span className="font-mono text-sm font-semibold text-ink tabular-nums">
                    {fmt(margin, 0)} USDT
                  </span>
                </div>
                <input
                  id="margin"
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="gf-range"
                  aria-label="Margin in USDT"
                />
              </div>

              {/* Leverage */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="leverage" className="text-sm text-muted">
                    Leverage
                  </label>
                  <span className="font-mono text-sm font-semibold text-brand tabular-nums">
                    {leverage}x
                  </span>
                </div>
                <input
                  id="leverage"
                  type="range"
                  min={1}
                  max={125}
                  step={1}
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="gf-range"
                  aria-label="Leverage multiplier"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-faint">
                  <span>1x</span>
                  <span>125x</span>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-bg-soft/60 p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-faint">
                  BTC/USDT · Perp
                </span>
                <span className="font-mono text-xs text-muted tabular-nums">
                  Entry {fmt(ENTRY)}
                </span>
              </div>

              <Row label="Position size" value={`${fmt(position, 0)} USDT`} />
              <Row label="Notional" value={`${fmt(qty, 4)} BTC`} />
              <Row label="Maint. margin (0.5%)" value={`${fmt(maintenance)} USDT`} />

              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="text-xs text-faint">Est. liquidation price</div>
                <div
                  className={`mt-1 font-mono text-2xl font-semibold tabular-nums ${
                    side === "long" ? "text-down" : "text-up"
                  }`}
                >
                  {fmt(liq)}
                </div>
                <div className="mt-1 text-[11px] text-faint">
                  Isolated margin · excludes fees &amp; funding
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-faint">
          Illustrative only. Live venues add maker/taker fees, funding, and tiered maintenance
          margin — all configurable per partner.
        </p>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="font-mono text-sm font-semibold text-ink tabular-nums">{value}</span>
    </div>
  );
}
