import { ImageResponse } from "next/og";

export const alt = "HBS AI Club — where business meets artificial intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded social-share card, rendered at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1a1714",
          color: "#fbfaf7",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 16,
              background: "#a51c30",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "Georgia, serif",
            }}
          >
            AI
          </div>
          <div style={{ fontSize: 30, letterSpacing: 3, opacity: 0.75 }}>
            HARVARD BUSINESS SCHOOL
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>
          <div style={{ fontSize: 82, lineHeight: 1.05 }}>Where business meets</div>
          <div style={{ fontSize: 82, lineHeight: 1.05, color: "#e0576b", fontStyle: "italic" }}>
            artificial intelligence.
          </div>
        </div>

        <div style={{ fontSize: 30, opacity: 0.7 }}>
          HBS AI Club — events · speakers · community
        </div>
      </div>
    ),
    { ...size }
  );
}
