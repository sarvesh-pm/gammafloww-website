"use client";

import { motion } from "motion/react";
import { useTheme } from "@/lib/useTheme";
import { track } from "@/lib/analytics";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => {
        track("theme_toggle", { theme: isDark ? "light" : "dark" });
        toggle();
      }}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex h-9 w-[62px] items-center rounded-full border border-border bg-surface-2 px-1 transition-colors hover:border-brand/40"
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-brand-ink shadow-sm"
        animate={{ x: mounted && isDark ? 26 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </motion.span>
      {/* static track icons */}
      <span className="pointer-events-none absolute left-2 text-faint">
        <SunIcon />
      </span>
      <span className="pointer-events-none absolute right-2 text-faint">
        <MoonIcon />
      </span>
    </button>
  );
}
