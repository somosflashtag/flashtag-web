/**
 * MEDIOS DE PAGO aceptados en shop.flashtag.tech.
 *
 * Fuente única: si mañana se suma o se saca una pasarela, se toca acá y
 * cambia en todo el sitio. El orden de la lista es el orden en que se
 * muestran.
 *
 * ⚠️ Solo se listan medios que están activos de verdad en el checkout
 * (regla 7 de AGENTS.md: nada de marcas de terceros que no operen).
 */

export type MedioDePago =
  | "mercadopago"
  | "stripe"
  | "visa"
  | "mastercard"
  | "amex"
  | "diners";

export const mediosDePago: MedioDePago[] = [
  "mercadopago",
  "stripe",
  "visa",
  "mastercard",
  "amex",
  "diners",
];
