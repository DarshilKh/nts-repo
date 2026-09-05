import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "RFID Tags, Readers & Toll Automation Products";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Products",
    "RFID Tags, Readers & Toll Automation Hardware"
  );
}
