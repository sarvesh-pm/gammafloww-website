import { features } from "@/lib/content";
import { iconMap, type IconName } from "./Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-cyan/5 blur-[140px]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Platform features"
          title={
            <>
              Everything a serious trading venue needs,{" "}
              <span className="text-gradient">out of the box</span>
            </>
          }
          description="A complete derivatives stack — from margin engines to APIs — engineered for performance, safety, and scale."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon as IconName];
            return (
              <Reveal key={f.title} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-2xl glass p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-brand transition-colors group-hover:border-brand/40 group-hover:bg-brand/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
