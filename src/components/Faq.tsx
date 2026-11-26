"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

/**
 * Acordeón: 200ms ease-out. Motion solo como respuesta a una acción.
 *
 * `variante="tarjetas"` (home): cada pregunta es una tarjeta numerada; la
 * abierta sube a blanco con sombra y las demás quedan en gris. La altura se
 * anima con grid-rows, así el panel se despliega en vez de aparecer.
 */
export function Faq({
  items,
  inicial,
  variante = "lista",
}: {
  items: FaqItem[];
  inicial?: number;
  variante?: "lista" | "tarjetas";
}) {
  const [abierto, setAbierto] = useState<number | null>(0);
  /* `inicial`: cuántas se ven de entrada; el resto, con "Ver más preguntas". */
  const [todas, setTodas] = useState(!inicial);
  const visibles = todas ? items : items.slice(0, inicial);

  if (variante === "tarjetas") {
    return (
      <div className="grid gap-3">
        {visibles.map((item, i) => {
          const open = abierto === i;
          return (
            <div
              key={item.pregunta}
              className={`rounded-[1.5rem] border transition-[background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open ? "border-line bg-paper shadow-[var(--shadow-float)]" : "border-transparent bg-brand-soft/70 hover:bg-brand-soft"
              }`}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setAbierto(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center gap-3.5 rounded-[1.5rem] px-5 py-5 text-left sm:gap-4 sm:px-7 sm:py-6"
                >
                  <span className="w-6 shrink-0 text-[13px] font-bold text-brand tnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.25rem]">
                    {item.pregunta}
                  </span>
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      open ? "rotate-45 bg-brand text-paper" : "bg-paper text-ink"
                    }`}
                  >
                    <svg viewBox="0 0 14 14" width="13" height="13" fill="none" aria-hidden="true">
                      <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`faq-panel-${i}`}
                inert={!open}
                className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="measure px-5 pb-6 pl-[3.625rem] text-[0.9375rem] leading-relaxed text-muted sm:px-7 sm:pb-7 sm:pl-[4.5rem] sm:text-[1.0625rem]">
                    {item.respuesta}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {!todas && items.length > visibles.length && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setTodas(true)}
              className="min-h-11 rounded-full border border-ink/20 px-5 text-sm font-semibold transition-[translate,border-color,background-color] duration-500 ease-fluida hover:-translate-y-0.5 hover:border-ink hover:bg-ink/[0.04]"
            >
              Ver {items.length - visibles.length} preguntas más
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {visibles.map((item, i) => {
        const open = abierto === i;
        return (
          <div key={item.pregunta}>
            <h3>
              <button
                type="button"
                onClick={() => setAbierto(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-4 py-4 text-left sm:gap-6 sm:py-5"
              >
                <span className="text-[0.9375rem] font-semibold tracking-tight sm:text-[1.0625rem]">
                  {item.pregunta}
                </span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-200 ease-[var(--ease-ft)] ${open ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 14 14" width="13" height="13" fill="none" aria-hidden="true">
                    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${i}`}
              hidden={!open}
              className="measure pb-5 text-[0.9375rem] leading-relaxed text-muted sm:pb-6 sm:text-[1.0625rem]"
            >
              {item.respuesta}
            </div>
          </div>
        );
      })}
      {!todas && items.length > visibles.length && (
        <div className="py-4 text-center">
          <button
            type="button"
            onClick={() => setTodas(true)}
            className="min-h-11 rounded-full border border-line px-5 text-sm font-semibold transition-colors hover:border-ink"
          >
            Ver {items.length - visibles.length} preguntas más
          </button>
        </div>
      )}
    </div>
  );
}
