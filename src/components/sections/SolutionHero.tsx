import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import AccentBar from "@/components/ui/AccentBar";
import Frame from "@/components/ui/Frame";

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
        @media (min-width: 1440px) {
          .sol-hero-h1 { padding-left: 182px; }
          .sol-hero-h1 > * { max-width: 620px; }
          .sol-hero-body { padding-left: 653px; }
        }
      `}</style>
      <section className="relative pt-14 md:pt-20 pb-16 px-6 min-[1440px]:px-0">
        <div className="sol-hero-h1">
          <Heading as="h1" size="displayMd">
            Intelligent RFID &amp; Automation Solution
          </Heading>
        </div>
        <AccentBar className="hidden min-[1440px]:block absolute" style={{ left: 829, top: 0 }} />
        <div className="sol-hero-body mt-8 min-[1440px]:mt-8">
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
