import Image from "next/image";
import Link from "next/link";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Mock } from "@/components/app/mocks";
import { pantallasPilares } from "@/components/app/panel";
import { Button } from "@/components/ui/Button";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import type { Feature } from "@/content/features";
import { fotos } from "@/content/fotos";
import { planes, type Plan } from "@/content/planes";
import { cn } from "@/lib/cn";

/**
 * Las secciones que comparten TODAS las páginas de /producto/[slug]. El
 * detalle propio de cada feature (formatos, modalidades, campos del píxel…)
 * vive en su componente; acá está lo que la plantilla arma sola con lo que
 * hay en `content/features.ts` y `content/planes.ts`.
 */

/** Sin `glifo` en features.ts, la feature sale con este. */
export const glifoDe = (f: Feature): GlifoId => f.glifo ?? "chispa";

/** Para escalonar la entrada de una lista. */
const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/* ── Hero: lo que va al lado del titular ───────────────────────────── */

/**
 * Con maqueta de teléfono (`mock`), el teléfono, apenas inclinado. Sin ella,
 * la pantalla del panel de escritorio (`pantalla`) dentro de una tarjeta
 * clara. Devuelve `undefined` si la feature no trae ninguna de las dos, y el
 * hero pasa a una sola columna.
 *
 * En celular y tablet el teléfono va debajo del texto y se hunde en el borde
 * del hero: se ve la parte de arriba de la pantalla, que es la que cuenta.
 */
export function visualDe(f: Feature): React.ReactNode {
  if (f.mock) {
    return (
      <div aria-hidden="true" className="relative mx-auto w-full max-w-[300px] rotate-2 text-ink max-lg:-mb-52 lg:rotate-3">
        <PhoneFrame className="ft-float [&>div:last-child]:ring-1 [&>div:last-child]:ring-paper/25">
          <Mock id={f.mock} />
        </PhoneFrame>
      </div>
    );
  }
  const Pantalla = f.pantalla ? pantallasPilares[f.pantalla] : undefined;
  if (!Pantalla) return undefined;
  return (
    <figure
      aria-label={`${f.nombre}: pantalla de ejemplo de la app`}
      className="mx-auto w-full max-w-[520px] rounded-[2rem] bg-paper p-4 text-ink shadow-[var(--shadow-device)] sm:p-6 lg:rotate-1"
    >
      <div aria-hidden="true" className="mb-4 flex gap-1.5">
        <i className="size-2.5 rounded-full bg-line" />
        <i className="size-2.5 rounded-full bg-line" />
        <i className="size-2.5 rounded-full bg-line" />
      </div>
      <Pantalla />
    </figure>
  );
}

/* ── Cómo funciona ─────────────────────────────────────────────────── */

const tonosPaso = ["paso-brand", "paso-coral", "paso-teal"] as const;

