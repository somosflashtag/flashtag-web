import { Glifo, type GlifoId } from "./ui/Glifo";
import { Seccion } from "./ui/Seccion";
import { Titulo } from "./ui/Titulo";
import {
  beneficios,
  beneficiosIntro,
  consolidado,
  dondeSeVe,
  preguntasDelPanel,
  preguntasIntro,
} from "@/content/analitica";
import { cn } from "@/lib/cn";

/** Un ícono por beneficio, en el orden de `beneficios`. */
const glifosBeneficios: GlifoId[] = ["persona", "cartel", "alerta", "repetir", "barras", "objetivo"];

/** Un ícono por lugar, en el orden de `dondeSeVe.items`. */
const glifosDonde: GlifoId[] = ["barras", "cartel", "celular"];

const tonosIcono = ["bg-brand text-paper", "bg-gold text-ink", "bg-teal text-paper", "bg-coral text-paper", "bg-ink text-paper"] as const;

const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Secciones propias de /producto/metricas: por qué conviene medir, la vista
 * consolidada de toda la cuenta y las preguntas de negocio que contesta.
 *
 * El orden es el argumento: primero por qué te sirve, después dónde está, y
 * recién al final qué pregunta te contesta cada pantalla.
 *
 * `casos`: los casos de uso de la feature (`features.ts`). En métricas son
 * las mismas dudas que abre la tercera sección, así que entran ahí como
 * píldoras en vez de tener una sección aparte.
 *
 * El resumen se dibuja en código, como el resto de las maquetas: si la app
 * cambia la pantalla, se cambia acá. Nunca un PNG que envejece.
 */
export function MetricasDetalle({ casos = [] }: { casos?: string[] }) {
  return (
    <>
      <Seccion id="por-que-medir" tono="lila" ariaLabelledby="por-que-medir-titulo">
        <Titulo id="por-que-medir-titulo" titulo={beneficiosIntro.titular} bajada={beneficiosIntro.bajada} />
        <ul className="carrusel mt-9 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {beneficios.map((b, i) => (
            <li key={b.titulo} data-reveal style={retraso((i % 3) * 80)} className="rounded-[2rem] bg-paper p-6 lg:p-7">
              <span className={cn("flex size-12 items-center justify-center rounded-2xl", tonosIcono[i % tonosIcono.length])}>
                <Glifo id={glifosBeneficios[i] ?? "check"} size={22} />
              </span>
              <h3 className="mt-5 text-balance font-display text-[1.25rem] font-bold leading-tight tracking-[-0.025em]">{b.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.texto}</p>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="consolidado" tono="noche" ariaLabelledby="consolidado-titulo">
        <div className="grid items-center gap-9 lg:grid-cols-2 lg:gap-14">
          <div>
            <Titulo
              claro
              alineado="izq"
              id="consolidado-titulo"
              etiqueta={consolidado.etiqueta}
              titulo={consolidado.titular}
              bajada={consolidado.bajada}
            />
            <ul data-reveal className="mt-7 flex flex-wrap gap-2">
              {consolidado.filtros.map((f) => (
                <li key={f} className="vidrio-claro rounded-full px-3.5 py-2 text-[13px] font-semibold">
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* La pantalla de estadísticas, dibujada con tokens */}
          <div data-reveal="zoom" className="rounded-[2rem] bg-paper p-5 text-ink shadow-[var(--shadow-device)] sm:p-7 lg:-rotate-1">
            <div className="flex items-center justify-between gap-3">
              <div aria-hidden="true" className="flex gap-1.5">
                <i className="size-2.5 rounded-full bg-line" />
                <i className="size-2.5 rounded-full bg-line" />
                <i className="size-2.5 rounded-full bg-line" />
              </div>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[11px] font-bold text-muted">{consolidado.aviso}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 rounded-2xl bg-brand-soft px-4 py-3">
              <span className="text-[13px] font-semibold text-muted">{consolidado.periodoLabel}</span>
              <span className="text-sm font-bold tnum">{consolidado.periodo}</span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {consolidado.resumen.map((r) => (
                <div key={r.label} className="flex flex-col-reverse justify-end rounded-2xl bg-surface/60 p-4">
                  <dt className="mt-1.5 text-[13px] leading-snug text-muted">{r.label}</dt>
                  <dd className="font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em] tnum sm:text-[2.25rem]">{r.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-10 md:mt-16">
          <h3 data-reveal="blur" className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em] md:text-[1.75rem]">
            {dondeSeVe.titulo}
          </h3>
          <ul className="carrusel carrusel-angosto mt-5 grid gap-4 md:grid-cols-3">
            {dondeSeVe.items.map((d, i) => (
              <li key={d.titulo} data-reveal style={retraso(i * 80)} className="vidrio-claro rounded-[1.5rem] p-5 lg:p-6">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-gold text-ink">
                  <Glifo id={glifosDonde[i] ?? "check"} size={20} />
                </span>
                <p className="mt-4 font-display text-[1.125rem] font-bold leading-tight tracking-[-0.02em]">{d.titulo}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-paper/85">{d.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </Seccion>

      <Seccion id="preguntas" tono="arena" ariaLabelledby="preguntas-titulo">
        <Titulo
          tamano="chico"
          id="preguntas-titulo"
          etiqueta={casos.length > 0 ? preguntasIntro.etiqueta : undefined}
          titulo={preguntasIntro.titular}
          bajada={preguntasIntro.bajada}
        />

        {casos.length > 0 && (
          <ul data-reveal aria-label={preguntasIntro.etiqueta} className="mx-auto mt-7 flex max-w-4xl flex-wrap justify-center gap-2">
            {casos.map((c) => (
              <li key={c} className="flex items-center gap-2 rounded-full bg-paper py-2 pl-2.5 pr-4 text-[14px] font-semibold leading-snug">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-paper">
                  <Glifo id="check" size={13} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        )}

        <ul className="carrusel mt-9 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {preguntasDelPanel.map((p, i) => (
            <li key={p.pregunta} data-reveal style={retraso((i % 3) * 80)} className="flex flex-col rounded-[2rem] bg-paper p-6 lg:p-7">
              <span
                aria-hidden="true"
                className="flex size-10 items-center justify-center rounded-full bg-brand-soft font-display text-[1.125rem] font-bold text-brand"
              >
                ?
              </span>
              <h3 className="mt-4 text-balance font-display text-[1.25rem] font-bold leading-[1.15] tracking-[-0.025em]">{p.pregunta}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.respuesta}</p>
            </li>
          ))}
        </ul>
      </Seccion>
    </>
  );
}
