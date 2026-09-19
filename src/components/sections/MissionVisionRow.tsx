import { ReactNode } from "react";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import Card from "@/components/ui/Card";
import Frame from "@/components/ui/Frame";

/**
 * Shared two-column row used by all three About-page cards — Mission,
 * Vision and Why Choose Us. One media panel (fixed width) and one text
 * panel (the remainder), side by side with a visible ~20px shadow gutter
 * between them; which side the media panel sits on is the `panelSide`
 * prop, everything else (padding, vertical centering, max text width,
 * card shadow/radius, the small red corner mark) is identical across all
 * three so they read as one design system instead of three independently
 * tuned layouts.
 *
 * The text panel's padding is a single symmetric `textPaddingX` (same
 * number left and right, same number on every row) rather than the
 * earlier per-row "absolute x-position measured off the PDF" scheme —
 * that produced a different effective inset on every row depending on
 * which side the media panel was on, which is exactly the inconsistency
 * this component now exists to prevent. `textMaxWidthPx` caps the text
 * block itself so it reads as a compact block rather than stretching
 * across the whole column.
 */
const PANEL_GAP = 20;
const DEFAULT_MEDIA_PANEL_WIDTH = 386;
const DEFAULT_TEXT_PADDING_X = 96;
const DEFAULT_TEXT_MAX_WIDTH = 420;

export default function MissionVisionRow({
  styleId,
  heading,
  body,
  children,
  media,
  mediaClassName = "w-[180px]",
  panelSide,
  mediaPanelWidthPx = DEFAULT_MEDIA_PANEL_WIDTH,
  textPaddingX = DEFAULT_TEXT_PADDING_X,
  textMaxWidthPx = DEFAULT_TEXT_MAX_WIDTH,
}: {
  styleId: string;
  heading: string;
  /** Plain-paragraph body. Omit and pass `children` for richer content
   *  (e.g. Why Choose Us's bulleted list) — both render at the same
   *  position, padding and max-width. */
  body?: string;
  children?: ReactNode;
  media: { src: string; alt: string; width: number; height: number };
  /** Tailwind width class for the media itself inside its panel — small
   *  and centered for an icon (the default), `w-full` for a photo/
   *  illustration meant to fill the panel (Why Choose Us). */
  mediaClassName?: string;
  panelSide: "left" | "right";
  mediaPanelWidthPx?: number;
  textPaddingX?: number;
  textMaxWidthPx?: number;
}) {
  const textClass = `mv-text-${styleId}`;
  const wrapClass = `mv-wrap-${styleId}`;

  const gridCols =
    panelSide === "left" ? `${mediaPanelWidthPx}px 1fr` : `1fr ${mediaPanelWidthPx}px`;

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .${wrapClass} { display: grid; grid-template-columns: ${gridCols}; gap: ${PANEL_GAP}px; }
          .${textClass} { padding-left: ${textPaddingX}px; padding-right: ${textPaddingX}px; max-width: ${textMaxWidthPx + textPaddingX * 2}px; }
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
            src={media.src}
            alt={media.alt}
            measuredWidth={media.width}
            measuredHeight={media.height}
            sizes="220px"
            className={mediaClassName}
          />
        </Card>
        <Card
          className={`relative flex flex-col justify-center px-6 py-12 md:px-14 min-[1440px]:px-0! min-h-[280px] ${
            panelSide === "right" ? "md:order-1" : "md:order-2"
          }`}
        >
          <div
            className="absolute -top-3 left-6 min-[1440px]:left-0 hidden md:block"
            style={{ width: 25, height: 25, background: "var(--brand-red)" }}
            aria-hidden="true"
          />
          <div className={textClass}>
            <Heading as="h2" size="h2Alt">
              {heading}
            </Heading>
            {children ?? (
              <Text size="body" tone="muted" className="mt-6">
                {body}
              </Text>
            )}
          </div>
        </Card>
      </section>
    </Frame>
  );
}
