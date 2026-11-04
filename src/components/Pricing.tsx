"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { hrefContratar, planes, precioARS, type Plan } from "@/content/planes";
import { conDescuento, descuentoTexto, type Promo } from "@/content/promos";
import { cn } from "@/lib/cn";
import { usePromoVigente } from "./usePromoVigente";

function Check({ on }: { on: boolean }) {
  return on ? (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-brand">
      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" className="mt-0.5 shrink-0 text-line">
      <path d="M4 8h8" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Qué número va en cada lugar de la tarjeta, con o sin promo.
 *
 * Sin promo es lo de siempre: el "por mes" del anual es `precioAnualPorMes`
 * de planes.ts. Con promo, los TOTALES se rebajan con la misma regla que la
 * app (`conDescuento`, hacia abajo al entero) —porque el total es lo que se
 * cobra— y el "por mes" del anual se deriva de ese total. Así el visitante ve
 * exactamente el monto que después le aparece en Mercado Pago.
 */
function preciosDe(plan: Plan, anual: boolean, promo: Promo | null) {
  const totalAnualUsd = plan.totalAnual;
  const totalAnualArs = plan.totalAnualARS;
  const lista = {
    usd: anual && plan.precioAnualPorMes !== null ? plan.precioAnualPorMes : plan.precioMensual,
    ars: anual && totalAnualArs ? Math.round(totalAnualArs / 12) : plan.precioARS,
    totalUsd: totalAnualUsd,
    totalArs: totalAnualArs,
  };
  if (!promo || plan.precioMensual === 0) return { ...lista, lista: null };

  const totalUsd = totalAnualUsd !== null ? conDescuento(totalAnualUsd, promo) : null;
  const totalArs = totalAnualArs !== null ? conDescuento(totalAnualArs, promo) : null;
  return {
    usd: anual && totalUsd !== null ? Math.round(totalUsd / 12) : conDescuento(plan.precioMensual, promo),
    ars: anual && totalArs !== null ? Math.round(totalArs / 12) : conDescuento(plan.precioARS, promo),
    totalUsd,
    totalArs,
    lista,
  };
}

export type Moneda = "ars" | "usd";

const fmtUSD = (n: number) => `USD ${n}`;

function PlanCard({ plan, anual, promo, moneda }: { plan: Plan; anual: boolean; promo: Promo | null; moneda: Moneda }) {
  const p = preciosDe(plan, anual, promo);
  const precio = p.usd;
  const ars = p.ars;

  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-[var(--radius-card)] p-5 sm:p-7",
        plan.destacado
          ? "bg-ink text-paper shadow-[var(--shadow-float)]"
          : "border border-line bg-paper",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="t-h3">{plan.nombre}</h3>
        {p.lista && promo ? (
          <span className="rounded-full bg-teal px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {promo.nombre} −{descuentoTexto(promo)}
          </span>
        ) : plan.destacado ? (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Más elegido
          </span>
        ) : null}
      </div>

      <p className={cn("mt-2 text-sm leading-relaxed", plan.destacado ? "text-white/60" : "text-muted")}>
        {plan.paraQuien}
      </p>

      <div className="mt-6">
        {plan.precioMensual === 0 ? (
          <p className="t-stat">Gratis</p>
        ) : (
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            {p.lista && (
              <s className={cn("tnum text-lg font-medium", plan.destacado ? "text-white/45" : "text-muted/70")}>
                {moneda === "ars" ? precioARS(p.lista.ars) : fmtUSD(p.lista.usd)}
              </s>
            )}
            <span className="t-stat">{moneda === "ars" ? precioARS(ars) : fmtUSD(precio)}</span>
            <span className={cn("text-sm", plan.destacado ? "text-white/60" : "text-muted")}>/mes</span>
          </p>
        )}
        <p className={cn("mt-1.5 text-[13px]", plan.destacado ? "text-white/50" : "text-muted")}>
          {plan.precioMensual === 0
            ? "Para siempre, sin tarjeta"
            : anual
              ? `${moneda === "ars" ? precioARS(p.totalArs ?? 0) : fmtUSD(p.totalUsd ?? 0)} por año`
              : "Facturación mensual · sin permanencia"}
          {plan.precioMensual > 0 && (moneda === "ars" ? " · Mercado Pago" : " · tarjeta internacional")}
        </p>
        {p.lista && promo && (
          <p className={cn("mt-1.5 text-[13px] font-semibold", plan.destacado ? "text-gold" : "text-teal")}>
            Precio {promo.nombre} si contratás hasta el {promo.hastaTexto}
          </p>
        )}
      </div>

      <Button
        href={hrefContratar(plan, anual ? "anual" : "mensual")}
        variant={plan.destacado ? "primary" : "secondary"}
        size="md"
        className="mt-6 w-full"
      >
        {plan.cta.label}
      </Button>

      {/* Los features no incluidos se muestran en gris, nunca se omiten:
          comparar es más persuasivo que ocultar. */}
      <ul className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={cn(
              "flex gap-2.5 text-sm leading-snug sm:text-[0.9375rem]",
              !f.incluido && (plan.destacado ? "text-white/35" : "text-muted/60"),
              f.incluido && plan.destacado && "text-white/90",
            )}
          >
            <Check on={f.incluido} />
            <span>
              {f.label}
              {f.nota && (
                <span className="mt-1 block w-fit rounded bg-current/10 px-1.5 py-0.5 text-[11px] font-medium opacity-70">
                  {f.nota}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Misma frase que `notaFiscal` en planes.ts, con los logos oficiales a color
 * (`public/pagos/*-color.svg`) en lugar de los nombres entre paréntesis.
 */
function NotaFacturacion() {
  const logo = "mx-1 inline-block w-auto align-[-0.3em]";
  return (
    <p className="measure mx-auto mt-8 text-center text-sm leading-[1.9] text-muted">
      <strong className="font-semibold text-ink">Todos los precios son finales: ya incluyen IVA.</strong>{" "}
      Facturación A/B/C en Argentina. Pagá en dólares con tarjeta internacional vía
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pagos/stripe-color.svg" alt="Stripe" width={43} height={18} className={logo} style={{ height: 18 }} />
      o en pesos con
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pagos/mercado-pago-color.svg" alt="Mercado Pago" width={87} height={22} className={logo} style={{ height: 22 }} />
    </p>
  );
}

/**
 * `promo`: la vigente según el server (`promoVigente()` en la página). Se
 * pasa como prop y no se calcula acá para que el HTML y la hidratación
 * coincidan; `usePromoVigente` la apaga en el navegador cuando vence.
 */
export function Pricing({ conNota = true, promo: promoServer = null }: { conNota?: boolean; promo?: Promo | null }) {
  const [anual, setAnual] = useState(false);
  const [moneda, setMoneda] = useState<Moneda>("ars");
  const promo = usePromoVigente(promoServer);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <div
          role="group"
          aria-label="Ciclo de facturación"
          className="inline-flex rounded-full border border-line bg-surface p-1"
        >
          {([false, true] as const).map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setAnual(v)}
              aria-pressed={anual === v}
              className={cn(
                "min-h-[40px] rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-[180ms] sm:px-5 sm:text-sm",
                anual === v ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {v ? "Anual" : "Mensual"}
              {v && <span className="ml-1.5 text-brand">−15%</span>}
            </button>
          ))}
        </div>
        <div
          role="group"
          aria-label="Moneda"
          className="inline-flex rounded-full border border-line bg-surface p-1"
        >
          {(["ars", "usd"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMoneda(m)}
              aria-pressed={moneda === m}
              className={cn(
                "min-h-[40px] rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-[180ms] sm:px-5 sm:text-sm",
                moneda === m ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {m === "ars" ? "Pesos" : "Dólares"}<span className="hidden sm:inline"> ({m.toUpperCase()})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Siempre Free → Starter → Full → Evolution, también en phone. */}
      <div className="carrusel carrusel-ancho mt-6 grid gap-5 md:mt-10 md:grid-cols-2 xl:grid-cols-4">
        {planes.map((p) => (
          <div key={p.id}>
            <PlanCard plan={p} anual={anual} promo={promo} moneda={moneda} />
          </div>
        ))}
      </div>

      {conNota && <NotaFacturacion />}
    </div>
  );
}
