import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import MediaSlot from "@/components/ui/MediaSlot";
import AccentBar from "@/components/ui/AccentBar";
import Frame from "@/components/ui/Frame";
import { homeAssets } from "@/lib/assets";

const projects = [
  {
    key: "p1",
    title: "Visitors Tracking\nSystem",
    desc: "RFID-powered visitor tracking with real-time movement monitoring, restricted area alerts, IP camera integration, and centralized reporting for enhanced campus security.",
    image: homeAssets.project1,
    imageWidthPx: 841, // measured bbox width, x:599–1440
  },
  {
    key: "p2",
    title: "Inter State Toll\nCollection",
    desc: "Integrating ANPR, RFID, NIC, and FASTag to streamline vehicle verification, payments, and transaction management across state borders.",
    // Swapped with p3's photo: the NH44/National Highways signage in
    // homeAssets.project2 fits this row's inter-state framing less well than
    // project3's large-plaza aerial shot.
    image: homeAssets.project3,
    imageWidthPx: 843, // measured bbox width, x:598–1441
  },
  {
    key: "p3",
    title: "Toll Management\nSystem",
    desc: "Vehicle access control using ANPR cameras for automated gate operations, centralized monitoring, real-time tracking, and detailed reporting across multiple locations.",
    // Swapped with p2's photo: project2's shot shows a visible "Automatic
    // Boom Barrier" gate and ANPR/FASTag lanes, which matches "automated
    // gate operations" far better than the previous generic plaza photo.
    image: homeAssets.project2,
    imageWidthPx: 841, // measured bbox width, x:599–1440
  },
];

/**
 * §4.1 — Project rows: text always left at x=89, image always flush-right at
 * its own measured width (841 / 843 / 841 — not identical, reproduced per-row
 * rather than rounded to one shared value).
 *
 * HEADING INSET: the PDF measured this heading block at x=214, which is a
 * deeper inset than anything else on the page — including the three project
 * rows directly beneath it, which sit at x=89. On screen that read as the
 * section being pushed in and out of alignment with its own content. The
 * heading now shares the rows' x=89 inset so the whole section has one left
 * edge. (The measurement was faithful to the source; the source was wrong.)
 *
 * TOP SPACING: pt-12 left the heading crowded against the hero band above it,
 * which on a light-on-light page made the two sections read as one. Raised to
 * pt-24 / md:pt-32, and the bottom padding reduced to compensate — the
 * heading should sit closer to the projects it introduces than to the section
 * before it.
 *
 * Confirmed against the client's reference render: the page's one true
 * AccentBar instance (25×162 vertical red bar) sits at this section's
 * top-left corner in the source PDF, at the frame's literal left edge —
 * ~190px away from the heading text with nothing visually tying the two
 * together. On screen that reads as a stray red mark rather than an
 * accent, so it's pulled in to sit directly beside the heading instead
 * (flex row, bar + heading block, small gap) — the same "accent mark
 * touching its text" treatment used everywhere else on the site (Mission/
 * Vision/Why Choose Us's small red squares).
 */
export default function ProvenExcellence() {
  return (
    <Frame>
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-6 min-[1440px]:pl-[89px] min-[1440px]:pr-[60px]">
        {/* The bar is pulled into the left gutter (negative margin) rather than
            sitting in flow, so the HEADING TEXT — not the bar — lands on the
            x=89 line shared with the project rows below. */}
        <div className="flex items-start gap-6 md:gap-8 min-[1440px]:gap-0">
          <AccentBar className="hidden min-[1440px]:block shrink-0 min-[1440px]:-ml-[57px] min-[1440px]:mr-[32px]" />
          <div className="max-w-2xl">
            <Heading as="h2" size="h2Xl">
              Proven Excellence Backed by Experience and Results
            </Heading>
            <Heading as="p" size="h3Lg" weight={400} color="var(--text-muted)" className="mt-6">
              Some of our existing project.
            </Heading>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-14 md:gap-16">
        {projects.map((p) => {
          const wrapClass = `proj-wrap-${p.key}`;
          const gridCols = `1fr ${p.imageWidthPx}px`;
          return (
            <div key={p.key}>
              <style>{`
                @media (min-width: 1440px) {
                  .${wrapClass} { display: grid; grid-template-columns: ${gridCols}; align-items: center; }
                }
              `}</style>
              <div className={`${wrapClass} grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center px-6 min-[1440px]:px-0`}>
                <div className="min-[1440px]:pl-[89px]">
                  <Heading as="h3" size="h2" className="whitespace-pre-line">
                    {p.title}
                  </Heading>
                  <Text size="bodyXs" tone="muted" className="mt-5 max-w-sm">
                    {p.desc}
                  </Text>
                </div>
                <MediaSlot
                  src={p.image.src}
                  alt={p.image.alt}
                  measuredWidth={p.image.width}
                  measuredHeight={p.image.height}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
