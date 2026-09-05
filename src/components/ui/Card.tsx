import { ReactNode, CSSProperties } from "react";
import { card } from "@/lib/tokens";

/**
 * §0.5 / §3.2 / §3.3 — cards are filled with the SAME off-white as the page
 * background (--bg), not white, and have 0px radius. Elevation comes only
 * from an asymmetric black-29%-opacity shadow (heavier bottom/right, no
 * visible top/left shadow). Do not add a border or bump the fill to white —
 * both would contradict the measured source.
 */
export default function Card({
  children,
  className = "",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={className}
      style={{
        background: "var(--bg)",
        borderRadius: card.radius,
        boxShadow: card.shadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
