import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Network Toll Solution — Intelligent RFID & Automation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Smart Fleet Monitoring Platform",
    "Intelligent RFID & Automation Solutions"
  );
}
