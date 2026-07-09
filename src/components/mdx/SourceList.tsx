import { sourceSets } from "@/lib/blogData";

export function SourceList({ id }: { id: string }) {
  const items = sourceSets[id] ?? [];
  if (items.length === 0) return null;

  return (
    <section className="my-8 rounded-2xl border border-border bg-bg-soft/60 p-5">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">Sources</div>
      <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-muted marker:text-faint">
        {items.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
              {s.label}
            </a>
            {s.publisher && <span className="text-faint"> — {s.publisher}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
