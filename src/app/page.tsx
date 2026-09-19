import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import StatsRow from "@/components/sections/StatsRow";
import ImageTextRow from "@/components/sections/ImageTextRow";
import ProvenExcellence from "@/components/sections/ProvenExcellence";
import CTASection from "@/components/sections/CTASection";
import { homeAssets } from "@/lib/assets";

export const metadata: Metadata = {
  description:
    "RFID-powered toll management, smart parking, fleet monitoring, and access control automation. 100+ satisfied clients, 500+ projects, 8+ years of experience.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsRow />

        {/* Image flush-left (517px, x:0–517). Text padding widened from the
            originally-measured 82px (x=599) to 140px — the tighter value
            read as the text sitting stuck against the image with no
            breathing room, per client feedback. */}
        <ImageTextRow
          styleId="operations"
          heading="Designed for Diverse Operations"
          body="Empowering businesses with smart RFID and software solutions for tolling, parking, vehicle tracking, access control, and beyond. Built to enhance efficiency, automate operations, and deliver real time visibility across diverse environments."
          image={homeAssets.operations}
          imageSide="left"
          imageWidthPx={517}
          textPaddingLeftPx={140}
        />

        {/* §4.1 — text starts x=154, image flush-right (517px, x:924–1441) */}
        <ImageTextRow
          styleId="results"
          heading="Delivering Results Across Industries"
          body="From tolling and parking to logistics, mining, and access control, our RFID and software solutions help organizations improve efficiency, automate operations, and gain greater visibility across their infrastructure."
          image={homeAssets.results}
          imageSide="right"
          imageWidthPx={517}
          textPaddingLeftPx={154}
        />

        <ProvenExcellence />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
