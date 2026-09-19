import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutIntro from "@/components/sections/AboutIntro";
import MissionVisionRow from "@/components/sections/MissionVisionRow";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Certifications from "@/components/sections/Certifications";
import CTASection from "@/components/sections/CTASection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Frame from "@/components/ui/Frame";
import { aboutAssets } from "@/lib/assets";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Network Toll Solution's mission, vision, and RFID automation expertise — 100+ satisfied clients, 500+ projects, and 8+ years of experience.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Us | Network Toll Solution" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:pl-[122px] pt-6">
            <Breadcrumbs items={[{ name: "About Us", path: "/about" }]} />
          </div>
        </Frame>
        <AboutIntro />

        {/* Mission/Vision/Why Choose Us share MissionVisionRow's layout
            (same media-panel/text-panel mechanics, same text padding and
            max-width) so the three read as one design system — only
            `panelSide` and content differ per row. */}
        <MissionVisionRow
          styleId="mission"
          heading="Our Mission"
          body="Network Toll Solution delivers RFID and automation solutions for tolling, parking, vehicle tracking, warehouses, and access control helping businesses improve efficiency, security, and operations."
          media={aboutAssets.mission}
          panelSide="left"
        />

        <MissionVisionRow
          styleId="vision"
          heading="Our Vision"
          body="To become a trusted leader in RFID and intelligent automation by delivering technology that creates smarter, safer, and more connected environments."
          media={aboutAssets.vision}
          panelSide="right"
        />

        <WhyChooseUs />
        <Certifications />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
