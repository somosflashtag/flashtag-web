import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
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
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Prensa" }]}
        etiqueta="Prensa"
        glifo="informe"
        titulo="FlashTag en"
        destacado="los medios."
        bajada={
          <>
            Para consultas de prensa, entrevistas o material de marca, escribinos a{" "}
            <a href={`mailto:${EMAIL}`} className="font-semibold text-paper underline underline-offset-4">
              {EMAIL}
            </a>
            .
          </>
        }
      >
        <Button href={`mailto:${EMAIL}`} variant="oro" size="lg" arrow>
          Escribinos a prensa
        </Button>
        <Button href="#kit" variant="claro" size="lg">
          Kit de prensa
        </Button>
      </HeroPagina>

      {/* Solo se listan menciones con URL real de la nota. Ver content/prensa.ts */}
      {mencionesPublicables.length > 0 && (
        <Seccion>
          <Titulo titulo="Menciones" />
          <ul className="mt-9 grid gap-4 md:mt-14 md:grid-cols-2">
            {mencionesPublicables.map((m, i) => (
              <li
                key={m.titulo}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="flex flex-col rounded-[2rem] bg-brand-soft/70 p-6 md:p-8"
              >
                <p className="text-sm font-semibold text-brand">
                  {m.medio} · {m.fecha}
                </p>
                <h3 className="mt-3 font-display text-[1.375rem] font-bold leading-snug tracking-[-0.03em]">{m.titulo}</h3>
                <a
                  href={m.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex min-h-11 items-center pt-4 text-[15px] font-bold text-brand underline underline-offset-4"
                >
                  Leer la nota
                </a>
              </li>
            ))}
          </ul>
        </Seccion>
      )}

      {/* ── SOBRE FLASHTAG + KIT ─────────────────────────────── */}
      <Seccion>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Titulo alineado="izq" titulo="Sobre FlashTag" />
            <p data-reveal="blur" className="t-lead measure mt-5 text-muted">
              FlashTag es una plataforma argentina de marketing phygital para comercios locales. Combina carteles con QR
              dinámicos, Link Pages, métricas en tiempo real y respuesta de reseñas de Google con IA, en una sola app.
            </p>
            <p data-reveal="blur" className="t-lead measure mt-4 text-muted">
              Fundada en 2024 en Buenos Aires, hoy vende carteles, tarjetas y stickers por e-commerce y opera su propia
              aplicación.
            </p>
            <dl data-reveal className="mt-8 flex flex-wrap gap-4">
              <div className="dato-brand rounded-[1.5rem] px-6 py-5 text-paper">
                <dt className="text-sm text-paper/85">Fundación</dt>
                <dd className="mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.04em] tnum">2024</dd>
              </div>
              <div className="dato-teal rounded-[1.5rem] px-6 py-5 text-paper">
                <dt className="text-sm text-paper/85">Sede</dt>
                <dd className="mt-1 font-display text-[2rem] font-bold leading-none tracking-[-0.04em]">Buenos Aires</dd>
              </div>
            </dl>
          </div>

          <div id="kit" data-reveal="zoom" className="scroll-mt-28 rounded-[2rem] bg-brand-soft/70 p-6 md:p-9">
            <h2 className="font-display text-[1.75rem] font-bold leading-tight tracking-[-0.04em] md:text-[2.25rem]">Kit de prensa</h2>
            <p className="mt-3 text-[1.0625rem] text-muted">Logo en alta resolución, fotos y datos de la empresa.</p>
            {kitPublicable.length > 0 ? (
              <ul className="mt-6 grid gap-2.5">
                {kitPublicable.map((p) => (
                  <li key={p.label}>
                    <a
                      href={p.href ?? undefined}
                      download
                      className="group flex min-h-[56px] items-center justify-between gap-4 rounded-2xl bg-paper px-5 py-3 text-[15px] font-semibold transition-[translate,box-shadow] duration-500 ease-fluida hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]"
                    >
                      {p.label}
                      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="shrink-0 text-brand transition-transform duration-500 ease-fluida group-hover:translate-y-0.5">
                        <path d="M8 3v8M4.5 7.5 8 11l3.5-3.5M3 13h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 rounded-2xl bg-paper p-5 text-muted">
                Estamos armando el kit descargable. Mientras tanto, pedinos el material por mail y te lo pasamos el mismo día.
              </p>
            )}
            <p className="mt-5 text-sm text-muted">¿Necesitás otra pieza? Pedila por mail y te la pasamos el mismo día.</p>
            <Button href={`mailto:${EMAIL}`} variant="primary" size="lg" arrow className="mt-5 w-full sm:w-auto">
              Escribinos a prensa
            </Button>
          </div>
        </div>
      </Seccion>

      {/* ── PARA PERIODISTAS ─────────────────────────────────── */}
      <Seccion tono="arena">
        <Titulo
          titulo="¿Cubrís comercio local o tecnología?"
          bajada="Contamos con datos de uso, casos y voceros disponibles para entrevistas."
        />
        <div data-reveal className="mt-8 flex flex-col items-center gap-4">
          <Button href={`mailto:${EMAIL}`} variant="primary" size="lg" arrow>
            Contactar a prensa
          </Button>
          <p className="text-sm text-muted">{site.name} · Buenos Aires, Argentina</p>
        </div>
      </Seccion>

      <Cierre />
    </Pagina>
  );
}
