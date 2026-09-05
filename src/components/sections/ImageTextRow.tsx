import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import Frame from "@/components/ui/Frame";
import { card } from "@/lib/tokens";

/**
 * §4.1 — these two rows are measured independently, not mirrored copies of
 * one shared template:
 *   "Designed for Diverse Operations": image flush-left, 517px wide
 *     (bbox x:0–517); text column starts x=599 → 82px gap past the image
 *     (textPaddingLeftPx = 599 - 517 = 82, relative to its own grid track).
 *   "Delivering Results Across Industries": text starts x=154 (absolute,
 *     since text is the first track); image flush-right, 517px wide
 *     (bbox x:924–1441).
 * The exact px numbers are passed in per call, so the two rows can diverge
 * further without fighting a shared abstraction.
 *
 * CORRECTED against the client's reference render (Website PNGs/Home
 * Page.png): each heading has its own short horizontal red underline
 * directly beneath it — this was missing in the PDF-only build. The
 * earlier per-row AccentBar (25×162 vertical bar) was a misreading of the
 * source; that bar exists ONLY once, at the Proven-Excellence section
 * transition (see ProvenExcellence.tsx), not on these two rows.
 */
export default function ImageTextRow({
  heading,
  body,
  image,
  imageSide,
  imageWidthPx,
  textPaddingLeftPx,
  styleId,
}: {
  heading: string;
  body: string;
  image: { src: string; alt: string; width: number; height: number };
  imageSide: "left" | "right";
  imageWidthPx: number;
  textPaddingLeftPx: number;
  styleId: string;
}) {
  const imgClass = `row-img-${styleId}`;
  const textClass = `row-text-${styleId}`;
  const wrapClass = `row-wrap-${styleId}`;

  const gridCols =
    imageSide === "left" ? `${imageWidthPx}px 1fr` : `1fr ${imageWidthPx}px`;

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .${wrapClass} { display: grid; grid-template-columns: ${gridCols}; }
          .${textClass} { padding-left: ${textPaddingLeftPx}px; padding-right: 0; }
        }
      `}</style>
      <section
        className={`${wrapClass} grid grid-cols-1 md:grid-cols-2 items-stretch my-1`}
        style={{ boxShadow: card.shadow, background: "var(--bg)" }}
      >
        <div className={`${imgClass} ${imageSide === "right" ? "md:order-2" : "md:order-1"}`}>
          <MediaSlot
            src={image.src}
            alt={image.alt}
            measuredWidth={image.width}
            measuredHeight={image.height}
            className="h-[345px]"
          />
        </div>
        <div
          className={`${imageSide === "right" ? "md:order-1" : "md:order-2"} relative flex flex-col justify-center px-6 py-14 md:px-16 min-[1440px]:px-0`}
        >
          <div className={textClass}>
            <Heading as="h2" size="h2" className="max-w-md">
              {heading}
            </Heading>
            <div className="mt-3 h-[3px] w-24" style={{ background: "var(--brand-red)" }} />
            <Text size="bodySm" tone="muted" className="mt-6 max-w-sm">
              {body}
            </Text>
          </div>
        </div>
      </section>
    </Frame>
  );
}
