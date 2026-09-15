import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { QRCode } from "./ui/QRCode";
import { QRMark } from "./ui/QRMark";
import { PhoneFrame } from "./app/PhoneFrame";
import { MockDashboard } from "./app/mocks";
import { cta } from "@/lib/site";

/**
 * Hero: el titular y la app, lado a lado.
 * El teléfono muestra el dashboard real; el cartel con QR y NFC flota
 * adelante porque es el objeto que une lo físico con la pantalla.
 */
export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(70%_60%_at_60%_40%,black,transparent)]" />
      <Container>
        <div className="grid items-center gap-14 py-14 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-24">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-[13px] font-semibold">
              <QRMark size={12} />
              QR + NFC · Hecho en Argentina
            </p>

            <h1 className="t-display mt-6 text-balance">
              Tu local ya tiene clientes.
              <br className="hidden sm:block" /> Falta que{" "}
              <span className="text-glow">vuelvan</span>.
            </h1>

            <p className="t-lead measure mt-6 text-muted">
              Un producto físico y una solución digital. Tu cliente escanea o
              apoya el teléfono y deja la reseña en Google, te sigue en tus
              redes, inicia una conversación por WhatsApp o suma puntos en tu
              programa de fidelidad. Vos ves todo en la app.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
              </Button>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {["Sin tarjeta de crédito", "Activación en minutos", "Soporte por WhatsApp"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="text-teal">
                    <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <div className="relative px-6 py-6 sm:px-14">
              <PhoneFrame className="ft-float">
                <MockDashboard />
              </PhoneFrame>

              {/* El cartel: QR + NFC, el objeto que está en el mostrador */}
              <div className="absolute bottom-10 left-0 hidden w-[164px] rounded-[var(--radius-card)] border border-line bg-paper p-3 shadow-[var(--shadow-float)] sm:block lg:-left-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                    Dejanos tu reseña
                  </span>
                  <span className="flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} viewBox="0 0 12 12" width="8" height="8" fill="var(--color-gold)">
                        <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
                      </svg>
                    ))}
                  </span>
                </div>
                <QRCode size={140} className="mt-2 w-full" />
                <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted">
                  <svg viewBox="0 0 20 20" width="12" height="12" fill="none" aria-hidden="true" className="text-brand">
                    <path d="M6 14a6 6 0 0 1 0-8M14 6a6 6 0 0 1 0 8M8.5 11.5a2 2 0 0 1 0-3M11.5 8.5a2 2 0 0 1 0 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                  o apoyá el teléfono
                </div>
              </div>

              {/* El toque NFC: ondas */}
              <div className="absolute right-0 top-28 hidden items-center gap-2 rounded-full border border-line bg-paper py-2 pl-2 pr-4 shadow-[var(--shadow-float)] sm:flex lg:right-2">
                <span className="relative flex size-8 items-center justify-center rounded-full bg-brand text-white">
                  <span className="ft-ping absolute inset-0 rounded-full border-2 border-brand" />
                  <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
                    <path d="M6 14a6 6 0 0 1 0-8M14 6a6 6 0 0 1 0 8M8.5 11.5a2 2 0 0 1 0-3M11.5 8.5a2 2 0 0 1 0 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-[12px] font-semibold leading-tight">
                  Toque NFC
                  <span className="block text-[10px] font-medium text-muted">Mostrador · ahora</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
