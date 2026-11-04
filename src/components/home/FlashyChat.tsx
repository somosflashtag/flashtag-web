"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Mensaje = { chip: string; pregunta: string; respuesta: string };

/** La charla de ejemplo con Flashy: cada chip cambia pregunta y respuesta. */
export function FlashyChat({ charla }: { charla: Mensaje[] }) {
  const [i, setI] = useState(0);
  const [escrito, setEscrito] = useState<string | null>(null);
  const t = useRef<number | null>(null);
  const m = charla[i];

  useEffect(() => () => {
    if (t.current) window.clearInterval(t.current);
  }, []);

  /* Al tocar un chip, Flashy "escribe" la respuesta letra por letra. */
  const elegir = (k: number) => {
    setI(k);
    if (t.current) window.clearInterval(t.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEscrito(null);
      return;
    }
    const texto = charla[k].respuesta;
    let n = 0;
    setEscrito("");
    t.current = window.setInterval(() => {
      n += 2;
      setEscrito(texto.slice(0, n));
      if (n >= texto.length && t.current) {
        window.clearInterval(t.current);
        setEscrito(null);
      }
    }, 18);
  };

  return (
    <div className="relative z-10 rounded-[20px] bg-paper p-4 text-ink sm:p-5">
      <div>
        <p className="sr-only" aria-live="polite">{`${m.pregunta} Flashy: ${m.respuesta}`}</p>
        <p aria-hidden="true" className="ml-auto mt-2 max-w-[88%] rounded-[14px] rounded-br-[4px] bg-brand-soft px-3.5 py-2.5 text-[14px]">
          {m.pregunta}
        </p>
        <p key={i} aria-hidden="true" className="ft-fade mt-2 max-w-[88%] rounded-[14px] rounded-bl-[4px] border border-line bg-surface/50 px-3.5 py-2.5 text-[14px]">
          <b className="text-brand">Flashy</b> · {escrito ?? m.respuesta}
          {escrito !== null && <span className="ml-0.5 inline-block h-3.5 w-px animate-pulse bg-ink align-middle" />}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {charla.map((c, k) => (
          <button
            key={c.chip}
            type="button"
            aria-pressed={k === i}
            onClick={() => elegir(k)}
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
