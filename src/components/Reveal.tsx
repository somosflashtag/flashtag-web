"use client";

import { useEffect } from "react";

/**
 * Activa el reveal al scroll para todo elemento con `data-reveal`.
 * Se monta una vez en el layout. Sin JS, nada queda oculto: el CSS solo
 * actúa cuando html[data-reveal="on"] está presente.
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
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observe = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => io.observe(el));
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
