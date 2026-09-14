"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { planes, notaFiscal, type Plan } from "@/content/planes";
import { cn } from "@/lib/cn";

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

function PlanCard({ plan, anual }: { plan: Plan; anual: boolean }) {
  const precio = anual && plan.precioAnualPorMes !== null ? plan.precioAnualPorMes : plan.precioMensual;

  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--radius-card)] p-6 sm:p-7",
        plan.destacado
          ? "bg-ink text-paper shadow-[var(--shadow-float)]"
          : "border border-line bg-paper",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="t-h3">{plan.nombre}</h3>
        {plan.destacado && (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Más elegido
          </span>
        )}
      </div>

      <p className={cn("mt-2 text-sm leading-relaxed", plan.destacado ? "text-white/60" : "text-muted")}>
        {plan.paraQuien}
      </p>

      <div className="mt-6">
        {plan.precioMensual === 0 ? (
          <p className="t-stat">Gratis</p>
        ) : (
          <p className="flex items-baseline gap-1.5">
            <span className="text-base font-medium opacity-60">USD</span>
            <span className="t-stat">{precio}</span>
            <span className={cn("text-sm", plan.destacado ? "text-white/60" : "text-muted")}>/mes</span>
          </p>
        )}
        <p className={cn("mt-1.5 text-[13px]", plan.destacado ? "text-white/50" : "text-muted")}>
          {plan.precioMensual === 0
            ? "Para siempre, sin tarjeta"
            : anual
              ? `USD ${plan.totalAnual} facturados por año`
              : "Facturación mensual"}
        </p>
      </div>

      <Button
        href={plan.cta.href}
        variant={plan.destacado ? "primary" : "secondary"}
        size="md"
        className="mt-6 w-full"
      >
        {plan.cta.label}
      </Button>

      {/* Los features no incluidos se muestran en gris, nunca se omiten:
          comparar es más persuasivo que ocultar. */}
      <ul className="mt-7 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className={cn(
              "flex gap-2.5 text-[0.9375rem] leading-snug",
              !f.incluido && (plan.destacado ? "text-white/35" : "text-muted/60"),
              f.incluido && plan.destacado && "text-white/90",
            )}
          >
            <Check on={f.incluido} />
            <span>
              {f.label}
              {f.nota && (
                <span className="ml-1.5 rounded bg-current/10 px-1.5 py-0.5 text-[11px] font-medium opacity-70">
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

export function Pricing({ conNota = true }: { conNota?: boolean }) {
  const [anual, setAnual] = useState(false);

  return (
    <div>
      <div className="flex justify-center">
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
                "min-h-[40px] rounded-full px-5 text-sm font-semibold transition-colors duration-[180ms]",
                anual === v ? "bg-ink text-paper" : "text-muted hover:text-ink",
              )}
            >
              {v ? "Anual" : "Mensual"}
              {v && <span className="ml-1.5 text-brand">−15%</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 3 col → 1 col, con el destacado primero en phone */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {planes.map((p) => (
          <div key={p.id} className={cn(p.destacado && "order-first md:order-none")}>
            <PlanCard plan={p} anual={anual} />
          </div>
        ))}
      </div>

      {conNota && (
        <p className="measure mx-auto mt-8 text-center text-sm leading-relaxed text-muted">
          {notaFiscal}
        </p>
      )}
    </div>
  );
}
