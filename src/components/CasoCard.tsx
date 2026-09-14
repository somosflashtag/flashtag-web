import Image from "next/image";
import Link from "next/link";
import type { Caso } from "@/content/casos";
import { rubros } from "@/content/casos";

/**
 * Tarjeta de caso: cabecera violeta con el logo del comercio (los archivos
 * son monocromos en arena, hechos para ese fondo), métrica grande abajo.
 */
export function CasoCard({ caso: c }: { caso: Caso }) {
  const rubro = rubros.find((r) => r.id === c.rubro)?.label;
  return (
    <Link
      href={c.detalle ? `/casos/${c.slug}` : "/casos"}
      className="card-lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-paper"
    >
      <div className="surface-deep relative flex h-32 items-center justify-center px-8">
        <div aria-hidden="true" className="bg-dots-dark absolute inset-0 opacity-60" />
        {c.logo ? (
          <Image
            src={c.logo}
            alt={c.negocio}
            width={160}
            height={56}
            sizes="160px"
            className="relative h-auto w-auto max-h-14 max-w-[150px] object-contain"
          />
        ) : (
          <span className="relative text-center font-[family-name:var(--font-display)] text-xl font-semibold text-paper">
            {c.negocio}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="t-caption uppercase tracking-wide text-brand">{rubro}</p>
        <h3 className="t-h3 mt-2">{c.negocio}</h3>
        <p className="t-caption mt-1 text-muted">{c.ciudad}</p>
        {c.metricaVerificada && (
          <p className="t-h3 mt-5 text-brand tnum">{c.metrica}</p>
        )}
        <p className="t-body mt-3 flex-1 text-muted">{c.uso}</p>
        {c.detalle && (
          <span className="t-caption mt-5 inline-flex items-center gap-1.5 font-semibold text-ink">
            Leer el caso
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="transition-transform duration-[120ms] group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        )}
      </div>
    </Link>
  );
}
