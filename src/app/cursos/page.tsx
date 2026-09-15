import { CtaFinal } from "@/components/CtaFinal";
import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { cursos } from "@/content/cursos";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cursos",
  description:
    "Cursos prácticos de marketing digital para dueños de comercios argentinos. Sin tecnicismos, con resultados concretos.",
  path: "/cursos",
});

function Duracion({ modulos, horas }: { modulos: number; horas: number }) {
  const h = horas % 1 === 0 ? horas : horas.toString().replace(".", ",");
  return (
    <span className="tnum">
      {modulos} módulos · {h} h
    </span>
  );
}

export default function CursosPage() {
  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Cursos
        </p>
        <h1 className="t-display measure mt-4">
          Aprendé a hacer crecer tu negocio.
        </h1>
        <p className="t-lead measure mt-6 text-muted">
          Cursos prácticos para dueños de comercios argentinos. Sin tecnicismos.
          Con resultados concretos.
        </p>
      </Section>

      <Section>
        <ul className="grid gap-4">
          {cursos.map((c) => {
            /* El nombre de la institución solo aparece con aval confirmado. */
            const institucion =
              c.institucion && !c.institucion.avalPendiente
                ? c.institucion.nombre
                : null;

            return (
              <li
                key={c.slug}
                className="flex flex-col gap-4 rounded-[var(--radius-card)] border border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
              >
                <div className="min-w-0">
                  <p className="t-caption flex flex-wrap items-center gap-x-2 gap-y-1 text-muted">
                    <span className="rounded-full bg-surface px-2.5 py-1 text-ink">
                      {c.nivel}
                    </span>
                    <Duracion modulos={c.modulos} horas={c.horas} />
                    {!c.disponible && (
                      <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand">
                        Próximamente
                      </span>
                    )}
                  </p>
                  <h2 className="t-h3 mt-3">
                    {c.titulo}
                    {institucion && (
                      <span className="text-muted"> · {institucion}</span>
                    )}
                  </h2>
                </div>

                {c.disponible ? (
                  <Button
                    href={cta.primary.href}
                    variant="primary"
                    size="md"
                    className="shrink-0"
                  >
                    Empezar gratis
                  </Button>
                ) : (
                  <span className="t-caption shrink-0 rounded-[var(--radius-btn)] border border-line px-5 py-3 text-muted">
                    Pronto
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      <CtaFinal
        titulo="¿Listo para aplicarlo en tu local?"
        texto="Empezá gratis, sin tarjeta de crédito. Setup en minutos."
      >
        <Button href={cta.primary.href} variant="primary" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant="secondary" size="lg">
          {cta.secondary.label}
        </Button>
      </CtaFinal>
    </>
  );
}
