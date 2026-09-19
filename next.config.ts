import type { NextConfig } from "next";

/**
 * Permanent (301) redirects from the old networktoll.com WordPress URLs to
 * their equivalent page on this rebuild. This is the single most important
 * piece of the redesign for SEO: Google's ranking history for this domain is
 * tied to these specific URLs. Without a redirect, each old URL just 404s,
 * Google drops it from the index, and the new URL starts from zero — which
 * would throw away years of the old site's standing rather than carry it
 * forward. `permanent: true` sends a real 301 (not Next's default 307),
 * telling Google to transfer that URL's ranking signal to `destination`.
 *
 * Sourced from the exact `source:` URL recorded on each catalog/solution
 * entry (see lib/catalog.ts / lib/solutions.ts) plus a direct crawl of the
 * live site's nav and footer — not guessed. Three old URLs (marked below)
 * have real, unique content that was never carried over to this rebuild;
 * they're pointed at the closest existing page as an interim measure, but
 * should get dedicated pages of their own — see HANDOFF.md.
 */
const oldSiteRedirects = [
  // Core pages
  { source: "/about-us-2", destination: "/about" },
  { source: "/about-us", destination: "/about" },
  { source: "/why-choose-us", destination: "/about" },

  // Products
  { source: "/rfid-integrated-reader", destination: "/products/rfid-integrated-reader" },
  { source: "/rfid-desktop-reader", destination: "/products/rfid-desktop-reader" },
  { source: "/rfid-desktop-mobile-reader", destination: "/products/rfid-desktop-mobile-reader" },
  { source: "/bluetooth-reader", destination: "/products/bluetooth-reader" },
  { source: "/rfid-uhf-reader-antenna", destination: "/products/rfid-uhf-reader-antenna" },
  { source: "/boom-barrier-india", destination: "/products/toll-boom-barrier" },
  { source: "/user-fare-display", destination: "/products/user-fare-display" },
  { source: "/toll-lane-controller", destination: "/products/toll-lane-controller" },
  { source: "/traffic-light", destination: "/products/traffic-light" },
  { source: "/ohls", destination: "/products/ohls" },
  { source: "/automatic-vehicle-classifier", destination: "/products/automatic-vehicle-classifier" },
  { source: "/ms-weigh-in-motion", destination: "/products/ms-weigh-in-motion" },
  { source: "/uhf-mobile-device", destination: "/products/uhf-mobile-device" },
  { source: "/nt-pulse", destination: "/products/nt-pulse" },
  // NT-Prime has two different old URLs live at once — nav links to
  // /traffic-monitoring-radar/, the footer links to /nt-prime/. Both go
  // to the same new page.
  { source: "/traffic-monitoring-radar", destination: "/products/nt-prime" },
  { source: "/nt-prime", destination: "/products/nt-prime" },
  { source: "/rfid-tags-supplier", destination: "/products/rfid-tag" },
  { source: "/library-tags", destination: "/products/library-tag" },
  { source: "/windshield-tag", destination: "/products/windshield-tag" },
  { source: "/rfid-solar-panel-tags", destination: "/products/solar-panel-tag" },
  { source: "/card", destination: "/products/rfid-card" },
  { source: "/wristband", destination: "/products/wristband" },
  { source: "/soft-metal-label-tag", destination: "/products/soft-metal-tag" },
  { source: "/multi-purpose-tag", destination: "/products/multi-purpose-tag" },
  { source: "/animal-tags", destination: "/products/animal-tag" },
  { source: "/jewellery-tags", destination: "/products/jewellery-tag" },

  // Solutions
  { source: "/toll-management-software", destination: "/solution/toll-management" },
  { source: "/automatic-number-plate-recognition-system", destination: "/solution/anpr-monitoring" },
  { source: "/automated-car-parking-systems", destination: "/solution/smart-parking-management" },
  { source: "/inventory-management-solution", destination: "/solution/inventory-management" },
  { source: "/rfid-software-system", destination: "/solution/rfid-software-system" },
  { source: "/plaza-center-database-server", destination: "/solution/plaza-center-database-server" },
  { source: "/number-plate-detection", destination: "/solution/number-plate-detection" },

  // Content gaps — real, unique content on the old site with no equivalent
  // page here yet. Pointed at the closest existing page so the URL doesn't
  // 404, but this is a stopgap: Google will eventually notice these landing
  // on partially-related content and the old rankings for these specific
  // pages will fade rather than transfer cleanly. Each should get its own
  // page built from its old content — see HANDOFF.md for what was on them.
  { source: "/service", destination: "/contact" },
  { source: "/hybrid-toll-management-system", destination: "/solution/toll-management" },
  { source: "/toll-lane-solution-equipments", destination: "/products" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework via the X-Powered-By response header.
  poweredByHeader: false,

  async redirects() {
    return oldSiteRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
