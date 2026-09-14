import { JsonLd } from "@/components/JsonLd";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { QRMark } from "@/components/ui/QRMark";
import { Hero } from "@/components/Hero";
import { Bento } from "@/components/Bento";
import { AppTour } from "@/components/AppTour";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Mock, MockFidelidad } from "@/components/app/mocks";
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
  title: "FlashTag — QR dinámicos, NFC, reseñas con IA y fidelidad para tu local",
  description:
    "Carteles con QR y NFC conectados a una app: reseñas de Google respondidas con IA, Link Pages, métricas y programa de fidelidad. Probala gratis.",
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

const fidelidad = features.find((f) => f.slug === "fidelidad")!;

export default function Home() {
  /* Las pantallas se renderizan acá (server) y el tour solo elige cuál mostrar. */
  const screens = Object.fromEntries(
    features.map((f) => [f.slug, <Mock key={f.slug} id={f.mock} />]),
  );

  return (
    <>
      <JsonLd id="ld-software" data={softwareSchema} />
      <JsonLd id="ld-faq-home" data={faqSchema(faqsHome)} />

      <Hero />

      <Clientes />

      {/* ── EL PROBLEMA ──────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <h2 className="t-h2 text-balance" data-reveal>
            Por tu local pasa gente todos los días. ¿Cuánta vuelve?
          </h2>
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
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

      {/* ── BENTO: las seis capacidades, con la app asomando ── */}
      <Section id="producto" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> La app
          </p>
          <h2 className="t-h2 mt-4 text-balance">
            Todo lo que tu local necesita, en un solo lugar
          </h2>
          <p className="t-lead mx-auto mt-4 text-muted">
            Un cartel en la mesa y seis herramientas en tu celular. Cada una se
            usa sola; juntas hacen que el cliente vuelva.
          </p>
        </div>
        <div className="mt-12 lg:mt-16">
          <Bento />
        </div>
      </Section>

      {/* ── TOUR: así se ve adentro ─────────────────────────── */}
      <Section id="tour">
        <div data-reveal>
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand lg:justify-start">
            <QRMark size={12} /> Así se ve adentro
          </p>
          <h2 className="t-h2 mt-4 text-balance text-center lg:text-left">
            Recorré la app sin crear una cuenta
          </h2>
        </div>
        <div className="mt-12 lg:mt-16" data-reveal>
          <AppTour features={features} screens={screens} />
        </div>
      </Section>

      {/* ── CÓMO EMPEZAR ───────────────────────────────────── */}
      <Section dark className="surface-deep relative overflow-hidden">
        <div aria-hidden="true" className="bg-dots-dark absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative">
          <h2 className="t-h2 measure text-balance" data-reveal>
            Del cartel al dashboard en 4 pasos
          </h2>
          <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8">
            {pasos.map((p, i) => (
              <li
                key={p.n}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="relative border-t border-white/15 pt-5"
              >
                <span className="absolute -top-px left-0 h-px w-12 bg-teal" aria-hidden="true" />
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
        </div>
      </Section>

      {/* ── FIDELIDAD: la razón por la que vuelven ──────────── */}
      <Section id="fidelidad" className="border-b border-line bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:order-2" data-reveal>
            <p className="flex items-center gap-2 text-sm font-semibold text-brand">
              <QRMark size={12} />
              {fidelidad.nombre}
              <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                Plan {fidelidad.desde}
              </span>
            </p>
            <h2 className="t-h2 mt-4 text-balance">{fidelidad.titular}</h2>
            <p className="t-body measure mt-5 text-muted">{fidelidad.bajada}</p>
            <ul className="mt-6 space-y-2.5">
              {fidelidad.casos.map((c) => (
                <li key={c} className="flex gap-2.5 text-[0.9375rem]">
                  <QRMark size={11} tone="muted" className="mt-1.5" />
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/producto/fidelidad" variant="primary" size="lg" arrow>
                Ver cómo funciona
              </Button>
              <Button href="/precios" variant="secondary" size="lg">
                Ver el plan Full
              </Button>
            </div>
          </div>
          <div className="lg:order-1" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <PhoneFrame>
              <MockFidelidad />
            </PhoneFrame>
          </div>
        </div>
      </Section>

      <CasosDestacados />

      <Tienda />

      {/* ── PRECIOS ──────────────────────────────────────────── */}
      <Section id="precios">
        <div className="text-center" data-reveal>
          <h2 className="t-h2 text-balance">Precios claros, sin letra chica</h2>
          <p className="t-lead measure mx-auto mt-4 text-muted">
            Empezá gratis. Pasá a un plan pago solo cuando te empiece a rendir.
          </p>
        </div>
        <div className="mt-12" data-reveal>
          <Pricing />
        </div>
        <div className="mt-10 text-center">
          <Link href="/precios" className="text-[0.9375rem] font-semibold underline underline-offset-4">
            Comparar todos los planes en detalle
          </Link>
        </div>
      </Section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <Section className="border-t border-line">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div data-reveal>
            <h2 className="t-h2 text-balance">Preguntas que nos hacen siempre</h2>
            <p className="t-body mt-4 text-muted">
              ¿Te quedó alguna otra?{" "}
              <Link href="/contacto" className="font-semibold text-ink underline underline-offset-4">
                Escribinos
              </Link>
              .
            </p>
          </div>
          <div data-reveal>
            <Faq items={faqsHome} />
          </div>
        </div>
      </Section>

      {/* ── CTA FINAL ────────────────────────────────────────── */}
      <Section dark className="surface-deep text-center">
        <h2 className="t-h2 measure mx-auto text-balance" data-reveal>
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
