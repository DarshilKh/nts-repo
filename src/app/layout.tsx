import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import JsonLd from "@/components/JsonLd";
import FloatingContact from "@/components/FloatingContact";
import CopyGuard from "@/components/CopyGuard";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Manrope (variable, weight axis 200–800). Bundled locally from the
// @fontsource-variable/manrope package rather than next/font/google so the
// exact typeface measured in DESIGN_SYSTEM.md §1.1 is reproduced without
// depending on a Google Fonts request at build time.
const manrope = localFont({
  src: "../fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Intelligent RFID & Automation`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "RFID toll automation",
    "toll management system",
    "smart parking management",
    "fleet monitoring RFID",
    "ANPR camera solutions",
    "RFID tags and readers",
    "toll boom barrier",
    "vehicle tracking software India",
  ],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Intelligent RFID & Automation`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Intelligent RFID & Automation`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F7FCFE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        <FloatingContact />
        <CopyGuard />
      </body>
    </html>
  );
}
