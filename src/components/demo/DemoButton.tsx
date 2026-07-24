"use client";

import { useDemoModal } from "./DemoModalProvider";
import { track } from "@/lib/analytics";

/**
 * Drop-in replacement for the old `<a href={demoUrl}>` CTAs. Keeps the exact
 * className/children at each call site, but opens the qualifying modal instead
 * of jumping straight to Calendly. Fires a `demo_cta_click` GA4 event tagged
 * with where the CTA was clicked.
 */
export function DemoButton({
  className,
  children,
  onClick,
  location,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  /** Runs alongside opening the modal — e.g. to close a mobile menu first. */
  onClick?: () => void;
  /** Where this CTA lives, for analytics (e.g. "hero", "navbar", "footer"). */
  location?: string;
  "aria-label"?: string;
}) {
  const { open } = useDemoModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        track("demo_cta_click", { location: location ?? "unknown" });
        open();
      }}
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
}
