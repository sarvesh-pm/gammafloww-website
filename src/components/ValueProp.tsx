import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const layers = [
  { label: "Your brand & front end", tone: "brand", note: "You design it" },
  { label: "GammaFloww API layer", tone: "cyan", note: "Plug & play" },
  { label: "Matching · Liquidity · Risk", tone: "muted", note: "We operate it" },
];

export function ValueProp() {
  return (
    <section id="product" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="The GammaFloww edge"
            title={
              <>
                Build your edge on infrastructure that took{" "}
                <span className="text-gradient">years to engineer</span>
              </>
            }
            description="Standing up a derivatives exchange means matching engines, liquidity, risk systems, and 24/7 operations. GammaFloww hands you all of it as a plug-and-play backend — so your team focuses on brand, growth, and traders."
          />
          <div className="mt-8 flex flex-col gap-4">
            {[
              "One integration, a full futures & options exchange",
              "Institutional-grade performance from day one",
              "Scale to hundreds of thousands of users without re-architecting",
            ].map((point, i) => (
              <Reveal key={point} delay={0.1 + i * 0.08}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-brand/15 text-[11px] font-bold text-brand">
                    ✓
                  </span>
                  <span className="text-muted">{point}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="relative rounded-3xl glass p-6 shadow-glow">
            <div className="mb-5 text-xs font-medium uppercase tracking-wider text-faint">
              Where the work lives
            </div>
            <div className="flex flex-col gap-3">
              {layers.map((layer, i) => (
                <div
                  key={layer.label}
                  className={`flex items-center justify-between rounded-2xl border border-border px-5 py-5 ${
                    i === 1 ? "bg-surface" : "bg-bg-soft/60"
                  }`}
                  style={{ marginInline: `${i * 14}px` }}
                >
                  <span className="text-sm font-medium text-ink">{layer.label}</span>
                  <span
                    className={`font-mono text-xs ${
                      layer.tone === "brand"
                        ? "text-brand"
                        : layer.tone === "cyan"
                          ? "text-cyan"
                          : "text-faint"
                    }`}
                  >
                    {layer.note}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-faint">
              <span className="h-px w-8 bg-border" />
              One clean handoff, zero infra headaches
              <span className="h-px w-8 bg-border" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
