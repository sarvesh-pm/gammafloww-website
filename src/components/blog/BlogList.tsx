"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/blog";

const clusterTone: Record<string, string> = {
  "Launch & Buy": "text-brand bg-brand/12",
  "Operator Playbook": "text-cyan bg-cyan/12",
  "Regulation & Compliance": "text-up bg-up/12",
  "Trader Education": "text-lime bg-lime/12",
};

function fmtDate(d: string) {
  const date = new Date(d);
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function BlogList({ posts }: { posts: PostMeta[] }) {
  const clusters = ["All", ...Array.from(new Set(posts.map((p) => p.cluster)))];
  const [active, setActive] = useState("All");
  const shown = active === "All" ? posts : posts.filter((p) => p.cluster === active);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {clusters.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              active === c
                ? "border-brand/40 bg-brand/10 text-brand"
                : "border-border text-muted hover:border-brand/30 hover:text-ink"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-glow"
          >
            <span className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${clusterTone[p.cluster] ?? "bg-surface-2 text-muted"}`}>
              {p.cluster}
            </span>
            <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
              {p.title}
            </h2>
            <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
            <div className="mt-5 flex items-center gap-2 text-xs text-faint">
              <span>{fmtDate(p.date)}</span>
              <span aria-hidden>·</span>
              <span>{p.readingTime}</span>
            </div>
          </a>
        ))}
      </div>

      {shown.length === 0 && (
        <p className="mt-16 text-center text-sm text-muted">No articles in this category yet.</p>
      )}
    </div>
  );
}
