/**
 * PÁGINAS POR RUBRO — /para/[slug]
 *
 * Cada rubro entra a FlashTag por una puerta distinta: el restaurante por la
 * mesa, el local de ropa por la vidriera, el centro de estética por el pack de
 * sesiones y la agencia por el panel multi-cliente. Una sola landing genérica
 * los obliga a traducir; esto les habla en su idioma.
 *
 * Rediseño de noviembre 2026: cada rubro tiene su setup recomendado, un día
 * con FlashTag, un caso real y el plan que le conviene. Los números de los
 * planes NO se escriben acá: salen de `planes.ts` por `plan.ids`. El caso sale
 * de `casos.ts` por slug, y solo se muestra si está autorizado y verificado.
 */

import type { GlifoId } from "@/components/ui/Glifo";
import type { Plan } from "./planes";
import type { Rubro } from "./casos";

export type PaginaRubro = {
  slug: string;
  /** Clave del rubro en casos.ts. */
  rubro: Rubro;
  nav: string;
  glifo: GlifoId;
  /** Tarjeta de la home: a quién le habla y tres cosas que se lleva. */
  resumen: string;
  claves: [string, string, string];
  /** Titular del hero: la parte de `destacado` va con el degradado. */
  titular: string;
  destacado: string;
  bajada: string;
  metaDescripcion: string;
  /** Lo que va apareciendo al lado del teléfono de ejemplo. */
  actividad: [string, string, string];
  setup: { glifo: GlifoId; titulo: string; texto: string; etiqueta: string }[];
  dia: { momento: string; titulo: string; texto: string }[];
  /** Slug en casos.ts del caso a destacar. Sin caso, se muestra la capacidad del plan. */
  caso?: string;
  plan: { ids: Plan["id"][]; texto?: string; claves: string[] };
};

