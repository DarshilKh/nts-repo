import Heading from "@/components/ui/Heading";
import Text from "@/components/ui/Text";
import Button from "@/components/ui/Button";
import HeroCarousel from "@/components/ui/HeroCarousel";
import Frame from "@/components/ui/Frame";
import { homeAssets } from "@/lib/assets";

/**
 * §4.1 — measured left inset for hero text is x=122 (NOT the 60px stat-row
 * value, NOT a shared container). Source has the hero image flush to the
 * frame's right edge (paddingRight:0) — but with the media slot now a
 * carousel (rounded corners + drop shadow, see HeroCarousel), a fully
 * flush right edge reads as cramped/unbalanced rather than intentional
 * bleed. Right padding is set close to the left inset (110px vs 122px)
 * for a visually balanced margin, with a wider gap between the text and
 * carousel columns than the source's tighter spacing.
 *
 * Top padding: measured gap from the header logo's bottom edge (y≈125) to
 * this heading's top (y=352) is ~227px — noticeably MORE than the ~150px
 * gap measured on Solution/Contact/About's hero-equivalent sections (their
 * headings sit at y≈268–282). An earlier pass had this backwards (Home
 * used LESS top padding than the other three); corrected here so Home's
 * gap is the largest, matching the source. The min-[1440px]: variant
 * applies the exact measured relationship only at the PDF's native frame
 * width; below that a smaller inferred padding is used (no source data
 * exists for narrower viewports — §3.8).
 */
export default function Hero() {
  return (
    <Frame>
      <section className="pt-10 md:pt-14 pb-16 md:pb-20 px-6 min-[1440px]:pl-[122px] min-[1440px]:pr-[110px] min-[1440px]:pt-[150px]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_560px] gap-10 md:gap-20 items-center">
          <div>
            <Heading as="h1" size="displayLg">
              Smart Fleet
              <br />
              Monitoring Platform
            </Heading>
            <Text
              as="p"
              tone="primary"
              className="mt-6"
              style={{ fontSize: "var(--fs-subhead)", fontWeight: 700, lineHeight: "var(--lh-body)" }}
            >
              Monitor, Track &amp; Manage Your Vehicles in Real Time
            </Text>
            <Text size="bodyLg" tone="muted" className="mt-5 max-w-md">
              Gain complete visibility into your fleet with live tracking,
              route monitoring, driver insights, and performance analytics.
            </Text>
            <Button href="/contact" className="mt-9">
              Get Started
            </Button>
          </div>

          <HeroCarousel slides={[...homeAssets.heroCarousel]} />
        </div>
      </section>
    </Frame>
  );
}
