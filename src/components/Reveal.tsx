"use client";

import { useEffect } from "react";

/**
 * Activa el reveal al scroll para todo elemento con `data-reveal` (y los hijos
 * de todo elemento con `data-reveal-hijos`, que entran escalonados).
 * Se monta una vez en el layout. Sin JS, nada queda oculto: el CSS solo
 * actúa cuando html[data-reveal="on"] está presente.
 *
 * Se repite: cuando un elemento vuelve a quedar por debajo de la pantalla
 * (el usuario subió), se rearma y vuelve a entrar al bajar de nuevo. Lo que
 * queda arriba no se toca, así no parpadea al seguir bajando.
 */
export function Reveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    document.documentElement.dataset.reveal = "on";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
          } else {
            const alto = e.rootBounds?.height ?? window.innerHeight;
            if (e.boundingClientRect.top > alto) e.target.classList.remove("is-in");
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    const vistos = new WeakSet<Element>();
    const observe = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-hijos]").forEach((el) => {
        if (el.hasAttribute("data-reveal-hijos")) {
          Array.from(el.children).forEach((h, i) => (h as HTMLElement).style.setProperty("--i", String(i)));
        }
        if (vistos.has(el)) return;
        vistos.add(el);
        io.observe(el);
      });
    };
    observe();

    /* Navegación client-side: observar lo nuevo que entra al DOM. */
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      delete document.documentElement.dataset.reveal;
    };
  }, []);

  return null;
}
