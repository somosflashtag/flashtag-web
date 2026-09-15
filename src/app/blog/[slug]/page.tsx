import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CtaFinal } from "@/components/CtaFinal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QRMark } from "@/components/ui/QRMark";
import { articulos, articulosPublicables } from "@/content/blog";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

export function generateStaticParams() {
  return articulosPublicables.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

const fmt = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function leerCuerpo(archivo: string) {
  const p = path.join(process.cwd(), "src", "content", "articulos", `${archivo}.md`);
  return marked.parse(fs.readFileSync(p, "utf-8"), { async: false, gfm: true });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articulos.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMeta({
    title: a.titulo,
    description: a.bajada,
    path: `/blog/${a.slug}`,
  });
}

export default async function ArticuloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = articulosPublicables.find((x) => x.slug === slug);
  if (!a?.cuerpo) notFound();

  const html = leerCuerpo(a.cuerpo);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.titulo,
    description: a.bajada,
    datePublished: a.fecha,
    inLanguage: site.lang,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.domain}/#organization` },
    mainEntityOfPage: `${site.domain}/blog/${a.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="border-b border-line bg-surface py-14 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <nav className="t-caption text-muted" aria-label="Migas de pan">
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
              {" / "}
              <Link href="/blog" className="hover:text-ink">
                Blog
              </Link>
              {" / "}
              <span>{a.categoria}</span>
            </nav>
            <p className="t-caption mt-5 inline-block rounded-full bg-brand-soft px-3 py-1 font-semibold uppercase tracking-wide text-brand">
              {a.categoria}
            </p>
            <h1 className="t-h2 mt-5">{a.titulo}</h1>
            <p className="t-caption mt-5 text-muted">
              <time dateTime={a.fecha}>{fmt.format(new Date(a.fecha))}</time>
              {" · "}
              {a.minutos} min de lectura
              {" · "}
              Por el equipo de FlashTag
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-3xl py-14 md:py-20">
          <p className="t-lead measure text-muted">{a.bajada}</p>
          <article
            className="legal mt-10"
            /* Markdown del repositorio, renderizado en build. Sin input de usuario. */
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <div className="mt-14 border-t border-line pt-10">
            <p className="t-h3">¿Querés empezar con un QR dinámico en tu local?</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={site.urls.shop} variant="primary" size="lg" arrow>
                Comprá tu cartel
              </Button>
              <Button href={cta.primary.href} variant="secondary" size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </div>

          <Link
            href="/blog"
            className="t-caption mt-10 inline-flex items-center gap-2 font-semibold text-brand"
          >
            <QRMark size={11} /> Volver al blog
          </Link>
        </div>
      </Container>

      <CtaFinal
        titulo="Empezá hoy. Es gratis."
        texto="Sin tarjeta de crédito. Setup en minutos."
      >
        <Button href={cta.primary.href} variant="primary" size="lg" arrow>
          Crear cuenta gratis
        </Button>
      </CtaFinal>
    </>
  );
}
