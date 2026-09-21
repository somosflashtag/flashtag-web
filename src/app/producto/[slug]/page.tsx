import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Mock } from "@/components/app/mocks";
import { FidelidadDetalle } from "@/components/FidelidadDetalle";
import { PixelesDetalle } from "@/components/PixelesDetalle";
import { FormatosDescarga } from "@/components/FormatosDescarga";
import { Analitica } from "@/components/Analitica";
import { MetricasDetalle } from "@/components/MetricasDetalle";
import { analiticaPara } from "@/content/analitica";
import { features } from "@/content/features";
import { planes } from "@/content/planes";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

/** Una página estática por feature, con su pantalla de la app. */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) return {};
  return pageMeta({
    title: f.seoTitle ?? f.nombre,
    description: f.seoDescription ?? f.bajada,
    path: `/producto/${f.slug}`,
  });
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) notFound();

  const otras = features.filter((x) => x.slug !== f.slug);
  const plan = planes.find((p) => p.nombre === f.desde);
  const tieneAnalitica = Boolean(analiticaPara(f.slug));

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_70%_at_70%_50%,black,transparent)]" />
        <Section className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div data-reveal>
              <nav className="t-caption text-muted" aria-label="Migas de pan">
                <Link href="/" className="hover:text-ink">Inicio</Link>
                {" / "}
                <Link href="/como-funciona" className="hover:text-ink">Aplicación</Link>
                {" / "}
                <span>{f.nombre}</span>
              </nav>
              <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand">
                <QRMark size={12} /> {f.nombre}
                <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
                  Desde {f.desde}
                </span>
              </p>
              <h1 className="t-display measure mt-4 text-balance">{f.titular}</h1>
              <p className="t-lead measure mt-6 text-muted">{f.bajada}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                  {cta.primary.label}
                </Button>
                <Button href={cta.secondary.href} variant="secondary" size="lg">
                  {cta.secondary.label}
                </Button>
              </div>
            </div>
            <div data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
              <PhoneFrame className="ft-float">
                <Mock id={f.mock} />
              </PhoneFrame>
            </div>
          </div>
        </Section>
      </div>

      <Section>
        <h2 className="t-h2 text-balance" data-reveal>Cómo funciona</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {f.pasos.map((p, i) => (
            <li
              key={p.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="relative rounded-[var(--radius-surface)] border border-line p-6 lg:p-8"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper tnum">
                {i + 1}
              </span>
              <h3 className="t-h3 mt-5">{p.titulo}</h3>
              <p className="t-body mt-2 text-muted">{p.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      {f.slug === "qr-dinamicos" && <FormatosDescarga />}
      {f.slug === "fidelidad" && <FidelidadDetalle />}
      {f.slug === "pixeles" && <PixelesDetalle />}
      {f.slug === "metricas" && <MetricasDetalle />}

      <Section className="border-t border-line bg-surface">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 className="t-h2">Para qué lo usan</h2>
            <ul className="mt-8 space-y-4">
              {f.casos.map((c) => (
                <li
                  key={c}
                  className="t-lead flex gap-3 border-b border-line pb-4 last:border-0"
                >
                  <QRMark className="mt-2" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5" data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            {f.analogia && (
              <figure className="rounded-[var(--radius-surface)] border border-line bg-paper p-8 lg:p-10">
                <QRMark size={20} />
                <blockquote className="t-h3 mt-5">
                  &ldquo;{f.analogia}&rdquo;
                </blockquote>
              </figure>
            )}
            {plan && (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-surface)] border border-line bg-paper p-6">
                <div>
                  <p className="t-caption text-muted">Incluido desde el plan</p>
                  <p className="t-h3 mt-1">
                    {plan.nombre}
                    {plan.precioMensual > 0 && (
                      <span className="text-muted"> · USD {plan.precioMensual}/mes</span>
                    )}
                  </p>
                </div>
                <Button href="/precios" variant="secondary" size="md">
                  Comparar planes
                </Button>
              </div>
            )}
          </div>
        </div>
      </Section>

      {tieneAnalitica && <Analitica slug={f.slug} />}

      <Section className="border-t border-line">
        <h2 className="t-h2" data-reveal>El resto de la app</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otras.map((o, i) => (
            <li key={o.slug} data-reveal style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}>
              <Link
                href={`/producto/${o.slug}`}
                className="card-lift flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-5"
              >
                <p className="t-caption flex items-center gap-2 text-brand">
                  <QRMark size={11} /> {o.nombre}
                </p>
                <p className="mt-2 text-[0.9375rem] font-semibold leading-snug">{o.corto}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">Probalo en tu local</h2>
          <p className="t-lead mt-4 text-muted">
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
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
