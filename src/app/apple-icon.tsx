import { centeredIcon } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Dark-background variant — iOS renders app icons on an opaque tile.
export default function AppleIcon() {
  return centeredIcon("icon-source-dark.png", size.width);
}