export const paginasRubro: PaginaRubro[] = [
  {
    slug: "gastronomia",
    rubro: "gastronomia",
    nav: "Gastronomía",
    glifo: "taza",
    resumen: "Cafés, restaurantes y heladerías.",
    claves: ["Club de sellos", "Tarjetas NFC para mozos", "Reseñas en la mesa"],
    titular: "Que la mesa de hoy sea",
    destacado: "la reserva de mañana.",
    bajada:
      "Reseñas en el momento justo, un club de sellos en la Wallet del cliente y cada mozo con su tarjeta NFC. Todo desde el mismo panel.",
    metaDescripcion:
      "Carta digital por QR, reseñas de Google respondidas con IA, club de sellos en la Wallet y tarjetas NFC para mozos. Para cafés, restaurantes y heladerías.",
    actividad: ["Mesa 4 dejó 5 ★", "Sofi sumó otra reseña", "Lucía canjeó su café"],
    setup: [
      { glifo: "cartel", titulo: "Cartel de Google en la caja", texto: "El cliente escanea mientras paga, que es cuando está más contento.", etiqueta: "Cartel 14 × 14" },
      { glifo: "tarjeta", titulo: "Una tarjeta NFC por mozo", texto: "La apoyan en el celular al cobrar y la reseña suma en el ranking del equipo.", etiqueta: "Tarjeta NFC" },
      { glifo: "menu", titulo: "Menú por QR dinámico", texto: "Cambiás precios y platos del día sin reimprimir nada.", etiqueta: "QR dinámico" },
      { glifo: "corona", titulo: "Club de sellos", texto: "“El 10° café es gratis”, en Apple y Google Wallet.", etiqueta: "Programa de fidelidad" },
    ],
    dia: [
      { momento: "Mañana", titulo: "Llegan los del café de siempre", texto: "El modo caja suma el sello en un segundo y les avisa cuántos les faltan." },
      { momento: "Mediodía", titulo: "Pico de mesas", texto: "Los mozos piden la reseña con su tarjeta y la IA las responde sola." },
      { momento: "Noche", titulo: "Cerrás y mirás el panel", texto: "Ves qué mozo sumó más y quién cumple años esta semana." },
    ],
    caso: "betular-patisserie",
    plan: {
      ids: ["full"],
      claves: ["Club de sellos en la Wallet", "Ranking de mozos", "Menú por QR dinámico", "Cumpleaños por WhatsApp"],
    },
  },
  {
    slug: "retail",
    rubro: "retail",
    nav: "Retail",
    glifo: "bolsa",
    resumen: "Tiendas de ropa, deco y electrónica.",
    claves: ["Cashback y gift cards", "Sticker en la vidriera", "WhatsApp del vendedor"],
    titular: "Que el que entra a mirar",
    destacado: "vuelva a comprar.",
    bajada:
      "Un sticker en la vidriera para el que pasa, el WhatsApp de cada vendedor para el que duda y cashback para el que ya compró.",
    metaDescripcion:
      "Sticker con QR y NFC en la vidriera, FlashCard por vendedor, cashback y gift cards en la Wallet y reseñas con IA. Para tiendas de ropa, deco y electrónica.",
    actividad: ["3 contactos desde la vidriera", "Mica respondió por WhatsApp", "Gift card vendida"],
    setup: [
      { glifo: "sticker", titulo: "Sticker en la vidriera", texto: "Lo escanea el que pasa por la vereda, aunque el local esté cerrado.", etiqueta: "Sticker 15 × 15" },
      { glifo: "tarjeta", titulo: "FlashCard por vendedor", texto: "Su WhatsApp y su catálogo en un toque. El contacto queda en tu base.", etiqueta: "FlashCard" },
      { glifo: "porcentaje", titulo: "Cashback y gift cards", texto: "Un motivo concreto para volver, guardado en el celular del cliente.", etiqueta: "Programa de fidelidad" },
      { glifo: "plata", titulo: "Cobro con Mercado Pago", texto: "El cliente escanea el cartel, pone el monto y paga.", etiqueta: "Mercado Pago" },
    ],
    dia: [
      { momento: "Mañana", titulo: "Abrís la persiana", texto: "Ya tenés los contactos de quienes escanearon la vidriera a la noche." },
      { momento: "Tarde", titulo: "Alguien duda con un producto", texto: "El vendedor le pasa su FlashCard y lo sigue por WhatsApp." },
      { momento: "Fin de mes", titulo: "Campaña a los que no volvieron", texto: "Meta ya sabe quién visitó el local y le muestra el anuncio a gente parecida." },
    ],
    caso: "el-ateneo",
    plan: {
      ids: ["full"],
      claves: ["Cashback, cupones y gift cards", "FlashCard por vendedor", "Píxel de Meta y GA4", "Ranking entre locales"],
    },
  },
  {
    slug: "servicios",
    rubro: "servicios",
    nav: "Servicios",
    glifo: "tijera",
    resumen: "Estética, salud, peluquerías y gimnasios.",
    claves: ["Multipases y membresías", "Cumpleaños por WhatsApp", "Filtro de reseñas"],
    titular: "Que cada turno",
    destacado: "traiga el próximo.",
    bajada:
      "Multipases, membresías y un saludo de cumple que llega solo. Y si algo salió mal, te enterás vos antes que Google.",
    metaDescripcion:
      "Multipases y membresías en la Wallet, cumpleaños por WhatsApp, filtro de reseñas negativas y Link Page para turnos. Para estética, salud, peluquerías y gimnasios.",
    actividad: ["Sesión descontada del pack", "Queja privada recibida", "Saludo de cumple enviado"],
    setup: [
      { glifo: "ticket", titulo: "Multipases y membresías", texto: "“10 sesiones” o una cuota mensual, con los usos en la Wallet.", etiqueta: "Programa de fidelidad" },
      { glifo: "torta", titulo: "Cumpleaños por WhatsApp", texto: "Un regalo unos días antes, con código para canjear.", etiqueta: "Cumpleaños" },
      { glifo: "escudo", titulo: "Filtro de reseñas negativas", texto: "Las quejas llegan primero a vos, siempre dentro de la política de Google.", etiqueta: "Filtro de reseñas" },
      { glifo: "link", titulo: "Link Page para turnos", texto: "WhatsApp, Instagram, reseñas y club en un solo link.", etiqueta: "Link Page" },
    ],
    dia: [
      { momento: "Mañana", titulo: "Primer turno del día", texto: "La clienta muestra su pack y el equipo descuenta la sesión." },
      { momento: "Tarde", titulo: "Una clienta se va disconforme", texto: "Te deja la queja en privado y la llamás antes de que escriba en Google." },
      { momento: "Semana", titulo: "Cumples y clientes en riesgo", texto: "Salen los saludos solos y ves quién dejó de venir hace un mes." },
    ],
    caso: "derentas",
    plan: {
      ids: ["starter", "full"],
      texto: "Starter para un local que quiere reseñas y medición; Full si sumás el club y más de una sede.",
      claves: ["Multipases y membresías", "Cumpleaños por WhatsApp", "Filtro de reseñas negativas", "Respuestas con IA"],
    },
  },
  {
    slug: "agencias",
    rubro: "corporativo",
    nav: "Agencias",
    glifo: "capas",
    resumen: "Gestionás FlashTag para varias marcas.",
    claves: ["Las fichas de todos tus clientes", "Informes por cliente", "Píxeles por cuenta"],
    titular: "Todas las marcas de tus clientes,",
    destacado: "en un solo panel.",
    bajada:
      "Fichas de Google de todos tus clientes, informes listos para mandar y la señal de cada local conectada a las cuentas publicitarias que ya manejás.",
    metaDescripcion:
      "Panel multi-cliente con hasta 20 cuentas de Google Business, reseñas con IA, informes por cliente y píxeles por cuenta, para agencias y franquicias.",
    actividad: ["Informe del cliente listo", "Píxel conectado en Café Rivas", "Cambio en una ficha revertido"],
    setup: [
      { glifo: "capas", titulo: "Multi-cuenta", texto: "Cada cliente con su panel y cambiás de uno a otro sin cerrar sesión.", etiqueta: "Plan Evolution" },
      { glifo: "informe", titulo: "Informes para el cliente", texto: "Vistas, llamadas, reseñas y valor estimado, listos para exportar.", etiqueta: "Calculadora e informes" },
      { glifo: "infinito", titulo: "Píxeles por cuenta", texto: "Meta, GA4 y Tag Manager de cada cliente, en todas sus páginas.", etiqueta: "Píxeles" },
      { glifo: "estrella", titulo: "Reseñas con IA a escala", texto: "Miles de respuestas por mes, con el tono de cada marca.", etiqueta: "Reseñas con IA" },
    ],
    dia: [
      { momento: "Lunes", titulo: "Reporte semanal", texto: "Bajás el informe de cada cliente y lo mandás en minutos." },
      { momento: "Martes", titulo: "Bajar el costo por cliente", texto: "Conectás el píxel y armás audiencias con la gente que escaneó los carteles." },
      { momento: "Siempre", titulo: "Fichas protegidas", texto: "Si alguien toca la ficha de un cliente, te enterás y se revierte sola." },
    ],
    plan: {
      ids: ["evolution"],
      claves: ["Las fichas de Google de todos tus clientes", "Ruletas y Link Pages para cada cliente", "Fidelidad para todas las marcas", "Soporte dedicado"],
    },
  },
];
