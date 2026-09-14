import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Cartel } from "@/components/ui/Cartel";
import { Section } from "@/components/ui/Section";
import { casosConDetalle, rubros } from "@/content/casos";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

/**
 * Detalle de caso. Solo se genera para casos autorizados CON texto escrito:
 * si `autorizado` es false, generateStaticParams devuelve [] y la ruta no
 * existe. La autorización es lo que habilita la página, no un detalle visual.
 */
export function generateStaticParams() {
  return casosConDetalle.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = casosConDetalle.find((x) => x.slug === slug);
  if (!c?.portada) return {};
  return pageMeta({
    title: c.portada.titular,
    description: c.portada.bajada,
    path: `/casos/${c.slug}`,
  });
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = casosConDetalle.find((x) => x.slug === slug);
  if (!c?.detalle || !c.portada) notFound();

  const html = marked.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "content", "casos-detalle", `${c.detalle}.md`),
      "utf-8",
    ),
    { async: false, gfm: true },
  );

  const rubro = rubros.find((r) => r.id === c.rubro)?.label;

  return (
    <>
      <div className="border-b border-line bg-surface py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <nav className="t-caption text-muted" aria-label="Migas de pan">
                <Link href="/" className="hover:text-ink">
                  Inicio
                </Link>
                {" / "}
                <Link href="/casos" className="hover:text-ink">
                  Casos
                </Link>
                {" / "}
                <span>{c.negocio}</span>
              </nav>
              <p className="t-caption mt-5 inline-block rounded-full bg-brand-soft px-3 py-1 font-semibold uppercase tracking-wide text-brand">
                {rubro}
              </p>
              <h1 className="t-h2 mt-5">{c.portada.titular}</h1>
              <p className="t-lead measure mt-5 text-muted">{c.portada.bajada}</p>
              <ul className="t-caption mt-6 flex flex-wrap gap-2 text-muted">
                {c.portada.datos.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-line bg-paper px-3 py-1.5"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <Cartel canal="google" className="mx-auto w-[190px] lg:w-[230px]" />
          </div>
        </Container>
      </div>

      {/* Las cifras solo salen cuando están cruzadas con el dashboard. */}
      {c.metricaVerificada && (
        <Container>
          <dl className="grid grid-cols-2 gap-4 py-12 lg:grid-cols-4">
            {c.portada.cifras.map((f) => (
              <div
                key={f.label}
                className="rounded-[var(--radius-card)] border border-line p-6 text-center"
              >
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="t-stat block text-brand">{f.valor}</span>
                  <span className="t-caption mt-2 block text-muted">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      )}

      <Container>
        <article
          className="legal max-w-3xl py-14 md:py-20"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {c.testimonio && (
          <blockquote className="mb-14 max-w-3xl rounded-[var(--radius-surface)] border border-line bg-surface p-8">
            <p className="t-lead italic">
              &ldquo;{c.testimonio.texto}&rdquo;
            </p>
            <footer className="t-caption mt-5 text-muted">
              <strong className="text-ink">{c.testimonio.autor}</strong> ·{" "}
              {c.testimonio.cargo}
            </footer>
          </blockquote>
        )}

        <Link
          href="/casos"
          className="t-caption mb-14 inline-block font-semibold text-brand underline underline-offset-4"
        >
          Ver todos los casos
        </Link>
      </Container>

      <Section dark>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">¿Querés resultados como estos?</h2>
          <p className="t-lead mt-4 text-muted-dark">
            Empezá con un cartel y escalá cuando quieras.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={site.urls.shop} variant="primary" size="lg" arrow>
              Comprá tu cartel
            </Button>
            <Button
              href={cta.primary.href}
              variant="secondary"
              size="lg"
              className="border-white/25 text-white hover:border-white hover:bg-white/10"
            >
              {cta.primary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
