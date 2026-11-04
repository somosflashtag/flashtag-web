"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Un dato como "76%" o "2 seg" que cuenta hasta su valor cuando entra en
 * pantalla. Sin JS o con reduced-motion se ve el valor final de entrada.
 * "0 apps" cuenta para atrás desde 9: el chiste es que llega a cero.
 */
export function Contador({ valor }: { valor: string }) {
  const m = valor.match(/^(\d+)(.*)$/);
  const final = m ? Number(m[1]) : 0;
  const resto = m ? m[2] : "";
  const inicio = final === 0 ? 9 : 0;
  const [n, setN] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!m || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const paso = (t: number) => {
          const k = Math.min(1, (t - t0) / 1200);
          setN(Math.round(inicio + (final - inicio) * (1 - (1 - k) ** 3)));
          if (k < 1) raf = requestAnimationFrame(paso);
        };
        raf = requestAnimationFrame(paso);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);

  if (!m) return <>{valor}</>;
  return (
    <span ref={ref} aria-label={valor}>
      <span aria-hidden="true">
        {n ?? final}
        {resto}
      </span>
    </span>
  );
}
