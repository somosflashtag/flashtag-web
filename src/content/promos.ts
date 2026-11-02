/**
 * PROMOS — descuentos sobre los precios de `planes.ts`, con fecha de inicio y
 * de fin. Regla 3 del AGENTS.md: un dato, una fuente. Ningún componente
 * escribe "50%" ni "4/11" a mano; todo sale de acá.
 *
 * Es una copia exacta de `lib/promociones.ts` en flashtag-app: los mismos
 * instantes y la misma regla de redondeo, para que el precio que el visitante
 * ve en /precios sea el que después le cobra la app en el checkout. Si se
 * cambia acá, se cambia allá.
 *
 * `desde` y `hasta` son instantes UTC escritos a partir de la hora de
 * Argentina (UTC-3): "hasta el miércoles 4/11" es hasta las 23:59:59 del
 * miércoles en Buenos Aires. `hasta` es exclusivo.
 *
 * Las páginas que muestran una promo son ISR con `revalidate` (ver
 * `app/layout.tsx`): se vuelven a renderizar como mucho una hora después del
 * cierre. Para esa hora de gracia, `usePromoVigente` apaga la promo del lado
 * del navegador en cuanto el reloj del visitante pasa `hasta`.
 */

import type { Ciclo } from "./planes";

export type Promo = {
  id: string;
  /** Cómo se la nombra: "CyberFlash". */
  nombre: string;
  /** Fracción que se descuenta: 0.5 = 50% OFF. */
  descuento: number;
  /** Instante ISO (UTC) desde el que aplica, inclusive. */
  desde: string;
  /** Instante ISO (UTC) desde el que deja de aplicar, exclusive. */
  hasta: string;
  /** Cómo se le dice al visitante hasta cuándo: "miércoles 4/11". */
  hastaTexto: string;
  ciclos: readonly Ciclo[];
};

export const promos: readonly Promo[] = [
  {
    // CyberFlash (Tomás, 02/11/2026): 50% OFF en todas las suscripciones,
    // mensuales y anuales, hasta el miércoles 4/11 inclusive.
    id: "cyberflash-2026",
    nombre: "CyberFlash",
    descuento: 0.5,
    desde: "2026-11-02T03:00:00.000Z", // lunes 2/11, 00:00 en Buenos Aires
    hasta: "2026-11-05T03:00:00.000Z", // jueves 5/11, 00:00 en Buenos Aires
    hastaTexto: "miércoles 4/11",
    ciclos: ["mensual", "anual"],
  },
];

/** La promo que aplica en este instante, o null. Si se solapan, la de mayor descuento. */
export function promoVigente(ahora: Date = new Date()): Promo | null {
  const t = ahora.getTime();
  let mejor: Promo | null = null;
  for (const p of promos) {
    if (t < Date.parse(p.desde) || t >= Date.parse(p.hasta)) continue;
    if (!mejor || p.descuento > mejor.descuento) mejor = p;
  }
  return mejor;
}

/**
 * El precio con el descuento, redondeado hacia abajo al entero (igual que la
 * app): USD 49 queda en 24, no en 24,5 ni en 25.
 */
export function conDescuento(precio: number, promo: Pick<Promo, "descuento">): number {
  return Math.floor(precio * (1 - promo.descuento));
}

/** "50%" para mostrar. */
export function descuentoTexto(promo: Pick<Promo, "descuento">): string {
  return `${Math.round(promo.descuento * 100)}%`;
}
