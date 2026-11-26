import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Glifo } from "@/components/ui/Glifo";
import { Faq } from "@/components/Faq";
import { Pricing } from "@/components/Pricing";
import { Clientes } from "@/components/Clientes";
import { Pilares, type Desde } from "@/components/home/Pilares";
import { FlashyChat } from "@/components/home/FlashyChat";
import { CasosFiltro } from "@/components/home/CasosFiltro";
import { SimuladorMaps } from "@/components/home/SimuladorMaps";
import { Jugar } from "@/components/home/Jugar";
import { Contador } from "@/components/home/Contador";
import { FraseRota } from "@/components/home/FraseRota";
import { Confeti, type Pieza } from "@/components/ui/Confeti";
import { Cierre } from "@/components/ui/Cierre";
import { Pagina } from "@/components/ui/Pagina";
import { Titulo } from "@/components/ui/Titulo";
import { RubrosTabs } from "@/components/home/RubrosTabs";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Mock, type MockId } from "@/components/app/mocks";
import { pantallasPilares, telefonosRubro } from "@/components/app/panel";
import { casosConDetalle, rubros as rubrosCasos } from "@/content/casos";
import { features } from "@/content/features";
import { faqs } from "@/content/faq";
import { planes } from "@/content/planes";
import { precioARS, productos, tienda } from "@/content/productos";
import { promoVigente } from "@/content/promos";
import { paginasRubro } from "@/content/rubros";
import {
  actividad,
  datos,
  faqHome,
  flashy,
  hero,
  juego,
  loop,
  paraVos,
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

const pad = "py-16 md:py-28";

/** Aviso de vidrio pegado a una foto del hero. Demo, no prueba social. */
function Aviso({ item, className }: { item: (typeof actividad)[number]; className?: string }) {
  return (
    <figcaption
      aria-hidden="true"
      className={cn(
        "vidrio ft-float absolute flex items-center gap-2 whitespace-nowrap rounded-2xl py-1.5 pl-1.5 pr-3 text-left text-[11px] font-semibold md:text-[13px]",
        className,
      )}
    >
      <span className="flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-gold text-ink">
        <Glifo id={item.glifo} size={15} />
      </span>
      {item.titulo}
    </figcaption>
  );
}

const confetiHero: Pieza[] = [
  { pos: "left-[19%] top-[12%]", lado: 52, tono: "gold", giro: 14, soloMd: true },
  { pos: "left-[5%] top-[74%]", lado: 30, tono: "coral", giro: -10, soloMd: true },
  { pos: "right-[21%] top-[36%]", lado: 32, tono: "coral", giro: 8, soloMd: true },
  { pos: "left-[24%] top-[66%]", lado: 22, tono: "gold", giro: 18, soloMd: true },
  { pos: "right-[7%] top-[9%]", lado: 16, tono: "teal", giro: 20 },
  { pos: "left-[8%] top-[5%]", lado: 12, tono: "paper", giro: 30 },
];

/** Qué se ve arriba de cada tarjeta de "cómo funciona", en orden. */
const mocksPasos: (MockId | null)[] = [null, "links", "resenas", "metricas"];

export default function Home() {
  const promo = promoVigente();

  const pantallas = Object.fromEntries(
    Object.entries(pantallasPilares).map(([id, Pantalla]) => [id, <Pantalla key={id} />]),
  );
  const telefonos = Object.fromEntries(
    Object.entries(telefonosRubro).map(([slug, Telefono]) => [slug, <Telefono key={slug} />]),
  );
  const rubros = paginasRubro.map((r) => ({
    slug: r.slug,
    nombre: r.nav,
    glifo: r.glifo,
    resumen: r.resumen,
    promesa: `${r.titular} ${r.destacado}`,
    claves: r.claves,
    foto: rubrosIntro.fotos[r.slug],
  }));

  return (
    <Pagina>
      <div aria-hidden="true" className="ft-progreso fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold" />
      <JsonLd id="ld-software" data={softwareSchema} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqsHome)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section data-hero data-tono="noche" className="noche-hero grano relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]">
        <Confeti piezas={confetiHero} />
        <Container className="relative z-10">
          <div className="mx-auto max-w-[760px] pt-[104px] text-center md:pt-[136px] xl:pt-[148px]">
            <h1 className="font-display text-[clamp(1.75rem,0.75rem+4.6vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.045em]">
              <span className="sr-only">{hero.accesible}</span>
              <span aria-hidden="true" className="ft-llega block">
                {hero.titular}
              </span>
              <FraseRota frases={hero.frases} />
            </h1>
            <p
              className="ft-llega t-lead mx-auto mt-5 max-w-[46ch] text-paper/80 md:mt-7"
              style={{ animationDelay: "120ms" }}
            >
              {hero.bajada}
            </p>
            <div
              className="ft-llega mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-9"
              style={{ animationDelay: "220ms" }}
            >
              <Button href={cta.primary.href} variant="oro" size="lg" arrow className="w-full sm:w-auto">
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="claro" size="lg" className="w-full sm:w-auto">
                {cta.secondary.label}
              </Button>
            </div>
            <ul
              className="ft-llega mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[13px] text-paper/75 sm:gap-x-5 sm:text-sm"
              style={{ animationDelay: "300ms" }}
            >
              {hero.checks.map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Glifo id="check" size={14} className="text-gold" />
                  {t}
                </li>
              ))}
            </ul>

            {/* La activación vive en la app: acá solo se recibe el código y se deriva. */}
            <form
              action={site.urls.login}
              method="get"
              className="ft-llega vidrio-claro mx-auto mt-7 flex max-w-[460px] flex-wrap items-center gap-x-2 gap-y-1 rounded-[1.75rem] py-1.5 pl-5 pr-1.5 text-left"
              style={{ animationDelay: "380ms" }}
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
                className="min-h-11 min-w-0 flex-1 bg-transparent font-mono text-sm tracking-wide text-paper outline-none placeholder:font-sans placeholder:tracking-normal placeholder:text-paper/65"
              />
              <Button type="submit" variant="blanco" size="md">
                Activar
              </Button>
            </form>

            <a
              href="#como"
              className="group mt-9 hidden flex-col items-center gap-2.5 text-sm font-bold text-paper/85 transition-colors hover:text-paper md:inline-flex"
            >
              <span className="flex size-12 items-center justify-center rounded-full border border-gold/60 transition-colors group-hover:border-gold">
                <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="ft-cae">
                  <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {hero.seguir}
            </a>
          </div>
        </Container>

        {/* Fotos: a los costados en pantallas anchas, en par debajo del texto en el resto. */}
        <div className="relative mx-auto mt-10 flex max-w-[520px] justify-center gap-5 px-7 pb-6 xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0 xl:max-w-none xl:px-0 xl:pb-0">
          <figure
            className="ft-sube relative aspect-[4/5] w-1/2 -rotate-6 xl:absolute xl:left-[-2%] xl:top-[13%] xl:w-[21vw] xl:max-w-[320px]"
            style={{ "--viaje": "-70px" } as React.CSSProperties}
          >
            <div className="foto-a relative size-full overflow-hidden shadow-[var(--shadow-device)]">
              <Image src={hero.fotos[0].src} alt={hero.fotos[0].alt} fill priority sizes="(min-width: 1280px) 320px, 45vw" className="object-cover" />
            </div>
            <Aviso item={actividad[0]} className="-right-4 bottom-[14%] rotate-6 xl:-right-14" />
          </figure>
          <figure
            className="ft-sube relative mt-7 aspect-[4/5] w-1/2 rotate-[7deg] xl:absolute xl:right-[-2%] xl:top-[34%] xl:mt-0 xl:w-[21vw] xl:max-w-[320px]"
            style={{ "--viaje": "-140px" } as React.CSSProperties}
          >
            <div className="foto-b relative size-full overflow-hidden shadow-[var(--shadow-device)]">
              <Image src={hero.fotos[1].src} alt={hero.fotos[1].alt} fill priority sizes="(min-width: 1280px) 320px, 45vw" className="object-cover" />
            </div>
            <Aviso item={actividad[1]} className="-left-4 top-[12%] -rotate-[7deg] [animation-delay:-2.5s] xl:-left-16" />
          </figure>
        </div>

        {/* Logos: van adentro del hero, sobre el mismo ink. */}
        <Clientes
          variante="marquesina"
          titulo="Marcas que ya lo usan todos los días"
          className="relative z-10 mx-0 bg-transparent pb-10 pt-8 md:pb-12 md:pt-14 xl:pt-20"
        />
      </section>

      {/* ── CÓMO FUNCIONA: cuatro tarjetas que se ensanchan ──── */}
      <section id="como" className={cn("scroll-mt-24", pad)}>
        <Container>
          <Titulo titulo={loop.titular} bajada={loop.bajada} />
          <ol className="pasos carrusel carrusel-ancho mt-9 gap-4 md:mt-14 md:grid md:grid-cols-2" data-reveal>
            {loop.pasos.map((p, i) => {
              const mock = mocksPasos[i];
              return (
                <li
                  key={p.titulo}
                  tabIndex={0}
                  className={cn(
                    "paso relative flex h-[470px] flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-paper outline-offset-4 md:h-[500px] lg:h-auto lg:p-7",
                    `paso-${p.tono}`,
                  )}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                    {mock ? (
                      <div className="paso-visual absolute left-1/2 top-7 w-[300px] origin-top -translate-x-1/2 -rotate-6 scale-[0.78] text-ink">
                        <PhoneFrame glow={false}>
                          <Mock id={mock} />
                        </PhoneFrame>
                      </div>
                    ) : (
                      <Image
                        src="/carteles/google.webp"
                        alt=""
                        width={600}
                        height={600}
                        sizes="340px"
                        className="absolute left-1/2 top-6 w-[82%] max-w-[330px] -translate-x-1/2 -rotate-6 drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink from-35% via-ink/80 to-transparent" />
                  </div>
                  <div className="relative">
                    <span className="vidrio-claro flex size-12 items-center justify-center rounded-2xl">
                      <Glifo id={p.glifo} size={22} />
                    </span>
                    <h3 className="mt-3.5 font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em]">
                      <span className="mr-2 text-[13px] font-semibold tracking-normal text-gold tnum">0{i + 1}</span>
                      {p.titulo}
                    </h3>
                    <div className="paso-texto">
                      <div>
                        <p className="pt-2 text-[15px] leading-snug text-paper/85 lg:max-w-[40ch]">{p.texto}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <ul className="carrusel carrusel-angosto mt-4 grid gap-4 md:grid-cols-3">
            {datos.map((d, i) => (
              <li
                key={d.valor}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] px-5 pb-5 pt-5 text-paper transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:-rotate-1 hover:shadow-[var(--shadow-float)] md:px-7 md:pb-7 md:pt-6",
                  `dato-${d.tono}`,
                )}
              >
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-white/20 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 md:size-12 md:rounded-2xl">
                  <Glifo id={d.glifo} size={24} />
                </span>
                <b className="mb-2 mt-3 block font-display text-[2.125rem] font-bold leading-none tracking-[-0.045em] tnum md:text-[3.5rem]">
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

      {/* ── ES PARA VOS SI…: los dolores, con foto ───────────── */}
      <section id="para-vos" data-tono="noche" className="blk noche grano scroll-mt-24 overflow-hidden py-14 md:py-24">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 data-reveal="blur" className="t-mega">
              {paraVos.titular}
            </h2>
            <p
              data-reveal="blur"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="t-lead max-w-[34ch] text-paper/80 md:pb-2"
            >
              {paraVos.bajada}
            </p>
          </div>
        </Container>
        <div className="dolores-wrap mt-7 md:mt-12" data-reveal>
          <div className="dolores">
            {[0, 1].map((copia) => (
              <ul key={copia} aria-hidden={copia === 1 ? true : undefined}>
                {paraVos.dolores.map((d) => (
                  <li key={d.etiqueta}>
                    <article
                      tabIndex={copia === 0 ? 0 : -1}
                      className="dolor relative flex h-[460px] w-[78vw] max-w-[330px] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 outline-offset-4 md:h-[500px] md:w-[360px] md:max-w-none md:p-7"
                    >
                      <Image src={d.foto.src} alt={copia === 0 ? d.foto.alt : ""} fill sizes="360px" className="object-cover" />
                      <span aria-hidden="true" className="velo absolute inset-0" />
                      <span className="vidrio absolute left-5 top-5 rounded-full px-3.5 py-1.5 text-[13px] font-bold">{d.etiqueta}</span>
                      <h3 className="relative font-display text-[1.5rem] font-semibold leading-[1.12] tracking-[-0.035em] text-paper/80 md:text-[1.625rem]">
                        {d.dolor} <b className="font-bold text-paper">{d.remate}</b>
                      </h3>
                      <div className="dolor-solucion relative">
                        <div>
                          <p className="flex gap-2 pt-3 text-[15px] leading-snug text-paper">
                            <Glifo id="check" size={18} className="mt-0.5 shrink-0 text-gold" />
                            {d.solucion}
                          </p>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILARES: la app por dentro ───────────────────────── */}
      <section id="producto" className={cn("blk scroll-mt-24 bg-brand-soft", pad)}>
        <Container>
          <Titulo titulo={pilaresIntro.titular} bajada={pilaresIntro.bajada} />
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <Pilares pilares={pilares} pantallas={pantallas} desde={desde} />
          </div>
        </Container>
      </section>

      {/* ── PROBALO VOS: el juego ───────────────────────────── */}
      <section id="probalo" data-tono="noche" className="blk noche grano relative scroll-mt-24 overflow-hidden py-14 md:py-24">
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <span data-reveal className="eyebrow !bg-white/10 !text-gold">
              <Glifo id="chispa" size={13} /> {juego.eyebrow}
            </span>
            <h2 data-reveal="blur" className="t-mega mt-4 text-balance">
              {juego.titular}
            </h2>
            <p data-reveal="blur" className="t-lead measure mx-auto mt-4 text-paper/80 md:mt-6">
              {juego.bajada}
            </p>
          </div>
          <div className="mt-8 md:mt-12" data-reveal="zoom">
            <Jugar />
          </div>
        </Container>
      </section>

      {/* ── RUBROS: pestañas con foto y teléfono ─────────────── */}
      <section id="rubros" className={cn("blk scroll-mt-24 bg-surface", pad)}>
        <Container>
          <h2 data-reveal="blur" className="t-mega max-w-[19ch] text-balance">
            {rubrosIntro.titular} <span className="text-brand">{rubrosIntro.titular2}</span>
          </h2>
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <RubrosTabs rubros={rubros} telefonos={telefonos} nota={rubrosIntro.bajada} />
          </div>
        </Container>
      </section>

      {/* ── SIMULADOR DE MAPS ────────────────────────────────── */}
      <section id="simulador" className={pad}>
        <Container>
          <Titulo
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
      <section data-tono="noche" className="blk noche grano relative overflow-hidden">
        <Container>
          <div className="relative grid items-center gap-8 py-14 md:gap-12 md:py-24 lg:grid-cols-2">
            <div>
              <span data-reveal className="eyebrow !bg-white/10 !text-muted-dark">
                <Glifo id="chispa" size={13} /> {flashy.eyebrow}
              </span>
              <h2 data-reveal="blur" className="t-mega mt-4 text-balance !text-[clamp(2rem,1.2rem+3.2vw,3.75rem)]">
                {flashy.titular} <span className="text-gold">{flashy.nombre}</span>
                {flashy.titular2}
              </h2>
              <p data-reveal="blur" className="t-lead mb-7 mt-4 text-paper/80">
                {flashy.bajada}
              </p>
              <Button href={cta.primary.href} variant="oro" size="lg" arrow>
                {flashy.cta}
              </Button>
            </div>
            <div data-reveal="der" style={{ "--reveal-delay": "150ms" } as React.CSSProperties}>
              <FlashyChat charla={flashy.charla} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── CASOS ────────────────────────────────────────────── */}
      <section id="casos" className={cn("blk scroll-mt-24 bg-surface", pad)}>
        <Container>
          <Titulo
            titulo="De pastelerías de barrio a cadenas nacionales"
            bajada="Casos reales. Los números salen de sus perfiles de Google."
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
          <div className="grid grid-cols-1 items-center gap-7 lg:grid-cols-[1fr_2fr] lg:gap-10">
            <div>
              <span data-reveal className="eyebrow">{tiendaHome.eyebrow}</span>
              <h2 data-reveal="blur" className="t-mega mt-4 !text-[clamp(2rem,1.2rem+3.2vw,3.5rem)]">
                {tiendaHome.titular}
              </h2>
              <p data-reveal="blur" className="t-lead mb-6 mt-4 text-muted">
                {tiendaHome.bajada}
              </p>
              <Button href={tienda.href} variant="primary" size="lg" arrow>
                Ir a la tienda
              </Button>
            </div>
            <ul data-reveal-hijos className="carrusel carrusel-angosto grid gap-4 sm:grid-cols-3">
              {productos.map((p) => (
                <li key={p.slug}>
                  <a
                    href={p.href}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper"
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
                        sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          <Titulo
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

      {/* ── FAQ: título fijo a la izquierda, tarjetas a la derecha ── */}
      <section id="preguntas" className={pad}>
        <Container>
          <div className="grid gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 data-reveal="blur" className="t-mega">
                {faqHome.titular}
                <br />
                {faqHome.titular2}
              </h2>
              <p data-reveal="blur" className="t-lead mt-4 max-w-[34ch] text-muted">
                {faqHome.bajada}
              </p>
              <div
                data-reveal
                className="foto-a relative mt-9 hidden min-h-[300px] flex-col justify-end overflow-hidden bg-ink p-7 text-paper lg:flex"
              >
                <Image src={faqHome.foto.src} alt={faqHome.foto.alt} fill sizes="480px" className="object-cover" />
                <span aria-hidden="true" className="velo absolute inset-0" />
                <h3 className="relative font-display text-[1.625rem] font-bold leading-tight tracking-[-0.035em]">{faqHome.otra}</h3>
                <p className="relative mt-1.5 max-w-[30ch] text-[15px] text-paper/85">{faqHome.otraBajada}</p>
                <Button href={site.urls.whatsapp} variant="oro" size="md" arrow className="relative mt-4 self-start">
                  {faqHome.otraCta}
                </Button>
              </div>
            </div>
            <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <Faq items={faqsHome} inicial={6} variante="tarjetas" />
              <p className="mt-6 text-muted lg:hidden">
                {faqHome.otra}{" "}
                <a href={site.urls.whatsapp} className="font-bold text-brand underline-offset-4 hover:underline">
                  Escribinos por WhatsApp
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CIERRE ───────────────────────────────────────────── */}
      <Cierre />
    </Pagina>
  );
}
