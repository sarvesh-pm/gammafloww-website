import { faqs, socials } from "@/lib/content";

const siteUrl = "https://www.gammafloww.com";

// Server-rendered JSON-LD. type="application/ld+json" is non-executable data,
// emitted straight into the HTML for crawlers and AI answer engines.
export function StructuredData() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "GammaFloww",
      url: siteUrl,
      description:
        "White-label derivatives infrastructure that lets partners launch a fully-featured crypto futures & options exchange in weeks.",
      // Square brand mark (512×512) per Google logo guidelines — the wide OG
      // banner is rejected for knowledge-panel logos.
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icon`,
        width: 512,
        height: 512,
      },
      sameAs: socials.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "GammaFloww",
      url: siteUrl,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      name: "White-label crypto derivatives exchange",
      provider: { "@id": `${siteUrl}/#organization` },
      serviceType: "Exchange infrastructure (SaaS)",
      areaServed: "Worldwide",
      description:
        "Plug-and-play futures & options exchange backend: matching engine, liquidity, and risk — up to 125x leverage across 300+ pairs.",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
