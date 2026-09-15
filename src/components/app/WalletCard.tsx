import { QRCode } from "@/components/ui/QRCode";
import { cn } from "@/lib/cn";
import type { TipoTarjeta } from "@/content/fidelidad";

/**
 * Tarjeta de fidelidad tal como se ve guardada en la billetera del teléfono.
 * Dibujada en código, con tokens; el comercio es ficticio.
 */
const paletas = {
  ink: { fondo: "bg-ink", texto: "text-paper", suave: "text-white/60", franja: "bg-white/10", sello: "bg-gold text-ink", vacio: "border-white/25" },
  brand: { fondo: "bg-brand", texto: "text-paper", suave: "text-white/70", franja: "bg-white/15", sello: "bg-gold text-ink", vacio: "border-white/30" },
  teal: { fondo: "bg-teal", texto: "text-paper", suave: "text-white/70", franja: "bg-white/15", sello: "bg-gold text-ink", vacio: "border-white/30" },
  coral: { fondo: "bg-coral", texto: "text-paper", suave: "text-white/75", franja: "bg-white/15", sello: "bg-gold text-ink", vacio: "border-white/30" },
  gold: { fondo: "bg-gold", texto: "text-ink", suave: "text-ink/60", franja: "bg-ink/10", sello: "bg-ink text-paper", vacio: "border-ink/25" },
  surface: { fondo: "bg-surface", texto: "text-ink", suave: "text-muted", franja: "bg-paper", sello: "bg-brand text-paper", vacio: "border-line" },
} as const;

export function WalletCard({ t, className }: { t: TipoTarjeta["tarjeta"]; className?: string }) {
  const p = paletas[t.color];
  return (
    <div className={cn("overflow-hidden rounded-2xl p-4 shadow-[var(--shadow-float)]", p.fondo, p.texto, className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("flex size-7 items-center justify-center rounded-full text-[11px] font-bold", p.franja)}>
            {t.negocio[0]}
          </span>
          <span className="text-[13px] font-semibold">{t.negocio}</span>
        </div>
        <div className="text-right">
          <p className={cn("text-[9px] font-semibold uppercase tracking-wide", p.suave)}>{t.arriba.label}</p>
          <p className="text-[14px] font-semibold leading-tight tnum">{t.arriba.valor}</p>
        </div>
      </div>

      <div className={cn("mt-3 flex min-h-[52px] items-center rounded-xl px-3 py-2.5", p.franja)}>
        {t.sellos ? (
          <ul className="flex w-full flex-wrap gap-1.5">
            {Array.from({ length: t.sellos.total }).map((_, i) => (
              <li
                key={i}
                className={cn(
                  "flex size-7 items-center justify-center rounded-full border text-[10px] font-bold",
                  i < t.sellos!.hechos ? cn(p.sello, "border-transparent") : p.vacio,
                )}
              >
                {i < t.sellos!.hechos ? "✓" : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[12px] font-semibold leading-snug">{t.franja}</p>
        )}
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-3">
        {t.campos.map((c) => (
          <div key={c.label}>
            <dt className={cn("text-[9px] font-semibold uppercase tracking-wide", p.suave)}>{c.label}</dt>
            <dd className="text-[13px] font-semibold tnum">{c.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 flex flex-col items-center rounded-xl bg-paper px-3 py-2.5">
        <QRCode size={56} />
        <p className="mt-1.5 text-[9px] text-muted">Mostrá el código para sumar o canjear</p>
      </div>
    </div>
  );
}
