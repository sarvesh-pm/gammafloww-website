"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Layer = {
  label: string;
  note: string;
  owner: "Yours" | "GammaFloww";
  accent: "brand" | "cyan" | "ink";
  details: string[];
};

const layers: Layer[] = [
  {
    label: "Your brand & front end",
    note: "You design it",
    owner: "Yours",
    accent: "brand",
    details: [
      "Brand, UI & the full trading experience",
      "Deposits, withdrawals & treasury policy",
      "KYC/AML flows & regional compliance",
      "Fee tiers, pricing & promotions",
    ],
  },
  {
    label: "GammaFloww API layer",
    note: "Plug & play",
    owner: "GammaFloww",
    accent: "cyan",
    details: [
      "One REST + WebSocket integration",
      "Webhooks & automation hooks",
      "SDKs and a full sandbox",
      "Your stack, talking to our engine",
    ],
  },
  {
    label: "Matching · Liquidity · Risk",
    note: "We operate it",
    owner: "GammaFloww",
    accent: "ink",
    details: [
      "Matching engine & real-time order books",
      "Liquidity aggregation & market making",
      "Margin, risk & liquidation systems",
      "24/7 monitoring with SLA-backed uptime",
    ],
  },
];

const accentText: Record<Layer["accent"], string> = {
  brand: "text-brand",
  cyan: "text-cyan",
  ink: "text-faint",
};
const accentBar: Record<Layer["accent"], string> = {
  brand: "bg-brand",
  cyan: "bg-cyan",
  ink: "bg-faint",
};

export function StackDiagram() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  return (
    <div className="relative rounded-3xl glass p-6 shadow-glow sm:p-8">
      <div className="mb-6 flex items-center justify-between pl-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Where the work lives
        </span>
        <span className="font-mono text-[11px] text-faint">hover a layer →</span>
      </div>

      <div className="relative flex flex-col gap-3 pl-6">
        {/* Flow rail: a signal travelling down the stack */}
        <div className="pointer-events-none absolute bottom-1 left-1 top-1 w-px overflow-hidden rounded bg-border">
          {!reduce && (
            <motion.span
              className="absolute left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand to-transparent"
              initial={{ top: "-15%" }}
              animate={{ top: ["-15%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
            />
          )}
        </div>

        {layers.map((layer, i) => {
          const isActive = active === i;
          return (
            <button
              key={layer.label}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-expanded={isActive}
              className={`group relative overflow-hidden rounded-2xl border px-5 py-[18px] text-left transition-all duration-300 ${
                isActive
                  ? "border-brand/45 bg-surface shadow-soft"
                  : "border-border bg-bg-soft/60 hover:border-brand/30 hover:bg-surface/70"
              }`}
            >
              {/* left accent bar */}
              <span
                className={`absolute inset-y-0 left-0 w-1 origin-top transition-transform duration-300 ${accentBar[layer.accent]} ${
                  isActive ? "scale-y-100" : "scale-y-0"
                }`}
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] font-semibold text-ink">{layer.label}</span>
                <span className={`shrink-0 font-mono text-xs ${accentText[layer.accent]}`}>
                  {layer.note}
                </span>
              </div>

              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          layer.owner === "Yours"
                            ? "bg-brand/15 text-brand"
                            : "bg-cyan/15 text-cyan"
                        }`}
                      >
                        {layer.owner === "Yours" ? "You own this" : "We run this"}
                      </span>
                    </div>
                    <ul className="mt-4 grid gap-2.5 pb-1">
                      {layer.details.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted">
                          <span className={`mt-[7px] h-1.5 w-1.5 flex-none rounded-full ${accentBar[layer.accent]}`} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-faint">
        <span className="h-px w-8 bg-border" />
        One clean handoff, zero infra headaches
        <span className="h-px w-8 bg-border" />
      </div>
    </div>
  );
}
