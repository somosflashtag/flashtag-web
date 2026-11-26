import { ArticuloCard } from "@/components/ArticuloCard";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { articulosPublicables } from "@/content/blog";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Guías, tips y casos reales del marketing digital para comercios en Argentina.",
  path: "/blog",
});

export default function BlogPage() {
  const [primero, ...resto] = articulosPublicables;

  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
        etiqueta="Blog"
        glifo="informe"
        titulo="Aprendé a crecer"
        destacado="tu local."
        bajada="Guías, tips y casos reales del marketing digital para comercios en Argentina."
      />

      <Seccion>
        {primero ? (
          <>
            <div data-reveal="zoom">
              <ArticuloCard articulo={primero} destacada />
            </div>
            {resto.length > 0 && (
              <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resto.map((a, i) => (
                  <li key={a.slug} data-reveal style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}>
                    <ArticuloCard articulo={a} />
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          /* Un índice que linkea a artículos sin texto son 404 nuevos. Ver content/blog.ts */
          <div className="mx-auto max-w-2xl rounded-[2rem] bg-brand-soft/70 p-8 text-center sm:p-12">
            <Titulo tamano="chico" titulo="Estamos escribiendo." />
            <p className="t-lead mt-4 text-muted">
              Las primeras guías salen pronto: QR dinámicos, reseñas con IA, métricas para comercios y programas de
              fidelidad.
            </p>
            <p className="mt-6 text-muted">Mientras tanto, los cursos ya están disponibles y son gratis.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/cursos" variant="primary" size="lg" arrow>
                Ver los cursos
              </Button>
              <Button href={cta.primary.href} variant="secondary" size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </div>
        )}
      </Seccion>

      <Cierre />
    </Pagina>
  );
}
