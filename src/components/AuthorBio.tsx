import { resolveAuthor } from "@/lib/authors";

// Server-rendered "About the author" box. Surfaces author expertise (E-E-A-T)
// for readers and AI answer engines. Renders a named individual when the post's
// author resolves to one, otherwise the collective GammaFloww Team.
export function AuthorBio({ author }: { author: string }) {
  const a = resolveAuthor(author);
  const initials = a.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="mt-14 rounded-2xl border border-border bg-surface p-6" aria-label="About the author">
      <div className="flex items-start gap-4">
        <div
          aria-hidden
          className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand"
        >
          {initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">{a.name}</p>
          <p className="text-xs text-faint">{a.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{a.bio}</p>
          {a.sameAs && a.sameAs.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              {a.sameAs.map((href) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand hover:underline"
                >
                  {href.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
