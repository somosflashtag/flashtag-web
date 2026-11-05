import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Glifo } from "@/components/ui/Glifo";
import { Faq } from "@/components/Faq";
import { Pricing } from "@/components/Pricing";
import { Clientes } from "@/components/Clientes";
import { PanelHero } from "@/components/home/PanelHero";
import { Burbujas } from "@/components/home/Burbujas";
import { Pilares, type Desde } from "@/components/home/Pilares";
import { FlashyChat } from "@/components/home/FlashyChat";
import { CasosFiltro } from "@/components/home/CasosFiltro";
import { SimuladorMaps } from "@/components/home/SimuladorMaps";
import { Jugar } from "@/components/home/Jugar";
import { Contador } from "@/components/home/Contador";
import { HistoriaScroll } from "@/components/home/HistoriaScroll";
import { Escenas } from "@/components/home/Escenas";
import { menuPanel, pantallasPilares, vistasHero } from "@/components/app/panel";
import { casosConDetalle, rubros as rubrosCasos } from "@/content/casos";
import { features } from "@/content/features";
import { faqs } from "@/content/faq";
import { planes } from "@/content/planes";
import { precioARS, productos, tienda } from "@/content/productos";
import { promoVigente } from "@/content/promos";
import { paginasRubro } from "@/content/rubros";
import {
  actividad,
  ctaFinal,
  datos,
  flashy,
  hero,
  juego,
  loop,
  pilares,
  pilaresIntro,
  rubrosIntro,
  tiendaHome,
} from "@/content/home";
import { cta, site } from "@/lib/site";
import { faqSchema, pageMeta } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMeta({
  title: "FlashTag — Carteles con QR y NFC, reseñas con IA y fidelidad para tu local",
  description:
    "Carteles con QR y NFC conectados a una app: reseñas de Google respondidas con IA, contactos, club de fidelidad en la Wallet y métricas. Probala gratis.",
  path: "/",
});

const faqsHome = faqs.filter((f) => f.mostrarEn.includes("home"));

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "FlashTag",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: site.urls.app,
  publisher: { "@id": `${site.domain}/#organization` },
  featureList: features.map((f) => f.nombre),
  offers: planes.map((p) => ({
    "@type": "Offer",
    name: p.nombre,
    price: String(p.precioMensual),
    priceCurrency: "USD",
    description: p.paraQuien,
  })),
};

/** "Desde qué plan" de cada funcionalidad con página propia. */
const desde: Desde = Object.fromEntries(
  features.map((f) => [f.slug, { desde: f.desde, href: `/producto/${f.slug}`, nombre: f.nombre }]),
);

/** Casos de la home: autorizados, con página propia y cifras verificadas. */
const casosHome = casosConDetalle.filter((c) => c.metricaVerificada);

/** Eyebrow + h2 centrados, el encabezado de casi todas las secciones. */
function Encabezado({
  eyebrow,
  titulo,
  bajada,
  id,
}: {
  eyebrow: React.ReactNode;
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="t-h2 mt-3 text-balance md:mt-3.5">
        {titulo}
      </h2>
      {bajada && <p className="t-lead measure mx-auto mt-2.5 text-muted md:mt-3.5">{bajada}</p>}
    </div>
  );
}

const pad = "py-11 md:py-24";

