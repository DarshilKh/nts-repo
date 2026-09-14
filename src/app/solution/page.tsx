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
        />


        {/* row 10 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="gate-automation"
          learnMore={Boolean(solutionHref("gate-automation"))}
          learnMoreHref={solutionHref("gate-automation")}
          title={"Gate In & Gate\nOut Automation"}
          body="Every vehicle and container is logged automatically at the gate — plate, container ID, ISO code and weight read in under two seconds, no manual entry."
          image={{ src: "/images/solutions/vision-gate-in-gate-out.png", alt: "Gate In & Gate Out Automation", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 11 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="anpr-vehicle-id"
          learnMore={Boolean(solutionHref("anpr-vehicle-id"))}
          learnMoreHref={solutionHref("anpr-vehicle-id")}
          title={"ANPR & Vehicle\nIdentification"}
          body="Real-time plate detection with blacklist/whitelist alerts, searchable entry-exit records and vehicle classification on the CCTV you already run."
          image={{ src: "/images/solutions/vision-anpr-vehicle-identification.png", alt: "ANPR & Vehicle Identification", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 12 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="damage-detection"
          learnMore={Boolean(solutionHref("damage-detection"))}
          learnMoreHref={solutionHref("damage-detection")}
          title={"AI Damage\nDetection"}
          body="Five-sided automated container inspection — dents, holes, rust, bends and seal condition checked at the gate, with photo proof for every inspection."
          image={{ src: "/images/solutions/vision-ai-damage-detection.png", alt: "AI Damage Detection", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 13 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="speed-monitoring"
          learnMore={Boolean(solutionHref("speed-monitoring"))}
          learnMoreHref={solutionHref("speed-monitoring")}
          title={"Vehicle Speed\nMonitoring"}
          body="Zone-wise speed limits with real-time over-speed alerts, each backed by a timestamp, vehicle ID and video clip."
          image={{ src: "/images/solutions/vision-vehicle-speed-monitoring.png", alt: "Vehicle Speed Monitoring", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 14 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="dock-visualization"
          learnMore={Boolean(solutionHref("dock-visualization"))}
          learnMoreHref={solutionHref("dock-visualization")}
          title={"Dock Space\nVisualization"}
          body="Live 2D layout of every dock — occupied or available at a glance, with load/unload duration and turnaround tracking per bay."
          image={{ src: "/images/solutions/vision-dock-space-visualization.png", alt: "Dock Space Visualization", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 15 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="container-search"
          learnMore={Boolean(solutionHref("container-search"))}
          learnMoreHref={solutionHref("container-search")}
          title={"Real-Time\nContainer Search"}
          body="Search a container ID and get its exact yard location instantly — QR-based scan and navigate from a handheld, typically under ten seconds."
          image={{ src: "/images/solutions/vision-container-search.png", alt: "Real-Time Container Search", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 16 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="gauge-reefer"
          learnMore={Boolean(solutionHref("gauge-reefer"))}
          learnMoreHref={solutionHref("gauge-reefer")}
          title={"Gauge & Reefer\nMonitoring"}
          body="Cameras read analogue and digital gauges the way a person would, with an instant alert on any temperature or pressure deviation."
          image={{ src: "/images/solutions/vision-gauge-reefer-monitoring.png", alt: "Gauge & Reefer Monitoring", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 17 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="quality-inspection"
          learnMore={Boolean(solutionHref("quality-inspection"))}
          learnMoreHref={solutionHref("quality-inspection")}
          title={"Quality Inspection\n& Label Reading"}
          body="Automatic label and barcode OCR on the line, with surface damage flagged and image evidence captured the moment a defect is detected."
          image={{ src: "/images/solutions/vision-quality-inspection-label.png", alt: "Quality Inspection & Label Reading", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 18 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="pallet-counting"
          learnMore={Boolean(solutionHref("pallet-counting"))}
          learnMoreHref={solutionHref("pallet-counting")}
          title={"Pallet Classification\n& Counting"}
          body="Automatic pallet detection and counting by type — wood, plastic, CHEP — with a live category-wise count feeding inventory reporting."
          image={{ src: "/images/solutions/vision-pallet-classification.png", alt: "Pallet Classification & Counting", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 19 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="stack-height"
          learnMore={Boolean(solutionHref("stack-height"))}
          learnMoreHref={solutionHref("stack-height")}
          title={"Inventory Stack\nHeight Monitoring"}
          body="Per-zone safe height thresholds watched continuously, with an SMS, email or dashboard alert the moment a stack crosses the line."
          image={{ src: "/images/solutions/vision-stack-height-monitoring.png", alt: "Inventory Stack Height Monitoring", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 20 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="workstation-occupancy"
          learnMore={Boolean(solutionHref("workstation-occupancy"))}
          learnMoreHref={solutionHref("workstation-occupancy")}
          title={"Workstation\nOccupancy"}
          body="Live occupied-or-idle status for packing tables, machine stations and QC benches, with a multi-site dashboard."
          image={{ src: "/images/solutions/vision-workstation-occupancy.png", alt: "Workstation Occupancy", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 21 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="document-extraction"
          learnMore={Boolean(solutionHref("document-extraction"))}
          learnMoreHref={solutionHref("document-extraction")}
          title={"OCR-Based Document\nData Extraction"}
          body="Booking documents, gate passes, invoices, challans and LR copies digitised and read automatically — searchable text, not a folder of scans."
          image={{ src: "/images/solutions/vision-document-data-extraction.png", alt: "OCR-Based Document Data Extraction", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 22 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="forklift-monitoring"
          learnMore={Boolean(solutionHref("forklift-monitoring"))}
          learnMoreHref={solutionHref("forklift-monitoring")}
          title={"Forklift Operator\n& Activity Monitoring"}
          body="Operator presence and helmet detection on every forklift, with alerts for an empty seat, missing helmet or a fork raised while moving."
          image={{ src: "/images/solutions/vision-forklift-monitoring.png", alt: "Forklift Operator & Activity Monitoring", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 23 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="ppe-compliance"
          learnMore={Boolean(solutionHref("ppe-compliance"))}
          learnMoreHref={solutionHref("ppe-compliance")}
          title={"Safety Compliance\nMonitoring (PPE)"}
          body="Vests, glasses, shoes, gloves and helmets checked automatically per zone, with a live compliance percentage and timestamped evidence."
          image={{ src: "/images/solutions/vision-ppe-safety-compliance.png", alt: "Safety Compliance Monitoring (PPE)", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        {/* row 24 (added — client request, image from client-supplied PDF) — text left x=85, image right 921px */}
        <SolutionRow
          styleId="fire-detection"
          learnMore={Boolean(solutionHref("fire-detection"))}
          learnMoreHref={solutionHref("fire-detection")}
          title={"Fire & Smoke\nDetection"}
          body="Continuous camera-based fire and smoke detection, catching early signs before a heat sensor typically trips, with instant alerts."
          image={{ src: "/images/solutions/vision-fire-smoke-detection.png", alt: "Fire & Smoke Detection", width: 800, height: 500 }}
          imageSide="right"
          imageWidthPx={921}
          textInsetPx={85}
        />

        {/* row 25 (added — client request, image from client-supplied PDF) — text right x=964, image left 921px */}
        <SolutionRow
          styleId="perimeter-monitoring"
          learnMore={Boolean(solutionHref("perimeter-monitoring"))}
          learnMoreHref={solutionHref("perimeter-monitoring")}
          title={"Operator Presence &\nPerimeter Monitoring"}
          body="Automatic staff-presence tracking at required posts, plus perimeter intrusion detection with a time-stamped video record."
          image={{ src: "/images/solutions/vision-perimeter-monitoring.png", alt: "Operator Presence & Perimeter Monitoring", width: 800, height: 500 }}
          imageSide="left"
          imageWidthPx={921}
          textInsetPx={964}
        />

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
