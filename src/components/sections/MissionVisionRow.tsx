import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import Card from "@/components/ui/Card";
import Frame from "@/components/ui/Frame";

/**
 * §4.5 — CORRECTED against the PDF's vector/raster layer: this is two
 * separate elevated Card panels (icon card + text card) sitting side by
 * side with a visible ~20px gutter between them, not one single
 * full-width shadowed box. The icon panel is a narrow fixed-width column
 * (~386px at the 1440 frame, NOT half-width) with the text panel taking
 * the remainder — confirmed by pixel-scanning the source render for the
 * shadow seam between the two panels (found at x≈382–400 of 1440, not
 * x≈720, and not flush against the text's own x=527/372 inset as the
 * prior build assumed). Both panels share the page background (--bg) and
 * get their elevation only from the standard card drop-shadow — no fill
 * change, no border.
 *
 * textInsetPx remains the ABSOLUTE x-coordinate (from the 1440 frame's
 * left edge) where the heading/body text itself starts — the text card's
 * own internal padding is derived from it so the heading still lands at
 * that exact x regardless of which side the icon card is on.
 *
 * Mission (icon left, text right) and Vision (icon right, text left)
 * mirror this shape with independently set text insets. Originally measured
 * from the source PDF at 527/372; nudged in to 480/140 per client feedback —
 * the 372 inset left Vision's heading floating in the middle of an
 * otherwise-empty card since, unlike Mission, its text column starts flush
 * at the frame's left edge (x=0) rather than after the icon panel.
 *
 * A small 25×25 red square sits at the TOP-LEFT corner of the TEXT card
 * specifically (floating just above/left of its top edge) — not near the
 * icon, and not a full-height accent bar.
 */
const ICON_PANEL_WIDTH = 386;
const PANEL_GAP = 20;

export default function MissionVisionRow({
  styleId,
  heading,
  body,
  icon,
  panelSide,
  textInsetPx,
}: {
  styleId: string;
  heading: string;
  body: string;
  icon: { src: string; alt: string; width: number; height: number };
  panelSide: "left" | "right";
  textInsetPx: number;
}) {
  const textClass = `mv-text-${styleId}`;
  const wrapClass = `mv-wrap-${styleId}`;

  const gridCols =
    panelSide === "left" ? `${ICON_PANEL_WIDTH}px 1fr` : `1fr ${ICON_PANEL_WIDTH}px`;

  // Text card's own left edge, at the 1440 frame: 0 when it's the first
  // column (panelSide="right"), or ICON_PANEL_WIDTH + gap when it follows
  // the icon column (panelSide="left"). Internal padding makes up the
  // remaining distance to the measured absolute heading position.
  const textCardLeftEdge = panelSide === "left" ? ICON_PANEL_WIDTH + PANEL_GAP : 0;
  const textInnerPadding = Math.max(0, textInsetPx - textCardLeftEdge);

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .${wrapClass} { display: grid; grid-template-columns: ${gridCols}; gap: ${PANEL_GAP}px; }
          .${textClass} { padding-left: ${textInnerPadding}px; }
        }
      `}</style>
      <section
        className={`${wrapClass} grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch px-6 py-6 min-[1440px]:px-0 min-[1440px]:py-6`}
      >
        <Card
          className={`flex items-center justify-center p-10 min-h-[280px] ${
            panelSide === "right" ? "md:order-2" : "md:order-1"
          }`}
        >
          <MediaSlot
            src={icon.src}
            alt={icon.alt}
            measuredWidth={icon.width}
            measuredHeight={icon.height}
            sizes="220px"
            className="w-[180px]"
          />
        </Card>
        <Card
          className={`relative flex flex-col justify-center px-6 py-12 md:px-14 min-[1440px]:px-0 min-h-[280px] ${
            panelSide === "right" ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            className="absolute -top-3 left-6 min-[1440px]:left-0 hidden md:block"
            style={{ width: 25, height: 25, background: "var(--brand-red)" }}
            aria-hidden="true"
          />
          <div className={`${textClass} min-[1440px]:pr-16`}>
            <Heading as="h2" size="h2Alt">
              {heading}
            </Heading>
            <Text size="body" tone="muted" className="mt-6 max-w-md">
              {body}
            </Text>
          </div>
        </Card>
      </section>
    </Frame>
  );
}
