import Link from "next/link";
import type { Articulo } from "@/content/blog";
import { cn } from "@/lib/cn";

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });

/**
 * Tarjeta de artículo del blog. `destacada`: la primera del índice, en ink y
 * a todo el ancho; el resto, claras.
 */
export function ArticuloCard({ articulo: a, destacada = false }: { articulo: Articulo; destacada?: boolean }) {
  return (
    <Link
      href={`/blog/${a.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] p-6 transition-[translate,box-shadow] duration-500 ease-fluida hover:-translate-y-1.5 md:p-8",
        destacada
          ? "min-h-[340px] justify-end bg-ink text-paper hover:shadow-[var(--shadow-device)] md:min-h-[400px] md:p-12"
          : "min-h-[300px] bg-brand-soft/70 hover:shadow-[var(--shadow-float)]",
      )}
    >
      {destacada && (
        <span
          aria-hidden="true"
          className="glow-brand absolute -right-24 -top-28 size-[460px] transition-transform duration-700 ease-fluida group-hover:scale-110"
        />
      )}
      <p className={cn("relative self-start", destacada ? "eyebrow-noche" : "eyebrow !bg-paper")}>{a.categoria}</p>
      <h2
        className={cn(
          "relative font-display font-bold tracking-[-0.035em]",
          destacada
            ? "mt-5 max-w-[22ch] text-balance text-[1.75rem] leading-[1.06] md:text-[2.75rem]"
            : "mt-4 text-[1.375rem] leading-[1.15]",
        )}
      >
        {a.titulo}
      </h2>
      <p className={cn("relative mt-3 text-[15px] leading-relaxed", destacada ? "max-w-[60ch] text-paper/80 md:text-[1.0625rem]" : "flex-1 text-muted")}>
        {a.bajada}
      </p>
      <p className={cn("relative mt-5 flex flex-wrap items-center gap-x-2 text-sm", destacada ? "text-paper/70" : "text-muted")}>
        <time dateTime={a.fecha}>{fmt.format(new Date(a.fecha))}</time>
        <span aria-hidden="true">·</span>
        <span className="tnum">{a.minutos} min de lectura</span>
        <span className={cn("ml-auto inline-flex items-center gap-2 font-bold transition-[gap] duration-300 group-hover:gap-3.5", destacada ? "text-gold" : "text-brand")}>
          Leer
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </p>
    </Link>
  );
}
