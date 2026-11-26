"use client";

import { useState } from "react";
import { CasoCard } from "@/components/CasoCard";
import type { Caso, Rubro } from "@/content/casos";
import { cn } from "@/lib/cn";

/**
 * Los casos con un filtro por rubro. Solo se ofrecen los rubros que tienen
 * al menos un caso: un filtro que devuelve vacío es un callejón.
 * "Todos" muestra los primeros `limite`; un rubro muestra todos los suyos.
 * `columnas`: 4 en la home (una fila), 3 en /casos (la grilla completa).
 */
export function CasosFiltro({
  casos,
  rubros,
  limite = 4,
  columnas = 4,
}: {
  casos: Caso[];
  rubros: { id: Rubro; label: string }[];
  limite?: number;
  columnas?: 3 | 4;
}) {
  const [rubro, setRubro] = useState<Rubro | "todos">("todos");
  const conCasos = rubros.filter((r) => casos.some((c) => c.rubro === r.id));
  const visibles = rubro === "todos" ? casos.slice(0, limite) : casos.filter((c) => c.rubro === rubro);

  const opciones: { id: Rubro | "todos"; label: string }[] = [{ id: "todos", label: "Todos" }, ...conCasos];

  return (
    <>
      <div className="mt-7 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar casos por rubro">
        {opciones.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={rubro === o.id}
            onClick={() => setRubro(o.id)}
            className={cn(
              "min-h-11 rounded-full border px-5 text-sm font-bold transition-[background-color,border-color,color,translate] duration-300 ease-fluida hover:-translate-y-0.5",
              rubro === o.id ? "border-ink bg-ink text-paper" : "border-ink/15 bg-paper text-ink hover:border-ink",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
      <ul
        data-reveal-hijos
        className={cn("carrusel mt-7 grid gap-4 sm:grid-cols-2 md:mt-10", columnas === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}
      >
        {visibles.map((c) => (
          <li key={c.slug}>
            <div key={rubro} className="ft-entra h-full">
              <CasoCard caso={c} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
