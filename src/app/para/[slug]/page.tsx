import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { casosPublicables } from "@/content/casos";
import { paginasRubro } from "@/content/rubros";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export function generateStaticParams() {
  return paginasRubro.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) return {};
  return pageMeta({
    title: r.nav,
    description: r.metaDescripcion,
    path: `/para/${r.slug}`,
  });
}

export default async function RubroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) notFound();

  /* Solo comercios de este rubro que nos autorizaron. Ver AGENTS.md §5. */
  const delRubro = casosPublicables.filter((c) => c.rubro === r.rubro);
  const otros = paginasRubro.filter((x) => x.slug !== r.slug);

  return (
    <>
      <Section className="bg-surface">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="t-caption uppercase tracking-wide text-brand">
              {r.eyebrow}
            </p>
            <h1 className="t-display measure mt-4">{r.titular}</h1>
            <p className="t-lead measure mt-6 text-muted">{r.bajada}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                Empezar gratis
              </Button>
              <Button href="/precios" variant="secondary" size="lg">
                Ver planes
              </Button>
            </div>
            <p className="t-caption mt-5 text-muted">
              Sin tarjeta de crédito · Setup en minutos · Soporte en castellano
            </p>
          </div>

          <Image
            src={r.foto.src}
            alt={r.foto.alt}
            width={700}
            height={700}
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="w-full rounded-[var(--radius-surface)] object-cover shadow-[var(--shadow-float)]"
          />
        </div>
      </Section>

      <Section>
        <h2 className="t-h2">Lo que FlashTag hace por vos</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {r.beneficios.map((b) => (
            <li
              key={b.titulo}
              className="card-lift rounded-[var(--radius-card)] border border-line bg-paper p-6"
            >
              <QRMark />
              <h3 className="t-h3 mt-4">{b.titulo}</h3>
              <p className="t-body mt-2 text-muted">{b.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      {delRubro.length > 0 && (
        <Section className="border-y border-line bg-surface">
          <h2 className="t-h2">Comercios de este perfil que ya usan FlashTag</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {delRubro.map((c) => (
              <li
                key={c.slug}
                className="rounded-full border border-line bg-paper px-5 py-2.5 text-sm font-medium"
              >
                {c.negocio}
              </li>
            ))}
          </ul>
          <Link
            href="/casos"
            className="t-caption mt-6 inline-block font-semibold text-brand underline underline-offset-4"
          >
            Ver todos los casos
          </Link>
        </Section>
      )}

      <Section className={delRubro.length > 0 ? "" : "border-t border-line"}>
        <h2 className="t-h2">¿Tu negocio es otra cosa?</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {otros.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/para/${o.slug}`}
                className="inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors duration-[120ms] hover:border-ink"
              >
                {o.nav}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">Empezá hoy. Es gratis.</h2>
          <p className="t-lead mt-4 text-muted">
            Sin tarjeta de crédito. Setup en minutos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} variant="primary" size="lg" arrow>
              Crear cuenta gratis
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
