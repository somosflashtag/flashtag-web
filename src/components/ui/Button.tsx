import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * El botón del sitio: siempre píldora, sube un pelo al pasar y se hunde al
 * apretar. La variante se elige por el FONDO sobre el que va:
 *
 *   Sobre fondo claro            Sobre fondo oscuro (ink, foto)
 *   ───────────────────────      ──────────────────────────────
 *   primary   violeta (CTA)      oro      gold con texto ink (CTA)
 *   secondary borde ink          claro    borde blanco
 *   ghost     solo texto         blanco   blanco con texto ink
 *
 * Un solo CTA principal por bloque (`primary` u `oro`); el resto, secundarios.
 * Contraste: blanco sobre brand 7.1:1, ink sobre gold 9:1.
 */
type Variant = "primary" | "oro" | "blanco" | "secondary" | "claro" | "ghost";
type Size = "lg" | "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold " +
  "transition-[translate,scale,box-shadow,background-color,border-color,color] duration-500 ease-fluida " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white shadow-marca hover:bg-brand-press",
  oro: "bg-gold text-ink shadow-oro hover:bg-paper",
  blanco: "bg-paper text-ink hover:bg-gold",
  secondary: "border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.04]",
  claro: "border border-paper/35 bg-transparent text-paper hover:border-paper hover:bg-paper/10",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.06]",
};

/** Tap targets: mínimo 44px de alto en phone (`sm` es solo para el header de escritorio). */
const sizes: Record<Size, string> = {
  lg: "min-h-[52px] px-7 text-base sm:text-[1.0625rem]",
  md: "min-h-11 px-5 text-[0.9375rem]",
  sm: "min-h-10 px-4 text-sm",
};

/** La flecha es un elemento propio y se anima. Nunca "→" dentro del string. */
function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-500 ease-fluida group-hover:translate-x-1"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  external = false,
  className,
  onClick,
  type,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (!href) {
    return (
      <button type={type ?? "button"} onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  const isExternal = external || /^https?:\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
