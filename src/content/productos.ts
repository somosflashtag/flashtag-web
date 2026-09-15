/**
 * TIENDA — los productos físicos que se venden en shop.flashtag.tech.
 *
 * Es lo más tangible que tiene la marca: un objeto que llega al local, con
 * precio en pesos y foto en un local real. Por eso vive en la home.
 *
 * Cada cartel tiene UN canal (Google, Instagram, WhatsApp...). No es un QR
 * genérico: el de Google lleva a la ficha de Google y nada más. Para un
 * destino libre está el QR dinámico de la app.
 *
 * Cada pieza trae QR **y NFC**: se escanea con la cámara o se apoya el
 * teléfono. El gesto de apoyar es el diferencial — no hay que abrir nada.
 *
 * ⚠️ Los precios son los del sitio viejo. Si cambian en Shopify, cambian acá
 * — o mejor, se leen de la Storefront API cuando exista el token.
 */

export type Producto = {
  slug: string;
  nombre: string;
  /** Para qué sirve, en una línea. */
  bajada: string;
  precioARS: number;
  /** "Más vendido", "Ahorrás más". Opcional. */
  etiqueta?: string;
  /** Foto del producto en un local real. */
  foto: string;
  alt: string;
  href: string;
};

const SHOP = "https://shop.flashtag.tech";

export const productos: Producto[] = [
  {
    slug: "cartel-google",
    nombre: "Cartel de Google",
    bajada:
      "El que más se vende. Va en el mostrador y lleva directo a tu ficha de Google para que te dejen la reseña.",
    precioARS: 39999,
    etiqueta: "Más vendido",
    foto: "/productos/cartel-google.webp",
    alt: "Cartel acrílico de Google de FlashTag sobre la mesa de madera de un café",
    href: `${SHOP}/products/cartel-google`,
  },
  {
    slug: "cartel-instagram",
    nombre: "Cartel de Instagram",
    bajada:
      "Convierte a quien ya está en tu local en seguidor. Apoya el teléfono, te sigue en tus redes, vuelve a lo suyo.",
    precioARS: 39999,
    foto: "/productos/cartel-instagram.webp",
    alt: "Cartel acrílico de Instagram de FlashTag apoyado en un local",
    href: `${SHOP}/products/cartel-instagram`,
  },
  {
    slug: "cartel-whatsapp",
    nombre: "Cartel de WhatsApp",
    bajada:
      "Para que inicien una conversación por WhatsApp sin cargar el número. Pedidos, reservas y consultas directo a tu chat.",
    precioARS: 39999,
    foto: "/productos/cartel-whatsapp.webp",
    alt: "Cartel acrílico de WhatsApp de FlashTag en un mostrador",
    href: `${SHOP}/products/cartel-whatsapp`,
  },
];

/** Los tres formatos en que viene cualquier canal. */
export const formatos = [
  {
    nombre: "Cartel acrílico",
    medida: "14 × 14 cm",
    texto: "Con base propia. Para el mostrador o la caja del local.",
    foto: "/productos/carteles.webp",
  },
  {
    nombre: "Sticker para vidriera",
    medida: "15 × 15 cm",
    texto: "Para la vidriera. Lo ve quien pasa, antes de entrar.",
    foto: "/productos/stickers.webp",
  },
  {
    nombre: "Tarjeta de plástico",
    medida: "8,6 × 5,4 cm",
    texto: "Del tamaño de una tarjeta. Con lanyard para llevarla encima.",
    foto: "/productos/tarjetas.webp",
  },
];

export const tienda = {
  titular: "Un cartel para cada canal de tu local",
  bajada:
    "Cada cartel tiene su uso: Google para reseñas, Instagram para seguidores, WhatsApp para conversaciones. Llega con el QR y el chip NFC activados: lo ponés en el mostrador y empieza a funcionar.",
  href: SHOP,
};

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export const precioARS = (n: number) => fmt.format(n);
