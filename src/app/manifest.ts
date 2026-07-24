import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GammaFloww — White-Label Crypto Derivatives Infrastructure",
    short_name: "GammaFloww",
    description:
      "White-label derivatives infrastructure to launch your own crypto futures & options exchange in weeks.",
    start_url: "/",
    // "browser" (not "standalone") keeps the manifest's metadata benefits
    // without marking the site installable — so Chrome drops the "Install"
    // app prompt, which isn't wanted for a marketing site.
    display: "browser",
    background_color: "#05070b",
    theme_color: "#05070b",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
