import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { equipo, historia, mision, valores } from "@/content/nosotros";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Nosotros",
  description:
    "FlashTag nació en Buenos Aires con una convicción simple: los comercios locales merecen las mismas herramientas de marketing que las grandes marcas.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Nosotros
        </p>
        <h1 className="t-display measure mt-4">
          Construimos el puente entre el comercio físico y el mundo digital.
        </h1>
        <p className="t-lead measure mt-6 text-muted">
          FlashTag nació de una convicción simple: los comercios locales merecen
          las mismas herramientas de marketing que las grandes marcas, sin
          necesitar un equipo técnico ni un presupuesto enorme.
        </p>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="t-caption uppercase tracking-wide text-brand">
              {mision.eyebrow}
            </p>
            <h2 className="t-h2 mt-3">{mision.titular}</h2>
            {mision.parrafos.map((p) => (
              <p key={p} className="t-body measure mt-5 text-muted">
                {p}
              </p>
            ))}
          </div>

          {/* Un solo dato duro: el año. El resto de los contadores quedan
              fuera hasta que site.proof tenga números que podamos sostener. */}
          <dl
            className={`grid h-fit gap-4 ${
              site.proof.locales !== null ? "grid-cols-2" : "max-w-xs grid-cols-1"
            }`}
          >
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
              <dt className="t-caption text-muted">Año de fundación</dt>
              <dd className="t-stat mt-2">2024</dd>
            </div>
            {site.proof.locales !== null && (
              <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6">
                <dt className="t-caption text-muted">Comercios activos</dt>
                <dd className="t-stat mt-2 tnum">
                  {site.proof.locales.toLocaleString("es-AR")}+
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Section>

      <Section className="border-y border-line bg-surface">
        <h2 className="t-h2">Lo que nos guía</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v) => (
            <li
              key={v.titulo}
              className="rounded-[var(--radius-card)] border border-line bg-paper p-6"
            >
              <QRMark />
              <h3 className="t-h3 mt-4">{v.titulo}</h3>
              <p className="t-body mt-2 text-muted">{v.texto}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="t-h2">Historia</h2>
        <ol className="mt-10 max-w-3xl">
          {historia.map((h, i) => (
            <li key={h.anio} className="flex gap-6">
              <div className="flex flex-col items-center">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold tnum">
                  {h.anio.slice(2)}
                </span>
                {i < historia.length - 1 && (
                  <span className="w-px flex-1 bg-line" aria-hidden="true" />
                )}
              </div>
              <div className="pb-10">
                <p className="t-caption text-brand tnum">{h.anio}</p>
                <p className="t-body mt-1.5 text-muted">{h.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section dark>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">{equipo.titular}</h2>
          <p className="t-lead mt-4 text-muted-dark">{equipo.texto}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${equipo.email}`} variant="primary" size="lg" arrow>
              Escribinos a {equipo.email}
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
