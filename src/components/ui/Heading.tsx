import { ReactNode, ElementType } from "react";
import { fontSize, headingFontSize } from "@/lib/tokens";

type SizeKey = keyof typeof fontSize;

/**
 * Typography primitive for all heading/display roles measured in
 * DESIGN_SYSTEM.md §1.3. `size` selects the exact px value by role name
 * (not a generic t-shirt scale) so usage stays traceable back to the audit
 * table. Weight defaults to 800 (ExtraBold) per §1.2 — pass `weight` to
 * override for the few roles measured lighter.
 */
export default function Heading({
  as: Tag = "h2",
  size,
  weight = 800,
  color = "var(--text-primary)",
  className = "",
  children,
}: {
  as?: ElementType;
  size: SizeKey;
  weight?: 400 | 600 | 700 | 800;
  color?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={className}
      style={{
        fontSize: headingFontSize(size),
        fontWeight: weight,
        color,
        lineHeight: "var(--lh-display)",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </Tag>
  );
}
