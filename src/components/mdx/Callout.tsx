import type { ReactNode } from "react";

export function Callout({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <aside className="my-6 rounded-2xl border border-brand/30 bg-brand/[0.06] p-5">
      {title && <div className="mb-1.5 text-sm font-semibold text-brand">{title}</div>}
      <div className="text-sm leading-relaxed text-muted [&>p]:m-0">{children}</div>
    </aside>
  );
}
