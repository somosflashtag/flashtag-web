"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { cn } from "@/lib/cn";

/**
 * "Cómo funciona" contado con el scroll: el escenario (cartel, teléfono,
 * avisos, métricas) queda fijo y cambia a medida que cada paso pasa por el
 * medio de la pantalla. En desktop el escenario va a la derecha; en el
 * celular, arriba, y los pasos pasan por debajo.
 *
 * Los pasos son texto normal (se leen sin JS y con lector de pantalla); el
 * escenario es decorativo. Con reduced-motion cambia sin transiciones.
 */

type Paso = { glifo: GlifoId; titulo: string; texto: string };

const AVISOS: { glifo: GlifoId; titulo: string; detalle: string }[] = [
  { glifo: "chispa", titulo: "La IA respondió la reseña", detalle: "Con el tono de tu marca, sola" },
  { glifo: "corona", titulo: "Sello sumado", detalle: "3 de 8 · le faltan 5 para su premio" },
  { glifo: "persona", titulo: "Contacto guardado", detalle: "Lucía · WhatsApp y cumpleaños" },
];

const BARRAS = [28, 42, 36, 58, 64, 88, 80];

function Escenario({ paso }: { paso: number }) {
  const t = "transition-all duration-700 ease-[var(--ease-ft)] motion-reduce:transition-none";
  return (
    <div aria-hidden="true" className="relative mx-auto h-[300px] w-full max-w-[420px] [overflow-x:clip] sm:h-[460px]">
      {/* Halo */}
      <div className="glow-brand absolute inset-x-6 inset-y-10" />

      {/* Mostrador */}
      <div className="absolute inset-x-0 bottom-6 h-10 rounded-2xl bg-surface shadow-[var(--shadow-rest)] sm:bottom-10 sm:h-14" />

      {/* Cartel */}
      <div
        className={cn(
          t,
          "absolute bottom-12 left-[6%] w-[110px] sm:bottom-20 sm:w-[150px]",
          paso >= 0 ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0",
        )}
      >
        {/* El cartel real de reseñas de FlashTag */}
        <div className="relative aspect-square rounded-[9%] shadow-[var(--shadow-float)]">
          <Image src="/carteles/google.webp" alt="" fill sizes="150px" className="rounded-[9%] object-cover" />
          {paso === 1 && (
            <>
              <span className="ft-ola absolute inset-0 rounded-[9%] border-2 border-brand [animation-iteration-count:infinite]" />
              <span className="ft-ola absolute inset-0 rounded-[9%] border-2 border-brand [animation-delay:300ms] [animation-iteration-count:infinite]" />
            </>
          )}
        </div>
        <span
          className={cn(
            t,
            "absolute -right-3 -top-3 rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold text-ink shadow-[var(--shadow-rest)]",
            paso === 0 ? "scale-100 opacity-100" : "scale-50 opacity-0",
          )}
        >
          ✓ Activado
        </span>
      </div>

      {/* Teléfono del cliente */}
      <div
        className={cn(
          t,
          "absolute bottom-10 right-[8%] w-[124px] rounded-[24px] bg-ink p-1.5 shadow-[var(--shadow-device)] sm:bottom-16 sm:w-[168px] sm:p-2",
          paso === 0 && "translate-x-16 rotate-6 opacity-0",
          paso === 1 && "-translate-x-6 -rotate-6 opacity-100",
          paso >= 2 && "translate-x-0 rotate-0 opacity-100",
        )}
      >
        <div className="flex h-[200px] flex-col items-center justify-center gap-2 rounded-[19px] bg-paper px-2 text-center sm:h-[280px]">
          <b className="font-display text-[12px] sm:text-[14px]">Café Rivas</b>
          {paso <= 1 ? (
            <>
              <p className="text-[10px] text-muted sm:text-[11px]">¿Cómo fue tu experiencia?</p>
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 12 12"
                    width="20"
                    height="20"
                    fill={paso === 1 ? "var(--color-gold)" : "var(--color-line)"}
                    className={cn(paso === 1 && "ft-pop")}
                    style={{ animationDelay: `${300 + i * 110}ms` }}
                  >
                    <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
                  </svg>
                ))}
              </span>
            </>
          ) : (
            <>
              <span className="ft-pop flex size-10 items-center justify-center rounded-full bg-teal text-ink">
                <Glifo id="check" size={20} />
              </span>
              <p className="text-[11px] font-semibold">¡Gracias, Lucía!</p>
              <p className="text-[10px] text-muted">Sumaste un sello en tu Wallet</p>
            </>
          )}
        </div>
      </div>

      {/* Avisos que le llegan al dueño */}
      <div className="absolute right-0 top-0 flex w-[230px] flex-col gap-2 sm:w-[270px]">
        {AVISOS.map((a, i) => (
          <div
            key={a.titulo}
            style={{ transitionDelay: paso === 2 ? `${i * 260}ms` : "0ms" }}
            className={cn(
              t,
              "flex items-center gap-2.5 rounded-2xl border border-line bg-paper px-3 py-2 shadow-[var(--shadow-float)]",
              paso === 2 ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-[9px] bg-brand-soft text-brand">
              <Glifo id={a.glifo} size={14} />
            </span>
            <span className="min-w-0">
              <b className="block text-[12px] leading-tight">{a.titulo}</b>
              <small className="block truncate text-[10.5px] text-muted">{a.detalle}</small>
            </span>
          </div>
        ))}
      </div>

      {/* Métricas */}
      <div
        className={cn(
          t,
          "absolute left-0 right-[30%] top-0 rounded-2xl border border-line bg-paper p-3 shadow-[var(--shadow-float)] sm:right-[34%] sm:p-4",
          paso === 3 ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
        )}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Escaneos · 7 días</p>
        <p className="font-display text-[22px] font-semibold leading-tight tnum sm:text-[26px]">
          347 <span className="text-[12px] font-bold text-ink">+23% ↗</span>
        </p>
        <div className="mt-2 flex h-14 items-end gap-1 sm:h-20">
          {BARRAS.map((h, i) => (
            <i
              key={i}
              className={cn(t, "flex-1 rounded-t bg-brand")}
              style={{ height: paso === 3 ? `${h}%` : "4%", transitionDelay: paso === 3 ? `${i * 70}ms` : "0ms" }}
            />
          ))}
        </div>
        <p className="mt-2 text-[10.5px] text-muted">Por cartel, por local y por vendedor</p>
      </div>
    </div>
  );
}

