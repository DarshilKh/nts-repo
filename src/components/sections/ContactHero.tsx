import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import AccentBar from "@/components/ui/AccentBar";
import Frame from "@/components/ui/Frame";

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
        @media (min-width: 1440px) {
          .contact-hero-h1 { padding-left: 281px; }
          .contact-hero-h1 > * { max-width: 560px; }
          .contact-hero-body { padding-left: 685px; }
        }
      `}</style>
      <section className="relative pt-14 md:pt-20 pb-16 px-6 min-[1440px]:px-0">
        <div className="contact-hero-h1">
          <Heading as="h1" size="displayMd">
            Let&apos;s Discuss the Right Solution
          </Heading>
        </div>
        <AccentBar
          className="hidden min-[1440px]:block absolute"
          style={{ left: 815, top: 0, height: 172 }}
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
