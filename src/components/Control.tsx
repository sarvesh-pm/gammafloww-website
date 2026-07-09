import { controls } from "@/lib/content";
import { CheckIcon } from "./Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function Control() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Division of labor"
          title={
            <>
              You keep control of what matters.{" "}
              <span className="text-gradient">We carry the heavy lifting.</span>
            </>
          }
          description="A clean split: your brand and business logic stay yours, while the operational complexity of running an exchange sits with us."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[controls.yours, controls.ours].map((col, idx) => (
            <Reveal key={col.title} delay={idx * 0.1}>
              <div
                className={`h-full rounded-3xl border p-8 ${
                  idx === 0
                    ? "border-brand/25 bg-gradient-to-b from-brand/[0.07] to-transparent"
                    : "border-border glass"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      idx === 0 ? "bg-brand text-brand-ink" : "bg-surface text-muted"
                    }`}
                  >
                    {idx === 0 ? "Your side" : "Our side"}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{col.title}</h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckIcon
                        className={`mt-0.5 h-5 w-5 flex-none ${idx === 0 ? "text-brand" : "text-cyan"}`}
                      />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
