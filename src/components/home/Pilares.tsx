"use client";

import Link from "next/link";
import { useState } from "react";
import { Glifo } from "@/components/ui/Glifo";
import type { Pilar, PilarId } from "@/content/home";
import { cn } from "@/lib/cn";

const tonosIcono = {
  brand: "bg-brand text-paper",
  gold: "bg-gold text-ink",
  teal: "bg-teal text-paper",
  coral: "bg-coral text-paper",
  ink: "bg-ink text-paper",
} as const;

/** "Desde Free", "Full": sale de `features.ts`, ya resuelto en el server. */
export type Desde = Record<string, { desde: string; href: string; nombre: string }>;

/**
 * La app ordenada por lo que el comercio quiere lograr: cinco pestañas,
 * cuatro funciones por pestaña y una pantalla por función. Las pantallas
 * vienen renderizadas del server; acá solo se elige cuál se ve.
 *
 * Pestañas con `aria-pressed` y no un tablist completo: cada grupo es un
 * conjunto de botones que cambia el panel de al lado, y así se recorre con
 * Tab sin tener que aprender flechas.
 */
export function Pilares({
  pilares,
  pantallas,
  desde,
}: {
  pilares: Pilar[];
  pantallas: Record<string, React.ReactNode>;
  desde: Desde;
}) {
  const [activo, setActivo] = useState<PilarId>(pilares[0].id);
  const [funcion, setFuncion] = useState<Record<PilarId, string>>(
    () => Object.fromEntries(pilares.map((p) => [p.id, p.funciones[0].pantalla])) as Record<PilarId, string>,
  );
  const pilar = pilares.find((p) => p.id === activo)!;
  const pantalla = funcion[activo];

  return (
    <>
      <div className="mb-8 mt-11 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {pilares.map((p) => {
          const on = p.id === activo;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              aria-controls="pilar-panel"
              onClick={() => setActivo(p.id)}
              className={cn(
                "group flex flex-col items-start gap-1.5 rounded-[22px] border-2 bg-paper p-4 text-left shadow-[var(--shadow-rest)] transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-ft)] hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:p-5",
                on ? "-translate-y-1 border-brand shadow-[var(--shadow-float)]" : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "mb-1.5 flex size-11 items-center justify-center rounded-[14px] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105",
                  tonosIcono[p.tono],
                )}
              >
                <Glifo id={p.glifo} size={22} />
              </span>
              <b className={cn("font-display text-[16px] leading-tight sm:text-[17px]", on ? "text-brand" : "text-ink")}>{p.tab}</b>
              <span className="text-[12.5px] leading-snug text-muted">{p.tabBajada}</span>
            </button>
          );
        })}
      </div>

      <div id="pilar-panel" key={activo} className="ft-fade grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="t-h3 !text-[1.75rem] sm:!text-[1.875rem]">{pilar.titular}</h3>
          <p className="t-body mb-5 mt-2.5 text-muted">{pilar.bajada}</p>
          <ul className="grid gap-2">
            {pilar.funciones.map((f) => {
              const on = f.pantalla === pantalla;
              const extra = f.feature ? desde[f.feature] : undefined;
              return (
                <li key={f.pantalla}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFuncion((s) => ({ ...s, [activo]: f.pantalla }))}
                    onMouseEnter={() => setFuncion((s) => ({ ...s, [activo]: f.pantalla }))}
                    className={cn(
                      "group flex w-full gap-3 rounded-[14px] border bg-paper p-3.5 text-left transition-[border-color,box-shadow] duration-150",
                      on ? "border-brand shadow-[0_0_0_3px_var(--color-brand-soft)]" : "border-line hover:border-brand/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-[38px] shrink-0 items-center justify-center rounded-[11px] transition-[transform,background-color,color] duration-200",
                        on ? "-rotate-6 scale-105 bg-brand text-paper" : "bg-brand-soft text-brand group-hover:-rotate-6 group-hover:bg-brand group-hover:text-paper",
                      )}
                    >
                      <Glifo id={f.glifo} size={18} />
                    </span>
                    <span>
                      <b className="flex flex-wrap items-center gap-2 text-[15px]">
                        {f.titulo}
                        {extra && (
                          <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand">
                            {extra.desde === "Free" ? "Desde Free" : `Plan ${extra.desde}`}
                          </span>
                        )}
                      </b>
                      <span className="mt-0.5 block text-[13px] text-muted">{f.texto}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {pilar.funciones.some((f) => f.feature) && (
            <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              {pilar.funciones
                .filter((f) => f.feature && desde[f.feature])
                .map((f) => (
                  <Link key={f.pantalla} href={desde[f.feature!].href} className="font-semibold text-brand underline underline-offset-4">
                    Más sobre {desde[f.feature!].nombre}
                  </Link>
                ))}
            </p>
          )}
        </div>

        <div className="rounded-[22px] border border-line bg-paper p-5 shadow-[var(--shadow-float)] sm:p-6 lg:sticky lg:top-28 lg:min-h-[440px]">
          <div className="mb-4 flex gap-1.5" aria-hidden="true">
            <i className="size-2.5 rounded-full bg-line" />
            <i className="size-2.5 rounded-full bg-line" />
            <i className="size-2.5 rounded-full bg-line" />
          </div>
          <div key={pantalla} className="ft-fade" aria-live="polite">
            {pantallas[pantalla]}
          </div>
        </div>
      </div>
    </>
  );
}
