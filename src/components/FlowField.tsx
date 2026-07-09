"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; life: number };

/**
 * Ambient flow-field canvas — particles drift along a pseudo-noise field,
 * echoing the "Floww" motif. GPU-light, pauses when hidden / reduced-motion.
 */
export function FlowField({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = window.innerWidth < 768 ? 34 : 66;
    const particles: Particle[] = [];

    const readColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#34e39b";
    let stroke = readColor();

    const observer = new MutationObserver(() => {
      stroke = readColor();
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      life: 40 + Math.random() * 120,
    });

    // Smooth pseudo-noise angle from position + time (no external lib).
    const field = (x: number, y: number, t: number) =>
      (Math.sin(x * 0.004 + t) + Math.cos(y * 0.005 - t * 0.8) + Math.sin((x + y) * 0.003)) * 1.4;

    resize();
    for (let i = 0; i < COUNT; i++) particles.push(spawn());

    let t = 0;
    const draw = () => {
      t += 0.0016;
      // fade previous frame for trails
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const a = field(p.x, p.y, t);
        p.vx += Math.cos(a) * 0.08;
        p.vy += Math.sin(a) * 0.08;
        p.vx *= 0.94;
        p.vy *= 0.94;
        const nx = p.x + p.vx;
        const ny = p.y + p.vy;
        p.life -= 1;

        ctx.strokeStyle = stroke;
        ctx.globalAlpha = 0.12;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
          Object.assign(p, spawn());
        }
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
