"use client";

import { useDemoModal } from "./DemoModalProvider";

/**
 * Drop-in replacement for the old `<a href={demoUrl}>` CTAs. Keeps the exact
 * className/children at each call site, but opens the qualifying modal instead
 * of jumping straight to Calendly.
 */
export function DemoButton({
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  /** Runs alongside opening the modal — e.g. to close a mobile menu first. */
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const { open } = useDemoModal();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
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
