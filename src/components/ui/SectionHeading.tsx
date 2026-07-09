import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
};

export function SectionHeading({ eyebrow, title, description, align = "center" }: Props) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-4 ${alignment}`}>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
        {eyebrow}
      </span>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="text-pretty text-base leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}
