import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export const SearchIcon = (p: IconProps) => (
  <svg width="18" height="18" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </svg>
);

export const CartIcon = (p: IconProps) => (
  <svg width="22" height="22" {...base} {...p}>
    <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="18" cy="20" r="1.3" />
  </svg>
);

export const HeartIcon = (p: IconProps) => (
  <svg width="18" height="18" {...base} {...p}>
    <path d="M12 20S4 14.5 4 9.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 8 2.2C20 14.5 12 20 12 20Z" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg width="14" height="14" {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowLeft = (p: IconProps) => (
  <svg width="20" height="20" {...base} {...p}>
    <path d="M15 5 8 12l7 7" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg width="20" height="20" {...base} {...p}>
    <path d="m9 5 7 7-7 7" />
  </svg>
);

export const CheckIcon = (p: IconProps) => (
  <svg width="13" height="13" {...base} strokeWidth={2.6} {...p}>
    <path d="m4 12 5 5 11-11" />
  </svg>
);

export const StarIcon = ({
  filled = true,
  ...p
}: IconProps & { filled?: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinejoin="round"
    {...p}
  >
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" />
  </svg>
);

export const DiamondIcon = ({
  filled = true,
  ...p
}: IconProps & { filled?: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinejoin="round"
    {...p}
  >
    <path d="M12 3 21 12 12 21 3 12z" />
  </svg>
);

export const HeartFlourish = (p: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 20S4 14.5 4 9.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 8 2.2C20 14.5 12 20 12 20Z" />
  </svg>
);
