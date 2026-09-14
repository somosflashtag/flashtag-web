import { JsonLd } from "@/components/JsonLd";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { QRMark } from "@/components/ui/QRMark";
import { HeroMockup } from "@/components/HeroMockup";
import { Faq } from "@/components/Faq";
import { Pricing } from "@/components/Pricing";
import { Tienda } from "@/components/Tienda";
import { CasosDestacados } from "@/components/CasosDestacados";
import { Clientes } from "@/components/Clientes";
import { features, pasos } from "@/content/features";
import { faqs } from "@/content/faq";
import { planes } from "@/content/planes";
import { cta, site } from "@/lib/site";
import { faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "FlashTag — QR dinámicos y reseñas con IA para tu local",
  description:
    "Carteles con QR, Link Pages, métricas y reseñas de Google respondidas con IA. La herramienta de marketing para tu comercio. Probala gratis.",
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
  offers: planes.map((p) => ({
    "@type": "Offer",
    name: p.nombre,
    price: String(p.precioMensual),
    priceCurrency: "USD",
    description: p.paraQuien,
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd id="ld-software" data={softwareSchema} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqsHome)} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <Container>
        <div className="grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <QRMark size={13} />
              Hecho en Argentina
            </p>

            {/* El titular está visible desde el frame 1: nunca espera a la animación */}
            <h1 className="t-display mt-5 text-balance">
              Tu local ya tiene clientes.
              <br className="hidden sm:block" /> Falta que vuelvan.
            </h1>

            <p className="t-lead measure mt-6 text-muted">
              Un cartel con QR <strong className="font-semibold text-ink">y NFC</strong>:
              tu cliente lo escanea o apoya el teléfono y ya está en tu ficha de
              Google. Sumá Link Pages, reseñas respondidas con IA y métricas que
              te dicen qué hacer la semana que viene.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
              </Button>
            </div>

            <p className="mt-5 text-sm text-muted">
              Sin tarjeta de crédito. Activación en minutos. Soporte por WhatsApp
              en castellano.
            </p>
          </div>

          <div className="lg:pl-4">
            <HeroMockup />
          </div>
        </div>
      </Container>

      {/* ── PRUEBA SOCIAL: marcas reales, no integraciones sin confirmar ── */}
      <Clientes />

      {/* ── EL PROBLEMA ──────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2 className="t-h2 text-balance">
            Por tu local pasa gente todos los días. ¿Cuánta vuelve?
          </h2>
          <div>
            <p className="t-lead measure text-muted">
              Vendés bien, atendés bien, pero no tenés forma de saber quién entró,
              qué miró ni cómo hacer que vuelva. Las reseñas se acumulan sin
              respuesta y tu cartel dice lo mismo desde hace ocho meses.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "El 76% de quienes buscan un negocio local cerca visitan uno en 24 horas.",
                "Los comercios que responden reseñas reciben más consultas que los que no.",
                "Un cartel impreso que no podés cambiar es dinero congelado en la pared.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <QRMark size={13} className="mt-1.5" />
                  <span className="t-body measure text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PRODUCTO: layout alternado, no grid de cards iguales ── */}
      <section id="producto" className="border-t border-line">
        <Container>
          <div className="py-14 md:py-20 lg:py-32">
            <h2 className="t-h2 measure text-balance">
              Todo lo que tu local necesita, en un solo lugar
            </h2>

            <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-32">
              {features.map((f, i) => (
                <article
                  key={f.slug}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                      <QRMark size={12} />
                      {f.nombre}
                    </p>
                    <h3 className="t-h2 mt-4 text-balance">{f.titular}</h3>
                    <p className="t-body measure mt-5 text-muted">{f.bajada}</p>

                    <ul className="mt-6 space-y-2.5">
                      {f.casos.map((c) => (
                        <li key={c} className="flex gap-2.5 text-[0.9375rem]">
                          <QRMark size={11} tone="muted" className="mt-1.5" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/producto/${f.slug}`}
                      className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold"
                    >
                      Ver cómo funciona
                      <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="transition-transform duration-[120ms] ease-[var(--ease-ft)] group-hover:translate-x-1">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>

                  {/* Placeholder gráfico del sistema visual — nunca "imagen pendiente" */}
                  <div
                    className={`aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    {f.foto && (
                      <Image
                        src={f.foto.src}
                        alt={f.foto.alt}
                        width={760}
                        height={570}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="size-full object-cover"
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── CÓMO EMPEZAR: acá SÍ va numeración, es una secuencia real ── */}
      <Section dark>
        <h2 className="t-h2 measure text-balance">Del cartel al dashboard en 4 pasos</h2>
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {pasos.map((p) => (
            <li key={p.n} className="border-t border-white/15 pt-5">
              <span className="t-stat text-white/25">0{p.n}</span>
              <h3 className="t-h3 mt-3">{p.titulo}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-white/60">
                {p.texto}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <Button href="/como-funciona" variant="secondary" size="lg" arrow className="border-white/25 text-white hover:border-white hover:bg-white/10">
            Ver el proceso completo
          </Button>
        </div>
      </Section>

      {/* ── PRUEBA SOCIAL: nombres reconocibles con números chequeables ── */}
      <CasosDestacados />

      {/* ── TIENDA: el paso 1 de arriba es comprar un cartel. Acá están. ── */}
      <Tienda />

      {/* ── PRECIOS ──────────────────────────────────────────── */}
      <Section id="precios">
        <div className="text-center">
          <h2 className="t-h2 text-balance">Precios claros, sin letra chica</h2>
          <p className="t-lead measure mx-auto mt-4 text-muted">
            Empezá gratis. Pasá a un plan pago solo cuando te empiece a rendir.
          </p>
        </div>
        <div className="mt-12">
          <Pricing />
        </div>
        <div className="mt-10 text-center">
          <Link href="/precios" className="text-[0.9375rem] font-semibold underline underline-offset-4">
            Comparar todos los planes en detalle
          </Link>
        </div>
      </Section>

      {/* ── WAITLIST: el ancla que en Framer estaba huérfana ─── */}
      <Section id="waitlist" className="border-t border-line bg-surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QRMark size={12} />
              Próximamente
            </p>
            <h2 className="t-h2 mt-4 text-balance">
              Programa de fidelidad con puntos
            </h2>
            <p className="t-body measure mt-5 text-muted">
              Tus clientes acumulan puntos cada vez que escanean o compran, y los
              canjean por premios. Sin tarjeta plástica, sin app que instalar.
              Estamos construyéndolo — anotate y sos de los primeros en probarlo.
            </p>
          </div>
          <div className="lg:pt-10">
            <form className="flex flex-col gap-3 sm:flex-row" action="/api/waitlist" method="post">
              <div className="flex-1">
                <label htmlFor="waitlist-email" className="sr-only">
                  Tu email
                </label>
                <input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="tu@email.com"
                  className="min-h-[52px] w-full rounded-[var(--radius-btn)] border border-line bg-paper px-4 outline-none transition-colors focus:border-ink"
                />
              </div>
              <Button type="submit" variant="primary" size="lg">
                Anotarme
              </Button>
            </form>
            <p className="mt-3 text-sm text-muted">
              Te escribimos solo cuando esté listo. Nada más.
            </p>
          </div>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="t-h2 text-balance">Preguntas que nos hacen siempre</h2>
            <p className="t-body mt-4 text-muted">
              ¿Te quedó alguna otra?{" "}
              <Link href="/contacto" className="font-semibold text-ink underline underline-offset-4">
                Escribinos
              </Link>
              .
            </p>
          </div>
          <Faq items={faqsHome} />
        </div>
      </Section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <Section dark className="text-center">
        <h2 className="t-h2 measure mx-auto text-balance">
          Probalo gratis y mirá qué pasa en una semana
        </h2>
        <p className="t-lead measure mx-auto mt-5 text-white/60">
          Sin tarjeta, sin permanencia y sin instalar nada. Si no te sirve, lo
          dejás.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={cta.primary.href} variant="primary" size="lg" arrow>
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="secondary" size="lg" className="border-white/25 text-white hover:border-white hover:bg-white/10">
            {cta.secondary.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
