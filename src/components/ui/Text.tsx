import { ReactNode, ElementType, CSSProperties } from "react";
import { fontSize } from "@/lib/tokens";

type SizeKey = "bodyLg" | "body" | "bodySm" | "bodyXs" | "nav" | "footerLink";

/**
 * Body-copy primitive. `tone` maps directly to the measured text colors in
 * §1.5 (primary / muted / label / nav) instead of an arbitrary gray scale.
 */
export default function Text({
  as: Tag = "p",
  size = "body",
  tone = "primary",
  weight = 400,
  className = "",
  style,
  children,
}: {
  as?: ElementType;
  size?: SizeKey;
  tone?: "primary" | "muted" | "label" | "nav" | "white" | "brand";
  weight?: 400 | 600 | 700;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const toneColor: Record<string, string> = {
    primary: "var(--text-primary)",
    muted: "var(--text-muted)",
    label: "var(--text-label)",
    nav: "var(--nav-text)",
    white: "var(--white)",
    brand: "var(--brand-red)",
  };

  return (
    <Tag
      className={className}
      style={{
        fontSize: `${fontSize[size]}px`,
        fontWeight: weight,
        color: toneColor[tone],
        lineHeight: "var(--lh-body)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
