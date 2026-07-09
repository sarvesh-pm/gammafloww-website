import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { StackDiagram } from "./StackDiagram";

export function ValueProp() {
  return (
    <section id="product" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why white-label"
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
          <StackDiagram />
        </Reveal>
      </div>
    </section>
  );
}
