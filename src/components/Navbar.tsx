"use client";

import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Full-width scrim masks page content passing under the floating pill */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-300"
        style={{
          background: "linear-gradient(to bottom, var(--bg) 0%, var(--bg) 74%, transparent 100%)",
          opacity: scrolled ? 1 : 0,
        }}
      />
      <div
        className={`relative z-10 mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${
          scrolled
            ? "my-3 rounded-2xl glass py-2.5 shadow-glow"
            : "my-4 border border-transparent py-3"
        }`}
      >
        <a href="/#top" className="flex items-center gap-2.5" aria-label={site.name}>
          <Logo className="h-7 w-7" />
          <span className="text-[17px] font-semibold tracking-tight">
            Gamma<span className="text-brand">Floww</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={site.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03] md:inline-flex"
          >
            Schedule a Demo
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-5 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span className={`block h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-px w-5 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="relative z-10 mx-3 rounded-2xl border border-border bg-surface p-4 shadow-glow md:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3 text-sm text-muted last:border-0 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-brand-ink"
            >
              Schedule a Demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
