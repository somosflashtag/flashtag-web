/**
 * TIENDA — los productos físicos que se venden en shop.flashtag.tech.
 *
 * Es lo más tangible que tiene la marca: un objeto que llega al local, con
 * precio en pesos. Por eso viven en la home y no escondidos en la tienda.
 *
 * ⚠️ Los precios son de la captura del sitio viejo. Si cambian en Shopify,
 * cambian acá — o mejor, se leen de la Storefront API cuando exista el token.
 */

export type Producto = {
  slug: string;
  nombre: string;
  /** Para qué sirve, en una línea. */
  bajada: string;
  precioARS: number;
  /** "Más vendido", "Ahorrá más". Opcional. */
  etiqueta?: string;
  /** Canal que resuelve el producto. Define la ilustración. */
  canal: "google" | "instagram" | "combo";
  href: string;
};

const SHOP = "https://shop.flashtag.tech";

export const productos: Producto[] = [
  {
    slug: "cartel-google",
    nombre: "Cartel de Google",
    bajada:
      "El clásico para pedir reseñas. Va en el mostrador o en la mesa y lleva directo a tu ficha de Google.",
    precioARS: 39999,
    etiqueta: "Más vendido",
    canal: "google",
    href: `${SHOP}/products/cartel-google`,
  },
  {
    slug: "cartel-instagram",
    nombre: "Cartel de Instagram",
    bajada:
      "Convierte a quien ya está en tu local en seguidor. Escanea, te sigue, se va.",
    precioARS: 39999,
    canal: "instagram",
    href: `${SHOP}/products/cartel-instagram`,
  },
  {
    slug: "combo-completo",
    nombre: "Combo Google + Instagram + WhatsApp",
    bajada:
      "Los tres canales cubiertos. Reseñas, seguidores y contacto directo, en un solo pedido.",
    precioARS: 104999,
    etiqueta: "Ahorrás más",
    canal: "combo",
    href: `${SHOP}/products/combo`,
  },
];

export const tienda = {
  titular: "Elegí el cartel que va en tu local",
  bajada:
    "Llega impreso, con el QR ya activado. Lo ponés en la mesa y empieza a funcionar.",
  href: SHOP,
};

const fmt = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export const precioARS = (n: number) => fmt.format(n);
