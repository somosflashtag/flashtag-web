/**
 * Medios de pago aceptados: Mercado Pago (pesos) y Stripe (tarjeta
 * internacional), cada uno con las tarjetas que procesa.
 *
 * Son marcas de terceros con las que la integración existe en producción
 * (AGENTS.md §7): se muestran como badges tipográficos monocromos, sin
 * reproducir los logos oficiales. Para usar los logos hay que pedir el
 * material de marca de cada uno.
 */

function Badge({ children, ancho = 44 }: { children: React.ReactNode; ancho?: number }) {
  return (
    <span
      style={{ width: ancho }}
      className="flex h-7 items-center justify-center rounded-md border border-white/20 bg-white/10 text-[10px] font-bold uppercase tracking-wide text-paper"
    >
      {children}
    </span>
  );
}

function Mastercard() {
  return (
    <span className="flex h-7 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10" aria-label="Mastercard">
      <span className="flex">
        <span className="size-3.5 rounded-full bg-coral" />
        <span className="-ml-1.5 size-3.5 rounded-full bg-gold opacity-90" />
      </span>
    </span>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="mr-1 text-[13px] font-semibold text-paper">{titulo}</span>
      {children}
    </div>
  );
}

export function MediosDePago() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-8">
      <Grupo titulo="Mercado Pago">
        <Badge>Visa</Badge>
        <Mastercard />
        <Badge>Amex</Badge>
      </Grupo>
      <span aria-hidden="true" className="hidden h-6 w-px bg-white/20 sm:block" />
      <Grupo titulo="Stripe">
        <Badge>Visa</Badge>
        <Mastercard />
        <Badge>Amex</Badge>
      </Grupo>
    </div>
  );
}
