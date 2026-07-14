import type { ImgHTMLAttributes } from "react";

export function Logo({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- small static brand mark; next/image adds no benefit at this size
    <img
      src="/logo.png"
      alt="GammaFloww"
      className={className}
      draggable={false}
      {...props}
    />
  );
}
