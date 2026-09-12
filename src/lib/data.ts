export const solutionLinks = [
  "Toll Management",
  "Smart Parking Management",
  "Inventory Management",
  "ANPR Monitering",
  "Plaza Center & Database Server",
  "RFID Software System",
  "Number Plate Detection",
  "Face Attendance System",
  "Vision AI Monitoring System",
];

// Maps each footer label (kept verbatim, typos and all, per the PDF source)
// to the matching Solution.rowId in lib/solutions.ts (same id as each
// <SolutionRow styleId="..."> on /solution). Footer.tsx passes this through
// solutionHref() to link straight to that solution's own detail page
// (/solution/[slug]) instead of the /solution index. A label with no entry
// here renders as plain (non-link) text.
export const solutionLinkSlugs: Record<string, string> = {
  "Toll Management": "toll",
  "Smart Parking Management": "smart-parking",
  "Inventory Management": "inventory",
  "ANPR Monitering": "anpr",
  "Plaza Center & Database Server": "plaza",
  "RFID Software System": "rfid-software",
  "Number Plate Detection": "number-plate-detection",
  "Face Attendance System": "attendance",
  "Vision AI Monitoring System": "vision-ai",
};

export const productLinksCol1 = [
  "RFID Tag",
  "Library Tag",
  "Windshield tag",
  "Solar Panel Tag",
  "RFID Card",
  "Wristband Tag",
  "Soft Metal Tag",
  "Multi Purpose Tag",
  "Animal Tag",
  "Jewellery Tag",
  "File Tag",
  "Racing Tag",
  "Waste Tag",
];

export const productLinksCol2 = [
  "RFID Integrated Reader",
  "RFID Desktop Reader",
  "RFID Desktop/Mobile Reader",
  "Bluetooth Reader",
  "UHF Mobile Reader",
  "RFID UHF Reader and Antenna",
  "Toll Boom Barrier",
  "User Fair Display",
  "Toll Lane Controler",
  "Traffic Light",
  "Overhead Lane Status Signal (OHLS)",
  "Automatic Vehicle Classifier",
  "MS Weigh in Motion",
  "ANPR Camera",
  "PTZ Camera",
  "NT-Pulse Reader",
  "NT-Prime Reader",
];

// Maps each footer product label to the matching <ProductCard id="..."> on
// /products (see lib/seo.ts `slugify` applied to each product's real
// `name` in products.ts). The footer's wording sometimes differs slightly
// from the catalogued product name (e.g. "Toll Boom Barrier" vs. "Boom
// Barrier"), so this is an explicit map rather than a naive slugify(label).
// Maps each footer product label to its detail page slug in lib/catalog.ts.
// The footer's wording differs from the catalogued product name in places
// (e.g. "UHF Mobile Reader" vs. "UHF Mobile Device"), so this is an explicit
// map rather than a naive slugify(label).
//
// Every value here is asserted against the catalog at build time by the
// check below — a typo'd slug used to fail silently and send the visitor to
// a 404 instead of the product.
export const productLinkSlugs: Record<string, string> = {
  "RFID Tag": "rfid-tag",
  "Library Tag": "library-tag",
  "Windshield tag": "windshield-tag",
  "Solar Panel Tag": "solar-panel-tag",
  "RFID Card": "rfid-card",
  "Wristband Tag": "wristband",
  "Soft Metal Tag": "soft-metal-tag",
  "Multi Purpose Tag": "multi-purpose-tag",
  "Animal Tag": "animal-tag",
  "Jewellery Tag": "jewellery-tag",
  "File Tag": "file-tag",
  "Racing Tag": "racing-tag",
  "Waste Tag": "waste-tag",
  "RFID Integrated Reader": "rfid-integrated-reader",
  "RFID Desktop Reader": "rfid-desktop-reader",
  "RFID Desktop/Mobile Reader": "rfid-desktop-mobile-reader",
  "Bluetooth Reader": "bluetooth-reader",
  "UHF Mobile Reader": "uhf-mobile-device",
  "RFID UHF Reader and Antenna": "rfid-uhf-reader-antenna",
  "Toll Boom Barrier": "toll-boom-barrier",
  "User Fair Display": "user-fare-display",
  "Toll Lane Controler": "toll-lane-controller",
  "Traffic Light": "traffic-light",
  "Overhead Lane Status Signal (OHLS)": "ohls",
  "Automatic Vehicle Classifier": "automatic-vehicle-classifier",
  "MS Weigh in Motion": "ms-weigh-in-motion",
  "ANPR Camera": "anpr-camera",
  "PTZ Camera": "ptz-camera",
  "NT-Pulse Reader": "nt-pulse",
  "NT-Prime Reader": "nt-prime",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solution", href: "/solution" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "About Us", href: "/about" },
];

export const companyInfo = {
  gstin: "07AAICN1018N1ZC | 09AAICN1018N1Z8",
  cin: "U72900DL2022PTC394359",
  phone: "+91 9289757018",
  whatsapp: "919289757018",
  email: "sales@networktoll.com",
  addressLine1: "Unit No.-1008, Tower-3, AASTHA GREENS, Sector-4, Greater Noida West",
  addressLine2: "Gautam Budh Nagar, 201306, Uttar Pradesh, India",
  // Label stripped from the value — the footer renders "Registered Office:" as
  // a bold label, so keeping it inside the string printed it twice.
  regOffice: "H.N 86, 1st Floor Mig Flats, Madipur, West Delhi - 110026",
};
