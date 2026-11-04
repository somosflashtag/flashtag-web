"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

/** Acordeón: 200ms ease-out. Motion solo como respuesta a una acción. */
export function Faq({ items, inicial }: { items: FaqItem[]; inicial?: number }) {
  const [abierto, setAbierto] = useState<number | null>(0);
  /* `inicial`: cuántas se ven de entrada; el resto, con "Ver más preguntas". */
  const [todas, setTodas] = useState(!inicial);
  const visibles = todas ? items : items.slice(0, inicial);

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
