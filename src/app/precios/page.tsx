import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Faq } from "@/components/Faq";
import { Pricing } from "@/components/Pricing";
import { faqs } from "@/content/faq";
import { cta, site } from "@/lib/site";
import { faqSchema, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Precios y planes",
  description:
    "Plan gratis para siempre, Starter USD 49 y Full USD 99, con precio en pesos. Sin permanencia, con factura A/B/C en Argentina. Compará todos los planes.",
  path: "/precios",
});

const faqsPrecios = faqs.filter((f) => f.mostrarEn.includes("precios"));

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FlashTag — Planes",
  description: "Planes de FlashTag para comercios locales: Free, Starter y Full.",
  brand: { "@id": `${site.domain}/#organization` },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "0",
    highPrice: "99",
    priceCurrency: "USD",
    offerCount: 3,
    url: `${site.domain}/precios`,
  },
};

export default function PreciosPage() {
  return (
    <>
      <JsonLd id="ld-product" data={productSchema} />
      <JsonLd id="ld-faq-precios" data={faqSchema(faqsPrecios)} />

      <Section className="pb-0 lg:pb-0">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="t-display text-balance">Elegí cómo querés arrancar</h1>
          <p className="t-lead mx-auto mt-6 max-w-xl text-muted">
            Gratis para siempre si comprás un cartel. Planes pagos cuando
            necesites más QRs, más locales o reseñas automáticas.
          </p>
        </div>
      </Section>

      <Section>
        <Pricing />
      </Section>

      {/* Enterprise: bloque aparte, sin precio */}
      <Section className="pt-0 lg:pt-0">
        <div className="rounded-[var(--radius-surface)] border border-line bg-surface p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <h2 className="t-h3">¿Más de 30 comercios?</h2>
              <p className="t-body measure mt-3 text-muted">
                Armamos un plan a medida: multi-cuenta, reportes consolidados,
                onboarding del equipo y soporte dedicado. Contanos cuántos locales
                manejás y lo vemos.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Button href={cta.demo.href} variant="primary" size="lg" arrow>
                {cta.demo.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0 lg:pt-0">
        <h2 className="t-h2 text-balance">Sobre precios y facturación</h2>
        <div className="mt-10">
          <Faq items={faqsPrecios} />
        </div>
      </Section>

      <Section dark className="text-center">
        <h2 className="t-h2 measure mx-auto text-balance">
          Empezá gratis. Pagá cuando te rinda.
        </h2>
        <div className="mt-8 flex justify-center">
          <Button href={cta.primary.href} variant="primary" size="lg" arrow>
            {cta.primary.label}
          </Button>
        </div>
      </Section>
    </>
  );
}
