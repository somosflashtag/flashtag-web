"use client";

import Link from "next/link";
import { Container } from "./ui/Container";
import { descuentoTexto, type Promo } from "@/content/promos";
import { usePromoVigente } from "./usePromoVigente";

/**
 * La barra de promo arriba del header. Vive adentro del `<header>` sticky,
 * así que acompaña el scroll: en una campaña de tres días, que se vea siempre
 * vale más que los 40px de pantalla que ocupa.
 *
 * Sigue la pieza de comunicación del CyberFlash: fondo verde azulado
 * (`--color-teal`), el nombre en un pill violeta profundo y el "50% OFF" en
 * uno dorado. Los tres salen del `@theme`, ningún hex acá.
 *
 * ~~Contraste: el texto chico va en `ink` sobre teal (4.75:1, AA). Blanco sobre
 * teal da 3.6:1 y sólo pasa en texto grande, así que el blanco queda para el
 * pill violeta (14:1).~~
 * @deprecated 2026-11-02: Tomás pidió el texto en blanco, como la pieza de la
 * campaña. Queda en 3.6:1, por debajo del piso AA de 4.5:1 para texto chico;
 * se compensa con negrita. Es una excepción de tres días, no el nuevo piso.
 */
export function PromoBanner({ promo: promoServer }: { promo: Promo | null }) {
  const promo = usePromoVigente(promoServer);
  if (!promo) return null;

  return (
    <div className="bg-teal text-paper">
      <Container>
        <Link
          href="/precios"
          className="flex min-h-[44px] items-center justify-center gap-x-2 py-1.5 text-center text-[12.5px] font-bold leading-snug sm:flex-wrap sm:gap-x-3 sm:gap-y-1 sm:py-2 sm:text-sm"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-0.5 font-display text-[12px] font-bold uppercase tracking-wide text-paper">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true" className="text-gold">
              <path d="M8 0c.4 3.9 3.1 6.6 7 7-3.9.4-6.6 3.1-7 7-.4-3.9-3.1-6.6-7-7 3.9-.4 6.6-3.1 7-7z" />
            </svg>
            {promo.nombre}
          </span>
          <span className="whitespace-nowrap rounded-full bg-gold px-2.5 py-0.5 font-display text-[12px] font-bold uppercase tracking-wide text-ink">
            {descuentoTexto(promo)} OFF
          </span>
          <span className="whitespace-nowrap">
            <span className="hidden sm:inline">en todas las suscripciones, mensuales y anuales, </span>hasta el {promo.hastaTexto}
          </span>
          <span className="hidden underline underline-offset-4 sm:inline">Ver planes</span>
          <span aria-hidden="true" className="sm:hidden">›</span>
        </Link>
      </Container>
    </div>
  );
}
