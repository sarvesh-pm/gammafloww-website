import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CtaSection } from "@/components/CtaSection";
import { BlogList } from "@/components/blog/BlogList";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Building & Running Crypto Derivatives Exchanges",
  description:
    "Playbooks, data, and guides on launching and operating a crypto derivatives exchange — liquidity, licensing, fees, risk engines, and the mechanics of perpetual futures.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "The GammaFloww Blog",
    description:
      "Playbooks, data, and guides on launching and operating a crypto derivatives exchange.",
  },
};

const siteUrl = "https://www.gammafloww.com";

export default function BlogIndex() {
  const posts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/blog`,
    name: "The GammaFloww Blog",
    description:
      "Playbooks, data, and guides on launching and operating a crypto derivatives exchange.",
    url: `${siteUrl}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${siteUrl}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="pt-32 sm:pt-40">
        <section className="relative overflow-hidden pb-8">
          <div className="pointer-events-none absolute left-1/2 top-[-20%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]" />
          <div className="relative mx-auto max-w-6xl px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium uppercase tracking-wider text-brand">
              GammaFloww Blog
            </span>
            <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              How to launch and run a{" "}
              <span className="text-gradient">crypto derivatives exchange</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              Data-backed playbooks and deep dives — liquidity, licensing, fees, risk engines,
              and the mechanics of perpetual futures. Every figure is sourced.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-8">
          <BlogList posts={posts} />
        </section>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
