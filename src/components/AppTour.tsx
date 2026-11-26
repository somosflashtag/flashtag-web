"use client";

import { useRef, useState } from "react";
import { PhoneFrame } from "./app/PhoneFrame";
import { Button } from "./ui/Button";
import { Glifo, type GlifoId } from "./ui/Glifo";
import { cn } from "@/lib/cn";
import type { Feature } from "@/content/features";

/**
 * Recorrido por la app: una píldora por función y, debajo, el teléfono con
 * su pantalla al lado de lo que hace, sus tres pasos y el link a su página.
 *
 * Va adentro de un bloque `noche` (`<Seccion tono="noche">`): el texto es
 * blanco y el teléfono se apoya en una baldosa lila. Sobre otro tono no se lee.
 *
 * Las pantallas llegan renderizadas desde el servidor (`screens`), así que
 * este componente solo decide cuál se ve. Cero lógica de producto acá.
 *
 * Píldoras con `aria-pressed` y no un tablist completo, igual que Pilares y
 * RubrosTabs: se recorren con Tab, sin flechas que aprender. Al cambiar, lo
 * nuevo entra desenfocado y se aclara (`.ft-entra`), con `key` para que la
 * animación se repita. "Siguiente" queda fuera de lo que se remonta, así no
 * pierde el foco de teclado al avanzar.
 */
export function AppTour({
  features,
  screens,
  glifos,
  siguiente = "Siguiente",
}: {
  features: Feature[];
  screens: Record<string, React.ReactNode>;
  /** El ícono de cada función, por slug: los mismos de los pilares de la home. */
  glifos: Record<string, GlifoId>;
  siguiente?: string;
}) {
  const [activo, setActivo] = useState(0);
  const fila = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const f = features[activo];
  const proxima = (activo + 1) % features.length;
  const glifo = (slug: string): GlifoId => glifos[slug] ?? "chispa";
  const dos = (n: number) => String(n).padStart(2, "0");

  /**
   * Cambia de función. La píldora elegida se centra en su fila (en el celular
   * la fila se desliza) sin mover la página; y si se avanzó con "Siguiente"
   * desde abajo, la página vuelve al principio del panel para que se vea la
   * pantalla nueva.
   */
  function elegir(i: number, desdeElPanel = false) {
    setActivo(i);
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    const cont = fila.current;
    const pildora = cont?.children[i] as HTMLElement | undefined;
    if (cont && pildora) {
      cont.scrollTo({ left: pildora.offsetLeft - (cont.clientWidth - pildora.offsetWidth) / 2, behavior });
    }
    if (desdeElPanel && panel.current && panel.current.getBoundingClientRect().top < 88) {
      panel.current.scrollIntoView({ behavior, block: "start" });
    }
  }

  return (
    <>
      <div
        ref={fila}
        data-reveal
        role="group"
        aria-label="Funciones de la app"
        className="relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {features.map((x, i) => {
          const on = i === activo;
          return (
            <button
              key={x.slug}
              type="button"
              aria-pressed={on}
              aria-controls="recorrido-panel"
              onClick={() => elegir(i)}
              className={cn(
                "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-semibold outline-offset-4 focus-visible:outline-gold",
                "transition-[background-color,border-color,color,translate] duration-500 ease-fluida",
                on
                  ? "border-gold bg-gold text-ink"
                  : "border-paper/25 bg-paper/[0.08] text-paper/85 hover:-translate-y-0.5 hover:border-paper/60 hover:text-paper",
              )}
            >
              <Glifo id={glifo(x.slug)} size={16} />
              {x.nombre}
            </button>
          );
        })}
      </div>

      <div
        ref={panel}
        id="recorrido-panel"
        className="mt-6 grid scroll-mt-24 grid-cols-1 gap-7 md:mt-10 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-12"
      >
        {/* El teléfono, sobre su baldosa lila. Es demo: no se lee en voz alta. */}
        <div
          aria-hidden="true"
          data-reveal="zoom"
          className="relative flex h-[390px] items-start justify-center overflow-hidden rounded-[2rem] bg-brand-soft px-6 pt-14 text-ink sm:h-[460px] lg:h-auto lg:min-h-[640px] lg:items-end lg:pt-16"
        >
          <span className="absolute left-5 top-4 rounded-full bg-paper px-3 py-1.5 text-[13px] font-bold text-brand tnum shadow-[var(--shadow-rest)]">
            {dos(activo + 1)} / {dos(features.length)}
          </span>
          <span className="absolute right-5 top-4 flex size-9 items-center justify-center rounded-full bg-brand text-paper">
            <Glifo id={glifo(f.slug)} size={17} />
          </span>
          <div key={f.slug} className="ft-entra w-[300px] shrink-0 origin-top scale-[0.86] lg:-mb-16 lg:scale-100">
            <PhoneFrame>{screens[f.slug]}</PhoneFrame>
          </div>
        </div>

        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="flex min-w-0 flex-col justify-center"
        >
          <div aria-live="polite">
            <div key={f.slug} className="ft-entra">
              <p className="flex flex-wrap items-center gap-2">
                <span className="eyebrow-noche">
                  <Glifo id={glifo(f.slug)} size={13} />
                  {f.nombre}
                </span>
                <span className="vidrio-claro rounded-full px-3 py-1 text-[12px] font-bold">Desde {f.desde}</span>
              </p>
              <h3 className="mt-4 text-balance font-display text-[1.625rem] font-bold leading-[1.08] tracking-[-0.035em] md:text-[2.25rem]">
                {f.titular}
              </h3>
              <p className="mt-4 max-w-[62ch] leading-relaxed text-paper/80 md:text-[1.0625rem]">{f.bajada}</p>

              <ol className="mt-6 grid gap-2.5 sm:grid-cols-3">
                {f.pasos.map((p, i) => (
                  <li key={p.titulo} className="vidrio-claro flex gap-3.5 rounded-[1.5rem] p-4 sm:block sm:p-5">
                    <span className="font-display text-[1.125rem] font-bold leading-none text-gold tnum">{dos(i + 1)}</span>
                    <div className="sm:mt-2.5">
                      <p className="font-display text-[1rem] font-semibold leading-tight tracking-[-0.02em]">{p.titulo}</p>
                      <p className="mt-1.5 text-[13.5px] leading-snug text-paper/75">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={`/producto/${f.slug}`} variant="oro" size="lg" arrow>
              Ver {f.nombre} en detalle
            </Button>
            <Button variant="claro" size="lg" onClick={() => elegir(proxima, true)}>
              {siguiente}: {features[proxima].nombre}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
