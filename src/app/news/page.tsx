import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CtaSection } from "@/components/CtaSection";
import { NewsFeed } from "@/components/news/NewsFeed";
import { getNews } from "@/lib/news";

const siteUrl = "https://www.gammafloww.com";

// Rebuild the aggregated feed at most once an hour (ISR).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Crypto News — Derivatives, Exchanges & Markets",
  description:
    "The latest crypto news aggregated from leading industry sources — CoinDesk, Cointelegraph, The Block, Decrypt and more — in one recency-sorted feed.",
  alternates: { canonical: "/news" },
  // Aggregated third-party headlines — a UX feature, not original content.
  // noindex avoids any thin/duplicate-content signal; links stay followed.
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    url: "/news",
    title: "Crypto News Feed — GammaFloww",
    description:
      "The latest crypto and derivatives news from leading industry sources, in one feed.",
    images: ["/opengraph-image"],
  },
};

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export default async function NewsPage() {
  const { items, sources, fetchedAt } = await getNews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/news`,
    name: "Crypto News Feed",
    description:
      "The latest crypto and derivatives news aggregated from leading industry sources.",
    url: `${siteUrl}/news`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.slice(0, 20).map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.link,
        name: item.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="pt-32 sm:pt-40">
        <div className="mx-auto max-w-3xl px-5 pb-8">
          {/* Header */}
          <header className="border-b border-border pb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Crypto Newswire
            </span>
            <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              The latest in crypto & derivatives
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Headlines from {sources.length} leading industry sources, in one recency-sorted
              feed. Every story links straight to the original publisher.
            </p>
            {items.length > 0 && (
              <p className="mt-4 text-xs text-faint">
                {items.length} headlines · updated {fmtTime(fetchedAt)}
              </p>
            )}
          </header>

          {/* Feed */}
          <section className="mt-8">
            {items.length > 0 ? (
              <NewsFeed items={items} sources={sources} fetchedAt={fetchedAt} />
            ) : (
              <p className="text-sm text-muted">
                The newswire is briefly unavailable — please check back shortly.
              </p>
            )}
          </section>

          {/* Attribution */}
          <p className="mt-12 border-t border-border pt-6 text-xs leading-relaxed text-faint">
            Headlines and summaries are aggregated from the public RSS feeds of their respective
            publishers and remain © those publishers. GammaFloww reproduces only the headline and a
            short excerpt; follow each link to read the full article at its source. This page is not
            affiliated with or endorsed by the sources listed.
          </p>
        </div>

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
