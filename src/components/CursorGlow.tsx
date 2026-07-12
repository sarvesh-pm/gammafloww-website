"use client";

import { useEffect, useRef } from "react";

/**
 * A soft brand spotlight that follows the cursor within its positioned parent.
 * Pointer-only; disabled for touch and reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    // Only spin the rAF loop while the glow is still easing toward the pointer;
    // once it converges (or the pointer stops), stop the loop so we don't burn a
    // frame every ~16ms indefinitely on desktop.
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx - 260}px, ${cy - 260}px, 0)`;
      if (Math.abs(tx - cx) < 0.5 && Math.abs(ty - cy) < 0.5) {
        raf = 0; // settled — idle until the next move
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      el.style.opacity = "1";
      kick();
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 h-[520px] w-[520px] rounded-full opacity-0 blur-[100px] transition-opacity duration-500"
      style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--brand) 22%, transparent), transparent 62%)" }}
    />
  );
}
