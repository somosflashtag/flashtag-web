import { cn } from "@/lib/cn";

/**
 * El marcador de posición del QR: el elemento estructural de la marca.
 * Reemplaza bullets, marca secciones y encuadra datos.
 * No es decoración — es el ADN del producto convertido en sistema.
 */
export function QRMark({
  className,
  size = 14,
  tone = "brand",
}: {
  className?: string;
  size?: number;
  tone?: "brand" | "ink" | "paper" | "muted";
}) {
  const color =
    tone === "brand"
      ? "var(--color-brand)"
      : tone === "paper"
        ? "var(--color-paper)"
        : tone === "muted"
          ? "var(--color-muted)"
          : "var(--color-ink)";

  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 align-middle", className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 14 14" width={size} height={size} fill="none">
        <rect x="0.75" y="0.75" width="12.5" height="12.5" rx="1.5" stroke={color} strokeWidth="1.5" />
        <rect x="4.25" y="4.25" width="5.5" height="5.5" rx="0.5" fill={color} />
      </svg>
    </span>
  );
}
