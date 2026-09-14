"use client";

import { useEffect, useRef, useState } from "react";

/**
 * EL ELEMENTO MEMORABLE (brief 3.7).
 * Único momento orquestado del sitio: el QR se ensambla y la métrica sube.
 * Todo lo demás en la página es tranquilo. Una sola apuesta visual.
 *
 * Respeta prefers-reduced-motion: sin animación se ve igual, ya montado.
 */

const QR_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
];

const SPARK = [12, 18, 14, 27, 22, 31, 24, 38, 33, 47, 41, 52];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Cuenta de 0 al target. El valor final está en el DOM desde el inicio (SEO + no-JS). */
function Counter({ target, reduced }: { target: number; reduced: boolean }) {
  const [value, setValue] = useState(target);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || started.current) return;
    started.current = true;
    setValue(0);
    const duration = 450;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    const delay = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 350);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [target, reduced]);

  return <span className="tnum">{value}</span>;
}

export function HeroMockup() {
  const reduced = useReducedMotion();
  const cell = 100 / QR_PATTERN.length;

  const max = Math.max(...SPARK);
  const points = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * 100;
    const y = 100 - (v / max) * 88;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="relative w-full">
      {/* Dashboard: superficie oscura, tipografía tabular, precisión de instrumento */}
      <div className="relative overflow-hidden rounded-[var(--radius-surface)] bg-[var(--color-surface-dark)] p-5 text-white shadow-[var(--shadow-float)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[var(--color-up)]" />
            <span className="text-[13px] font-medium text-white/60">
              Café Rivas · Palermo
            </span>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70">
            Últimos 7 días
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[auto_1fr] items-end gap-5">
          <div>
            <p className="text-[12px] font-medium tracking-wide text-white/50">
              Escaneos
            </p>
            <p className="mt-1 text-[2.25rem] font-semibold leading-none tracking-tight">
              <Counter target={347} reduced={reduced} />
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-up)]">
              <svg viewBox="0 0 12 12" width="11" height="11" fill="none" aria-hidden="true">
                <path d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="tnum">+23%</span>
              <span className="font-normal text-white/40">vs. semana anterior</span>
            </p>
          </div>

          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full" aria-hidden="true">
            <polyline points={points} fill="none" stroke="var(--color-signal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Tarjeta de reseña — la app respondiendo */}
        <div className="mt-5 rounded-[var(--radius-card)] border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5" aria-label="5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 12 12" width="11" height="11" fill="#FFC53D" aria-hidden="true">
                  <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
                </svg>
              ))}
            </div>
            <span className="text-[12px] text-white/45">hace 2 horas</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-white/75">
            &ldquo;Muy buen café y atención rapidísima. Vuelvo seguro.&rdquo;
          </p>
          <div className="mt-3 rounded-lg border border-[var(--color-signal)]/30 bg-[var(--color-signal)]/10 p-3">
            <p className="text-[11px] font-semibold tracking-wide text-[#8AA3FF]">
              RESPUESTA SUGERIDA
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/85">
              ¡Gracias Marina! Nos alegra que te haya gustado. Te esperamos con
              el próximo cortado.
            </p>
          </div>
        </div>
      </div>

      {/* El QR que se ensambla — flota sobre el dashboard */}
      <div className="absolute -bottom-6 -left-4 hidden rounded-[var(--radius-card)] bg-white p-3.5 shadow-[var(--shadow-float)] sm:block">
        <svg viewBox="0 0 100 100" width="104" height="104" aria-label="Código QR de FlashTag">
          {QR_PATTERN.map((row, y) =>
            row.map((on, x) =>
              on ? (
                <rect
                  key={`${x}-${y}`}
                  x={x * cell}
                  y={y * cell}
                  width={cell * 0.92}
                  height={cell * 0.92}
                  rx={cell * 0.18}
                  fill="var(--color-ink)"
                  className={reduced ? undefined : "ft-module"}
                  style={
                    reduced
                      ? undefined
                      : ({
                          animationDelay: `${((x + y) / 34) * 380}ms`,
                          transformOrigin: `${x * cell + cell / 2}px ${y * cell + cell / 2}px`,
                          "--tx": `${(x - 8) * 1.4}px`,
                          "--ty": `${(y - 8) * 1.4}px`,
                        } as React.CSSProperties)
                  }
                />
              ) : null,
            ),
          )}
        </svg>
      </div>
    </div>
  );
}
