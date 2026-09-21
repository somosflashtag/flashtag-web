import Link from "next/link";
import { QRMark } from "./ui/QRMark";
import { Section } from "./ui/Section";
import {
  analitica,
  analiticaPara,
  capacidadesPublicadas,
  datosMedidos,
  integraciones,
} from "@/content/analitica";
import { cn } from "@/lib/cn";

/** El mismo chip de plan que usan el tour y las páginas de producto. */
function DesdePlan({ plan }: { plan: string }) {
  return (
    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
      Desde {plan}
    </span>
  );
}

/**
 * Bloque de analítica. Un solo componente para la home y para cada página de
 * /producto: el copy de arriba cambia según el feature (`slug`), la grilla de
 * datos medidos y las integraciones son las mismas en todos lados.
 *
 * Un dato, una fuente: todo sale de content/analitica.ts. Si acá aparece un
 * número o una integración escrita a mano, es un bug.
 */
export function Analitica({
  slug,
  className,
}: {
  slug?: string;
  className?: string;
}) {
  const f = slug ? analiticaPara(slug) : undefined;
  const titular = f?.titular ?? analitica.titular;
  const bajada = f?.bajada ?? analitica.bajada;

  return (
    <Section id="analitica" className={cn("border-t border-line", className)}>
      <div className="measure" data-reveal>
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark size={12} /> {analitica.eyebrow}
        </p>
        <h2 className="t-h2 mt-4 text-balance">{titular}</h2>
        <p className="t-lead mt-5 text-muted">{bajada}</p>
      </div>

      {/* Lo que queda registrado en cada escaneo */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
        {datosMedidos.map((d, i) => (
          <li
            key={d.titulo}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
            className="rounded-[var(--radius-card)] border border-line bg-paper p-6"
          >
            <QRMark size={13} />
            <h3 className="t-h3 mt-4 text-[1.0625rem]">{d.titulo}</h3>
            <p className="t-body mt-2 text-muted">{d.texto}</p>
          </li>
        ))}
      </ul>

      {/* Qué hacés con el dato una vez que está adentro */}
      {capacidadesPublicadas.length > 0 && (
        <div
          data-reveal
          className="mt-5 rounded-[var(--radius-surface)] border border-line bg-paper p-6 lg:p-8"
        >
          <h3 className="t-h3">Y lo leés como te sirve</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {capacidadesPublicadas.map((c) => (
              <li key={c.titulo} className="flex gap-3">
                <QRMark size={12} tone="muted" className="mt-1.5" />
                <div>
                  <p className="flex flex-wrap items-center gap-2 text-[0.9375rem] font-semibold">
                    {c.titulo}
                    {c.desde && <DesdePlan plan={c.desde} />}
                  </p>
                  <p className="t-body mt-1 text-muted">{c.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-2 lg:gap-8">
        {/* Qué decidís con eso — solo cuando el bloque está en un producto */}
        {f && (
          <div
            data-reveal
            className="rounded-[var(--radius-surface)] border border-line bg-paper p-6 lg:p-8"
          >
            <h3 className="t-h3">Qué decidís con eso</h3>
            <ul className="mt-6 space-y-4">
              {f.foco.map((t) => (
                <li key={t} className="flex gap-3 border-b border-line pb-4 last:border-0 last:pb-0">
                  <QRMark size={12} tone="muted" className="mt-1.5" />
                  <span className="t-body text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Puente a /producto/pixeles. El detalle de cada campo vive allá:
            repetirlo acá hacía que las dos páginas pelearan la misma búsqueda. */}
        <div
          data-reveal
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
          className={cn(
            "flex flex-col rounded-[var(--radius-surface)] border border-line bg-paper p-6 lg:p-8",
            !f && "lg:col-span-2",
          )}
        >
          <h3 className="t-h3 flex flex-wrap items-center gap-3">
            {integraciones.titulo}
            <DesdePlan plan={integraciones.desde} />
          </h3>
          <p className="t-body measure mt-3 text-muted">{integraciones.texto}</p>
          <Link
            href={integraciones.href}
            className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-[0.9375rem] font-semibold"
          >
            {integraciones.cta}
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="transition-transform duration-[120ms] group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </Section>
  );
}
