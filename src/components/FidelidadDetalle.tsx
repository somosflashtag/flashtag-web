import { Section } from "./ui/Section";
import { QRMark } from "./ui/QRMark";
import { WalletCard } from "./app/WalletCard";
import { herramientas, tiposDeTarjeta } from "@/content/fidelidad";

function Check() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
      <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.5 10.3 2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconos: Record<string, React.ReactNode> = {
  push: <path d="M10 3a4.5 4.5 0 0 0-4.5 4.5V11l-1.5 2h12l-1.5-2V7.5A4.5 4.5 0 0 0 10 3zM8 15.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  cumple: <path d="M3.5 9.5h13v6.5h-13zM3.5 12.5c1.5 1 3 1 4.3 0 1.4 1 2.9 1 4.3 0 1.4 1 2.9 1 4.4 0M10 9.5V6.5M10 3.5v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  referidos: <path d="M7 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM13.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM2.5 16a4.5 4.5 0 0 1 9 0M11.5 16a3.5 3.5 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  geo: <path d="M10 17s-5-4.5-5-8.5a5 5 0 0 1 10 0c0 4-5 8.5-5 8.5zM10 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
};

/**
 * Secciones propias de /producto/fidelidad: las ocho modalidades de tarjeta
 * y las cuatro herramientas de retención que funcionan sobre cualquiera.
 */
export function FidelidadDetalle() {
  return (
    <>
      <Section id="modalidades" className="border-t border-line bg-surface">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> Ocho modalidades
          </p>
          <h2 className="t-h2 mt-4 text-balance">Un programa para cada tipo de negocio</h2>
          <p className="t-lead mx-auto mt-4 text-muted">
            Sellos para el café, membresía para el gimnasio, gift card para la
            estética, cashback para la tienda. Elegís la modalidad, le ponés tu
            logo y tu esquema de puntos, y el cliente la guarda en Apple Wallet o
            Google Wallet.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {tiposDeTarjeta.map((t, i) => (
            <li
              key={t.id}
              data-reveal
              style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as React.CSSProperties}
              className="card-lift flex flex-col rounded-[var(--radius-surface)] border border-line bg-paper p-5"
            >
              <div className="rounded-[1.25rem] bg-surface p-3">
                <WalletCard t={t.tarjeta} />
              </div>
              <h3 className="t-h3 mt-5">{t.nombre}</h3>
              <p className="t-caption mt-1 text-muted">{t.para}</p>
              <ul className="mt-4 space-y-2.5">
                {t.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                    <Check />
                    {b}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="herramientas">
        <div className="max-w-3xl" data-reveal>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> Sobre cualquier tarjeta
          </p>
          <h2 className="t-h2 mt-4 text-balance">Herramientas para que vuelvan</h2>
          <p className="t-lead mt-4 text-muted">
            Una vez que la tarjeta está en su billetera, tenés un canal directo
            con cada cliente. Sin app, sin SMS pagos, sin mails que nadie abre.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {herramientas.map((h, i) => (
            <li
              key={h.id}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
              className="card-lift flex flex-col rounded-[var(--radius-surface)] border border-line bg-paper p-6"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <svg viewBox="0 0 20 20" width="22" height="22" fill="none" aria-hidden="true">
                  {iconos[h.id]}
                </svg>
              </span>
              <p className="t-caption mt-5 uppercase tracking-wide text-brand">{h.nombre}</p>
              <h3 className="t-h3 mt-1.5">{h.titular}</h3>
              <ul className="mt-4 space-y-2.5">
                {h.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[0.9375rem] leading-snug text-muted">
                    <Check />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
