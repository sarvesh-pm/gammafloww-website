import { getAllPosts } from "@/lib/blog";

// Static generation: the post list is read from disk at build time, so this
// route is prerendered and served like a static file.
export const dynamic = "force-static";

const siteUrl = "https://www.gammafloww.com";

// Serve /llms.txt — a curated, machine-readable index of the site for AI answer
// engines (the llms.txt convention; Anthropic and Perplexity read it, others
// crawl the HTML directly). Generated from the live blog index so it stays
// current as posts ship.
export function GET() {
  const posts = getAllPosts();

  // Group posts by cluster, preserving newest-first order within each.
  const byCluster = new Map<string, typeof posts>();
  for (const p of posts) {
    const list = byCluster.get(p.cluster) ?? [];
    list.push(p);
    byCluster.set(p.cluster, list);
  }

  const clusterSections = [...byCluster.entries()]
    .map(([cluster, list]) => {
      const lines = list
        .map(
          (p) =>
            `- [${p.title}](${siteUrl}/blog/${p.slug}): ${p.description}`,
        )
        .join("\n");
      return `## Blog — ${cluster}\n\n${lines}`;
    })
    .join("\n\n");

  const body = `# GammaFloww

> White-label crypto derivatives exchange infrastructure. GammaFloww lets partners launch a fully-featured crypto futures & options exchange — matching engine, liquidity, and risk systems — in weeks instead of years, with up to 125x leverage across 300+ pairs.

## About

- [GammaFloww](${siteUrl}): B2B white-label derivatives exchange infrastructure. Product overview, features, launch process, and FAQ.
- [Blog](${siteUrl}/blog): Operator and trader guides on launching, running, and understanding crypto derivatives exchanges.

${clusterSections}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
