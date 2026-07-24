"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Fires `article_scroll` at 25/50/75/100% read depth (once each) on a blog
 * article, so we can see how far readers actually get. Renders nothing.
 */
export function ArticleScrollTracker({ slug }: { slug: string }) {
  const hit = useRef<Set<number>>(new Set());
  useEffect(() => {
    const thresholds = [25, 50, 75, 100];
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const t of thresholds) {
        if (pct >= t && !hit.current.has(t)) {
          hit.current.add(t);
          track("article_scroll", { percent: t, slug });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);
  return null;
}
