"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { process } from "@/lib/content";
import { SectionHeading } from "./ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Process() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Connector line draws with scroll (desktop only).
        mm.add("(min-width: 1024px)", () => {
          gsap.fromTo(
            ".gf-timeline",
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: ".gf-grid", start: "top 78%", end: "bottom 60%", scrub: 0.8 },
            },
          );
        });
        // Staggered step reveal.
        gsap.from(".gf-step", {
          opacity: 0,
          y: 28,
          duration: 0.5,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gf-grid", start: "top 82%" },
        });
      });
      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="process"
      ref={scope}
      className="relative border-y border-border bg-bg-soft py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="How to launch"
          title={
            <>
              From first call to live venue in <span className="text-gradient">4–8 weeks</span>
            </>
          }
          description="A proven, low-risk path to launch. Every step is handled with your team, with clear ownership and SLAs from day one."
        />

        <div className="gf-grid relative mt-16 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* draw-on-scroll connector */}
          <div className="pointer-events-none absolute inset-x-0 top-6 hidden h-px origin-left bg-gradient-to-r from-brand via-cyan to-transparent lg:block gf-timeline" />
          {process.map((step) => (
            <div key={step.step} className="gf-step relative">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-border bg-surface font-mono text-sm font-semibold text-brand">
                  {step.step}
                </div>
                <div className="h-px flex-1 bg-border/60" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
