import { process } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Process() {
  return (
    <section id="process" className="relative border-y border-border bg-bg-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="How we launch you"
          title={
            <>
              From first call to live venue in{" "}
              <span className="text-gradient">4–8 weeks</span>
            </>
          }
          description="A proven, low-risk path to launch. Every step is handled with your team, with clear ownership and SLAs from day one."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* connecting line for large screens */}
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          {process.map((step, i) => (
            <Reveal key={step.step} delay={(i % 3) * 0.1}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-border bg-surface font-mono text-sm font-semibold text-brand">
                    {step.step}
                  </div>
                  <div className="h-px flex-1 bg-border/60" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
