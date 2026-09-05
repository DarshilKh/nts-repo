import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "RFID & Automation Solutions — Network Toll Solution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Our Solutions",
    "Toll, Parking, Fleet & Access Control Automation"
  );
}
