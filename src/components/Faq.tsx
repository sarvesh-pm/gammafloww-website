"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { faqs, site } from "@/lib/content";
import { PlusIcon } from "./Icons";
import { SectionHeading } from "./ui/SectionHeading";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeading
          eyebrow="FAQ"
          title="Answers before you ask"
          description="The questions partners raise most often. Need something specific? A quick demo call clears it up fast."
        />

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-colors ${
                  isOpen ? "border-brand/30 bg-surface" : "border-border glass"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink">{item.q}</span>
                  <PlusIcon
                    className={`h-5 w-5 flex-none text-brand transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-muted">
          Still curious?{" "}
          <a
            href={site.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:underline"
          >
            Book a 30-minute demo →
          </a>
        </div>
      </div>
    </section>
  );
}
