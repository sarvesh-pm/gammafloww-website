import { charts } from "@/lib/blogData";

const toneBg = {
  brand: "bg-brand",
  cyan: "bg-cyan",
  up: "bg-up",
  down: "bg-down",
  muted: "bg-border-strong",
} as const;

// Server component. Chart data lives in src/lib/blogData.ts and is referenced
// by id from MDX (string props pass reliably; arrays do not). Animates via CSS.
export function BarChart({ id }: { id: string }) {
  const chart = charts[id];
  if (!chart) return null;
  const { title, data, source, sourceHref, asOf } = chart;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <figure className="my-8 rounded-2xl border border-border bg-surface p-6 shadow-soft">
      {title && <div className="mb-5 text-sm font-semibold text-ink">{title}</div>}
      <div className="flex flex-col gap-4">
        {data.map((d, i) => (
          <div key={d.label} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-xs text-muted sm:w-40">{d.label}</div>
            <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-bg-soft">
              <div
                className={`gf-bar h-full rounded-md ${toneBg[d.tone ?? "brand"]}`}
                style={{ width: `${(d.value / max) * 100}%`, animationDelay: `${i * 90}ms` }}
              />
            </div>
            <div className="w-14 shrink-0 text-right font-mono text-xs font-semibold text-ink tabular-nums">
              {d.display ?? d.value}
            </div>
          </div>
        ))}
      </div>
      {(source || asOf) && (
        <figcaption className="mt-5 text-[11px] text-faint">
          {asOf && <span>As of {asOf}. </span>}
          {source && (
            <>
              Source:{" "}
              {sourceHref ? (
                <a href={sourceHref} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                  {source}
                </a>
              ) : (
                source
              )}
            </>
          )}
        </figcaption>
      )}
    </figure>
  );
}
