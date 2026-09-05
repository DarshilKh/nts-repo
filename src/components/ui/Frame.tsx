import { ReactNode, CSSProperties } from "react";

/**
 * Unpadded outer frame matching the PDF's 1440px Figma canvas
 * (DESIGN_SYSTEM.md §3.1). Deliberately carries NO padding of its own —
 * per your correction, sections are not forced onto one shared inset.
 * Each section sets its own measured left/right padding (see the §4
 * per-page audit tables) via the `deskPad*` helpers below, which only
 * apply at the ≥1440px reference width where the measurement is exact.
 * Below that, a smaller inferred padding is used since no source data
 * exists at other viewport sizes (§3.8).
 */
export default function Frame({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ maxWidth: 1440, marginInline: "auto", position: "relative", ...style }}
    >
      {children}
    </div>
  );
}
