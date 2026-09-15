import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark FlashTag.
 *
 * ⚠️ RECONSTRUCCIÓN, no el archivo original. Sigue pendiente el SVG del
 * isologotipo; hasta entonces esto es lo más fiel que se puede sin él.
 *
 * Reproduce tres rasgos del logo real:
 *  1. Tipografía geométrica redondeada (Fredoka) en lugar de una de
 *     terminales rectas. Es el rasgo que más define la marca.
 *  2. "flash" y "tag" en dos líneas muy juntas, con interlínea comprimida.
 *  3. "tag" alineado al borde DERECHO de "flash" — no a una sangría fija.
 *     Ese encastre es lo que hace que las dos palabras lean como un bloque.
 *
 * Cuando llegue el SVG: reemplazar el interior de <Wordmark> por el <svg>
 * y borrar este comentario. Nada más cambia — todo el sitio consume este
 * componente.
 */
function Wordmark({ stacked, light }: { stacked: boolean; light: boolean }) {
  /* Variante en blanco para fondos oscuros: las dos palabras en blanco. */
  const a = light ? "text-paper" : "text-ink";
  const b = light ? "text-paper" : "text-brand";
  if (!stacked) {
    return (
      <span className="font-[family-name:var(--font-logo)] text-[1em] font-semibold leading-none tracking-[-0.02em]">
        <span className={a}>flash</span>
        <span className={b}>tag</span>
      </span>
    );
  }

  return (
    <span
      /* items-end alinea "tag" al borde derecho de "flash", como el original.
         El pb reserva el descendente de la "g": con la interlínea comprimida
         que pide el logo, sin eso la cola queda cortada. */
      className="flex flex-col items-end pb-[0.16em] font-[family-name:var(--font-logo)] text-[1em] font-semibold leading-[0.8] tracking-[-0.02em]"
    >
      <span className={a}>flash</span>
      <span className={b}>tag</span>
    </span>
  );
}

export function Logo({
  className,
  variant = "stacked",
  href = "/",
  onClick,
  tone = "dark",
}: {
  className?: string;
  /** `stacked` es el logo real. `inline` solo donde no entra en dos líneas. */
  variant?: "inline" | "stacked";
  /** `null` renderiza el wordmark sin envolverlo en un link. */
  href?: string | null;
  onClick?: () => void;
  /** `light` sobre fondos oscuros. */
  tone?: "dark" | "light";
}) {
  const mark = <Wordmark stacked={variant === "stacked"} light={tone === "light"} />;

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
