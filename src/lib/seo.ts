import { companyInfo } from "./data";

/**
 * Single source of truth for the production URL. Falls back to a
 * placeholder so local builds never leak `localhost` into metadata, but
 * this MUST be set via the `NEXT_PUBLIC_SITE_URL` environment variable
 * (e.g. in Vercel project settings, or `.env.production`) to the real
 * domain before going live — see README/handoff notes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.networktoll.com"
).replace(/\/$/, "");

export const SITE_NAME = "Network Toll Solution";

export const SITE_DESCRIPTION =
  "End-to-end RFID and automation software and hardware for tolling, parking, logistics, mining, access control, and fleet management.";

/** Absolute URL helper — every canonical/OG/JSON-LD URL should go through this. */
export function absoluteUrl(path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${clean}`;
}

/**
 * Organization/LocalBusiness JSON-LD, emitted once site-wide in the root
 * layout. Reuses the same address/contact data already shown in the
 * footer rather than duplicating it.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/icon.png`,
    description: SITE_DESCRIPTION,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.addressLine1,
      addressLocality: "Greater Noida West",
      addressRegion: "Uttar Pradesh",
      postalCode: "201306",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: "sales",
      areaServed: "IN",
    },
  };
}

/** WebSite JSON-LD (site-wide) — establishes the canonical site identity for Google. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

/** BreadcrumbList JSON-LD for any non-home page. `crumbs` excludes Home; it's added automatically. */
export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Turns "RFID Integrated\nReader" / "Toll Lane Controler" into a stable, URL-safe slug/id. */
export function slugify(value: string): string {
  return value
    .replace(/\n/g, " ")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
