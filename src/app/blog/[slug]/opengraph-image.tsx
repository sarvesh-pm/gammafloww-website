import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getAllSlugs, getPostSource } from "@/lib/blog";

export const alt = "GammaFloww blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArticleOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostSource(slug);
  const title = post?.meta.title ?? "GammaFloww";
  const cluster = post?.meta.cluster ?? "";

  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 500px at 15% 0%, rgba(109,139,255,0.30), transparent), #05070b",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a raw img element */}
          <img src={logoSrc} width={39} height={44} alt="" style={{ marginRight: 16 }} />
          <span>
            Gamma<span style={{ color: "#6d8bff" }}>Floww</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {cluster && (
            <div style={{ fontSize: 24, color: "#6d8bff", fontWeight: 600, marginBottom: 20 }}>
              {cluster.toUpperCase()}
            </div>
          )}
          <div style={{ fontSize: title.length > 64 ? 52 : 62, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>
            {title}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#9aa6b8" }}>gammafloww.com/blog</div>
      </div>
    ),
    size,
  );
}
