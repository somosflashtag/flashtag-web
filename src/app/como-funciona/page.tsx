import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { AppTour } from "@/components/AppTour";
import { Mock } from "@/components/app/mocks";
import { features } from "@/content/features";
import { pasos, pasosIntro } from "@/content/pasos";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cómo funciona",
  description:
    "De comprar un cartel a ver métricas en el dashboard, en menos de 48 horas. Los cuatro pasos para empezar con FlashTag y un recorrido por la app.",
  path: "/como-funciona",
});

export default function ComoFuncionaPage() {
  const screens = Object.fromEntries(
    features.map((f) => [f.slug, <Mock key={f.slug} id={f.mock} />]),
  );

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]" />
        <Section className="relative">
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark /> Cómo funciona
          </p>
          <h1 className="t-display measure mt-4">{pasosIntro.titular}</h1>
          <p className="t-lead measure mt-6 text-muted">{pasosIntro.bajada}</p>
        </Section>
      </div>

      <Section>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className="relative rounded-[var(--radius-surface)] border border-line p-6"
            >
              {i < pasos.length - 1 && (
                <span aria-hidden="true" className="absolute -right-5 top-10 hidden h-px w-5 bg-line lg:block" />
              )}
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper tnum">
                {i + 1}
              </span>
              <h2 className="t-h3 mt-5">{p.titulo}</h2>
              <p className="t-body mt-2 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-y border-line bg-surface">
        <div data-reveal>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> Qué hacés desde la app
          </p>
          <h2 className="t-h2 mt-4 text-balance">Con o sin cartel. Todo desde el mismo lugar.</h2>
        </div>
        <div className="mt-12 lg:mt-16" data-reveal>
          <AppTour features={features} screens={screens} />
        </div>
      </Section>

      <Section dark className="surface-deep">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">¿Listo para llevar tu local al siguiente nivel?</h2>
          <p className="t-lead mt-4 text-muted-dark">
            Empezá gratis, sin tarjeta de crédito. Setup en minutos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} variant="primary" size="lg" arrow>
              {cta.primary.label}
            </Button>
            <Button
              href={cta.secondary.href}
              variant="secondary"
              size="lg"
              className="border-white/25 text-white hover:border-white hover:bg-white/10"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
