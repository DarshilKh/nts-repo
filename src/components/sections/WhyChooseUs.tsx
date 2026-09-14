import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import Card from "@/components/ui/Card";
import Frame from "@/components/ui/Frame";
import { aboutAssets } from "@/lib/assets";

const items = [
  { title: "Customized Solutions", body: "Tailored systems designed around your operational needs." },
  { title: "Advanced Technology", body: "Modern RFID and automation solutions built for accuracy and reliability." },
  { title: "Expert Support", body: "Dedicated assistance from consultation to deployment and maintenance." },
  { title: "Scalable Systems", body: "Solutions that grow with your business." },
];

const IMAGE_PANEL_WIDTH = 517;
const PANEL_GAP = 20;
// Heading/body land at absolute x=646 (originally measured at x=653, nudged
// in to 606 to sit closer to the image card, then back out to 646 — the
// client felt the text read as too close to the image panel's shadow
// seam). The text card's own left edge is at 517+20=537, so internal
// padding is reduced accordingly.
const TEXT_INNER_PADDING = 646 - (IMAGE_PANEL_WIDTH + PANEL_GAP);

/**
 * §4.5 — CORRECTED against the PDF's vector/raster layer, same finding as
 * MissionVisionRow: this is two separate elevated Card panels (image card
 * + text card) with a visible ~20px shadow gutter between them, not a
 * single borderless/single-shadow row. Image panel is 517px wide (matches
 * the measured raster asset width). Also carries the page's third small
 * 25×25px red square, at the text card's top-left corner (same
 * corner-mark treatment as Mission/Vision).
 */
export default function WhyChooseUs() {
  return (
    <Frame>
      <style>{`
        @media (min-width: 1440px) {
          .whyus-wrap { display: grid; grid-template-columns: ${IMAGE_PANEL_WIDTH}px 1fr; gap: ${PANEL_GAP}px; }
          .whyus-text { padding-left: ${TEXT_INNER_PADDING}px; }
          .whyus-mark { display: block; }
        }
      `}</style>
      <section className="whyus-wrap relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch px-6 py-6 min-[1440px]:px-0 min-[1440px]:py-6">
        <Card className="flex items-center justify-center p-6 min-h-[280px]">
          <MediaSlot
            src={aboutAssets.whyUs.src}
            alt={aboutAssets.whyUs.alt}
            measuredWidth={aboutAssets.whyUs.width}
            measuredHeight={aboutAssets.whyUs.height}
            className="w-full"
          />
        </Card>
        {/* `!` on the 1440px override: see MissionVisionRow.tsx for why a
            plain `min-[1440px]:px-0` silently loses to `md:px-14` here in
            Tailwind v4 (its arbitrary-breakpoint block is emitted before
            the named `md` block, so at ≥1440px md:px-14 was winning by
            source order and adding an uncancelled 56px). */}
        <Card className="relative flex flex-col justify-center px-6 py-14 md:px-14 min-[1440px]:px-0! min-h-[280px]">
          <div
            className="whyus-mark hidden absolute -top-3 left-0"
            style={{ width: 25, height: 25, background: "var(--brand-red)" }}
            aria-hidden="true"
          />
          <div className="whyus-text min-[1440px]:pr-16">
            <Heading as="h2" size="h2Alt">
              Why Choose Us
            </Heading>
            <ul className="mt-8 flex flex-col gap-6 max-w-md">
              {items.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0" style={{ background: "var(--brand-red)" }} />
                  <div>
                    <Text size="body" as="p" style={{ fontSize: "var(--fs-item-heading)", fontWeight: 700 }}>
                      {item.title}
                    </Text>
                    <Text size="body" tone="muted" className="mt-1">
                      {item.body}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </section>
    </Frame>
  );
}
