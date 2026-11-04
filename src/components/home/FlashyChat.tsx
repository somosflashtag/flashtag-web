"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Mensaje = { chip: string; pregunta: string; respuesta: string };

/** La charla de ejemplo con Flashy: cada chip cambia pregunta y respuesta. */
export function FlashyChat({ charla }: { charla: Mensaje[] }) {
  const [i, setI] = useState(0);
  const m = charla[i];

  return (
    <div className="relative z-10 rounded-[20px] bg-paper p-4 text-ink sm:p-5">
      <div aria-live="polite">
        <p className="ml-auto mt-2 max-w-[88%] rounded-[14px] rounded-br-[4px] bg-brand-soft px-3.5 py-2.5 text-[14px]">
          {m.pregunta}
        </p>
        <p key={i} className="ft-fade mt-2 max-w-[88%] rounded-[14px] rounded-bl-[4px] border border-line bg-surface/50 px-3.5 py-2.5 text-[14px]">
          <b className="text-brand">Flashy</b> · {m.respuesta}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {charla.map((c, k) => (
          <button
            key={c.chip}
            type="button"
            aria-pressed={k === i}
            onClick={() => setI(k)}
            className={cn(
              "min-h-9 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors duration-150",
              k === i ? "border-brand bg-brand-soft text-brand" : "border-line bg-paper hover:border-brand/50",
            )}
          >
            {c.chip}
          </button>
        ))}
      </div>
    </div>
  );
}
