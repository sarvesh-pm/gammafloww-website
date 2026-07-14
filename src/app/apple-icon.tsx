import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  // Dark-background variant — iOS renders app icons on an opaque tile.
  const data = await readFile(join(process.cwd(), "public/icon-source-dark.png"), "base64");
  const src = `data:image/png;base64,${data}`;
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
        <img src={src} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
