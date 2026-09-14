import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { articulosPublicables } from "@/content/blog";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Blog",
  description:
    "Guías, tips y casos reales del marketing digital para comercios en Argentina.",
  path: "/blog",
});

const fmt = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const hay = articulosPublicables.length > 0;

  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Blog
        </p>
        <h1 className="t-display measure mt-4">Aprendé a crecer tu local</h1>
        <p className="t-lead measure mt-6 text-muted">
          Guías, tips y casos reales del marketing digital para comercios en
          Argentina.
        </p>
      </Section>

      <Section>
        {hay ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articulosPublicables.map((a) => (
              <li key={a.slug}>
                <a
                  href={`/blog/${a.slug}`}
                  className="flex h-full flex-col rounded-[var(--radius-card)] border border-line p-6 transition-colors duration-[120ms] hover:border-ink"
                >
                  <p className="t-caption uppercase tracking-wide text-brand">
                    {a.categoria}
                  </p>
                  <h2 className="t-h3 mt-3">{a.titulo}</h2>
                  <p className="t-body mt-3 flex-1 text-muted">{a.bajada}</p>
                  <p className="t-caption mt-5 text-muted">
                    <time dateTime={a.fecha}>
                      {fmt.format(new Date(a.fecha))}
                    </time>{" "}
                    · {a.minutos} min de lectura
                  </p>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          /* Los artículos migrados de Framer todavía no tienen texto: publicar
             el índice serían seis 404. Ver content/blog.ts */
          <div className="mx-auto max-w-2xl rounded-[var(--radius-surface)] border border-line bg-surface p-8 text-center sm:p-12">
            <QRMark className="mx-auto" size={20} />
            <h2 className="t-h2 mt-5">Estamos escribiendo.</h2>
            <p className="t-lead mt-4 text-muted">
              Las primeras guías salen pronto: QR dinámicos, reseñas con IA,
              métricas para comercios y programas de fidelidad.
            </p>
            <p className="t-body mt-6 text-muted">
              Mientras tanto, los cursos ya están disponibles y son gratis.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/cursos" variant="primary" size="lg" arrow>
                Ver los cursos
              </Button>
              <Button href={cta.primary.href} variant="secondary" size="lg">
                {cta.primary.label}
              </Button>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
