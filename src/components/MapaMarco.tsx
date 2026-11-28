"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * El marco del mapa de comercios. El iframe NO se pide al cargar la página:
 * recién se monta cuando la sección está por entrar en pantalla (600px antes),
 * así el mapa no le cuesta nada a quien no baja hasta acá. Mientras llega se
 * ve un esqueleto del mismo alto, de modo que la página no salta.
 *
 * Altos del embebido (los define la app): 640px si el iframe mide menos de
 * 880px de ancho, 560px desde ahí. Con el contenedor del sitio, eso es `lg`.
 */
export function MapaMarco({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [cerca, setCerca] = useState(false);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setCerca(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative h-[640px] lg:h-[560px]", className)}>
      {!listo && (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center rounded-[1.5rem] bg-paper/70 text-[15px] font-semibold text-muted motion-safe:animate-pulse"
        >
          Cargando el mapa…
        </div>
      )}
      {cerca && (
        <iframe
          src={src}
          title="Mapa de los comercios que usan FlashTag"
          onLoad={() => setListo(true)}
          className={cn(
            "relative block h-full w-full border-0 transition-opacity duration-500 ease-fluida",
            listo ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </div>
  );
}
