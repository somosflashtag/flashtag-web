"use client";

import { useState } from "react";
import { CasoCard } from "@/components/CasoCard";
import type { Caso, Rubro } from "@/content/casos";
import { cn } from "@/lib/cn";

/**
 * Los casos con un filtro por rubro. Solo se ofrecen los rubros que tienen
 * al menos un caso: un filtro que devuelve vacío es un callejón.
 * "Todos" muestra los primeros `limite`; un rubro muestra todos los suyos.
 */
export function CasosFiltro({
  casos,
  rubros,
  limite = 4,
}: {
  casos: Caso[];
  rubros: { id: Rubro; label: string }[];
  limite?: number;
}) {
  const [rubro, setRubro] = useState<Rubro | "todos">("todos");
  const conCasos = rubros.filter((r) => casos.some((c) => c.rubro === r.id));
  const visibles = rubro === "todos" ? casos.slice(0, limite) : casos.filter((c) => c.rubro === rubro);

  const opciones: { id: Rubro | "todos"; label: string }[] = [{ id: "todos", label: "Todos" }, ...conCasos];

  return (
    <>
      <div className="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar casos por rubro">
        {opciones.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={rubro === o.id}
            onClick={() => setRubro(o.id)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-bold transition-colors duration-150",
              rubro === o.id ? "border-brand bg-brand text-paper" : "border-line bg-paper text-ink hover:border-brand/50",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {visibles.map((c) => (
          <li key={c.slug} className="ft-fade">
            <CasoCard caso={c} />
          </li>
        ))}
      </ul>
    </>
  );
}
