import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "./Callout";
import { SourceList } from "./SourceList";
import { BarChart } from "./BarChart";
import { RevenueEstimator } from "./RevenueEstimator";
import { LiquidationCalculator } from "./LiquidationCalculator";
import { FundingCalculator } from "./FundingCalculator";

type A = ComponentPropsWithoutRef<"a">;

export const mdxComponents = {
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 scroll-mt-28 text-2xl font-semibold tracking-tight text-ink sm:text-3xl" {...p} />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink" {...p} />
  ),
  h4: (p: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-6 text-lg font-semibold text-ink" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-[16.5px] leading-relaxed text-muted" {...p} />
  ),
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 flex list-disc flex-col gap-2 pl-6 text-muted marker:text-brand" {...p} />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 flex list-decimal flex-col gap-2 pl-6 text-muted marker:text-faint" {...p} />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => <li className="leading-relaxed" {...p} />,
  a: ({ href = "#", ...rest }: A) => {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-brand underline decoration-brand/30 underline-offset-2 hover:decoration-brand"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      />
    );
  },
  strong: (p: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-ink" {...p} />,
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mt-6 border-l-2 border-brand/50 pl-4 text-muted italic" {...p} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink" {...p} />
  ),
  table: (p: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full border-collapse text-left text-sm" {...p} />
    </div>
  ),
  th: (p: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border bg-bg-soft px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-faint" {...p} />
  ),
  td: (p: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border/60 px-4 py-2.5 text-muted" {...p} />
  ),
  // Interactive / custom blocks
  Callout,
  SourceList,
  BarChart,
  RevenueEstimator,
  LiquidationCalculator,
  FundingCalculator,
};
