import { ImageResponse } from "next/og";
import { QR_PATTERN } from "@/components/ui/QRCode";
import { LogoOG } from "@/components/ui/LogoOG";

/**
 * Imagen Open Graph (1200×630) generada en build.
 * Colores del manual escritos como literales porque Satori no lee
 * variables CSS — es el único lugar del sitio donde eso está permitido.
 * Tipografía: la del runtime de next/og. El isologotipo va en blanco,
 * con los vectores originales (LogoOG).
 */
const INK = "#2d014b";
const BRAND = "#613ec4";
const SAND = "#efe7d6";
const TEAL = "#0094a5";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function ogImage({
  title,
  eyebrow = "FlashTag",
  kicker,
}: {
  title: string;
  eyebrow?: string;
  kicker?: string;
}) {
  const cell = 220 / QR_PATTERN.length;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: INK,
          color: SAND,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 620,
            height: 620,
            borderRadius: 999,
            background: BRAND,
            opacity: 0.45,
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            width: 820,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 24, fontWeight: 600, color: "#b9a8cc" }}>
            <LogoOG height={64} />
            {eyebrow !== "FlashTag" && <span>{eyebrow.replace(/^FlashTag · /, "")}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {kicker && (
              <div style={{ fontSize: 26, color: "#b9a8cc", fontWeight: 500 }}>{kicker}</div>
            )}
            <div
              style={{
                fontSize: title.length > 60 ? 48 : 60,
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: -1.5,
                color: "white",
              }}
            >
              {title}
            </div>
          </div>
          <div style={{ fontSize: 22, color: "#b9a8cc" }}>
            QR dinámicos · NFC · Reseñas con IA · Fidelidad
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 96,
            top: 205,
            width: 220,
            height: 220,
            display: "flex",
            flexWrap: "wrap",
            padding: 18,
            background: "white",
            borderRadius: 24,
            boxSizing: "content-box",
          }}
        >
          {QR_PATTERN.flatMap((row, y) =>
            row.map((on, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  width: cell,
                  height: cell,
                  background: on ? INK : "transparent",
                }}
              />
            )),
          )}
        </div>
      </div>
    ),
    ogSize,
  );
}
