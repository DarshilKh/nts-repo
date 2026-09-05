import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import CornerMark from "@/components/ui/CornerMark";
import Frame from "@/components/ui/Frame";
import { card } from "@/lib/tokens";

/**
 * §4.2 — Solution page rows. Each row's text inset and image width are
 * passed in explicitly per call (see solution/page.tsx), not derived from
 * a shared formula — row 4 ("Fleet Monitoring") measures at x=54 while
 * the other left-text rows measure at x=85, and that difference is
 * reproduced rather than rounded away.
 */
export default function SolutionRow({
  styleId,
  title,
  body,
  learnMore,
  learnMoreHref,
  image,
  imageSide,
  imageWidthPx,
  textInsetPx,
  cornerMarkSide,
  priority,
}: {
  styleId: string;
  title: string;
  body?: string;
  learnMore?: boolean;
  /** Detail page for this solution. Undefined for the two rows that have no
   *  page on the source site — those render without a link rather than
   *  pointing at a stub. (The old value was a hardcoded "/solution", i.e. a
   *  link to the page the row is already on.) */
  learnMoreHref?: string;
  image: { src: string; alt: string; width: number; height: number };
  imageSide: "left" | "right";
  imageWidthPx: number;
  textInsetPx: number;
  cornerMarkSide?: "left" | "right";
  priority?: boolean;
}) {
  const wrapClass = `sol-wrap-${styleId}`;
  const textClass = `sol-text-${styleId}`;
  const gridCols =
    imageSide === "left" ? `${imageWidthPx}px 1fr` : `1fr ${imageWidthPx}px`;
  // For an image-left row, text is column 2 so its inset is relative to
  // the image column's right edge; for image-right, text is column 1 so
  // the inset is absolute from the frame edge.
  const textPad = imageSide === "left" ? textInsetPx - imageWidthPx : textInsetPx;

  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .${wrapClass} { display: grid; grid-template-columns: ${gridCols}; }
          .${textClass} { padding-left: ${textPad}px; }
        }
      `}</style>
      <section
        id={styleId}
        className={`${wrapClass} relative grid grid-cols-1 md:grid-cols-2 items-stretch my-1 scroll-mt-28`}
        style={{ boxShadow: card.shadow, background: "var(--bg)" }}
      >
        <div className={imageSide === "right" ? "md:order-2" : "md:order-1"}>
          <MediaSlot
            src={image.src}
            alt={image.alt}
            measuredWidth={image.width}
            measuredHeight={image.height}
            className="h-[380px]"
            priority={priority}
          />
        </div>
        <div
          className={`${imageSide === "right" ? "md:order-1" : "md:order-2"} flex flex-col justify-center px-6 py-10 md:px-14 min-[1440px]:px-0`}
        >
          <div className={textClass}>
            <Heading as="h2" size="h3Lg" className="whitespace-pre-line">
              {title}
            </Heading>
            {body && (
              <Text size="bodyLg" tone="muted" className="mt-4 max-w-md">
                {body}
              </Text>
            )}
            {learnMore && learnMoreHref && (
              <Link
                href={learnMoreHref}
                className="inline-block mt-4"
                style={{ color: "var(--brand-red)", fontSize: "var(--fs-body-lg)", fontWeight: 600 }}
              >
                Learn More
              </Link>
            )}
          </div>
        </div>
        {cornerMarkSide && <CornerMark side={cornerMarkSide} />}
      </section>
    </Frame>
  );
}
