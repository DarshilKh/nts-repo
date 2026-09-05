import { accentBar } from "@/lib/tokens";
import { CSSProperties } from "react";

/**
 * §3.4 — this is NOT a heading underline. Measured as a standalone
 * 25×162px solid red vertical rectangle placed at section-transition
 * corners. Do not center it under heading text or shrink it to rule
 * thickness — both were the original (wrong) assumption; see
 * DESIGN_SYSTEM.md §0.3.
 */
export default function AccentBar({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        width: accentBar.width,
        height: accentBar.height,
        background: "var(--brand-red)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
