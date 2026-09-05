import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Contact Network Toll Solution";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage(
    "Get In Touch",
    "Let's Discuss the Right Solution"
  );
}
