"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/faq";

/** Acordeón: 200ms ease-out. Motion solo como respuesta a una acción. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [abierto, setAbierto] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const open = abierto === i;
        return (
          <div key={item.pregunta}>
            <h3>
              <button
                type="button"
                onClick={() => setAbierto(open ? null : i)}
                aria-expanded={open}
                aria-controls={`faq-panel-${i}`}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.0625rem] font-semibold tracking-tight">
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
              className="measure pb-6 text-[1.0625rem] leading-relaxed text-muted"
            >
              {item.respuesta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
