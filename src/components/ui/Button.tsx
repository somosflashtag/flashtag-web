import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "lg" | "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] font-semibold " +
  "transition-[background-color,color,border-color,transform] duration-[120ms] ease-[var(--ease-ft)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-press active:bg-brand-press",
  secondary:
    "bg-transparent text-ink border border-line hover:border-ink hover:bg-surface",
  ghost: "bg-transparent text-ink hover:bg-surface",
};

/** Tap targets: mínimo 44px de alto en phone. */
const sizes: Record<Size, string> = {
  lg: "min-h-[52px] px-7 text-[1.0625rem]",
  md: "min-h-[44px] px-5 text-base",
  sm: "min-h-[38px] px-4 text-sm",
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
      className="transition-transform duration-[120ms] ease-[var(--ease-ft)] group-hover:translate-x-1"
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
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
