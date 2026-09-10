"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NewsItem } from "@/lib/news";
import { ArrowRightIcon } from "@/components/Icons";

function rel(iso: string, nowIso: string): string {
  const min = Math.round((Date.parse(nowIso) - Date.parse(iso)) / 60000);
  if (min < 60) return `${Math.max(1, min)}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.round(hr / 24)}d ago`;
}

function Card({ item, now }: { item: NewsItem; now: string }) {
  const [broken, setBroken] = useState(false);
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[280px] flex-none snap-start flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-brand/40 sm:w-[320px]"
    >
      {item.image && !broken ? (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary publisher CDNs
        <img
          src={item.image}
          alt=""
          loading="lazy"
          onError={() => setBroken(true)}
          className="h-40 w-full object-cover"
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-brand/15 to-surface-2">
          <span className="text-sm font-semibold text-brand/80">{item.source}</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-faint">
          <span className="font-semibold text-brand">{item.source}</span>
          <span aria-hidden>·</span>
          <time dateTime={item.iso}>{rel(item.iso, now)}</time>
        </div>
        <h3 className="mt-2 line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {item.title}
        </h3>
      </div>
    </a>
  );
}

export function NewsCarousel({ items, fetchedAt }: { items: NewsItem[]; fetchedAt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>("a");
      const step = card ? card.offsetWidth + 20 /* gap */ : el.clientWidth;
      // Loop back to the start once the end is reached.
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 8) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 5000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("a");
    const step = card ? card.offsetWidth + 20 : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="py-20 sm:py-28" aria-labelledby="news-carousel-heading">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">Newswire</span>
            <h2 id="news-carousel-heading" className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Latest in crypto & derivatives
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand/40 hover:text-ink sm:flex"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-brand/40 hover:text-ink sm:flex"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <Card key={item.link} item={item} now={fetchedAt} />
          ))}
        </div>

        <div className="mt-6">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            View all news
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
