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
      <div className="-mx-5 mb-6 mt-7 flex gap-2 overflow-x-auto px-5 pb-2 pt-1 [scrollbar-width:none] md:mx-0 md:mb-8 md:mt-11 md:grid md:grid-cols-3 md:gap-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden">
        {pilares.map((p) => {
          const on = p.id === activo;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={on}
              aria-controls="pilar-panel"
              onClick={(e) => {
                setActivo(p.id);
                e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              className={cn(
                "group flex min-h-11 shrink-0 items-center gap-2 rounded-full border-2 bg-paper py-1 pl-1 pr-4 text-left shadow-[var(--shadow-rest)] transition-[transform,box-shadow,border-color] duration-200 ease-[var(--ease-ft)] md:flex-col md:items-start md:gap-1.5 md:rounded-[22px] md:p-5 md:hover:-translate-y-1 md:hover:shadow-[var(--shadow-float)]",
                on ? "border-brand md:-translate-y-1 md:shadow-[var(--shadow-float)]" : "border-transparent",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full transition-transform md:mb-1.5 md:size-11 md:rounded-[14px] duration-300 group-hover:-rotate-6 group-hover:scale-105",
                  tonosIcono[p.tono],
                )}
              >
                <Glifo id={p.glifo} size={18} />
              </span>
              <b className={cn("whitespace-nowrap font-display text-[14px] leading-tight md:whitespace-normal md:text-[17px]", on ? "text-brand" : "text-ink")}>{p.tab}</b>
              <span className="hidden text-[12.5px] leading-snug text-muted md:block">{p.tabBajada}</span>
            </button>
          );
        })}
      </div>

      <div id="pilar-panel" key={activo} className="ft-fade grid grid-cols-1 items-start gap-5 md:gap-7 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="t-h3 !text-[1.375rem] sm:!text-[1.875rem]">{pilar.titular}</h3>
          <p className="mb-4 mt-2 text-[15px] leading-relaxed text-muted md:mb-5 md:mt-2.5 md:text-base">{pilar.bajada}</p>
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {pilar.funciones.map((f) => {
              const on = f.pantalla === pantalla;
              const extra = f.feature ? desde[f.feature] : undefined;
              return (
                <li key={f.pantalla} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setFuncion((s) => ({ ...s, [activo]: f.pantalla }))}
                    onMouseEnter={() => setFuncion((s) => ({ ...s, [activo]: f.pantalla }))}
                    className={cn(
                      "group flex w-full items-center gap-2.5 rounded-full border bg-paper py-1.5 pl-1.5 pr-3.5 text-left lg:items-start lg:gap-3 lg:rounded-[14px] lg:p-3.5 transition-[border-color,box-shadow] duration-150",
                      on ? "border-brand shadow-[0_0_0_3px_var(--color-brand-soft)]" : "border-line hover:border-brand/50",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full lg:size-[38px] lg:rounded-[11px] transition-[transform,background-color,color] duration-200",
                        on ? "-rotate-6 scale-105 bg-brand text-paper" : "bg-brand-soft text-brand group-hover:-rotate-6 group-hover:bg-brand group-hover:text-paper",
                      )}
                    >
                      <Glifo id={f.glifo} size={18} />
                    </span>
                    <span>
                      <b className="flex items-center gap-2 whitespace-nowrap text-[13.5px] lg:flex-wrap lg:whitespace-normal lg:text-[15px]">
                        {f.titulo}
                        {extra && (
                          <span className="hidden rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand lg:inline">
                            {extra.desde === "Free" ? "Desde Free" : `Plan ${extra.desde}`}
                          </span>
                        )}
                      </b>
                      <span className="mt-0.5 hidden text-[13px] text-muted lg:block">{f.texto}</span>
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

        <div className="rounded-[20px] border border-line bg-paper p-4 shadow-[var(--shadow-float)] sm:p-6 lg:sticky lg:top-28 lg:min-h-[440px]">
          <div className="mb-3 hidden gap-1.5 sm:flex md:mb-4" aria-hidden="true">
            <i className="size-2.5 rounded-full bg-line" />
            <i className="size-2.5 rounded-full bg-line" />
            <i className="size-2.5 rounded-full bg-line" />
          </div>
          {(() => {
            const f = pilar.funciones.find((x) => x.pantalla === pantalla);
            return f ? (
              <p className="mb-3 border-b border-line pb-3 text-[13px] text-muted lg:hidden">
                <b className="text-ink">{f.titulo}:</b> {f.texto}
              </p>
            ) : null;
          })()}
          <div key={pantalla} className="ft-fade" aria-live="polite">
            {pantallas[pantalla]}
          </div>
        </div>
      </div>
    </>
  );
}
