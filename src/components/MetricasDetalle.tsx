import { Section } from "./ui/Section";
import { QRMark } from "./ui/QRMark";
import { consolidado, preguntasDelPanel } from "@/content/analitica";

/**
 * Secciones propias de /producto/metricas: la vista consolidada de toda la
 * cuenta y las preguntas de negocio que el panel contesta.
 *
 * El resumen se dibuja en código, como el resto de las maquetas: si la app
 * cambia la pantalla, se cambia acá. Nunca un PNG que envejece.
 */
export function MetricasDetalle() {
  return (
    <>
      <Section id="consolidado" className="border-t border-line bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QRMark size={12} /> Vista general
            </p>
            <h2 className="t-h2 mt-4 text-balance">{consolidado.titular}</h2>
            <p className="t-lead measure mt-5 text-muted">{consolidado.bajada}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {consolidado.filtros.map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-line bg-paper px-3 py-1.5 text-[0.8125rem] font-medium"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* La pantalla de estadísticas, dibujada con tokens */}
          <div
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="rounded-[var(--radius-surface)] border border-line bg-paper p-5 shadow-[var(--shadow-float)] lg:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-card)] bg-surface px-4 py-3">
              <span className="t-caption font-semibold text-muted">
                Período analizado
              </span>
              <span className="text-[0.875rem] font-semibold tnum">
                {consolidado.periodo}
              </span>
            </div>
            <dl className="mt-3">
              {consolidado.resumen.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between gap-4 border-b border-line py-3.5 last:border-0 last:pb-0"
                >
                  <dt className="flex items-center gap-2.5 text-[0.9375rem]">
                    <QRMark size={12} tone="muted" />
                    {r.label}
                  </dt>
                  <dd className="text-[1.125rem] font-semibold tnum">{r.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <div className="measure" data-reveal>
          <h2 className="t-h2 text-balance">
            Nadie entra al panel a mirar números. Entra a resolver una duda.
          </h2>
          <p className="t-lead mt-5 text-muted">
            Estas son las preguntas que un comercio se hace todas las semanas, y
            dónde está la respuesta.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {preguntasDelPanel.map((p, i) => (
            <li
              key={p.pregunta}
              data-reveal
              style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
              className="flex flex-col rounded-[var(--radius-surface)] border border-line bg-paper p-6 lg:p-7"
            >
              <h3 className="t-h3 text-[1.0625rem] text-balance">{p.pregunta}</h3>
              <p className="t-body mt-3 text-muted">{p.respuesta}</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
