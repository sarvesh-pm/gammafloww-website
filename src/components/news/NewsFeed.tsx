"use client";

import { useMemo, useState } from "react";
import type { NewsItem } from "@/lib/news";

function relTime(iso: string, nowIso: string): string {
  const diff = Date.parse(nowIso) - Date.parse(iso);
  const min = Math.round(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.round(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Image area with a branded fallback for feeds that ship no image.
function Thumb({ item }: { item: NewsItem }) {
  const [broken, setBroken] = useState(false);
  if (item.image && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary publisher CDNs; native img avoids per-domain remotePatterns config
      <img
        src={item.image}
        alt=""
        loading="lazy"
        onError={() => setBroken(true)}
        className="h-44 w-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-brand/15 to-surface-2">
      <span className="text-sm font-semibold text-brand/80">{item.source}</span>
    </div>
  );
}

export function NewsFeed({
  items,
  sources,
  fetchedAt,
}: {
  items: NewsItem[];
  sources: string[];
  fetchedAt: string;
}) {
  const [active, setActive] = useState<string>("All");

  const shown = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.source === active)),
    [items, active],
  );

  return (
    <div>
      {/* Source filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by source">
        {["All", ...sources].map((s) => {
          const on = s === active;
          return (
            <button
              key={s}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(s)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                on
                  ? "border-brand bg-brand text-brand-ink"
                  : "border-border bg-surface text-muted hover:border-brand/40 hover:text-ink"
              }`}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Card grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {shown.map((item) => (
          <a
            key={item.link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-brand/40"
          >
            <div className="overflow-hidden">
              <Thumb item={item} />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-xs text-faint">
                <span className="font-semibold text-brand">{item.source}</span>
                <span aria-hidden>·</span>
                <time dateTime={item.iso}>{relTime(item.iso, fetchedAt)}</time>
              </div>
              <h2 className="mt-2 text-base font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
                {item.title}
              </h2>
              {item.snippet && (
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{item.snippet}</p>
              )}
            </div>
          </a>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-8 text-sm text-muted">No headlines from {active} right now.</p>
      )}
    </div>
  );
}
