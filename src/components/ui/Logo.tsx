import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark FlashTag.
 *
 * ⚠️ PROVISORIO — reconstruido tipográficamente con Poppins (la familia de
 * títulos del manual) respetando la estructura real: "flash" en violeta
 * profundo, "tag" en violeta de marca, ambos en minúscula.
 * Cuando exista el SVG original del isologotipo, reemplazar el contenido de
 * <Wordmark /> por el <svg> y borrar este comentario. Nada más cambia:
 * todo el sitio consume este componente.
 *
 * `stacked` replica el bloque de dos líneas del manual (footer, hero).
 * `inline` es la versión de una línea para barras de 64px (header).
 */
function Wordmark({ stacked }: { stacked: boolean }) {
  return (
    <span
      className={cn(
        "font-[family-name:var(--font-display)] font-bold lowercase tracking-[-0.03em]",
        stacked ? "flex flex-col leading-[0.82]" : "leading-none",
      )}
    >
      <span className="text-ink">flash</span>
      <span className={cn("text-brand", stacked && "pl-[0.9em]")}>tag</span>
    </span>
  );
}

export function Logo({
  className,
  variant = "inline",
  href = "/",
  onClick,
}: {
  className?: string;
  variant?: "inline" | "stacked";
  /** `null` renderiza el wordmark sin envolverlo en un link. */
  href?: string | null;
  onClick?: () => void;
}) {
  const mark = <Wordmark stacked={variant === "stacked"} />;

  if (href === null) {
    return (
      <span className={className} role="img" aria-label="FlashTag">
        {mark}
      </span>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="FlashTag — inicio"
      className={cn(
        "inline-block rounded-[4px] transition-opacity duration-[120ms] hover:opacity-80",
        className,
      )}
    >
      {mark}
    </Link>
  );
}
