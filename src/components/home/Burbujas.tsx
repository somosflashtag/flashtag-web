"use client";

import { useEffect, useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { cn } from "@/lib/cn";

export type ItemBurbuja = {
  glifo: GlifoId;
  /** Color de la pastilla del ícono. Por defecto, gold. */
  tono?: "gold" | "teal" | "brand" | "coral";
  titulo: string;
  detalle?: string;
};

/* Ícono blanco sobre teal 3.6:1, sobre coral 3.9:1 (es gráfico: piso 3:1). */
const tonos = {
  gold: "bg-gold text-ink",
  teal: "bg-teal text-paper",
  brand: "bg-brand text-paper",
  coral: "bg-coral text-paper",
};

/**
 * Avisos de vidrio que flotan sobre una foto o una maqueta en un bloque
 * oscuro: "nueva reseña", "sello sumado". Hay una posición por cada clase de
 * `posiciones` (relativas al contenedor, que tiene que ser `relative`); si
 * hay más avisos que posiciones, se van turnando.
 *
 * Decorativo (aria-hidden): es demo, no contenido. Con
 * `prefers-reduced-motion` quedan los primeros, quietos.
 */
export function Burbujas({
  items,
  posiciones,
  intervalo = 2600,
}: {
  items: ItemBurbuja[];
  posiciones: string[];
  intervalo?: number;
}) {
  const n = posiciones.length;
  // Qué aviso muestra cada posición, y cuáles están a la vista.
  const [slots, setSlots] = useState<number[]>(() => posiciones.map((_, i) => i % items.length));
  const [visibles, setVisibles] = useState<boolean[]>(() => posiciones.map(() => true));

  useEffect(() => {
    // Con un aviso por posición no hay nada que turnar.
    if (items.length <= n) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = n;
    let cambio: number | undefined;
    const t = window.setInterval(() => {
      const pos = i % n;
      const item = i % items.length;
      i++;
      setVisibles((v) => v.map((x, k) => (k === pos ? false : x)));
      cambio = window.setTimeout(() => {
        setSlots((s) => s.map((x, k) => (k === pos ? item : x)));
        setVisibles((v) => v.map((x, k) => (k === pos ? true : x)));
      }, 450);
    }, intervalo);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(cambio);
    };
  }, [items.length, n, intervalo]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
      {slots.map((idx, pos) => {
        const it = items[idx % items.length];
        return (
          <div key={pos} data-show={visibles[pos]} className={cn("ft-bub absolute", posiciones[pos])}>
            <div
              className="vidrio ft-float flex items-center gap-2 whitespace-nowrap rounded-2xl py-1.5 pl-1.5 pr-3 text-left text-[11px] font-semibold leading-tight md:text-[13px]"
              style={{ animationDelay: `${pos * -1.7}s` }}
            >
              <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-[10px]", tonos[it.tono ?? "gold"])}>
                <Glifo id={it.glifo} size={15} />
              </span>
              <span>
                {it.titulo}
                {it.detalle && <small className="block text-[10px] font-normal text-paper/75 md:text-[11px]">{it.detalle}</small>}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
