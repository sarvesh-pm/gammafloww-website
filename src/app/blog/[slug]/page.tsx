import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ArrowRightIcon } from "@/components/Icons";
import { mdxComponents } from "@/components/mdx";
import { getAllSlugs, getPostSource } from "@/lib/blog";
import { site } from "@/lib/content";

const siteUrl = "https://gammafloww.com";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) return {};
  const { meta } = post;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: meta.title,
      description: meta.description,
      publishedTime: meta.date,
      authors: [meta.author],
    },
  };
}

function fmtDate(d: string) {
  const date = new Date(d);
  return isNaN(date.getTime())
    ? d
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) notFound();

  const { meta, source } = post;
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
          { "@type": "ListItem", position: 3, name: meta.title, item: `${siteUrl}/blog/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.date,
        author: { "@type": "Organization", name: meta.author, url: siteUrl },
        publisher: { "@type": "Organization", name: "GammaFloww", url: siteUrl },
        mainEntityOfPage: `${siteUrl}/blog/${slug}`,
        keywords: meta.keyword,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      <main className="pt-32 sm:pt-40">
        <article className="mx-auto max-w-3xl px-5 pb-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-faint" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-ink">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-ink">Blog</Link>
            <span aria-hidden>/</span>
            <span className="truncate text-muted">{meta.cluster}</span>
          </nav>

          {/* Header */}
          <header className="mt-6 border-b border-border pb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">{meta.cluster}</span>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{meta.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-faint">
              <span>{meta.author}</span>
              <span aria-hidden>·</span>
              <span>{fmtDate(meta.date)}</span>
              <span aria-hidden>·</span>
              <span>{meta.readingTime}</span>
            </div>
          </header>

          {/* Body */}
          <div className="mt-2">{content}</div>

          {/* In-article CTA */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-border bg-bg-soft p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Thinking about launching your own venue?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">
              GammaFloww is the white-label engine behind modern derivatives exchanges. See how fast
              you could go live.
            </p>
            <a
              href={site.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-ink transition-transform hover:scale-[1.03]"
            >
              Schedule a Demo
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Back link */}
          <div className="mt-10">
            <Link href="/blog" className="text-sm font-medium text-brand hover:underline">
              ← All articles
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
