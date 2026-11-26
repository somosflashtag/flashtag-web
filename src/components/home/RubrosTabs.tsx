"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { Viaja } from "@/components/ui/Pagina";
import { cn } from "@/lib/cn";

/**
 * Rubros en pestañas: la lista a la izquierda, y a la derecha la foto del
 * rubro con su promesa y el teléfono de ejemplo. Botones con `aria-pressed`,
 * igual que Pilares: se recorren con Tab, sin flechas que aprender.
 *
 * Los teléfonos llegan ya renderizados desde el server (`telefonos`): este
 * componente solo decide cuál se ve. Al cambiar, lo nuevo entra desenfocado
 * y se aclara (`.ft-entra`), con `key` para que la animación se repita.
 */
export type RubroTab = {
  slug: string;
  nombre: string;
  glifo: GlifoId;
  resumen: string;
  promesa: string;
  claves: string[];
  foto: { src: string; alt: string };
};

export function RubrosTabs({
  rubros,
  telefonos,
  nota,
}: {
  rubros: RubroTab[];
  telefonos: Record<string, React.ReactNode>;
  nota: string;
}) {
  const [activo, setActivo] = useState(0);
  const r = rubros[activo];

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-10">
      <div className="flex min-w-0 flex-col">
        <div
          role="group"
          aria-label="Rubros"
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {rubros.map((x, i) => {
            const on = i === activo;
            return (
              <button
                key={x.slug}
                type="button"
                aria-pressed={on}
                aria-controls="rubro-panel"
                onClick={() => setActivo(i)}
                onMouseEnter={() => setActivo(i)}
                className={cn(
                  "group flex min-h-11 shrink-0 items-baseline gap-3 rounded-full border px-4 py-2 text-left font-display font-bold tracking-[-0.03em] transition-[color,border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "lg:rounded-none lg:border-0 lg:border-l-[3px] lg:py-4 lg:pl-6 lg:pr-0 lg:text-[2.375rem] lg:leading-none",
                  on
                    ? "border-ink bg-ink text-paper lg:translate-x-1 lg:border-coral lg:bg-transparent lg:text-ink"
                    : "border-ink/15 text-ink/70 lg:border-ink/10 lg:text-ink/30 lg:hover:text-ink/60",
                )}
              >
                <span
                  className={cn(
                    "hidden text-[13px] font-semibold tracking-normal tnum lg:inline",
                    on ? "text-brand" : "text-ink/40",
                  )}
                >
                  0{i + 1}
                </span>
                {x.nombre}
              </button>
            );
          })}
        </div>
        <p className="mt-auto hidden border-t border-ink/15 pt-6 text-[15px] leading-relaxed text-muted lg:block">{nota}</p>
      </div>

      <div
        id="rubro-panel"
        aria-live="polite"
        className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-5"
      >
        <Link
          key={`foto-${r.slug}`}
          href={`/para/${r.slug}`}
          className="ft-entra group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:min-h-[520px] md:p-8"
        >
          {/* La foto viaja al hero de /para/<rubro> al navegar. */}
          <Viaja nombre={`rubro-${r.slug}`}>
            <Image
              src={r.foto.src}
              alt={r.foto.alt}
              fill
              sizes="(min-width: 1024px) 460px, (min-width: 640px) 55vw, 100vw"
              className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </Viaja>
          <span aria-hidden="true" className="velo absolute inset-0" />
          <span className="vidrio absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold">
            <Glifo id={r.glifo} size={15} />
            {r.resumen}
          </span>
          <div className="relative">
            <h3 className="font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em] md:text-[2.25rem]">
              {r.promesa}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {r.claves.map((k) => (
                <li key={k} className="vidrio-claro rounded-full px-3 py-1 text-[13px] font-medium">
                  {k}
                </li>
              ))}
            </ul>
            <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-gold transition-[gap] duration-300 group-hover:gap-3.5">
              Ver la solución para {r.nombre.toLowerCase()} <span aria-hidden="true">→</span>
            </span>
          </div>
        </Link>

        <div className="noche grano group relative hidden items-end justify-center overflow-hidden rounded-[2rem] px-4 pt-10 sm:flex">
          <div key={`tel-${r.slug}`} className="ft-entra -mb-10 text-ink">
            {telefonos[r.slug]}
          </div>
        </div>
      </div>
    </div>
  );
}
