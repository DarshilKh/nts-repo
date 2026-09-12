import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SolutionHero from "@/components/sections/SolutionHero";
import SolutionRow from "@/components/sections/SolutionRow";
import { solutionHref } from "@/lib/solutions";
import CTASection from "@/components/sections/CTASection";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Frame from "@/components/ui/Frame";
import { solutionAssets } from "@/lib/assets";

export const metadata: Metadata = {
  title: "RFID & Automation Solutions",
  description:
    "Explore our RFID-powered solutions: toll management, smart parking, inventory tracking, ANPR, number plate detection, RFID software, and plaza database systems.",
  alternates: { canonical: "/solution" },
  openGraph: { url: "/solution", title: "RFID & Automation Solutions | Network Toll Solution" },
};

export default function SolutionPage() {
  return (
    <>
      <Header />
      <main>
        <Frame>
          <div className="px-6 min-[1440px]:px-[182px] pt-6">
            <Breadcrumbs items={[{ name: "Solutions", path: "/solution" }]} />
          </div>
        </Frame>
        <SolutionHero />

        {/* §4.2 row 1 — text right x=964, image left 921px */}
        <SolutionRow
          styleId="toll"
          learnMore={Boolean(solutionHref("toll"))}
          learnMoreHref={solutionHref("toll")}
          title="Toll Management"
          body="Automate the full lane: FASTag RFID identification, ANPR backup, automatic vehicle classification and weigh-in-motion, all reporting to a single plaza server. Hybrid lanes keep cash and card working alongside electronic collection."
          image={solutionAssets.toll}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
          cornerMarkSide="right"
          priority
        />

        {/* row 2 — text left x=85, image right 973px (unique), body + Learn More, no corner mark */}
        <SolutionRow
          styleId="smart-parking"
          learnMore={Boolean(solutionHref("smart-parking"))}
          learnMoreHref={solutionHref("smart-parking")}
          title={"Smart Parking\nManagement"}
          body="Simplify vehicle entry and exit using RFID, ANPR, boom barriers, payment integration, and real time parking availability."
          image={solutionAssets.smartParking}
          imageSide="right"
          imageWidthPx={973}
          textInsetPx={85}
        />

        {/* row 3 — text right x=964, image left 921px */}
        <SolutionRow
          styleId="inventory"
          learnMore={Boolean(solutionHref("inventory"))}
          learnMoreHref={solutionHref("inventory")}
          title="Inventory Management"
          body="Track stock at item level with UHF tags and fixed or handheld readers. Cycle counts that took a day take minutes, and shrinkage shows up in a report instead of at year end."
          image={solutionAssets.inventory}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
          cornerMarkSide="right"
        />

        {/* row 4 — text left x=85, image right 921px */}
        <SolutionRow
          styleId="anpr"
          learnMore={Boolean(solutionHref("anpr"))}
          learnMoreHref={solutionHref("anpr")}
          title={"Automatic Number\nPlate Recognition"}
          body="Day-and-night number plate recognition for toll plazas, parking and highways. ANPR runs alongside FASTag as enforcement and fallback, catching vehicles with a missing, blocked or blacklisted tag."
          image={solutionAssets.anpr}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
          cornerMarkSide="left"
        />

        {/* row 5 — text right x=964, image left 921px */}
        <SolutionRow
          styleId="plaza"
          learnMore={Boolean(solutionHref("plaza"))}
          learnMoreHref={solutionHref("plaza")}
          title={"Plaza Center &\nDatabase Server"}
          body="The plaza server is where every lane reports. It consolidates transactions, incidents and images, reconciles revenue across lanes and shifts, and syncs to your central back office for audit and settlement."
          image={solutionAssets.plaza}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
          cornerMarkSide="right"
        />

        {/* row 6 (added — live-site catalog expansion) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="rfid-software"
          learnMore={Boolean(solutionHref("rfid-software"))}
          learnMoreHref={solutionHref("rfid-software")}
          title={"RFID Software\nSystem"}
          body="Centralized RFID software for automatic gate access, real-time entry-exit tracking, event-based alerts, and live reporting across your operations."
          image={solutionAssets.rfidSoftware}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
          cornerMarkSide="left"
        />

        {/* row 7 (added — live-site catalog expansion) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="number-plate-detection"
          learnMore={Boolean(solutionHref("number-plate-detection"))}
          learnMoreHref={solutionHref("number-plate-detection")}
          title={"Number Plate\nDetection"}
          body="AI-powered ANPR with day and night recognition, real-time vehicle capture, and automated entry-exit control for toll plazas, parking, and highways."
          image={solutionAssets.numberPlateDetection}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
          cornerMarkSide="right"
        />

        {/* row 8 (added — client request) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="attendance"
          learnMore={Boolean(solutionHref("attendance"))}
          learnMoreHref={solutionHref("attendance")}
          title={"Face Attendance\nSystem"}
          body="RFID card and face-recognition attendance at the office entrance — one tap or one glance logs the visit, no separate biometric device or manual register."
          image={solutionAssets.attendance}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
          cornerMarkSide="left"
        />

        {/* row 9 (added — client request) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="vision-ai"
          learnMore={Boolean(solutionHref("vision-ai"))}
          learnMoreHref={solutionHref("vision-ai")}
          title={"Vision AI\nMonitoring System"}
          body="Camera-based AI that reads plates and container IDs at the gate, inspects cargo for damage, tracks dock and workstation activity, and flags PPE and fire risks in real time — on the CCTV you already have."
          image={solutionAssets.visionAi}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
          cornerMarkSide="right"
        />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
