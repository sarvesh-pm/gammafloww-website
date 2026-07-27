"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps the address bar clean of section fragments. If a page loads (or is
 * navigated to) with a "#section" hash — e.g. arriving from a nav link on
 * another page, or a direct/shared link — this scrolls to that section and
 * then strips the fragment from the URL. Same-page nav is already handled in
 * HashLink; this covers cross-page navigation and direct hash loads.
 */
export function HashCleanup() {
  const pathname = usePathname();
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (el) el.scrollIntoView();
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, [pathname]);
  return null;
}