export function Pasos({ f }: { f: Feature }) {
  return (
    <Seccion id="como-funciona" ariaLabelledby="como-funciona-titulo">
      <Titulo
        id="como-funciona-titulo"
        titulo={
          <>
            Cómo funciona, <span className="text-brand">paso a paso</span>
          </>
        }
      />
      <ol className="carrusel carrusel-ancho mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
        {f.pasos.map((p, i) => (
          <li
            key={p.titulo}
            data-reveal
            style={retraso(i * 90)}
            className={cn(
              "group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-paper lg:min-h-[400px] lg:p-8",
              tonosPaso[i % tonosPaso.length],
            )}
          >
            <i
              aria-hidden="true"
              className="absolute -right-12 -top-14 size-[200px] rounded-full bg-white/15 transition-transform duration-700 ease-fluida group-hover:scale-125"
            />
            <span
              aria-hidden="true"
              className="absolute left-6 top-4 font-display text-[5.5rem] font-bold leading-none tracking-[-0.06em] tnum lg:left-8 lg:top-5 lg:text-[7rem]"
            >
              {i + 1}
            </span>
            {/* Abajo siempre termina en ink: el texto pasa AA con cualquier largo. */}
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-ink from-30% via-ink/75 to-transparent" />
            <div className="relative">
              <h3 className="font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em]">{p.titulo}</h3>
              <p className="mt-2 text-[15px] leading-snug text-paper/85">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>

      {f.ampliacion && (
        <div data-reveal className="mt-4 flex flex-col gap-4 rounded-[2rem] bg-brand-soft/70 p-6 sm:flex-row sm:items-center sm:gap-5 md:p-8">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand text-paper">
            <Glifo id="chispa" size={22} />
          </span>
          <p className="t-lead">{f.ampliacion}</p>
        </div>
      )}
    </Seccion>
  );
}

/* ── Para qué lo usan ──────────────────────────────────────────────── */

export function Usos({ f }: { f: Feature }) {
  const foto = fotos[f.foto ?? "dueno"];
  return (
    <Seccion tono="lila" id="usos" ariaLabelledby="usos-titulo">
      <div className="grid gap-7 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:grid-rows-[auto_1fr] md:gap-x-10 lg:gap-x-14">
        <Titulo alineado="izq" id="usos-titulo" titulo="Para qué lo usan" className="md:col-start-2 md:row-start-1" />

        <figure
          data-reveal="zoom"
          className="foto-a relative aspect-[4/5] overflow-hidden bg-ink text-paper sm:aspect-[3/2] md:col-start-1 md:row-span-2 md:row-start-1 md:aspect-auto md:min-h-[480px]"
        >
          <Image
            src={foto.src}
            alt={foto.alt}
            fill
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 40vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
          <span aria-hidden="true" className="velo absolute inset-0" />
          <span className="vidrio absolute left-5 top-5 flex items-center gap-2 rounded-full py-1.5 pl-2.5 pr-3.5 text-[13px] font-bold">
            <Glifo id={glifoDe(f)} size={15} className="text-gold" />
            {f.nombre}
          </span>
          <figcaption className="absolute inset-x-0 bottom-0 max-w-[76%] p-6 font-display text-[1.5rem] font-bold leading-[1.1] tracking-[-0.035em] lg:p-8 lg:text-[1.75rem]">
            {f.corto}
          </figcaption>
        </figure>

        <div className="md:col-start-2 md:row-start-2">
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {f.casos.map((c, i) => (
              <li
                key={c}
                data-reveal
                style={retraso(i * 70)}
                className="flex items-center gap-3 rounded-[1.5rem] bg-paper p-5 text-[1.0625rem] font-semibold leading-snug sm:last:odd:col-span-2 md:last:odd:col-span-1 lg:last:odd:col-span-2"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand text-paper">
                  <Glifo id="check" size={15} />
                </span>
                {c}
              </li>
            ))}
          </ul>

          {f.analogia && (
            <div data-reveal className="dato-brand mt-3 rounded-[1.5rem] p-6 text-paper lg:p-7">
              <span className="vidrio-claro inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em]">
                <Glifo id="chispa" size={13} />
                En una frase
              </span>
              <p className="mt-4 font-display text-[1.25rem] font-semibold leading-[1.25] tracking-[-0.02em] lg:text-[1.375rem]">
                {f.analogia}
              </p>
            </div>
          )}
        </div>
      </div>
    </Seccion>
  );
}

/* ── En qué plan entra ─────────────────────────────────────────────── */

const precioDe = (p: Plan) => (p.precioMensual === 0 ? "Gratis" : `USD ${p.precioMensual}/mes`);

const enMinuscula = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);

/** Los renglones de un plan que hablan de la feature (ver `Feature.planes`). */
function renglonesDe(plan: Plan, claves: string[]) {
  const vistos = new Set<string>();
  return claves.flatMap((clave) => {
    const r = plan.features.find((x) => x.label.toLowerCase().includes(clave.toLowerCase()));
    if (!r || vistos.has(r.label)) return [];
    vistos.add(r.label);
    return [r];
  });
}

/**
 * Qué trae cada plan para ESTA feature. Todo sale de `planes.ts`: nombre,
 * precio, para quién es y los renglones que `Feature.planes` señala. Sin
 * `planes`, se muestra solo el plan de entrada.
 */
export function EnQuePlan({ f }: { f: Feature }) {
  const entrada = planes.find((p) => p.nombre === f.desde);
  if (!entrada) return null;

  const escalera = f.planes
    ? planes.map((p) => ({ plan: p, renglones: renglonesDe(p, f.planes!) }))
    : [{ plan: entrada, renglones: [] }];
  const sola = escalera.length === 1;

  return (
    <Seccion tono="noche" id="plan" ariaLabelledby="plan-titulo">
      <div className="grid gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
        <div>
          <Titulo
            claro
            alineado="izq"
            id="plan-titulo"
            etiqueta="En qué plan entra"
            titulo={
              <>
                Incluido desde el plan <span className="text-gold">{entrada.nombre}</span>
              </>
            }
            bajada={
              <>
                <b className="font-semibold text-paper">{precioDe(entrada)}</b>. Pensado para {enMinuscula(entrada.paraQuien)}.
              </>
            }
          />
          <div data-reveal className="mt-7 flex flex-col sm:flex-row md:mt-9">
            <Button href="/precios" variant="oro" size="lg" arrow>
              Comparar planes
            </Button>
          </div>
        </div>

        <ul className={cn("grid gap-3", !sola && "sm:grid-cols-2")}>
          {escalera.map(({ plan, renglones }, i) => {
            const esEntrada = plan.id === entrada.id;
            return (
              <li
                key={plan.id}
                data-reveal
                style={retraso(i * 70)}
                className={cn("relative rounded-[1.5rem] p-5 lg:p-6", esEntrada ? "bg-paper text-ink" : "vidrio-claro")}
              >
                {/* La marca del plan va montada sobre el borde de arriba. */}
                {esEntrada && !sola ? (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold leading-none text-paper lg:left-6">
                    Desde acá
                  </span>
                ) : plan.destacado && !sola ? (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold leading-none text-ink lg:left-6">
                    Más elegido
                  </span>
                ) : null}
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-[1.375rem] font-bold leading-none tracking-[-0.03em]">{plan.nombre}</h3>
                  <span className={cn("text-[14px] font-bold tnum", esEntrada ? "text-brand" : "text-paper")}>{precioDe(plan)}</span>
                </div>

                {renglones.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {renglones.map((r) => (
                      <li key={r.label} className={cn("flex gap-2.5 text-[15px] leading-snug", !r.incluido && (esEntrada ? "text-muted" : "text-paper/75"))}>
                        {r.incluido ? (
                          <Glifo id="check" size={17} className={cn("mt-px shrink-0", esEntrada ? "text-brand" : "text-gold")} />
                        ) : (
                          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" aria-hidden="true" className="mt-px shrink-0">
                            <path d="M7 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        )}
                        <span>
                          {!r.incluido && <span className="sr-only">No incluye: </span>}
                          {r.label}
                          {r.nota && (
                            <span className={cn("block text-[13px]", esEntrada ? "text-muted" : "text-paper/75")}>{r.nota}</span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={cn("mt-3 text-[15px] leading-snug", esEntrada ? "text-muted" : "text-paper/75")}>{plan.paraQuien}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Seccion>
  );
}

/* ── El resto de la app ────────────────────────────────────────────── */

const tonosIcono = ["bg-brand text-paper", "bg-gold text-ink", "bg-teal text-paper", "bg-coral text-paper", "bg-ink text-paper"] as const;

export function RestoDeLaApp({ otras }: { otras: Feature[] }) {
  return (
    <Seccion id="resto" ariaLabelledby="resto-titulo">
      <Titulo
        id="resto-titulo"
        titulo={
          <>
            El resto <span className="text-brand">de la app</span>
          </>
        }
      />
      <ul className="carrusel carrusel-angosto mt-9 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {otras.map((o, i) => (
          <li key={o.slug} data-reveal style={retraso((i % 3) * 70)}>
            <Link
              href={`/producto/${o.slug}`}
              className="group flex h-full min-h-[212px] flex-col rounded-[2rem] bg-brand-soft/70 p-6 transition-[translate,background-color,box-shadow] duration-500 ease-fluida hover:-translate-y-1.5 hover:bg-brand-soft hover:shadow-[var(--shadow-float)]"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 ease-fluida group-hover:-rotate-6 group-hover:scale-105",
                  tonosIcono[i % tonosIcono.length],
                )}
              >
                <Glifo id={glifoDe(o)} size={22} />
              </span>
              <b className="mt-5 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.025em]">{o.nombre}</b>
              <span className="mt-1.5 text-[15px] leading-snug text-muted">{o.corto}</span>
              <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-[13px] font-bold text-brand">
                Desde {o.desde}
                <svg
                  viewBox="0 0 16 16"
                  width="16"
                  height="16"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-500 ease-fluida group-hover:translate-x-1"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Seccion>
  );
}
