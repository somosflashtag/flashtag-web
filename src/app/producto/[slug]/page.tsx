import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { features } from "@/content/features";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

/** Una página estática por feature. Sin esto, el footer linkea a 404. */
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
    title: f.nombre,
    description: f.bajada,
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

  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> {f.nombre}
        </p>
        <h1 className="t-display measure mt-4">{f.titular}</h1>
        <p className="t-lead measure mt-6 text-muted">{f.bajada}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={cta.primary.href} variant="primary" size="lg" arrow>
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="secondary" size="lg">
            {cta.secondary.label}
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
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

          {f.analogia && (
            <figure className="h-fit rounded-[var(--radius-surface)] border border-line bg-surface p-8 lg:p-10">
              <QRMark size={20} />
              <blockquote className="t-h3 mt-5">
                &ldquo;{f.analogia}&rdquo;
              </blockquote>
            </figure>
          )}
        </div>
      </Section>

      <Section className="border-t border-line bg-surface">
        <h2 className="t-h2">El resto de la app</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otras.map((o) => (
            <li key={o.slug}>
              <a
                href={`/producto/${o.slug}`}
                className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-paper p-6 transition-colors duration-[120ms] hover:border-ink"
              >
                <p className="t-caption flex items-center gap-2 text-brand">
                  <QRMark /> {o.nombre}
                </p>
                <h3 className="t-h3 mt-3">{o.titular}</h3>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section dark>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">Probalo en tu local</h2>
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