export default function Home() {
  const promo = promoVigente();

  const vistas = Object.fromEntries(
    Object.entries(vistasHero).map(([id, Vista]) => [id, <Vista key={id} />]),
  );
  const pantallas = Object.fromEntries(
    Object.entries(pantallasPilares).map(([id, Pantalla]) => [id, <Pantalla key={id} />]),
  );

  return (
    <>
      <div aria-hidden="true" className="ft-progreso fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" />
      <JsonLd id="ld-software" data={softwareSchema} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqsHome)} />

      <Escenas />
      <div className="escenas">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-halo pb-8 pt-7 md:pb-10 md:pt-[72px]">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            <div data-reveal>
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="t-display mt-4 text-balance !text-[clamp(1.875rem,1.15rem+3.5vw,4rem)]">
                {hero.titular} <span className="text-glow-warm">{hero.destacado}</span>
              </h1>
              <p className="t-lead measure mb-6 mt-4 text-muted md:mb-7 md:mt-5">{hero.bajada}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                  {cta.primary.label}
                </Button>
                <Button href={cta.secondary.href} variant="secondary" size="lg">
                  {cta.secondary.label}
                </Button>
              </div>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted sm:mt-6 sm:gap-x-5 sm:text-sm">
                {hero.checks.map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Glifo id="check" size={14} className="text-brand" />
                    {t}
                  </li>
                ))}
              </ul>

              {/* La activación vive en la app: acá solo se recibe el código y se deriva. */}
              <form
                action={site.urls.login}
                method="get"
                className="mt-6 flex max-w-[480px] flex-wrap items-center gap-x-2 gap-y-1 rounded-[14px] border border-dashed border-brand/40 bg-paper py-2 pl-4 pr-2"
              >
                <label htmlFor="codigo-hero" className="text-[13px] font-bold">
                  {hero.activar}
                </label>
                <input
                  id="codigo-hero"
                  name="codigo"
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Ej: FT-A1B2C3"
                  pattern="[A-Za-z0-9\-]{4,20}"
                  required
                  className="min-h-11 min-w-0 flex-1 bg-transparent font-mono text-sm tracking-wide outline-none placeholder:font-sans placeholder:tracking-normal placeholder:text-muted"
                />
                <Button type="submit" variant="primary" size="sm">
                  Activar
                </Button>
              </form>
            </div>

            <div className="group relative" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <PanelHero menu={menuPanel} vistas={vistas} />
              <Burbujas items={actividad} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── LOGOS ────────────────────────────────────────────── */}
      <Clientes variante="marquesina" titulo="Marcas que ya lo usan todos los días" />

      {/* ── PROBALO VOS: el juego ───────────────────────────── */}
      <section id="probalo" className="blk relative mt-3.5 overflow-hidden bg-ink py-11 text-paper md:py-24">
        <div aria-hidden="true" className="glow-brand absolute -left-40 top-10 size-[520px] opacity-80" />
        <div aria-hidden="true" className="bg-dots-dark absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <span className="eyebrow !bg-white/10 !text-gold">
              <Glifo id="chispa" size={13} /> {juego.eyebrow}
            </span>
            <h2 className="t-h2 mt-3 text-balance md:mt-3.5">{juego.titular}</h2>
            <p className="t-lead measure mx-auto mt-2.5 text-muted-dark md:mt-3.5">{juego.bajada}</p>
          </div>
          <div className="mt-8 md:mt-12" data-reveal="zoom">
            <Jugar />
          </div>
        </Container>
      </section>

      {/* ── CÓMO FUNCIONA: el loop ───────────────────────────── */}
      <section className={pad}>
        <Container>
          <Encabezado
            eyebrow={loop.eyebrow}
            titulo={
              <>
                {loop.titular}
                <br className="hidden sm:block" /> {loop.titular2}
              </>
            }
            bajada={loop.bajada}
          />
          <HistoriaScroll pasos={loop.pasos} />
          <ul className="carrusel carrusel-angosto mt-6 grid gap-4 md:mt-10 md:grid-cols-3">
            {datos.map((d, i) => (
              <li
                key={d.valor}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className={cn(
                  "group relative overflow-hidden rounded-[22px] px-5 pb-5 pt-5 text-paper md:rounded-[28px] md:px-6 md:pb-7 md:pt-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-ft)] hover:-translate-y-2 hover:-rotate-1 hover:shadow-[var(--shadow-float)]",
                  `dato-${d.tono}`,
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/20 md:size-12 md:rounded-2xl transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <Glifo id={d.glifo} size={24} />
                </span>
                <b className="mb-2 mt-3 block font-display text-[2.125rem] font-bold leading-none tracking-tight tnum md:text-[3.25rem]">
                  <Contador valor={d.valor} />
                </b>
                <span className="relative z-10 text-sm text-white/90 md:text-[15px]">{d.texto}</span>
                <i
                  aria-hidden="true"
                  className="absolute -bottom-12 -right-10 size-[170px] rounded-full bg-white/15 transition-transform duration-500 group-hover:-translate-x-5 group-hover:-translate-y-5 group-hover:scale-[1.4]"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── PILARES: la app por dentro ───────────────────────── */}
      <section id="producto" className={cn("blk bg-brand-soft", pad)}>
        <Container>
          <Encabezado
            eyebrow={pilaresIntro.eyebrow}
            titulo={pilaresIntro.titular}
            bajada={pilaresIntro.bajada}
          />
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <Pilares pilares={pilares} pantallas={pantallas} desde={desde} />
          </div>
        </Container>
      </section>

      {/* ── SIMULADOR DE MAPS ────────────────────────────────── */}
      <section id="simulador" className={pad}>
        <Container>
          <Encabezado
            eyebrow="Posición en Maps"
            titulo="Buscá como tu cliente y mirá dónde aparecés"
            bajada="Elegí tu rubro: te mostramos en qué puesto salís en 49 puntos alrededor de tu local, quién te gana en cada uno y qué hacer para subir."
          />
          <div data-reveal="zoom">
            <SimuladorMaps />
          </div>
          <div className="mt-6 flex flex-col items-center gap-2 text-center">
            <Button href={cta.primary.href} variant="primary" size="lg" arrow>
              Medí tu local de verdad
            </Button>
            <p className="text-[13px] text-muted">En la app, con tu ficha de Google y tus competidores reales.</p>
          </div>
        </Container>
      </section>

      {/* ── FLASHY ───────────────────────────────────────────── */}
      <section className="blk relative mt-3.5 overflow-hidden bg-ink text-paper">
        <div aria-hidden="true" className="glow-brand absolute -right-32 -top-32 size-[420px]" />
        <Container>
          <div className="relative grid items-center gap-7 py-11 md:gap-10 md:py-[88px] lg:grid-cols-2">
            <div data-reveal="izq">
              <span className="eyebrow !bg-white/10 !text-muted-dark">
                <Glifo id="chispa" size={13} /> {flashy.eyebrow}
              </span>
              <h2 className="t-h2 mt-3.5 text-balance">
                {flashy.titular} <span className="text-gold">{flashy.nombre}</span>
                {flashy.titular2}
              </h2>
              <p className="t-lead mb-6 mt-3.5 text-muted-dark">{flashy.bajada}</p>
              <Button href={cta.primary.href} variant="secondary" size="lg" arrow className="border-paper bg-paper text-ink hover:border-paper hover:bg-surface">
                {flashy.cta}
              </Button>
            </div>
            <div data-reveal="der" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
              <FlashyChat charla={flashy.charla} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── RUBROS ───────────────────────────────────────────── */}
      <section id="rubros" className={pad}>
        <Container>
          <Encabezado
            eyebrow={rubrosIntro.eyebrow}
            titulo={
              <>
                {rubrosIntro.titular} <em className="text-glow-warm not-italic uppercase">{rubrosIntro.destacado}</em>{" "}
                {rubrosIntro.titular2}
              </>
            }
            bajada={rubrosIntro.bajada}
          />
          <ul className="carrusel carrusel-angosto mt-6 grid gap-3.5 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
            {paginasRubro.map((r, i) => (
              <li key={r.slug} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                <Link
                  href={`/para/${r.slug}`}
                  className="card-lift group flex h-full flex-col rounded-[20px] border border-line bg-paper p-6"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <Glifo id={r.glifo} size={24} />
                  </span>
                  <h3 className="mb-1.5 mt-3 font-display text-lg font-semibold">{r.nav}</h3>
                  <p className="text-sm text-muted">{r.resumen}</p>
                  <ul className="mt-3 grid gap-1 text-sm">
                    {r.claves.map((k) => (
                      <li key={k} className="flex gap-1.5">
                        <span aria-hidden="true" className="font-bold text-brand">→</span>
                        {k}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand transition-[gap] duration-200 group-hover:gap-3">
                    Ver la solución <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── CASOS ────────────────────────────────────────────── */}
      <section id="casos" className={cn("blk mt-3.5 bg-surface", pad)}>
        <Container>
          <Encabezado
            eyebrow="Casos reales"
            titulo="De pastelerías de barrio a cadenas nacionales"
            bajada="Los números salen de sus perfiles de Google."
          />
          <CasosFiltro casos={casosHome} rubros={rubrosCasos} />
          <p className="mt-8 text-center">
            <Link href="/casos" className="t-caption font-semibold text-brand underline underline-offset-4">
              Ver todos los casos
            </Link>
          </p>
        </Container>
      </section>

      {/* ── TIENDA ───────────────────────────────────────────── */}
      <section id="tienda" className={pad}>
        <Container>
          <div data-reveal className="grid grid-cols-1 items-center gap-5 overflow-hidden rounded-[24px] border border-line bg-surface/50 p-5 sm:gap-6 sm:rounded-[28px] sm:p-8 lg:grid-cols-[1.1fr_2fr]">
            <div data-reveal="izq">
              <span className="eyebrow">{tiendaHome.eyebrow}</span>
              <h2 className="t-h2 mt-3.5 !text-[clamp(1.75rem,1.3rem+1.6vw,2.375rem)]">{tiendaHome.titular}</h2>
              <p className="mb-5 mt-3 text-muted">{tiendaHome.bajada}</p>
              <Button href={tienda.href} variant="primary" size="lg" arrow>
                Ir a la tienda
              </Button>
            </div>
            <ul data-reveal-hijos className="carrusel carrusel-angosto grid gap-4 sm:grid-cols-3">
              {productos.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.href}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-paper"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      {p.etiqueta && (
                        <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">
                          {p.etiqueta}
                        </span>
                      )}
                      <Image
                        src={p.foto}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-4">
                      <b className="text-[15px] leading-snug">{p.nombre}</b>
                      {p.precioARS && (
                        <span className="mt-auto pt-2 font-display text-[19px] font-bold tnum">{precioARS(p.precioARS)}</span>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── PRECIOS ──────────────────────────────────────────── */}
      <section id="precios" className={cn("blk bg-brand-soft", pad)}>
        <Container>
          <Encabezado
            eyebrow="Precios"
            titulo="Precios claros, sin letra chica"
            bajada="Sin permanencia. Empezás gratis y subís de plan cuando te empiece a rendir."
          />
          <div className="mt-10" data-reveal="zoom">
            <Pricing promo={promo} />
          </div>
          <p className="mt-8 text-center">
            <Link href="/precios" className="text-[0.9375rem] font-semibold text-brand underline underline-offset-4">
              Comparar todos los planes en detalle
            </Link>
          </p>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className={pad}>
        <Container>
          <Encabezado eyebrow="Preguntas frecuentes" titulo="Lo que nos preguntan siempre" />
          <div className="mx-auto mt-10 max-w-[820px]" data-reveal>
            <Faq items={faqsHome} inicial={6} />
          </div>
          <p className="mt-6 text-center text-muted">
            ¿Otra duda?{" "}
            <a href={site.urls.whatsapp} className="font-bold text-brand underline-offset-4 hover:underline">
              Escribinos por WhatsApp
            </a>
          </p>
        </Container>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <section className="pb-11 md:pb-24">
        <Container>
          <div data-reveal="zoom" className="cta-final rounded-[24px] px-5 py-10 text-center text-paper md:rounded-[32px] md:px-10 md:py-16">
            <h2 className="t-h2 measure mx-auto text-balance">{ctaFinal.titular}</h2>
            <p className="t-lead measure mx-auto mb-7 mt-3.5 text-white/85">{ctaFinal.bajada}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="secondary" size="lg" arrow className="border-paper bg-paper text-ink hover:border-paper hover:bg-surface">
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg" className="border-white/40 text-paper hover:border-paper hover:bg-white/10">
                {cta.secondary.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>
      </div>
    </>
  );
}
