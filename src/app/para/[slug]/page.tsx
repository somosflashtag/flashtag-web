import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { telefonosRubro } from "@/components/app/panel";
import { Burbujas } from "@/components/home/Burbujas";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina, Viaja } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { casosPublicables } from "@/content/casos";
import { featurePorSlug } from "@/content/features";
import { rubrosIntro } from "@/content/home";
import { planes } from "@/content/planes";
import { paginasRubro, type Momento, type PaginaRubro, type PiezaSetup } from "@/content/rubros";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return paginasRubro.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) return {};
  return pageMeta({
    title: r.nav,
    description: r.metaDescripcion,
    path: `/para/${r.slug}`,
  });
}

const retraso = (i: number, paso = 80) => ({ "--reveal-delay": `${i * paso}ms` }) as React.CSSProperties;

function Flecha() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Hero: selector de rubros y foto con el teléfono encima ────────── */

/** Para pasar de un rubro a otro sin volver al menú. */
function SelectorRubros({ actual }: { actual: string }) {
  return (
    <nav aria-label="Rubros">
      <p className="mb-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-paper/65">Cambiá de rubro</p>
      <ul className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {paginasRubro.map((x) => {
          const on = x.slug === actual;
          return (
            <li key={x.slug}>
              <Link
                href={`/para/${x.slug}`}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold transition-colors duration-300",
                  on ? "bg-paper text-ink" : "vidrio-claro text-paper hover:bg-paper/25",
                )}
              >
                <Glifo id={x.glifo} size={15} />
                {x.nav}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const tonosAviso = ["gold", "teal", "coral"] as const;

/**
 * La foto del rubro (la misma de las pestañas de la home: viaja hasta acá),
 * con el teléfono de ejemplo y los avisos encima. Todo es demo: la foto es
 * ilustrativa y el comercio de la pantalla, ficticio (AGENTS.md §4 y §5).
 */
function VisualHero({ r }: { r: PaginaRubro }) {
  const Telefono = telefonosRubro[r.slug];
  const foto = rubrosIntro.fotos[r.slug];
  const avisos = r.actividad.map((a, i) => ({ ...a, tono: tonosAviso[i % tonosAviso.length], detalle: "recién" }));

  return (
    <figure className="mx-auto w-full max-w-[470px]">
      <div className="group relative aspect-[20/21]">
        {foto && (
          <div className="foto-b absolute left-0 top-0 aspect-[4/5] w-[76%] -rotate-2 overflow-hidden bg-ink shadow-[var(--shadow-device)]">
            <Viaja nombre={`rubro-${r.slug}`}>
              <Image src={foto.src} alt={foto.alt} fill priority sizes="(min-width: 520px) 360px, 72vw" className="object-cover" />
            </Viaja>
          </div>
        )}
        {Telefono && (
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 origin-bottom-right rotate-[4deg] scale-[0.66] text-ink sm:scale-[0.8] lg:scale-[0.72] xl:scale-[0.8]"
          >
            <Telefono />
          </div>
        )}
        <Burbujas items={avisos} intervalo={2400} posiciones={["left-[-3%] top-[6%] -rotate-3", "left-[3%] bottom-[4%] rotate-2"]} />
      </div>
      <figcaption className="mt-3 text-center text-[12px] text-paper/65">Ejemplo ilustrativo</figcaption>
    </figure>
  );
}

/* ── Setup: una tarjeta de color por pieza ─────────────────────────── */

/** Fondo de la tarjeta y color del glifo gigante que asoma arriba. */
const tonosPieza = [
  { fondo: "paso-brand", arte: "text-paper/25" },
  { fondo: "paso-coral", arte: "text-paper/30" },
  { fondo: "paso-teal", arte: "text-paper/30" },
  { fondo: "paso-gold", arte: "text-ink/20" },
];

function Pieza({ pieza: s, i }: { pieza: PiezaSetup; i: number }) {
  const tono = tonosPieza[i % tonosPieza.length];
  /* Si la pieza tiene página de producto, la tarjeta entera lleva ahí. */
  const feature = s.feature ? featurePorSlug(s.feature) : undefined;
  const arte = "transition-[rotate,scale] duration-700 ease-fluida group-hover:rotate-[4deg] group-hover:scale-105";

  const clases = cn(
    "group relative flex h-full min-h-[400px] flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-paper outline-offset-4 lg:min-h-[440px]",
    "transition-[translate,rotate,box-shadow] duration-500 ease-fluida hover:-translate-y-2 hover:-rotate-1 hover:shadow-[var(--shadow-float)]",
    tono.fondo,
  );

  const contenido = (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {s.cartel ? (
          <Image
            src={s.cartel}
            alt=""
            width={600}
            height={600}
            sizes="240px"
            className={cn("absolute -right-7 -top-5 w-[78%] max-w-[240px] rotate-[9deg] drop-shadow-[0_26px_32px_rgb(0_0_0/0.35)]", arte)}
          />
        ) : (
          <Glifo id={s.glifo} size={200} className={cn("absolute -right-9 -top-7 rotate-[12deg]", arte, tono.arte)} />
        )}
        <div className="absolute inset-x-0 bottom-0 h-[66%] bg-gradient-to-t from-ink from-35% via-ink/80 to-transparent" />
      </div>
      {/* Alto mínimo: los íconos de las cuatro tarjetas quedan a la misma altura. */}
      <div className="relative flex flex-col md:min-h-[214px] lg:min-h-[262px]">
        <span className="vidrio-claro flex size-12 items-center justify-center rounded-2xl">
          <Glifo id={s.glifo} size={22} />
        </span>
        <h3 className="mt-3.5 font-display text-[1.375rem] font-bold leading-[1.1] tracking-[-0.035em]">
          <span className="mr-2 text-[13px] font-semibold tracking-normal text-gold tnum">0{i + 1}</span>
          {s.titulo}
        </h3>
        <p className="mt-2 text-[15px] leading-snug text-paper/85">{s.texto}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="vidrio-claro rounded-full px-3 py-1 text-[12px] font-semibold">{s.etiqueta}</span>
          {feature && (
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-500 ease-fluida group-hover:translate-x-1">
              <Flecha />
            </span>
          )}
        </div>
      </div>
    </>
  );

  return feature ? (
    <Link href={`/producto/${feature.slug}`} className={clases}>
      {contenido}
    </Link>
  ) : (
    <article className={clases}>{contenido}</article>
  );
}

/* ── Un día con FlashTag: línea de tiempo en tres tarjetas ─────────── */

/** Pastilla del ícono en las tarjetas claras (ícono blanco: 7.1, 3.9 y 3.6:1). */
const tonosMomento = ["bg-brand", "bg-coral", "bg-teal"];

function TarjetaMomento({ momento: d, i }: { momento: Momento; i: number }) {
  const titulo = "font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em] md:text-[1.625rem]";

  if (d.foto) {
    return (
      <article className="group relative flex min-h-[420px] flex-1 flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 text-paper md:min-h-[460px] md:p-7">
        <Image
          src={d.foto.src}
          alt={d.foto.alt}
          fill
          sizes="(min-width: 768px) 380px, 88vw"
          className="object-cover transition-transform duration-[900ms] ease-fluida group-hover:scale-105"
        />
        <span aria-hidden="true" className="velo absolute inset-0" />
        <h3 className={cn("relative", titulo)}>{d.titulo}</h3>
        <p className="relative mt-2 text-[15px] leading-snug text-paper/90">{d.texto}</p>
      </article>
    );
  }

  return (
    <article className="group relative flex min-h-[270px] flex-1 flex-col justify-between gap-10 overflow-hidden rounded-[2rem] bg-paper p-6 md:p-7">
      <Glifo
        id={d.glifo}
        size={190}
        className="pointer-events-none absolute -right-8 -top-8 rotate-[12deg] text-brand/[0.08] transition-[rotate,scale] duration-700 ease-fluida group-hover:rotate-[4deg] group-hover:scale-105"
      />
      <span className={cn("relative flex size-14 items-center justify-center rounded-2xl text-paper", tonosMomento[i % tonosMomento.length])}>
        <Glifo id={d.glifo} size={26} />
      </span>
      <div className="relative">
        <h3 className={titulo}>{d.titulo}</h3>
        <p className="mt-2 text-[15px] leading-snug text-muted">{d.texto}</p>
      </div>
    </article>
  );
}

/* ── Página ────────────────────────────────────────────────────────── */

export default async function RubroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) notFound();

  const otros = paginasRubro.filter((x) => x.slug !== r.slug);

  /* El caso solo se muestra si está autorizado y con cifras verificadas (AGENTS.md §4). */
  const caso = casosPublicables.find((c) => c.slug === r.caso && c.metricaVerificada && c.portada);
  const cifra = caso?.portada?.cifras[0];
  const puntaje = caso?.portada?.cifras.find((c) => /puntuaci/i.test(c.label));

  /* Plan recomendado: nombre y "para quién" salen de planes.ts. */
  const recomendados = r.plan.ids.map((id) => planes.find((p) => p.id === id)!).filter(Boolean);
  const plan = recomendados[recomendados.length - 1];
  /* Sin caso: la capacidad del plan, leída del mismo planes.ts. */
  const capacidad = plan.features.find((f) => f.incluido && /reseñas con IA/i.test(f.label))?.label;
  const [capValor, ...capResto] = (capacidad ?? "").split(" ");
  const topes = plan.features.filter((f) => f.incluido && /^Hasta\s/.test(f.label));

  const cifraGrande = "font-display text-[clamp(4rem,2.2rem+8.5vw,7.5rem)] font-bold leading-[0.9] tracking-[-0.05em] text-gold tnum";

  return (
    /* La `key` hace que pasar de un rubro a otro cuente como salida y entrada (misma ruta, otro slug). */
    <Pagina key={r.slug}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Para tu rubro", href: "/#rubros" }, { label: r.nav }]}
        etiqueta={`FlashTag para ${r.nav.toLowerCase()}`}
        glifo={r.glifo}
        titulo={r.titular}
        destacado={r.destacado}
        bajada={r.bajada}
        visual={<VisualHero r={r} />}
        pie={<SelectorRubros actual={r.slug} />}
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={site.urls.whatsapp} variant="claro" size="lg">
          Hablá con nosotros
        </Button>
      </HeroPagina>

      {/* ── SETUP: lo que conviene poner ─────────────────────── */}
      <Seccion tono="papel">
        <Titulo titulo={r.setup.titulo} bajada={r.setup.bajada} />
        <ul className="carrusel carrusel-ancho mt-9 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {r.setup.piezas.map((s, i) => (
            <li key={s.titulo} data-reveal style={retraso(i)}>
              <Pieza pieza={s} i={i} />
            </li>
          ))}
        </ul>
        <p className="mt-8 flex justify-center md:mt-10" data-reveal>
          <Button href={site.urls.shop} variant="secondary" size="lg" arrow className="w-full sm:w-auto">
            Ver los carteles en la tienda
          </Button>
        </p>
      </Seccion>

      {/* ── UN DÍA CON FLASHTAG ──────────────────────────────── */}
      <Seccion tono="arena">
        <Titulo titulo={r.dia.titulo} bajada="Así se ve en la práctica, de un momento al siguiente." alineado="izq" />
        <ol className="carrusel carrusel-ancho mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {r.dia.momentos.map((d, i) => (
            <li key={d.momento} data-reveal style={retraso(i, 110)} className="flex flex-col">
              <p className="mb-4 flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper tnum">
                  {i + 1}
                </span>
                <span className="font-display text-[1.25rem] font-bold tracking-[-0.03em]">{d.momento}</span>
                <span aria-hidden="true" className="h-px flex-1 bg-ink/20" />
              </p>
              <TarjetaMomento momento={d} i={i} />
            </li>
          ))}
        </ol>
      </Seccion>

      {/* ── CASO + PLAN ──────────────────────────────────────── */}
      <Seccion tono="noche">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16">
          {caso && cifra ? (
            <div>
              <span data-reveal className="eyebrow-noche">
                <Glifo id="estrella" size={13} /> Caso real
              </span>
              {caso.logo && (
                <Image
                  src={caso.logo}
                  alt=""
                  width={240}
                  height={66}
                  sizes="220px"
                  data-reveal
                  className="mt-7 h-11 w-auto max-w-[220px] object-contain object-left"
                />
              )}
              <h2 data-reveal="blur" className="mt-4 font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em] md:text-[1.75rem]">
                {caso.negocio}
              </h2>
              <p data-reveal="blur" className="text-[15px] text-paper/75">
                {caso.ciudad}
              </p>
              <p data-reveal="blur" style={retraso(1, 100)} className={cn("mt-6", cifraGrande)}>
                {cifra.valor}
              </p>
              <div className="mt-4 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                <div data-reveal style={retraso(2, 100)}>
                  <p className="text-[1.125rem] font-semibold">
                    {cifra.label}
                    {puntaje && ` · ★ ${puntaje.valor}`}
                  </p>
                  <p className="mt-2 max-w-[38ch] text-paper/80">{caso.uso}</p>
                  {caso.detalle && (
                    <Button href={`/casos/${caso.slug}`} variant="claro" size="lg" arrow className="mt-6 w-full sm:w-auto">
                      Leer el caso
                    </Button>
                  )}
                </div>
                {caso.foto && (
                  <div
                    data-reveal="zoom"
                    className="foto-a relative aspect-square w-[64%] max-w-[230px] shrink-0 rotate-2 overflow-hidden bg-ink shadow-[var(--shadow-device)] sm:w-[36%]"
                  >
                    <Image src={caso.foto.src} alt={caso.foto.alt} fill sizes="230px" className="object-cover" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <span data-reveal className="eyebrow-noche">
                <Glifo id="barras" size={13} /> Capacidad
              </span>
              <h2 data-reveal="blur" className="mt-7 font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em] md:text-[1.75rem]">
                Plan {plan.nombre}
              </h2>
              <p data-reveal="blur" style={retraso(1, 100)} className={cn("mt-6", cifraGrande)}>
                {capValor}
              </p>
              <p data-reveal style={retraso(2, 100)} className="mt-4 text-[1.125rem] font-semibold">
                {capResto.join(" ")}
              </p>
              {topes.length > 0 && (
                <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                  {topes.map((f, i) => (
                    <li
                      key={f.label}
                      data-reveal
                      style={retraso(i, 70)}
                      className="vidrio-claro flex items-center gap-2.5 rounded-2xl px-4 py-3 text-[15px] font-medium"
                    >
                      <Glifo id="check" size={16} className="shrink-0 text-gold" />
                      {f.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div data-reveal="zoom" className="rounded-[2rem] bg-paper p-7 text-ink shadow-[var(--shadow-device)] md:p-10">
            <span className="eyebrow">Plan recomendado</span>
            <h2 className="mt-4 font-display text-[2.25rem] font-bold leading-none tracking-[-0.04em] md:text-[3rem]">
              {recomendados.map((p) => p.nombre).join(" o ")}
            </h2>
            <p className="mt-3 text-[1.0625rem] text-muted">{r.plan.texto ?? plan.paraQuien}</p>
            <ul className="mt-6 grid gap-3 text-[15px]">
              {r.plan.claves.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Glifo id="check" size={14} />
                  </span>
                  {k}
                </li>
              ))}
            </ul>
            <Button href="/precios" variant="primary" size="lg" arrow className="mt-8 w-full sm:w-auto">
              Ver precios
            </Button>
          </div>
        </div>
      </Seccion>

      {/* ── OTROS RUBROS: la foto viaja al hero del que se elige ── */}
      <Seccion tono="papel">
        <Titulo titulo="Mirá los otros rubros" bajada={rubrosIntro.bajada} />
        <ul className="carrusel carrusel-ancho mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {otros.map((x, i) => {
            const foto = rubrosIntro.fotos[x.slug];
            return (
              <li key={x.slug} data-reveal style={retraso(i)}>
                <Link
                  href={`/para/${x.slug}`}
                  className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 text-paper outline-offset-4 md:min-h-[460px] md:p-7"
                >
                  {foto && (
                    <Viaja nombre={`rubro-${x.slug}`}>
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        fill
                        sizes="(min-width: 768px) 380px, 88vw"
                        className="object-cover transition-transform duration-[900ms] ease-fluida group-hover:scale-105"
                      />
                    </Viaja>
                  )}
                  <span aria-hidden="true" className="velo absolute inset-0" />
                  <span className="vidrio absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold">
                    <Glifo id={x.glifo} size={15} />
                    {x.nav}
                  </span>
                  {/* Texto corto: queda en la franja donde el velo ya tapa la foto. */}
                  <div className="relative">
                    <h3 className="font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.04em] md:text-[1.75rem]">
                      {x.titular} {x.destacado}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-[15px] font-bold text-gold transition-[gap] duration-300 group-hover:gap-3.5">
                      Ver la solución para {x.nav.toLowerCase()} <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Seccion>

      {/* ── CIERRE ───────────────────────────────────────────── */}
      <Cierre titular={r.cierre.titular} destacado={r.cierre.destacado} bajada={r.cierre.bajada} />
    </Pagina>
  );
}