export function HistoriaScroll({ pasos }: { pasos: Paso[] }) {
  const [paso, setPaso] = useState(0);
  const [altoHeader, setAltoHeader] = useState(72);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  /* El escenario se pega justo debajo del header, que cambia de alto
     según haya o no barra de promo. */
  useEffect(() => {
    const h = document.querySelector("header");
    if (!h) return;
    const medir = () => setAltoHeader(h.getBoundingClientRect().height);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  /* El paso activo es el que cruza la franja del medio de la pantalla. */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) setPaso(Number((e.target as HTMLElement).dataset.paso));
        }
      },
      { rootMargin: "-55% 0px -40% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative mt-6 md:mt-10 lg:grid lg:grid-cols-2 lg:gap-12">
      <div
        className="sticky z-10 -mx-5 bg-paper/90 px-5 pb-2 pt-3 backdrop-blur-md lg:order-2 lg:mx-0 lg:h-fit lg:bg-transparent lg:px-0 lg:pt-8 lg:backdrop-blur-none"
        style={{ top: altoHeader }}
      >
        <Escenario paso={paso} />
        {/* Puntitos de progreso */}
        <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
          {pasos.map((_, i) => (
            <i key={i} className={cn("h-1.5 rounded-full transition-all duration-300", i === paso ? "w-6 bg-brand" : "w-1.5 bg-line")} />
          ))}
        </div>
      </div>

      <ol className="relative lg:order-1">
        {pasos.map((p, i) => (
          <li
            key={p.titulo}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-paso={i}
            className="flex min-h-[46vh] items-center py-6 lg:min-h-[78vh]"
          >
            <div
              className={cn(
                "w-full rounded-[22px] border p-5 transition-all duration-500 ease-[var(--ease-ft)] md:p-7",
                i === paso ? "border-brand bg-paper shadow-[var(--shadow-float)]" : "border-line bg-surface/30 opacity-50",
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl transition-colors duration-300",
                    i === paso ? "bg-brand text-paper" : "bg-brand-soft text-brand",
                  )}
                >
                  <Glifo id={p.glifo} size={22} />
                </span>
                <span className="font-display text-sm font-bold text-brand tnum">Paso 0{i + 1}</span>
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">{p.titulo}</h3>
              <p className="mt-1.5 text-[15px] text-muted md:text-base">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
