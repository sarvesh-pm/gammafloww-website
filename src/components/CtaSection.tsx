import { site } from "@/lib/content";
import { ArrowRightIcon } from "./Icons";
import { Reveal } from "./ui/Reveal";
import { Magnetic } from "./ui/Interactive";

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-bg-soft px-6 py-16 text-center sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[640px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                Ready to launch your{" "}
                <span className="text-gradient">derivatives exchange?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted">
                Book a 30-minute demo and we&apos;ll show you exactly how GammaFloww takes your
                venue from concept to live trading — usually in under two months.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Magnetic className="inline-block">
                  <a
                    href={site.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03]"
                  >
                    Schedule a Demo
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface"
                >
                  Review the platform
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
