import Link from "next/link";
import { Section } from "./ui/Section";
import { QRMark } from "./ui/QRMark";
import {
  beneficios,
  campos,
  eventos,
  herramientas,
  privacidad,
  puenteMetricas,
} from "@/content/pixeles";

/**
 * Secciones propias de /producto/pixeles: los beneficios, los tres campos
 * de ID tal cual están en la app y qué evento llega a cada herramienta.
 * Sin logos de Google ni de Meta: solo nombres de producto (AGENTS.md §7).
 */
export function PixelesDetalle() {
  return (
    <>
      <Section id="beneficios" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> Beneficios
          </p>
          <h2 className="t-h2 mt-4 text-balance">Lo que pasa en el local, medido como una campaña</h2>
          <p className="t-lead mx-auto mt-4 text-muted">
            Hasta ahora el cartel y el flyer eran la parte del marketing que no
            se podía medir. Con el píxel conectado, un escaneo vale lo mismo que
            un clic en un anuncio: entra a tus públicos, a tus embudos y a tus
            informes.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {beneficios.map((b, i) => (
            <li
              key={b.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="rounded-[var(--radius-surface)] border border-line bg-paper p-6 lg:p-8"
            >
              <QRMark size={16} />
              <h3 className="t-h3 mt-5">{b.titulo}</h3>
              <p className="t-body mt-2 text-muted">{b.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="campos">
        {/* Badges tipográficos, no logos: los kits de Google y Meta no están
            autorizados por escrito (AGENTS.md §7). */}
        <ul className="grid gap-4 sm:grid-cols-3" data-reveal>
          {herramientas.map((h, i) => (
            <li
              key={h.sigla}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="relative rounded-[var(--radius-surface)] border border-line bg-paper p-6"
            >
              <span
                aria-hidden="true"
                className="absolute right-5 top-5 flex size-5 items-center justify-center rounded-full bg-brand"
              >
                <svg viewBox="0 0 12 12" width="9" height="9" fill="none">
                  <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="flex h-11 w-fit items-center rounded-[var(--radius-btn)] bg-ink px-3 text-[15px] font-bold tracking-tight text-paper">
                {h.sigla}
              </span>
              <p className="mt-4 font-semibold">{h.nombre}</p>
              <p className="t-body mt-1 text-muted">{h.que}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:mt-16">
          <div data-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QRMark size={12} /> Tres campos
            </p>
            <h2 className="t-h2 mt-4 text-balance">Pegás el ID y listo</h2>
            <p className="t-lead mt-4 text-muted">
              Usás uno, dos o los tres. Si ya tenés un contenedor de Tag
              Manager, con ese alcanza: todo lo que tengas adentro se dispara
              también desde tus QR.
            </p>
            <p className="t-body mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-muted">
              {privacidad}
            </p>
            <p className="t-body mt-6 text-muted">
              {puenteMetricas.texto}{" "}
              <Link
                href={puenteMetricas.href}
                className="font-semibold text-ink underline underline-offset-4"
              >
                {puenteMetricas.cta}
              </Link>
              .
            </p>
          </div>

          <ol className="space-y-4" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            {campos.map((c) => (
              <li
                key={c.label}
                className="rounded-[var(--radius-surface)] border border-line bg-paper p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="t-h3">{c.label}</h3>
                  <code className="rounded-md bg-surface px-2 py-1 font-mono text-[13px] text-ink tnum">
                    {c.formato}
                  </code>
                </div>
                <p className="t-body mt-3 text-muted">{c.para}</p>
                <p className="t-caption mt-3 text-muted">Dónde está: {c.donde}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section id="eventos" className="border-t border-line bg-surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div data-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QRMark size={12} /> Qué llega
            </p>
            <h2 className="t-h2 mt-4 text-balance">Cada escaneo, cada visita, cada clic</h2>
            <p className="t-lead mt-4 text-muted">
              Los mismos eventos que ves en las métricas de FlashTag, ahora
              también en tus herramientas. Y desde ahí, armás lo que quieras.
            </p>
          </div>
          <ul className="space-y-3" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            {eventos.map((e) => (
              <li
                key={e.nombre}
                className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-paper p-5"
              >
                <span className="mt-2 size-2.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                <div>
                  <p className="text-[1.0625rem] font-semibold leading-tight">{e.nombre}</p>
                  <p className="t-body mt-1.5 text-muted">{e.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
