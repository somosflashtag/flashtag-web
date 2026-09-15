import { CtaFinal } from "@/components/CtaFinal";
import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { kitPublicable, mencionesPublicables } from "@/content/prensa";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Prensa",
  description:
    "Contacto de prensa y kit de marca de FlashTag: logo, fotos y datos de la empresa para periodistas y medios.",
  path: "/prensa",
});

const EMAIL = "prensa@flashtag.tech";

export default function PrensaPage() {
  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Prensa
        </p>
        <h1 className="t-display measure mt-4">FlashTag en los medios.</h1>
        <p className="t-lead measure mt-6 text-muted">
          Para consultas de prensa, entrevistas o material de marca, escribinos
          a{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-brand underline underline-offset-4"
          >
            {EMAIL}
          </a>
          .
        </p>
      </Section>

      {/* Solo se listan menciones con URL real de la nota. Ver content/prensa.ts */}
      {mencionesPublicables.length > 0 && (
        <Section>
          <h2 className="t-h2">Menciones</h2>
          <ul className="mt-10 grid gap-4">
            {mencionesPublicables.map((m) => (
              <li
                key={m.titulo}
                className="rounded-[var(--radius-card)] border border-line p-6"
              >
                <p className="t-caption text-muted">
                  {m.medio} · {m.fecha}
                </p>
                <h3 className="t-h3 mt-2">{m.titulo}</h3>
                <a
                  href={m.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="t-caption mt-3 inline-block font-semibold text-brand underline underline-offset-4"
                >
                  Leer la nota
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="t-h2">Sobre FlashTag</h2>
            <p className="t-body measure mt-5 text-muted">
              FlashTag es una plataforma argentina de marketing phygital para
              comercios locales. Combina carteles con QR dinámicos, Link Pages,
              métricas en tiempo real y respuesta de reseñas de Google con IA,
              en una sola app.
            </p>
            <p className="t-body measure mt-4 text-muted">
              Fundada en 2024 en Buenos Aires, hoy vende carteles, tarjetas y
              stickers por e-commerce y opera su propia aplicación.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md">
              <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <dt className="t-caption text-muted">Fundación</dt>
                <dd className="t-h3 mt-1 tnum">2024</dd>
              </div>
              <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5">
                <dt className="t-caption text-muted">Sede</dt>
                <dd className="t-h3 mt-1">Buenos Aires</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="t-h2">Kit de prensa</h2>
            <p className="t-body mt-5 text-muted">
              Logo en alta resolución, fotos y datos de la empresa.
            </p>
            {kitPublicable.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {kitPublicable.map((p) => (
                  <li key={p.label}>
                    <a
                      href={p.href ?? undefined}
                      className="t-caption inline-flex rounded-[var(--radius-btn)] border border-line px-4 py-3 font-medium transition-colors duration-[120ms] hover:border-ink"
                    >
                      {p.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="t-body mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-muted">
                Estamos armando el kit descargable. Mientras tanto, pedinos el
                material por mail y te lo pasamos el mismo día.
              </p>
            )}
            <Button
              href={`mailto:${EMAIL}`}
              variant="primary"
              size="lg"
              arrow
              className="mt-6"
            >
              Escribinos a prensa
            </Button>
          </div>
        </div>
      </Section>

      <CtaFinal
        titulo="¿Cubrís comercio local o tecnología?"
        texto="Contamos con datos de uso, casos y voceros disponibles para entrevistas."
        pie={`${site.name} · Buenos Aires, Argentina`}
      >
        <Button href={`mailto:${EMAIL}`} variant="primary" size="lg" arrow>
          Contactar a prensa
        </Button>
      </CtaFinal>
    </>
  );
}
