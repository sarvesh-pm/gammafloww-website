import type { Faq } from "@/lib/blogData";

// Server-rendered FAQ. Native <details> keeps every answer in the DOM (visible
// to crawlers and AI answer engines) with no client JS; the matching FAQPage
// JSON-LD is emitted from the article page.
export function PostFaq({ items }: { items: Faq[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-14 border-t border-border pt-8" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xs font-semibold uppercase tracking-wider text-faint">
        Frequently asked questions
      </h2>
      <div className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-surface px-5 open:border-brand/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
              {item.q}
              <span
                aria-hidden
                className="flex-none text-xl leading-none text-brand transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-5 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
