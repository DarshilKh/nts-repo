import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import AccentBar from "@/components/ui/AccentBar";
import MediaSlot from "@/components/ui/MediaSlot";
import Frame from "@/components/ui/Frame";
import { aboutAssets } from "@/lib/assets";
import { fx } from "@/lib/tokens";

/**
 * §4.5 — illustration flush-left within a ~534px-wide zone (x:122–656),
 * text column starts x=704 (48px gap past the illustration). AccentBar
 * here measures 25×193 tall (x:631–657, y:281–474) — a fourth distinct
 * height, different again from Home/Solution (162) and Contact (172).
 * Previously missing from this page entirely; added here.
 */
export default function AboutIntro() {
  return (
    <Frame>
      <style>{`
        @media (min-width: 1024px) {
          .about-intro-grid { grid-template-columns: ${fx(534)} minmax(0, 1fr); }
          .about-intro-text { padding-left: ${fx(48)}; }
        }
      `}</style>
      <section className="about-intro-section relative pt-14 md:pt-20 pb-16 page-x">
        <div className="about-intro-grid grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-0 items-center">
          <div className="about-intro-img">
            <MediaSlot
              src={aboutAssets.intro.src}
              alt={aboutAssets.intro.alt}
              measuredWidth={aboutAssets.intro.width}
              measuredHeight={aboutAssets.intro.height}
              priority
            />
          </div>
          <div className="about-intro-text min-w-0">
            <Heading as="h1" size="displayMd">
              About Us
            </Heading>
            <Text size="body" tone="muted" className="mt-6 max-w-md">
              Network Toll Solution delivers RFID and automation solutions
              for tolling, parking, vehicle tracking, warehouses, and
              access control helping businesses improve efficietncy,
              security, and operations.
            </Text>
          </div>
        </div>
        <AccentBar
          className="hidden lg:block absolute"
          // Sits on the illustration's top-right corner: page inset + the
          // (proportionally scaled) 534px image column, less the bar's own 25px.
          style={{ left: `calc(var(--page-x) + ${fx(534)} - 25px)`, top: 0, height: 193 }}
        />
      </section>
    </Frame>
  );
}
