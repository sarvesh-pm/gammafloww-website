import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="gf-logo" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34e39b" />
          <stop offset="0.55" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a6f75a" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="29" height="29" rx="8.5" stroke="url(#gf-logo)" strokeWidth="1.6" />
      {/* Gamma-inspired flow mark */}
      <path
        d="M9 9h11l-6 8"
        stroke="url(#gf-logo)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22c3 0 4-3 6-6s3-6 8-6"
        stroke="url(#gf-logo)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.65"
      />
    </svg>
  );
}
