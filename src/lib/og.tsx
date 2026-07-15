import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Inline a /public PNG as a data URI for Satori / ImageResponse (which can't
// fetch relative asset URLs at generation time).
export async function pngDataUri(publicPath: string) {
  const data = await readFile(join(process.cwd(), "public", publicPath), "base64");
  return `data:image/png;base64,${data}`;
}

// Render a /public PNG centered, full-bleed, as a square icon ImageResponse.
// Shared by the favicon (/icon) and Apple touch icon (/apple-icon) routes.
export async function centeredIcon(publicPath: string, size: number) {
  const src = await pngDataUri(publicPath);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori requires a raw img element */}
        <img src={src} width={size} height={size} alt="" />
      </div>
    ),
    { width: size, height: size },
  );
}
