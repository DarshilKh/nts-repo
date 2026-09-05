/**
 * §4.2 (Solution page) — 54×54px solid red squares at the outer frame
 * edge, opposite a row's photo. §4.5 (About page) uses a SMALLER 25×25
 * variant near the Mission/Vision/Why-Choose-Us headings — a genuinely
 * different measured size, not the same mark reused, so `size` is
 * explicit per call rather than defaulted. Distinct from the 25×162(–193
 * on About) AccentBar and the CTA "ribbon fold" — a third decorative unit.
 */
export default function CornerMark({
  side,
  size = 54,
  className = "",
}: {
  side: "left" | "right";
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`hidden min-[1440px]:block absolute ${side === "left" ? "left-0" : "right-0"} ${className}`}
      style={{ width: size, height: size, background: "var(--brand-red)" }}
      aria-hidden="true"
    />
  );
}
