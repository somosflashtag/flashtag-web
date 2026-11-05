"use client";

import { useEffect } from "react";

/**
 * La home como una sucesión de escenas: cada sección hija de `.escenas`
 * sube y tapa a la anterior, que queda quieta y se aleja (se achica y se
 * oscurece) mientras la cubren.
 *
 * - Cada escena se pega con `top = alto de pantalla − su alto`: se pega
 *   recién cuando su final toca el borde de abajo, así una sección larga se
 *   lee entera antes de que la tapen. Las muy bajas (menos de media
 *   pantalla) no se pegan.
 * - `--cubierta` (0 → 1) es cuánto la tapa la escena siguiente; el CSS lo
 *   usa para la escala y el velo.
 *
 * Sin JS, o hasta que monta, la página scrollea normal: el CSS solo pega
 * cuando html[data-escenas="on"] está presente.
 */
export function Escenas() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(".escenas");
    if (!raiz) return;
    const escenas = Array.from(raiz.children) as HTMLElement[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.dataset.escenas = "on";

    const medir = () => {
      const vh = window.innerHeight;
      for (const el of escenas) {
        const alto = el.offsetHeight;
        el.toggleAttribute("data-pega", alto >= vh * 0.5);
        el.style.setProperty("--top", `${vh - alto}px`);
      }
    };

    let pedido = 0;
    const previas = new Map<HTMLElement, number>();
    const pintar = () => {
      pedido = 0;
      const vh = window.innerHeight;
      escenas.forEach((el, i) => {
        const sig = escenas[i + 1];
        const c = sig ? Math.min(1, Math.max(0, (vh - sig.getBoundingClientRect().top) / vh)) : 0;
        const r = Math.round(c * 100) / 100;
        if (previas.get(el) !== r) {
          previas.set(el, r);
          el.style.setProperty("--cubierta", String(r));
        }
      });
    };
    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };

    medir();
    pintar();
    const ro = new ResizeObserver(() => {
      medir();
      alScroll();
    });
    escenas.forEach((el) => ro.observe(el));
    window.addEventListener("resize", medir);
    if (!reduced) window.addEventListener("scroll", alScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
      window.removeEventListener("scroll", alScroll);
      cancelAnimationFrame(pedido);
      delete document.documentElement.dataset.escenas;
    };
  }, []);

  return null;
}
