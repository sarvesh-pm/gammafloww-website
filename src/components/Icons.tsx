import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function LayersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </svg>
  );
}

export function GaugeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="m13.4 10.6 3.6-3.6" />
      <path d="M3.5 18a9 9 0 1 1 17 0" />
    </svg>
  );
}

export function ActivityIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}

export function ShieldIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function BellIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </svg>
  );
}

export function CodeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m16 18 4-6-4-6" />
      <path d="m8 6-4 6 4 6" />
      <path d="m14 4-4 16" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="m5 12 5 5L20 6" />
    </svg>
  );
}

export function PlusIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export const iconMap = {
  layers: LayersIcon,
  gauge: GaugeIcon,
  activity: ActivityIcon,
  shield: ShieldIcon,
  bell: BellIcon,
  code: CodeIcon,
} as const;

export type IconName = keyof typeof iconMap;
