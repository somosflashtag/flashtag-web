import Image from "next/image";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { Faq } from "@/components/Faq";
import { Pricing } from "@/components/Pricing";
import { faqs } from "@/content/faq";
import { fotos } from "@/content/fotos";
import { faqHome } from "@/content/home";
import { planes } from "@/content/planes";
import { promoVigente } from "@/content/promos";
import { cta, site } from "@/lib/site";
import { faqSchema, pageMeta } from "@/lib/seo";
import { cn } from "@/lib/cn";

/* Los números de esta página salen de planes.ts (AGENTS.md §3): también los
   que van a Google en la descripción y en el JSON-LD. */
const pagos = planes.filter((p) => p.precioMensual > 0);
const precios = planes.map((p) => p.precioMensual);

/** "a, b y c" */
const enumerar = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}` : items.join("");

export const metadata = pageMeta({
  title: "Precios y planes",
  description: `Plan gratis para siempre, ${enumerar(
    pagos.map((p) => `${p.nombre} USD ${p.precioMensual}`),
  )}, con precio en pesos. Sin permanencia y con factura A/B/C en Argentina.`,
  path: "/precios",
});

const faqsPrecios = faqs.filter((f) => f.mostrarEn.includes("precios"));

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FlashTag — Planes",
  description: `Planes de FlashTag para comercios locales, agencias y franquicias: ${enumerar(planes.map((p) => p.nombre))}.`,
  brand: { "@id": `${site.domain}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: String(Math.min(...precios)),
    highPrice: String(Math.max(...precios)),
    priceCurrency: "USD",
    offerCount: planes.length,
    url: `${site.domain}/precios`,
  },
};

/**
 * Hasta cuántas cuentas de Google llega el plan más grande: de ahí para
 * arriba, el plan es a medida. Se lee de planes.ts; si la fila cambia de
 * forma y no hay número, el titular va sin cifra.
 */
const planMayor = planes[planes.length - 1];
const tope = planMayor.features
  .map((f) => /(\d+(?:\.\d+)*) cuentas? de Google Business/.exec(f.label)?.[1])
  .find(Boolean);

const hero = {
  titulo: "Elegí cómo querés",
  destacado: "arrancar",
  bajada:
    "Gratis para siempre y sin tarjeta. Pasás a un plan pago cuando necesites más QR, más locales o reseñas respondidas con IA.",
  checks: ["Sin permanencia", "Precios finales, con IVA", "Factura A, B o C"],
};

/** Lo que pasa después de contratar. Mismas reglas que muestra la app en Ajustes → Plan. */
const sinAtaduras: { glifo: GlifoId; tono: "brand" | "coral" | "teal"; titulo: string; texto: string }[] = [
  {
    glifo: "escudo",
    tono: "brand",
    titulo: "Sin permanencia",
    texto: "Cancelás cuando quieras desde tu cuenta y seguís con el plan hasta el final del período que ya pagaste.",
  },
  {
    glifo: "repetir",
    tono: "coral",
    titulo: "Cambiás de plan cuando quieras",
    texto: "Subís o bajás desde tu cuenta. El cambio se prorratea sobre el período en curso.",
  },
  {
    glifo: "qr",
    tono: "teal",
    titulo: "Tus QR siguen andando",
    texto: "Si volvés a Free, tus QR siguen funcionando y no se borra nada: los carteles que ya imprimiste siguen andando.",
  },
];

const aMedida = {
  etiqueta: "Plan a medida",
  bajada:
    "Armamos un plan a medida para agencias de marketing y grandes franquicias. Contanos cuántos locales manejás y lo vemos.",
  fotoTitulo: "Todas tus cuentas, en un solo lugar",
  incluye: ["Multicuenta", "Reportes consolidados por cliente", "Onboarding del equipo", "Soporte dedicado"],
};

