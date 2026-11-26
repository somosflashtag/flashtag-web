import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticuloCard } from "@/components/ArticuloCard";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Container } from "@/components/ui/Container";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
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
  /* Para seguir leyendo: primero los de la misma categoría. */
  const otros = articulosPublicables
    .filter((x) => x.slug !== a.slug)
    .sort((x, y) => Number(y.categoria === a.categoria) - Number(x.categoria === a.categoria))
    .slice(0, 3);

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
    <Pagina>
      <JsonLd id="ld-articulo" data={schema} />

      <HeroPagina
        compacto
        largo
        confeti={false}
        migas={[{ label: "Inicio", href: "/" }, { label: "Blog", href: "/blog" }, { label: a.categoria }]}
        etiqueta={a.categoria}
        titulo={a.titulo}
        bajada={a.bajada}
        pie={
          <p>
            <time dateTime={a.fecha}>{fmt.format(new Date(a.fecha))}</time>
            {" · "}
            <span className="tnum">{a.minutos} min de lectura</span>
            {" · "}
            Por el equipo de FlashTag
          </p>
        }
      />

      <section className="py-12 md:py-20">
        <Container>
          <article
            className="legal mx-auto max-w-[720px]"
            /* Markdown del repositorio, renderizado en build. Sin input de usuario. */
            dangerouslySetInnerHTML={{ __html: html }}
          />

          <aside data-reveal className="mx-auto mt-12 max-w-[720px] rounded-[2rem] bg-brand-soft/70 p-7 md:p-10">
            <p className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.035em] md:text-[1.75rem]">
              ¿Querés empezar con un QR dinámico en tu local?
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={site.urls.shop} variant="primary" size="lg" arrow>
                Comprá tu cartel
              </Button>
              <Button href={cta.primary.href} variant="secondary" size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </aside>

          <p className="mx-auto mt-8 max-w-[720px]">
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-bold text-brand underline-offset-4 hover:underline">
              <span aria-hidden="true">←</span> Volver al blog
            </Link>
          </p>
        </Container>
      </section>

      {otros.length > 0 && (
        <Seccion tono="arena">
          <Titulo titulo="Seguí leyendo" />
          <ul className="carrusel mt-9 grid gap-4 md:mt-12 md:grid-cols-3">
            {otros.map((o, i) => (
              <li key={o.slug} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <ArticuloCard articulo={o} />
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      <Cierre titular="Empezá hoy." destacado="Es gratis." bajada="Sin tarjeta de crédito. Setup en minutos." />
    </Pagina>
  );
}
