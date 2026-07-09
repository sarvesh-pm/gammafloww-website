import { stats } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

export function Stats() {
  return (
    <section className="relative border-y border-border bg-bg-soft">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-border px-5 sm:grid-cols-4 sm:divide-y-0">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex flex-col items-center gap-1 px-4 py-10 text-center">
              <Counter
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-mono text-4xl font-semibold text-gradient tabular-nums sm:text-5xl"
              />
              <div className="text-sm text-muted">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
