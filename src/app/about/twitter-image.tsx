import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "About Network Toll Solution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "About Us",
    "RFID & Automation Experts Since 2018"
  );
}
