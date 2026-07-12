"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRightIcon, CheckIcon } from "./Icons";
import { DemoButton } from "./demo/DemoButton";
import { ExchangePanel } from "./ExchangePanel";
import { FlowField } from "./FlowField";
import { CursorGlow } from "./CursorGlow";
import { Magnetic, TiltCard } from "./ui/Interactive";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { desktop: "(min-width: 768px)", motionOK: "(prefers-reduced-motion: no-preference)" },
        (ctx) => {
          if (!ctx.conditions?.motionOK) return;
          gsap.utils.toArray<HTMLElement>(".gf-parallax").forEach((layer, i) => {
            gsap.to(layer, {
              yPercent: (i + 1) * 14,
              ease: "none",
              scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: 0.6 },
            });
          });
        },
      );
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="top"
      ref={scope}
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      {/* Ambient layers */}
      <FlowField className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_75%_60%_at_50%_30%,black,transparent)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="gf-parallax pointer-events-none absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-brand/12 blur-[130px]" />
      <div className="gf-parallax pointer-events-none absolute right-[-10%] top-[20%] h-[420px] w-[520px] rounded-full bg-cyan/10 blur-[120px]" />
      <CursorGlow />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <a
            href="#product"
            className="gf-rise gf-rise-1 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Powering 3 live exchanges · 500K monthly users
          </a>

          <h1 className="gf-rise-y gf-rise-1 mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Launch your own white-label{" "}
            <span className="text-gradient">crypto derivatives exchange</span>
          </h1>

          <p className="gf-rise gf-rise-2 mt-6 max-w-xl text-lg leading-relaxed text-muted">
            GammaFloww is the white-label engine behind modern futures &amp; options venues.
            You own the brand and the experience — we run the matching, liquidity, and risk.
            Go live in weeks, not years.
          </p>

          <div className="gf-rise gf-rise-3 mt-9 flex flex-wrap items-center gap-3">
            <Magnetic className="inline-block">
              <DemoButton className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03]">
                Schedule a Demo
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </DemoButton>
            </Magnetic>
          </div>

          <div className="gf-rise gf-rise-4 mt-10 flex flex-wrap items-center gap-2.5">
            {["Live in 4–8 weeks", "Up to 125x leverage", "300+ trading pairs"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand/[0.07] px-3.5 py-1.5 text-sm font-medium text-ink"
              >
                <CheckIcon className="h-3.5 w-3.5 flex-none text-brand" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="gf-rise gf-rise-3">
          <TiltCard max={6}>
            <ExchangePanel />
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
