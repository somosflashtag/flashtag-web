/**
 * FOTOS — las escenas de rubro que usa todo el sitio.
 *
 * Son ILUSTRATIVAS, generadas para el sitio: sin marcas ni carteles a la
 * vista. No retratan a ningún cliente y nunca acompañan un testimonio, un
 * nombre de comercio ni una cifra (AGENTS.md §4). La foto de un cliente real
 * va en `public/locales/` y solo con su autorización (`casos.ts`).
 *
 * Todas miden 960 × 1280 (3:4, vertical) y pesan entre 70 y 120 KB. Se
 * muestran con `next/image` y `object-cover`; el `alt` describe la escena.
 */
export type Foto = { src: string; alt: string };

/**
 * Fotos del sitio. Son ilustrativas, generadas para el sitio: escenas de
 * rubro, sin marcas ni carteles a la vista. No retratan a ningún cliente y
 * nunca se usan como testimonio (AGENTS.md §4).
 */
export const fotos = {
  cafe: { src: "/fotos/cafe.webp", alt: "Una barista sonríe y entrega un café para llevar en el mostrador de un café de barrio" },
  restaurante: { src: "/fotos/restaurante.webp", alt: "Dos amigas se ríen en la mesa de un restaurante, una con el celular en la mano" },
  tienda: { src: "/fotos/tienda.webp", alt: "Una vendedora entrega una bolsa a una clienta en el mostrador de una tienda de ropa" },
  barberia: { src: "/fotos/barberia.webp", alt: "Un barbero le corta el pelo a un cliente que sonríe en una barbería" },
  gimnasio: { src: "/fotos/gimnasio.webp", alt: "La recepcionista de un estudio de bienestar recibe a una socia que llega con su bolso" },
  heladeria: { src: "/fotos/heladeria.webp", alt: "Una pareja se ríe con sus helados frente al mostrador de una heladería" },
  panaderia: { src: "/fotos/panaderia.webp", alt: "La mano de un cliente con el celular sobre el mostrador de una panadería, junto a un café y medialunas" },
  agencia: { src: "/fotos/agencia.webp", alt: "Tres personas de una agencia trabajan juntas frente a una notebook" },
  dueno: { src: "/fotos/dueno.webp", alt: "El dueño de un café, con delantal y los brazos cruzados, sonríe en la puerta de su local" },
} satisfies Record<string, Foto>;

