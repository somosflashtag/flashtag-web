"use client";

import Link from "next/link";
import { useState } from "react";
import { PhoneFrame } from "./app/PhoneFrame";
import { QRMark } from "./ui/QRMark";
import { cn } from "@/lib/cn";
import type { Feature } from "@/content/features";

/**
 * Tour de la app: seis pestañas, un teléfono.
 * Las pantallas llegan renderizadas desde el servidor (`screens`), así que
 * este componente solo decide cuál mostrar. Cero lógica de producto acá.
 */
export function AppTour({
  features,
  screens,
}: {
  features: Feature[];
  screens: Record<string, React.ReactNode>;
}) {
  const [activo, setActivo] = useState(features[0].slug);
  const f = features.find((x) => x.slug === activo) ?? features[0];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="min-w-0">
        <div
          role="tablist"
          aria-label="Funciones de la app"
          className="flex flex-wrap gap-2"
        >
          {features.map((x) => {
            const on = x.slug === activo;
            return (
              <button
                key={x.slug}
                role="tab"
                type="button"
                aria-selected={on}
                aria-controls={`tour-${x.slug}`}
                id={`tab-${x.slug}`}
                onClick={() => setActivo(x.slug)}
                className={cn(
                  "min-h-[44px] shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors duration-[150ms]",
                  on
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-paper text-muted hover:border-ink hover:text-ink",
                )}
              >
                {x.nombre}
              </button>
            );
          })}
        </div>

        <div
          key={f.slug}
          role="tabpanel"
          id={`tour-${f.slug}`}
          aria-labelledby={`tab-${f.slug}`}
          className="ft-rise mt-8"
        >
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} />
            {f.nombre}
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand">
              Desde {f.desde}
            </span>
          </p>
          <h3 className="t-h2 mt-4 text-balance">{f.titular}</h3>
          <p className="t-body measure mt-5 text-muted">{f.bajada}</p>

          <ol className="mt-7 grid gap-3 sm:grid-cols-3">
            {f.pasos.map((p, i) => (
              <li
                key={p.titulo}
                className="rounded-[var(--radius-card)] border border-line bg-paper p-4"
              >
                <span className="text-[11px] font-semibold text-brand tnum">
                  0{i + 1}
                </span>
                <p className="mt-1.5 text-[0.9375rem] font-semibold leading-tight">
                  {p.titulo}
                </p>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">
                  {p.texto}
                </p>
              </li>
            ))}
          </ol>

          <Link
            href={`/producto/${f.slug}`}
            className="group mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold"
          >
            Ver {f.nombre} en detalle
            <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true" className="transition-transform duration-[120ms] group-hover:translate-x-1">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="lg:order-first">
        <PhoneFrame>
          <div key={f.slug} className="ft-rise h-full">
            {screens[f.slug]}
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
