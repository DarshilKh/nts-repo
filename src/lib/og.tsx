import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Renders a branded 1200x630 share-card image for a given page. Uses
 * system fonts (Satori/next-og doesn't support the site's WOFF2 variable
 * font) so this stays dependency-free.
 */
export function renderOgImage(eyebrow: string, title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7FCFE",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <div
            style={{
              width: 56,
              height: 40,
              background: "#E41F26",
              marginRight: 18,
              clipPath:
                "polygon(0 0, 70% 0, 100% 30%, 100% 100%, 30% 100%, 0 70%)",
            }}
          />
          <span style={{ fontSize: 30, fontWeight: 800, color: "#000" }}>
            Network Toll Solution
          </span>
        </div>
        <span
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#E41F26",
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </span>
        <span
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#000",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {title}
        </span>
      </div>
    ),
    { ...OG_SIZE }
  );
}