export default function PreciosPage() {
  const promo = promoVigente();
  return (
    <Pagina>
      <JsonLd id="ld-product" data={productSchema} />
      <JsonLd id="ld-faq-precios" data={faqSchema(faqsPrecios)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroPagina
        compacto
        migas={[{ label: "Inicio", href: "/" }, { label: "Precios" }]}
        titulo={hero.titulo}
        destacado={hero.destacado}
        bajada={hero.bajada}
        pie={
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 sm:gap-x-5">
            {hero.checks.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Glifo id="check" size={14} className="text-gold" />
                {t}
              </li>
            ))}
          </ul>
        }
      />

      {/* ── LOS PLANES ───────────────────────────────────────── */}
      <Seccion
        tono="lila"
        aire="chico"
        id="planes"
        contenedor={false}
        className="mt-3.5 md:pt-10"
        ariaLabelledby="planes-titulo"
      >
        {/* Más ancho que el contenedor de siempre: son cuatro tarjetas con mucha letra. */}
        <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
          <h2 id="planes-titulo" className="sr-only">
            Planes y precios
          </h2>
          <div data-reveal>
            <Pricing promo={promo} />
          </div>
        </div>
      </Seccion>

      {/* ── SIN ATADURAS: qué pasa después de contratar ──────── */}
      <Seccion id="sin-ataduras">
        <Titulo
          titulo={
            <>
              Te quedás porque <span className="text-brand">te rinde</span>
            </>
          }
          bajada="No hay permanencia: subís, bajás o cancelás cuando quieras, desde tu cuenta."
        />
        <ul className="carrusel carrusel-ancho mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {sinAtaduras.map((g, i) => (
            <li
              key={g.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] p-6 text-paper transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:-rotate-1 hover:shadow-[var(--shadow-float)] md:p-8",
                `dato-${g.tono}`,
              )}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/20 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                <Glifo id={g.glifo} size={24} />
              </span>
              <h3 className="mt-6 font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em] md:mt-10 md:text-[1.75rem]">
                {g.titulo}
              </h3>
              <p className="relative z-10 mt-3 text-[15px] leading-snug text-white/90 md:text-base md:leading-snug">{g.texto}</p>
              <i
                aria-hidden="true"
                className="absolute -right-10 -top-12 size-[170px] rounded-full bg-white/10 transition-transform duration-500 group-hover:-translate-x-5 group-hover:translate-y-5 group-hover:scale-[1.4]"
              />
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ── A MEDIDA: más cuentas que el plan más grande ─────── */}
      <Seccion tono="noche" id="a-medida">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <span data-reveal className="eyebrow-noche">
              <Glifo id="capas" size={13} /> {aMedida.etiqueta}
            </span>
            <h2 data-reveal="blur" className="t-mega mt-4 text-balance">
              {tope ? (
                <>
                  ¿Más de <span className="text-gold">{tope} comercios?</span>
                </>
              ) : (
                <>
                  ¿{planMayor.nombre} <span className="text-gold">te queda chico?</span>
                </>
              )}
            </h2>
            <p
              data-reveal="blur"
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="t-lead mt-4 max-w-[46ch] text-paper/80 md:mt-6"
            >
              {aMedida.bajada}
            </p>
            <div data-reveal className="mt-7 md:mt-9">
              <Button href={cta.demo.href} variant="oro" size="lg" arrow className="w-full sm:w-auto">
                {cta.demo.label}
              </Button>
            </div>
          </div>

          {/* Foto ilustrativa (content/fotos.ts): lleva lo que incluye el plan, sin cifras ni nombres. */}
          <figure data-reveal="zoom" className="foto-b relative min-h-[400px] overflow-hidden bg-ink lg:min-h-[500px]">
            <Image
              src={fotos.agencia.src}
              alt={fotos.agencia.alt}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-top"
            />
            <span aria-hidden="true" className="velo absolute inset-0" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="font-display text-[1.5rem] font-bold leading-[1.1] tracking-[-0.035em] md:text-[1.75rem]">
                {aMedida.fotoTitulo}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {aMedida.incluye.map((x) => (
                  <li key={x} className="vidrio-claro rounded-full px-3 py-1 text-[13px] font-medium">
                    {x}
                  </li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </div>
      </Seccion>

      {/* ── FAQ: título fijo a la izquierda, tarjetas a la derecha ── */}
      <Seccion id="preguntas">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 data-reveal="blur" className="t-mega">
              Dudas antes
              <br />
              de elegir
            </h2>
            <p data-reveal="blur" className="t-lead mt-4 max-w-[34ch] text-muted">
              Qué incluye cada plan, cómo se paga y qué pasa si después querés cambiar.
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
            <Faq items={faqsPrecios} variante="tarjetas" />
            <p className="mt-6 text-muted lg:hidden">
              {faqHome.otra}{" "}
              <a
                href={site.urls.whatsapp}
                className="inline-flex min-h-11 items-center font-bold text-brand underline-offset-4 hover:underline"
              >
                Escribinos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </Seccion>

      {/* ── CIERRE ───────────────────────────────────────────── */}
      <Cierre
        tamano="mega"
        titular={
          <>
            Empezá gratis.
            <br />
          </>
        }
        destacado={"Pagá cuando te\u00a0rinda."}
      />
    </Pagina>
  );
}
