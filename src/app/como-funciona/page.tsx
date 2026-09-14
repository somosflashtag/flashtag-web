import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { pasos, pasosIntro } from "@/content/pasos";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cómo funciona",
  description:
    "De comprar un cartel a ver métricas en el dashboard, en menos de 48 horas. Los cuatro pasos para empezar con FlashTag.",
  path: "/como-funciona",
});

export default function ComoFuncionaPage() {
  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Cómo funciona
        </p>
        <h1 className="t-display measure mt-4">{pasosIntro.titular}</h1>
        <p className="t-lead measure mt-6 text-muted">{pasosIntro.bajada}</p>
      </Section>

      <Section>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              className="rounded-[var(--radius-card)] border border-line p-6"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-soft text-sm font-semibold text-brand tnum">
                {i + 1}
              </span>
              <h2 className="t-h3 mt-4">{p.titulo}</h2>
              <p className="t-body mt-2 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-y border-line bg-surface">
        <h2 className="t-h2">Qué hacés desde la app</h2>
        <p className="t-lead measure mt-4 text-muted">
          Con o sin cartel. Todo se administra desde el mismo lugar.
        </p>
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.slug}
              className="rounded-[var(--radius-card)] border border-line bg-paper p-6 lg:p-8"
            >
              <p className="t-caption flex items-center gap-2 text-brand">
                <QRMark /> {f.nombre}
              </p>
              <h3 className="t-h3 mt-3">{f.titular}</h3>
              <p className="t-body measure mt-3 text-muted">{f.bajada}</p>
              <ul className="mt-4 space-y-2">
                {f.casos.map((c) => (
                  <li key={c} className="t-body flex gap-2.5 text-muted">
                    <QRMark className="mt-1.5" size={10} tone="muted" />
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section dark>
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
