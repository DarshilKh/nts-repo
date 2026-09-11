/**
 * Central asset registry.
 *
 * Sourced from the client's asset delivery (Google Drive: NTS/Photos,
 * PNGs/About Us, PNGs/Solution Page — Aug 2026). All files processed to
 * webp and copied into /public/images/real. Dimensions below are each
 * processed file's actual pixel size, so MediaSlot's aspect-ratio
 * reservation matches exactly — not the placeholder-era PDF-measured
 * ratios, which have been superseded by the real assets' own ratios.
 *
 * Mapping was done by cross-referencing the client's full-page reference
 * renders (Website PNGs/*.png) against the individual asset files, not
 * guessed from filenames alone.
 */

export const homeAssets = {
  hero: {
    src: "/images/real/hero-dashboard.webp",
    alt: "Fleet monitoring dashboard preview",
    width: 884,
    height: 860,
  },
  /**
   * Hero carousel — client-supplied product renders, cycled in the hero's
   * right-hand media slot in place of the single static dashboard image.
   * Each keeps its own native aspect ratio; the carousel frame reserves
   * the same box as `hero` above (884:860) so the header/nav layout above
   * it never shifts between slides.
   */
  heroCarousel: [
    {
      src: "/images/real/hero-carousel-1.webp",
      alt: "Fleet monitoring dashboard interface",
      width: 1498,
      height: 1050,
    },
    {
      src: "/images/real/hero-carousel-2.webp",
      alt: "Toll plaza with FASTag lanes",
      width: 931,
      height: 1024,
    },
    {
      src: "/images/real/hero-carousel-3.webp",
      alt: "Toll management dashboard with live transaction tracking",
      width: 1536,
      height: 1024,
    },
  ],
  operations: {
    src: "/images/real/home-operations.webp",
    alt: "Toll boom barrier gate installation",
    width: 1600,
    height: 1067,
  },
  results: {
    src: "/images/real/home-results.webp",
    alt: "Truck at toll checkpoint",
    width: 1600,
    height: 1068,
  },
  project1: {
    src: "/images/real/home-project1-visitors.webp",
    alt: "Visitors tracking system installation",
    width: 1600,
    height: 1067,
  },
  project2: {
    src: "/images/real/home-project2-interstate.webp",
    alt: "NHAI toll plaza with FASTag lanes on National Highway 44",
    width: 1691,
    height: 930,
  },
  project3: {
    src: "/images/real/home-project3-tollmgmt.webp",
    alt: "Toll management system at a highway plaza",
    width: 1600,
    height: 1012,
  },
  iconClients: {
    src: "/images/real/icon-clients.webp",
    alt: "",
    width: 400,
    height: 400,
  },
  iconProjects: {
    src: "/images/real/icon-projects.webp",
    alt: "",
    width: 400,
    height: 400,
  },
  iconExperience: {
    src: "/images/real/icon-experience.webp",
    alt: "",
    width: 400,
    height: 400,
  },
  iconInstallations: {
    src: "/images/real/icon-installations.webp",
    alt: "",
    width: 400,
    height: 400,
  },
} as const;

/**
 * Solution page assets — filenames in the client's delivery already
 * matched each row 1:1 (e.g. "Toll.jpg" → Toll Management row), confirmed
 * against the Solution Page reference render before wiring in.
 */
export const solutionAssets = {
  toll: {
    src: "/images/real/solution-toll.webp",
    alt: "Toll management",
    width: 1600,
    height: 805,
  },
  smartParking: {
    src: "/images/real/solution-smartparking.webp",
    alt: "Smart parking management",
    width: 1600,
    height: 899,
  },
  inventory: {
    src: "/images/real/solution-inventory.webp",
    alt: "Inventory management",
    width: 1600,
    height: 896,
  },
  anpr: {
    src: "/images/real/solution-anpr.jpg",
    alt: "Automatic number plate recognition camera pole",
    width: 834,
    height: 556,
  },
  plaza: {
    src: "/images/real/solution-plaza.webp",
    alt: "Plaza center and database server",
    width: 1600,
    height: 900,
  },
  rfidSoftware: {
    src: "/images/real/solution-rfid-software-new.jpg",
    alt: "RFID reader mounted at a toll plaza lane, reading a vehicle tag",
    width: 1774,
    height: 887,
  },
  numberPlateDetection: {
    src: "/images/real/solution-numberplate-detection-new.jpg",
    alt: "ANPR camera reading a vehicle's number plate at a gate",
    width: 1774,
    height: 887,
  },
  attendance: {
    src: "/images/real/solution-attendance.jpg",
    alt: "Employee tapping an RFID card at an office access turnstile",
    width: 1774,
    height: 887,
  },
} as const;

/**
 * About page assets. Mission/Vision are small centered badge/shield icon
 * graphics (transparent background) sitting on a normal light card panel
 * — NOT a full-bleed dark rectangle as earlier assumed from the PDF's
 * vector layer (see MissionVisionRow.tsx for the corrected treatment).
 */
export const aboutAssets = {
  intro: {
    src: "/images/real/about-intro.webp",
    alt: "RFID automation illustration",
    width: 1169,
    height: 899,
  },
  mission: {
    src: "/images/real/about-mission-icon.webp",
    alt: "Mission badge icon",
    width: 500,
    height: 500,
  },
  vision: {
    src: "/images/real/about-vision-icon.webp",
    alt: "Vision seal icon",
    width: 500,
    height: 500,
  },
  whyUs: {
    src: "/images/real/about-whyus.webp",
    alt: "Fleet network illustration",
    width: 742,
    height: 538,
  },
} as const;
