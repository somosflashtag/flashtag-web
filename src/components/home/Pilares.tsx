"use client";

import Link from "next/link";
import { useState } from "react";
import { Glifo } from "@/components/ui/Glifo";
import type { Pilar, PilarId } from "@/content/home";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

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
  const funcionActiva = pilar.funciones.find((f) => f.pantalla === pantalla);
  // Dos funciones pueden compartir página (ficha y protección van a la misma):
  // el link sale una sola vez.
  const links = [
    ...new Map(
      pilar.funciones.filter((f) => f.feature && desde[f.feature]).map((f) => [desde[f.feature!].href, desde[f.feature!]]),
    ).values(),
  ];

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
                "group flex min-h-11 shrink-0 items-center gap-2 rounded-full py-1 pl-1 pr-4 text-left transition-[translate,box-shadow,background-color,color] duration-500 ease-fluida md:flex-col md:items-start md:gap-1.5 md:rounded-[1.5rem] md:p-5 md:hover:-translate-y-1",
                on
                  ? "bg-ink text-paper shadow-[var(--shadow-float)] md:-translate-y-1"
                  : "bg-paper text-ink shadow-[var(--shadow-rest)] md:hover:shadow-[var(--shadow-float)]",
              )}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full transition-transform md:mb-1.5 md:size-11 md:rounded-[14px] duration-300 group-hover:-rotate-6 group-hover:scale-105",
                  on && p.tono === "ink" ? "bg-paper text-ink" : tonosIcono[p.tono],
                )}
              >
                <Glifo id={p.glifo} size={18} />
              </span>
              <b className="whitespace-nowrap font-display text-[14px] leading-tight md:whitespace-normal md:text-[17px]">{p.tab}</b>
              <span className={cn("hidden text-[12.5px] leading-snug md:block", on ? "text-paper/75" : "text-muted")}>{p.tabBajada}</span>
            </button>
          );
        })}
      </div>

      <div id="pilar-panel" key={activo} className="ft-fade grid grid-cols-1 items-start gap-5 md:gap-7 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="t-h3 !text-[1.375rem] sm:!text-[1.875rem]">{pilar.titular}</h3>
          <p className="mb-4 mt-2 text-[15px] leading-relaxed text-muted md:mb-5 md:mt-2.5 md:text-base">{pilar.bajada}</p>
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-2.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
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
                      "group flex min-h-11 w-full items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3.5 text-left transition-[background-color,box-shadow] duration-300 ease-fluida lg:items-start lg:gap-3.5 lg:rounded-[1.25rem] lg:p-4",
                      on ? "bg-paper shadow-[var(--shadow-float)]" : "bg-paper/55 hover:bg-paper",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full lg:size-11 lg:rounded-[14px] transition-[transform,background-color,color] duration-300",
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
                      <span className="mt-0.5 hidden text-[13.5px] leading-snug text-muted lg:block">{f.texto}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {links.length > 0 && (
            <p className="mt-4 flex flex-wrap gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group inline-flex min-h-11 items-center gap-1.5 rounded-full bg-brand/10 px-4 text-sm font-semibold text-brand transition-colors duration-300 hover:bg-brand hover:text-paper"
                >
                  Más sobre {l.nombre}
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" className="transition-transform duration-500 ease-fluida group-hover:translate-x-0.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              ))}
            </p>
          )}
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-paper shadow-[var(--shadow-device)] sm:rounded-[2rem] lg:sticky lg:top-28">
          <div className="hidden items-center gap-3 bg-brand-soft/60 px-5 py-3 sm:flex" aria-hidden="true">
            <span className="flex gap-1.5">
              <i className="size-2.5 rounded-full bg-coral" />
              <i className="size-2.5 rounded-full bg-gold" />
              <i className="size-2.5 rounded-full bg-teal" />
            </span>
            <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-paper px-3 py-1 text-[12px] text-muted">
              <svg viewBox="0 0 12 12" width="10" height="10" fill="none">
                <rect x="2.5" y="5.5" width="7" height="5" rx="1.2" fill="currentColor" />
                <path d="M4 5.5V4a2 2 0 0 1 4 0v1.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              <span className="truncate">{site.urls.app.replace(/^https?:\/\//, "")}</span>
            </span>
            <span className="w-[42px]" />
          </div>
          <div className="p-4 sm:p-6 lg:min-h-[420px]">
          {funcionActiva && (
            <p className="mb-3 border-b border-brand-soft pb-3 text-[13px] text-muted lg:hidden">
              <b className="text-ink">{funcionActiva.titulo}:</b> {funcionActiva.texto}
            </p>
          )}
          <div key={pantalla} className="ft-fade" aria-live="polite">
            {pantallas[pantalla]}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
