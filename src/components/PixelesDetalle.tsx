import Link from "next/link";
import { pantallasPilares } from "./app/panel";
import { Glifo, type GlifoId } from "./ui/Glifo";
import { Seccion } from "./ui/Seccion";
import { Titulo } from "./ui/Titulo";
import {
  beneficios,
  beneficiosIntro,
  campos,
  camposIntro,
  eventos,
  eventosIntro,
  herramientas,
  privacidad,
  puenteMetricas,
} from "@/content/pixeles";
import { cn } from "@/lib/cn";

/** Una tarjeta de color y un ícono por beneficio, en el orden de `beneficios`. */
const tarjetas: { tono: string; glifo: GlifoId }[] = [
  { tono: "dato-brand", glifo: "persona" },
  { tono: "dato-coral", glifo: "cartel" },
  { tono: "dato-teal", glifo: "barras" },
];

/** Un ícono por evento, en el orden de `eventos`. */
const glifosEventos: GlifoId[] = ["link", "qr", "objetivo"];

const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/** La pantalla "Seguimiento" del panel: la misma que muestra la home. */
const PantallaSeguimiento = pantallasPilares.pixeles;

/**
 * Secciones propias de /producto/pixeles: los beneficios, los tres campos
 * de ID tal cual están en la app y qué evento llega a cada herramienta.
 * Sin logos de Google ni de Meta: solo nombres de producto y badges
 * tipográficos (AGENTS.md §7).
 */
export function PixelesDetalle() {
  return (
    <>
      <Seccion id="beneficios" tono="arena" ariaLabelledby="beneficios-titulo">
        <Titulo
          id="beneficios-titulo"
          etiqueta={beneficiosIntro.etiqueta}
          titulo={beneficiosIntro.titular}
          bajada={beneficiosIntro.bajada}
        />
        <ul className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {beneficios.map((b, i) => {
            const { tono, glifo } = tarjetas[i % tarjetas.length];
            return (
              <li
                key={b.titulo}
                data-reveal
                style={retraso(i * 90)}
                className={cn("group relative overflow-hidden rounded-[2rem] p-6 text-paper lg:p-8", tono)}
              >
                <i
                  aria-hidden="true"
                  className="absolute -bottom-14 -right-12 size-[180px] rounded-full bg-white/10 transition-transform duration-700 ease-fluida group-hover:scale-125"
                />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-white/20">
                  <Glifo id={glifo} size={22} />
                </span>
                <h3 className="relative mt-5 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">{b.titulo}</h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-white/90">{b.texto}</p>
              </li>
            );
          })}
        </ul>
      </Seccion>

      <Seccion id="campos" ariaLabelledby="campos-titulo">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Titulo
              alineado="izq"
              id="campos-titulo"
              etiqueta={camposIntro.etiqueta}
              titulo={camposIntro.titular}
              bajada={camposIntro.bajada}
            />
            <p data-reveal className="mt-6 flex gap-3.5 rounded-[1.5rem] bg-brand-soft/70 p-5 text-[15px] leading-relaxed">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-paper">
                <Glifo id="escudo" size={18} />
              </span>
              {privacidad}
            </p>
            <p data-reveal className="mt-5 text-[15px] leading-relaxed text-muted">
              {puenteMetricas.texto}{" "}
              <Link href={puenteMetricas.href} className="font-bold text-brand underline underline-offset-4">
                {puenteMetricas.cta}
              </Link>
              .
            </p>
          </div>

          {/* Badges tipográficos, no logos: los kits de Google y Meta no están
              autorizados por escrito (AGENTS.md §7). */}
          <ol className="grid gap-4">
            {campos.map((c, i) => {
              const h = herramientas.find((x) => x.sigla === c.sigla);
              return (
                <li key={c.label} data-reveal style={retraso(i * 90)} className="rounded-[2rem] bg-brand-soft/70 p-6 lg:p-7">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl bg-ink px-3 font-display text-[15px] font-bold tracking-tight text-paper">
                      {c.sigla}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.25rem] font-bold leading-tight tracking-[-0.025em]">{c.label}</h3>
                      {h && <p className="mt-0.5 text-[14px] leading-snug text-muted">{h.que}</p>}
                    </div>
                  </div>
                  <code className="mt-5 flex min-h-11 items-center rounded-xl bg-paper px-4 font-mono text-[14px] tracking-wide tnum">
                    {c.formato}
                  </code>
                  <p className="mt-4 text-[15px] leading-relaxed">{c.para}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">
                    <b className="font-semibold text-ink">Dónde está:</b> {c.donde}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Seccion>

      <Seccion id="eventos" tono="noche" ariaLabelledby="eventos-titulo">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <Titulo
              claro
              alineado="izq"
              id="eventos-titulo"
              etiqueta={eventosIntro.etiqueta}
              titulo={eventosIntro.titular}
              bajada={eventosIntro.bajada}
            />
            <ul className="mt-7 grid gap-3 md:mt-9">
              {eventos.map((e, i) => (
                <li key={e.nombre} data-reveal style={retraso(i * 80)} className="vidrio-claro flex gap-4 rounded-[1.5rem] p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold text-ink">
                    <Glifo id={glifosEventos[i] ?? "check"} size={19} />
                  </span>
                  <div>
                    <p className="font-display text-[1.0625rem] font-bold leading-tight tracking-[-0.015em]">{e.nombre}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-paper/85">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* La app en código (AGENTS.md §5): la matriz de qué se manda a dónde. */}
          {PantallaSeguimiento && (
            <figure
              data-reveal="zoom"
              aria-label="Pantalla de ejemplo: qué evento se manda a cada herramienta"
              className="rounded-[2rem] bg-paper p-5 text-ink shadow-[var(--shadow-device)] sm:p-7 lg:rotate-1"
            >
              <div aria-hidden="true" className="mb-4 flex gap-1.5">
                <i className="size-2.5 rounded-full bg-line" />
                <i className="size-2.5 rounded-full bg-line" />
                <i className="size-2.5 rounded-full bg-line" />
              </div>
              <PantallaSeguimiento />
            </figure>
          )}
        </div>
      </Seccion>
    </>
  );
}
