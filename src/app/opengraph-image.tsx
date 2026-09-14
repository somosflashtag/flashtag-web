import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "FlashTag — QR dinámicos, NFC, reseñas con IA y fidelidad para tu local";

export default function Image() {
  return ogImage({
    title: "Tu local ya tiene clientes. Falta que vuelvan.",
    kicker: "Marketing phygital para comercios",
  });
}
