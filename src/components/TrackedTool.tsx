"use client";

import { useRef } from "react";
import { track } from "@/lib/analytics";

/**
 * Wraps an interactive blog tool (calculator/estimator) and fires a single
 * `tool_use` GA4 event the first time a reader interacts with it — so we can
 * see which tools actually get used, without the noise of per-keystroke events.
 */
export function TrackedTool({ name, children }: { name: string; children: React.ReactNode }) {
  const fired = useRef(false);
  const onFirstInteraction = () => {
    if (fired.current) return;
    fired.current = true;
    track("tool_use", { tool: name });
  };
  return (
    <div onInput={onFirstInteraction} onPointerDown={onFirstInteraction}>
      {children}
    </div>
  );
}
