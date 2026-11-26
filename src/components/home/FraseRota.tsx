"use client";

import { useEffect, useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";

/**
 * La frase que se va turnando en el titular del hero.
 *
 * Todas las frases están en el DOM, apiladas en la misma celda: la línea mide
 * siempre lo que mide la más larga y el titular no salta. El turno lo marca
 * `data-estado` y la entrada (sube y se aclara) la hace el CSS (`.rota`).
 *
 * Es decorativa: va con aria-hidden y el h1 trae el texto completo aparte.
 * Con reduced-motion no rota: queda la primera.
 */
export function FraseRota({
  frases,
  cada = 2600,
}: {
  frases: { texto: string; glifo: GlifoId }[];
  cada?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % frases.length);
    }, cada);
    return () => window.clearInterval(id);
  }, [frases.length, cada]);

  const anterior = (i - 1 + frases.length) % frases.length;

  return (
    <span aria-hidden="true" className="rota text-gold">
      {frases.map((f, n) => (
        <span key={f.texto} data-estado={n === i ? "on" : n === anterior ? "sale" : "espera"}>
          <Glifo id={f.glifo} size={64} className="size-[0.62em] shrink-0 text-paper" />
          {f.texto}
        </span>
      ))}
    </span>
  );
}
