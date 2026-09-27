import type { NextConfig } from "next";

/**
 * Permanent (301) redirects from old networktoll.com URLs that have no
 * direct equivalent page on this rebuild — every product and solution page
 * that DID have a predecessor was instead renamed to that old page's exact
 * slug and moved to a flat, root-level URL (see src/app/[slug]/page.tsx),
 * so those need no redirect at all: the URL simply never changed. That is
 * the strongest possible outcome for the SEO history tied to those URLs,
 * stronger than a redirect — nothing to transfer, because nothing moved.
 *
 * What's left here is only the handful of old URLs that don't map onto a
 * real page 1:1: three core pages whose slug did change (About Us, Why
 * Choose Us), and three pages with real, unique content that was never
 * carried over to this rebuild at all (marked below) — those are pointed
 * at the closest existing page as an interim measure and should get
 * dedicated pages of their own; see HANDOFF.md for what was on them.
 */
const oldSiteRedirects = [
  { source: "/about-us-2", destination: "/about" },
  { source: "/about-us", destination: "/about" },
  { source: "/why-choose-us", destination: "/about" },

  // Content gaps — see the file-level comment above.
  { source: "/service", destination: "/contact" },
  { source: "/hybrid-toll-management-system", destination: "/toll-management-software" },
  { source: "/toll-lane-solution-equipments", destination: "/products" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework via the X-Powered-By response header.
  poweredByHeader: false,

  async redirects() {
    return [
      ...oldSiteRedirects.map((r) => ({ ...r, permanent: true })),
      // Safety net for the development period itself: every product and
      // solution detail page used to live at /products/:slug and
      // /solution/:slug on this rebuild, before moving to the flat,
      // root-level URL that matches the old site (see src/app/[slug]).
      // If Google or anyone else already crawled/bookmarked those nested
      // preview URLs, this carries them to the right place too.
      { source: "/products/:slug", destination: "/:slug", permanent: true },
      { source: "/solution/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
