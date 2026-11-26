import Image from "next/image";
import Link from "next/link";
import { Viaja } from "@/components/ui/Pagina";
import type { Caso } from "@/content/casos";
import { rubros } from "@/content/casos";

/**
 * Tarjeta de caso: toda en `ink` (los logos de clientes son monocromos en
 * arena y solo van sobre violeta), con la cifra del caso como protagonista.
 *
 * El logo VIAJA a la página del caso al navegar (`caso-<slug>`): por eso una
 * misma página no puede mostrar dos veces la tarjeta del mismo caso.
 * La cifra solo sale si `metricaVerificada`.
 */
export function CasoCard({ caso: c }: { caso: Caso }) {
  const rubro = rubros.find((r) => r.id === c.rubro)?.label;
  return (
    <Link
      href={c.detalle ? `/casos/${c.slug}` : "/casos"}
      className="group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] bg-ink p-6 text-paper transition-[translate,box-shadow] duration-500 ease-fluida hover:-translate-y-1.5 hover:shadow-[var(--shadow-device)] md:p-7"
    >
      <span
        aria-hidden="true"
        className="glow-brand absolute -right-20 -top-24 size-[300px] transition-transform duration-700 ease-fluida group-hover:scale-125"
      />
      <div className="relative flex items-start justify-between gap-3">
        <Viaja nombre={`caso-${c.slug}`}>
          <div className="flex h-14 items-center">
            {c.logo ? (
              <Image
                src={c.logo}
                alt={c.negocio}
                width={160}
                height={56}
                sizes="150px"
                className="h-auto max-h-14 w-auto max-w-[140px] object-contain"
              />
            ) : (
              <span className="font-display text-xl font-bold leading-tight tracking-[-0.03em]">{c.negocio}</span>
            )}
          </div>
        </Viaja>
        {rubro && <span className="vidrio-claro shrink-0 rounded-full px-3 py-1 text-[12px] font-bold">{rubro}</span>}
      </div>

      <div className="relative mt-auto pt-10">
        {c.metricaVerificada && (
          <p className="font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] text-gold tnum">{c.metrica}</p>
        )}
        <h3 className="mt-3 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.03em]">{c.negocio}</h3>
        <p className="mt-0.5 text-sm text-paper/65">{c.ciudad}</p>
        <p className="mt-3 text-[15px] leading-snug text-paper/85">{c.uso}</p>
        {c.detalle && (
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-gold transition-[gap] duration-300 group-hover:gap-3.5">
            Leer el caso
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </Link>
  );
}
