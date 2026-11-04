"use client";

import { useEffect, useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { cn } from "@/lib/cn";

export type ItemBurbuja = {
  glifo: GlifoId;
  tono: "teal" | "brand" | "coral" | "gold";
  titulo: string;
  detalle: string;
};

const tonos = {
  teal: "bg-teal/15 text-ink",
  brand: "bg-brand-soft text-brand",
  coral: "bg-coral/15 text-ink",
  gold: "bg-gold/30 text-ink",
};

/**
 * Avisos que van apareciendo alrededor de una maqueta: "nueva reseña",
 * "sello sumado". Tres posiciones fijas que se turnan.
 *
 * Decorativo (aria-hidden): repite en chiquito lo que el texto ya dice.
 * Con `prefers-reduced-motion` quedan las tres primeras quietas.
 * Desde 700px para abajo no se muestran: taparían la maqueta.
 */
export function Burbujas({
  items,
  posiciones = ["left-[-40px] bottom-[30px]", "right-[-24px] top-[-22px]", "right-[-40px] bottom-[120px]"],
  intervalo = 2600,
}: {
  items: ItemBurbuja[];
  posiciones?: [string, string, string];
  intervalo?: number;
}) {
  // Cuál ítem muestra cada posición, y cuál es la que está apareciendo ahora.
  const [slots, setSlots] = useState<number[]>([0, 1, 2]);
  const [visibles, setVisibles] = useState<boolean[]>([true, true, true]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 3;
    const t = window.setInterval(() => {
      const pos = i % 3;
      const item = i % items.length;
      i++;
      setVisibles((v) => v.map((x, k) => (k === pos ? false : x)));
      window.setTimeout(() => {
        setSlots((s) => s.map((x, k) => (k === pos ? item : x)));
        setVisibles((v) => v.map((x, k) => (k === pos ? true : x)));
      }, 450);
    }, intervalo);
    return () => window.clearInterval(t);
  }, [items.length, intervalo]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {slots.map((idx, pos) => {
        const it = items[idx % items.length];
        return (
          <div
            key={pos}
            data-show={visibles[pos]}
            className={cn(
              "ft-bub absolute z-10 flex max-w-[280px] items-center gap-2.5 rounded-2xl border border-line bg-paper px-3.5 py-2.5 text-[13px] shadow-[var(--shadow-float)]",
              posiciones[pos],
            )}
          >
            <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-[10px]", tonos[it.tono])}>
              <Glifo id={it.glifo} size={16} />
            </span>
            <span>
              <b className="block leading-tight">{it.titulo}</b>
              <small className="block text-[11px] text-muted">{it.detalle}</small>
            </span>
          </div>
        );
      })}
    </div>
  );
}
