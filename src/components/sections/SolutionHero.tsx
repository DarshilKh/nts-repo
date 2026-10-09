import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import AccentBar from "@/components/ui/AccentBar";
import Frame from "@/components/ui/Frame";
import { fx } from "@/lib/tokens";

/**
 * §4.2 — H1 measured left edge ~182px (two-line heading, slight per-line
 * offset in the source — reproduced as a single left-aligned block at the
 * more consistent 182 value rather than forcing a false center-alignment).
 * Body + "Contact us" sit in a separate column starting x=653, vertically
 * below the heading rather than beside it (their y-ranges don't overlap
 * with the heading's in the source). AccentBar measured at x=829, right
 * beside the heading.
 */
export default function SolutionHero() {
  return (
    <Frame>
      <style>{`
        @media (min-width: 1024px) {
          .sol-hero-h1 { padding-left: ${fx(182)}; }
          .sol-hero-h1 > * { max-width: ${fx(620)}; }
          /* Same proportional curve as the layout around it — see ContactHero. */
          .sol-hero-h1 h1 { font-size: max(32px, ${fx(60)}) !important; }
          .sol-hero-body { padding-left: ${fx(653)}; }
        }
      `}</style>
      <section className="relative pt-14 md:pt-20 pb-16 page-x lg:px-0">
        <div className="sol-hero-h1">
          <Heading as="h1" size="displayMd">
            Intelligent RFID &amp; Automation Solution
          </Heading>
        </div>
        <AccentBar className="hidden lg:block absolute" style={{ left: fx(829), top: 0 }} />
        <div className="sol-hero-body mt-8">
          <Text size="body" tone="muted" className="max-w-md">
            End-to-end software and hardware solutions for tolling, parking,
            logistics, mining, access control, and fleet management.
          </Text>
          <Link
            href="/contact"
            className="inline-block mt-4"
            style={{ color: "var(--brand-red)", fontSize: "var(--fs-body)", fontWeight: 600 }}
          >
            Contact us
          </Link>
        </div>
      </section>
    </Frame>
  );
}
