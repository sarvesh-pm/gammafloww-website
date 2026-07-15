import { ImageResponse } from "next/og";
import { pngDataUri } from "@/lib/og";

export const alt =
  "GammaFloww — White-label crypto derivatives exchange infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logoSrc = await pngDataUri("logo.png");
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
            "radial-gradient(1000px 500px at 20% 0%, rgba(109,139,255,0.28), transparent), #05070b",
          color: "#f4f7fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a raw img element */}
          <img src={logoSrc} width={49} height={56} alt="" style={{ marginRight: 18 }} />
          <span>
            Gamma<span style={{ color: "#6d8bff" }}>Floww</span>
          </span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1 }}>
            Launch an enterprise-grade
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1,
              backgroundImage: "linear-gradient(100deg, #6d8bff, #22d3ee, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            crypto derivatives exchange
          </div>
          <div style={{ fontSize: 30, color: "#9aa6b8", marginTop: 28, maxWidth: 900 }}>
            White-label infrastructure — you own the brand, we run the engine.
          </div>
        </div>

        {/* stats */}
        <div style={{ display: "flex", gap: 48, fontSize: 26, color: "#9aa6b8" }}>
          <span>
            <span style={{ color: "#f4f7fb", fontWeight: 700, marginRight: 8 }}>125x</span> leverage
          </span>
          <span>
            <span style={{ color: "#f4f7fb", fontWeight: 700, marginRight: 8 }}>300+</span> pairs
          </span>
          <span>
            <span style={{ color: "#f4f7fb", fontWeight: 700, marginRight: 8 }}>4–8 weeks</span> to live
          </span>
        </div>
      </div>
    ),
    size,
  );
}
