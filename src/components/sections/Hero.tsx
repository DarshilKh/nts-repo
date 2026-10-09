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
 * Top padding: the source PDF measured a ~227px gap from the header logo's
 * bottom edge to this heading's top, well past the ~150px gap on Solution/
 * Contact/About's hero-equivalent sections — reproducing that (at pt-150)
 * read as too much dead air above the fold on the live site, so this now
 * sits closer to those other pages (pt-90) rather than exceeding them.
 * Below 1440px a smaller inferred padding is used (no source data exists
 * for narrower viewports — §3.8).
 */
export default function Hero() {
  return (
    <Frame>
      <section className="pt-10 md:pt-14 pb-16 md:pb-20 page-x lg:pt-[clamp(56px,6.25vw,90px)]">
        {/* The carousel column is a fixed 560px at the measured 1440px frame,
            but pinning that same 560px starting at the `md:` breakpoint
            (768px) leaves the text column too little room — its longest
            word ("Monitoring", at whatever size the viewport's fluid
            heading scale lands on) doesn't fit the ~80-160px left over,
            forcing the grid wider than the viewport and the whole page into
            horizontal scroll. min(560px, 42vw) shrinks the carousel on
            narrower `md:` viewports and only reaches the full 560px once
            42vw would exceed it (~1333px), just under the 1440px frame
            where it's meant to be exactly 560. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_min(500px,40vw)] gap-10 lg:gap-16 items-center">
          {/* Container-query sizing: the heading is sized from the width of its
              own column (cqw), not the viewport, so "Monitoring Platform"
              always fits on one line — "Smart Fleet / Monitoring Platform" —
              at every screen size. Viewport-based sizing let that line wrap
              to three lines on wide screens, where the 1440px frame caps the
              column but the viewport keeps growing. 9.6cqw keeps the longest
              line (~9.8em wide) inside the column; 65px is the measured max. */}
          <div className="min-w-0" style={{ containerType: "inline-size" }}>
            <Heading
              as="h1"
              size="displayLg"
              style={{ fontSize: "min(65px, 9.6cqw)" }}
            >
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
