import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import AccentBar from "@/components/ui/AccentBar";
import Frame from "@/components/ui/Frame";
import { fx } from "@/lib/tokens";

/**
 * §4.4 — H1 "Let's Discuss the Right Solution" (60px, left-aligned at
 * x=281 — same two-line offset ambiguity as Solution's H1; using the
 * first line's x as the block inset per the same precedent). Body block
 * at x=685: 20px for the wrapped sentence, but the closing line ("Our
 * team is ready to help.") measures 21px and brand red — reproduced as a
 * distinct, slightly larger, colored final line rather than folded into
 * the paragraph. AccentBar here measures 25×172 (not the 162 used
 * elsewhere) — page-specific, reproduced as measured.
 */
export default function ContactHero() {
  return (
    <Frame>
      <style>{`
        @media (min-width: 1024px) {
          .contact-hero-h1 { padding-left: ${fx(281)}; }
          .contact-hero-h1 > * { max-width: ${fx(560)}; }
          /* The H1 must scale on the SAME proportional curve as the layout
             around it. The default fluid heading size shrinks more slowly than
             the bar/column positions (which are in fx units), so on a ~1275px
             screen the text grew wide enough to run underneath the red
             accent bar. */
          .contact-hero-h1 h1 { font-size: max(32px, ${fx(60)}) !important; }
          .contact-hero-body { padding-left: ${fx(685)}; }
        }
      `}</style>
      <section className="relative pt-14 md:pt-20 pb-16 page-x lg:px-0">
        <div className="contact-hero-h1">
          <Heading as="h1" size="displayMd">
            Let&apos;s Discuss the Right Solution
          </Heading>
        </div>
        <AccentBar
          className="hidden lg:block absolute"
          style={{ left: fx(815), top: 0, height: 172 }}
        />
        <div className="contact-hero-body mt-8">
          <Text size="body" tone="muted" className="max-w-md">
            Whether you&apos;re planning a new toll plaza, parking
            management system, fleet tracking solution, or upgrading
            existing infrastructure
          </Text>
          <Text
            size="bodyLg"
            className="mt-3"
            style={{ color: "var(--brand-red)", fontWeight: 600 }}
          >
            Our team is ready to help.
          </Text>
        </div>
      </section>
    </Frame>
  );
}
