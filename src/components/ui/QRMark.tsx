import { cn } from "@/lib/cn";

/**
 * Marcador de sección y de lista: el isotipo oficial "ft" (FT_Violeta.eps)
 * sobre su tile arena, tal como vive en `src/app/icon.svg`.
 *
 * Antes era un cuadradito dibujado a mano; ahora es el asset de marca sin
 * tocar (AGENTS.md §1): se carga el mismo archivo, no se repiten ni recolorean
 * los trazos. El tile arena lo hace legible sobre fondos claros y sobre ink.
 *
 * `tone` queda por compatibilidad con los usos existentes: el isotipo tiene
 * sus colores propios y no se tiñe.
 *
 * Por debajo de 16px el "ft" deja de leerse, así que ese es el piso.
 */
export function QRMark({
  className,
  size = 16,
}: {
  className?: string;
  size?: number;
  tone?: "brand" | "ink" | "paper" | "muted";
}) {
  const s = Math.max(size, 16);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/icon.svg"
      alt=""
      aria-hidden="true"
      width={s}
      height={s}
      className={cn("inline-block shrink-0 align-middle", className)}
      style={{ width: s, height: s }}
    />
  );
}
