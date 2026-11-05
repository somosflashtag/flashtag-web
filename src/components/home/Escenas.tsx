"use client";

import { useEffect } from "react";

/**
 * La home como una sucesión de escenas, una por pantalla.
 *
 * 1. Entrada: cada sección hija de `.escenas` entra como una tarjeta un poco
 *    más chica, redondeada y con sombra, y se expande a todo el ancho a
 *    medida que sube (`--entrada`, de 0 a 1, lo usa el CSS). Nada se
 *    superpone, así que todo se lee.
 *
 * 2. Encaje: cuando el scroll se detiene mostrando el corte entre dos
 *    secciones, y la que viene ya ocupa más de media pantalla, se acomoda
 *    sola: bajando, al comienzo de la nueva; subiendo, al final de la de
 *    arriba. Siempre en la dirección en que venías, nunca para atrás.
 *    Dentro de una sección el scroll es libre, por larga que sea.
 *
 * Sin JS, o con reduced-motion, no hay ni animación ni encaje.
 */
export function Escenas() {
  useEffect(() => {
    const raiz = document.querySelector<HTMLElement>(".escenas");
    if (!raiz) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const todas = Array.from(raiz.children) as HTMLElement[];
    /* La primera (el hero) ya está en pantalla: no se anima. */
    const escenas = todas.slice(1);
    document.documentElement.dataset.escenas = "on";

    const alturaHeader = () => document.querySelector("header")?.getBoundingClientRect().height ?? 64;

    /* ── Entrada ─────────────────────────────────────────── */
    let pedido = 0;
    const previas = new Map<HTMLElement, number>();
    const pintar = () => {
      pedido = 0;
      const vh = window.innerHeight;
      for (const el of escenas) {
        const top = el.getBoundingClientRect().top;
        const e = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)));
        const r = Math.round(e * 100) / 100;
        if (previas.get(el) !== r) {
          previas.set(el, r);
          el.style.setProperty("--entrada", String(r));
        }
      }
    };

    /* ── Encaje ──────────────────────────────────────────── */
    let desde = window.scrollY;
    let encajando = false;
    let espera = 0;

    const encajar = () => {
      const y = window.scrollY;
      const dir = Math.sign(y - desde);
      desde = y;
      if (encajando) {
        encajando = false;
        return;
      }
      if (!dir) return;
      const vh = window.innerHeight;
      const arriba = alturaHeader();
      const util = vh - arriba;
      /* El corte visible: el borde de arriba de una sección dentro de la pantalla. */
      for (let i = 1; i < todas.length; i++) {
        const corte = todas[i].getBoundingClientRect().top; // relativo a la pantalla
        if (corte <= arriba + 4 || corte >= vh - 4) continue;
        const nueva = (vh - corte) / util; // cuánto de la pantalla ocupa la de abajo
        let destino: number | null = null;
        if (dir > 0 && nueva > 0.5) destino = y + corte - arriba; // al comienzo de la nueva
        if (dir < 0 && nueva < 0.5) destino = y + corte - vh; // al final de la de arriba
        if (destino !== null && Math.abs(destino - y) > 2) {
          encajando = true;
          window.scrollTo({ top: destino, behavior: "smooth" });
        }
        return;
      }
    };

    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(pintar);
      /* Sin `scrollend`, esperar a que el scroll quede quieto. */
      window.clearTimeout(espera);
      espera = window.setTimeout(encajar, 160);
    };
    const alTerminar = () => {
      window.clearTimeout(espera);
      encajar();
    };
    const pedirPintar = () => {
      if (!pedido) pedido = requestAnimationFrame(pintar);
    };
    const tieneScrollend = "onscrollend" in window;
    const onScroll = tieneScrollend ? pedirPintar : alScroll;

    pintar();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (tieneScrollend) window.addEventListener("scrollend", alTerminar);
    window.addEventListener("resize", pedirPintar);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", alTerminar);
      window.removeEventListener("resize", pedirPintar);
      window.clearTimeout(espera);
      cancelAnimationFrame(pedido);
      delete document.documentElement.dataset.escenas;
    };
  }, []);

  return null;
}
