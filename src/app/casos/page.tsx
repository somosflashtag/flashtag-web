import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { casosPublicables, rubros } from "@/content/casos";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Casos",
  description:
    "Comercios argentinos que usan FlashTag para crecer: qué hicieron, con qué herramienta y qué resultado obtuvieron.",
  path: "/casos",
});

export default function CasosPage() {
  const hay = casosPublicables.length > 0;
  const rubrosConCasos = rubros.filter((r) =>
    casosPublicables.some((c) => c.rubro === r.id),
  );

  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Casos reales
        </p>
        <h1 className="t-display measure mt-4">
          Locales que crecen con FlashTag.
        </h1>
        <p className="t-lead measure mt-6 text-muted">
          De almacenes de barrio a marcas reconocidas. Casos reales de comercios
          argentinos.
        </p>
      </Section>

      <Section>
        {hay ? (
          <>
            {rubrosConCasos.length > 1 && (
              <ul className="flex flex-wrap gap-2">
                {rubrosConCasos.map((r) => (
                  <li
                    key={r.id}
                    className="t-caption rounded-full border border-line px-4 py-2"
                  >
                    {r.label}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {casosPublicables.map((c) => (
                <li
                  key={c.slug}
                  className="rounded-[var(--radius-card)] border border-line p-6"
                >
                  <p className="t-caption uppercase tracking-wide text-brand">
                    {rubros.find((r) => r.id === c.rubro)?.label}
                  </p>
                  <h2 className="t-h3 mt-3">{c.negocio}</h2>
                  <p className="t-caption mt-1 text-muted">{c.ciudad}</p>
                  <p className="t-body mt-4 text-muted">{c.uso}</p>
                  {c.metricaVerificada && c.metrica && (
                    <p className="t-caption mt-4 font-semibold text-brand tnum">
                      {c.metrica}
                    </p>
                  )}
                  {c.testimonio && (
                    <blockquote className="mt-4 border-l-2 border-brand pl-4">
                      <p className="t-body italic text-muted">
                        &ldquo;{c.testimonio.texto}&rdquo;
                      </p>
                      <footer className="t-caption mt-2 text-muted">
                        {c.testimonio.autor} · {c.testimonio.cargo}
                      </footer>
                    </blockquote>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          /* Sin casos autorizados no inventamos una grilla: se ofrece serlo.
             Ver AGENTS.md §5 y el flag `autorizado` en content/casos.ts. */
          <div className="mx-auto max-w-2xl rounded-[var(--radius-surface)] border border-line bg-surface p-8 text-center sm:p-12">
            <QRMark className="mx-auto" size={20} />
            <h2 className="t-h2 mt-5">Estamos preparando esta sección.</h2>
            <p className="t-lead mt-4 text-muted">
              Publicamos un caso solo cuando el comercio nos autoriza a usar su
              nombre y los números están verificados contra el dashboard. Las
              historias están; los permisos, en camino.
            </p>
            <p className="t-body mt-6 text-muted">
              ¿Tenés un local y querés que contemos el tuyo? Escribinos y lo
              armamos juntos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
              </Button>
            </div>
          </div>
        )}
      </Section>

      {hay && (
        <Section dark>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="t-h2">¿Querés sumarte a estos casos?</h2>
            <p className="t-lead mt-4 text-muted-dark">
              Empezá gratis, sin tarjeta de crédito.
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
      )}
    </>
  );
}
