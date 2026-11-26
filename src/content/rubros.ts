/**
 * PÁGINAS POR RUBRO — /para/[slug]
 *
 * Cada rubro entra a FlashTag por una puerta distinta: el restaurante por la
 * mesa, el local de ropa por la vidriera, el centro de estética por el pack de
 * sesiones y la agencia por el panel multi-cliente. Una sola landing genérica
 * los obliga a traducir; esto les habla en su idioma.
 *
 * Cada rubro tiene su setup recomendado, un día (o una semana) con FlashTag,
 * un caso real, el plan que le conviene y su cierre. Los números de los planes
 * NO se escriben acá: salen de `planes.ts` (`plan.ids`, y `plan()` más abajo
 * para lo que va dentro de un texto). El caso sale de `casos.ts` por slug, y
 * solo se muestra si está autorizado y verificado. La foto del hero es la
 * misma de las pestañas de la home (`rubrosIntro.fotos` en `home.ts`).
 *
 * Lo que se promete acá tiene que existir en la app y estar abierto a los
 * clientes (AGENTS.md §6 y §7). El cobro con Mercado Pago salió del setup de
 * retail el 26/11/2026: la integración existe, pero solo para administradores.
 */

import type { GlifoId } from "@/components/ui/Glifo";
import type { Rubro } from "./casos";
import { fotos, type Foto } from "./fotos";
import { planes, type Plan } from "./planes";

export type PiezaSetup = {
  glifo: GlifoId;
  titulo: string;
  texto: string;
  etiqueta: string;
  /** Slug en `features.ts`: la tarjeta lleva a /producto/<slug>. */
  feature?: string;
  /** Cartel de FlashTag (public/carteles) que ilustra la pieza. Sin cartel va el glifo. */
  cartel?: string;
};

export type Momento = {
  momento: string;
  glifo: GlifoId;
  titulo: string;
  texto: string;
  /** Foto ilustrativa de `fotos.ts` (AGENTS.md §4). Sin foto, la tarjeta es clara. */
  foto?: Foto;
};

export type PaginaRubro = {
  slug: string;
  /** Clave del rubro en casos.ts. */
  rubro: Rubro;
  nav: string;
  glifo: GlifoId;
  /** Tarjeta de la home: a quién le habla y tres cosas que se lleva. */
  resumen: string;
  claves: [string, string, string];
  /** Titular del hero: la parte de `destacado` va resaltada. */
  titular: string;
  destacado: string;
  bajada: string;
  metaDescripcion: string;
  /** Avisos que se turnan sobre la foto del hero. Demo, no prueba social. */
  actividad: { glifo: GlifoId; titulo: string }[];
  setup: { titulo: string; bajada: string; piezas: PiezaSetup[] };
  dia: { titulo: string; momentos: Momento[] };
  /** Slug en casos.ts del caso a destacar. Sin caso, se muestra la capacidad del plan. */
  caso?: string;
  plan: { ids: Plan["id"][]; texto?: string; claves: string[] };
  /** Texto del cierre de la página (components/ui/Cierre.tsx). */
  cierre: { titular: string; destacado: string; bajada: string };
};

/* ── Lo que sale de planes.ts ─────────────────────────────────────── */

const plan = (id: Plan["id"]) => {
  const p = planes.find((x) => x.id === id);
  if (!p) throw new Error(`rubros.ts: no existe el plan "${id}"`);
  return p;
};

const minuscula = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** "hasta 250 miembros activos": el cupo del club en Starter. */
const cupoClubStarter = plan("starter").features.find((f) => f.incluido && f.label === "Programa de fidelidad")?.nota;

/** "Hasta 20 cuentas de Google Business": las fichas que entran en Evolution. */
const cuentasEvolution =
  plan("evolution").features.find((f) => f.incluido && /cuentas? de Google Business/i.test(f.label))?.label ??
  "Varias cuentas de Google Business";

const CARTEL_GOOGLE = "/carteles/google.webp";
const CARTEL_CLUB = "/carteles/club.webp";

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
    actividad: [
      { glifo: "estrella", titulo: "Mesa 4 dejó 5 ★" },
      { glifo: "trofeo", titulo: "Sofi sumó otra reseña" },
      { glifo: "corona", titulo: "Lucía canjeó su café" },
    ],
    setup: {
      titulo: "Lo que conviene poner en tu local",
      bajada: "Cuatro piezas, cada una en su lugar: la caja, el mozo, la mesa y la Wallet de tu cliente.",
      piezas: [
        { glifo: "cartel", titulo: "Cartel de Google en la caja", texto: "El cliente escanea mientras paga, que es cuando está más contento.", etiqueta: "Cartel 14 × 14", cartel: CARTEL_GOOGLE },
        { glifo: "tarjeta", titulo: "Una tarjeta NFC por mozo", texto: "La apoyan en el celular al cobrar y la reseña suma en el ranking del equipo.", etiqueta: "Tarjeta NFC" },
        { glifo: "menu", titulo: "Menú por QR dinámico", texto: "Cambiás precios y platos del día sin reimprimir nada.", etiqueta: "QR dinámico", feature: "qr-dinamicos" },
        { glifo: "corona", titulo: "Club de sellos", texto: "“El 10° café es gratis”, en Apple y Google Wallet.", etiqueta: "Programa de fidelidad", feature: "fidelidad", cartel: CARTEL_CLUB },
      ],
    },
    dia: {
      titulo: "Un día con FlashTag",
      momentos: [
        { momento: "Mañana", glifo: "corona", titulo: "Llegan los del café de siempre", texto: "El modo caja suma el sello en un segundo y les avisa cuántos les faltan.", foto: fotos.panaderia },
        { momento: "Mediodía", glifo: "estrella", titulo: "Pico de mesas", texto: "Los mozos piden la reseña con su tarjeta y la IA las responde sola.", foto: fotos.restaurante },
        { momento: "Noche", glifo: "barras", titulo: "Cerrás y mirás el panel", texto: "Ves qué mozo sumó más y quién cumple años esta semana.", foto: fotos.dueno },
      ],
    },
    caso: "betular-patisserie",
    plan: {
      ids: ["full"],
      claves: ["Club de sellos en la Wallet", "Ranking de mozos", "Menú por QR dinámico", "Cumpleaños por WhatsApp"],
    },
    cierre: {
      titular: "Probalo en",
      destacado: "tu local.",
      bajada: "Empezá por el cartel de la caja. El club de sellos y las tarjetas de los mozos los sumás cuando quieras.",
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
    actividad: [
      { glifo: "persona", titulo: "3 contactos desde la vidriera" },
      { glifo: "celular", titulo: "Mica respondió por WhatsApp" },
      { glifo: "ticket", titulo: "Gift card vendida" },
    ],
    setup: {
      titulo: "Lo que conviene poner en tu local",
      bajada: "Una pieza para cada cliente: el que pasa, el que duda, el que paga y el que ya compró.",
      piezas: [
        { glifo: "sticker", titulo: "Sticker en la vidriera", texto: "Lo escanea el que pasa por la vereda, aunque el local esté cerrado.", etiqueta: "Sticker 15 × 15" },
        { glifo: "tarjeta", titulo: "FlashCard por vendedor", texto: "Su WhatsApp y sus redes en un toque. El cliente guarda el contacto y le escribe cuando se decide.", etiqueta: "FlashCard" },
        { glifo: "estrella", titulo: "Cartel de Google en la caja", texto: "El cliente deja su reseña mientras paga y la IA la responde con el tono de tu marca.", etiqueta: "Cartel 14 × 14", feature: "resenas-ia", cartel: CARTEL_GOOGLE },
        { glifo: "porcentaje", titulo: "Cashback y gift cards", texto: "Un motivo concreto para volver, guardado en el celular del cliente.", etiqueta: "Programa de fidelidad", feature: "fidelidad", cartel: CARTEL_CLUB },
      ],
    },
    dia: {
      titulo: "Un mes con FlashTag",
      momentos: [
        { momento: "Mañana", glifo: "persona", titulo: "Abrís la persiana", texto: "Ya ves cuántos escanearon la vidriera a la noche y qué contactos te dejaron." },
        { momento: "Tarde", glifo: "tarjeta", titulo: "Alguien duda con un producto", texto: "El vendedor le pasa su FlashCard y lo sigue por WhatsApp." },
        { momento: "Fin de mes", glifo: "infinito", titulo: "Campaña a los que no volvieron", texto: "Meta ya sabe quién visitó el local y le muestra el anuncio a gente parecida." },
      ],
    },
    caso: "el-ateneo",
    plan: {
      ids: ["full"],
      claves: ["Cashback, cupones y gift cards", "FlashCard por vendedor", "Píxel de Meta y GA4", "Ranking entre locales"],
    },
    cierre: {
      titular: "Probalo en",
      destacado: "tu tienda.",
      bajada: "Empezá por el sticker de la vidriera. Las FlashCards y el club los sumás cuando quieras.",
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
    actividad: [
      { glifo: "ticket", titulo: "Sesión descontada del pack" },
      { glifo: "escudo", titulo: "Queja privada recibida" },
      { glifo: "torta", titulo: "Saludo de cumple enviado" },
    ],
    setup: {
      titulo: "Lo que conviene activar en tu negocio",
      bajada: "Cuatro funciones para que el cliente de hoy saque el próximo turno.",
      piezas: [
        { glifo: "ticket", titulo: "Multipases y membresías", texto: "“10 sesiones” o una cuota mensual, con los usos en la Wallet.", etiqueta: "Programa de fidelidad", feature: "fidelidad", cartel: CARTEL_CLUB },
        { glifo: "torta", titulo: "Cumpleaños por WhatsApp", texto: "Un regalo unos días antes, con código para canjear.", etiqueta: "Cumpleaños" },
        { glifo: "escudo", titulo: "Filtro de reseñas negativas", texto: "Las quejas llegan primero a vos, siempre dentro de la política de Google.", etiqueta: "Filtro de reseñas", feature: "resenas-ia" },
        { glifo: "link", titulo: "Link Page para turnos", texto: "WhatsApp, Instagram, reseñas y club en un solo link.", etiqueta: "Link Page", feature: "link-pages" },
      ],
    },
    dia: {
      titulo: "Una semana con FlashTag",
      momentos: [
        { momento: "Mañana", glifo: "ticket", titulo: "Primer turno del día", texto: "La clienta muestra su pack y el equipo descuenta la sesión.", foto: fotos.gimnasio },
        { momento: "Tarde", glifo: "escudo", titulo: "Una clienta se va disconforme", texto: "Te deja la queja en privado y la llamás antes de que escriba en Google." },
        { momento: "Semana", glifo: "torta", titulo: "Cumples y clientes en riesgo", texto: "Salen los saludos solos y ves quién dejó de venir hace un mes." },
      ],
    },
    caso: "derentas",
    plan: {
      ids: ["starter", "full"],
      texto: `${plan("starter").nombre} para un local que quiere reseñas, medición y un club${
        cupoClubStarter ? ` de ${cupoClubStarter}` : ""
      }; ${plan("full").nombre} si sumás más de una sede.`,
      claves: ["Multipases y membresías", "Cumpleaños por WhatsApp", "Filtro de reseñas negativas", "Respuestas con IA"],
    },
    cierre: {
      titular: "Probalo en",
      destacado: "tu negocio.",
      bajada: "Empezá por tu Link Page para turnos. El club y los saludos de cumple los sumás cuando quieras.",
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
    metaDescripcion: `Panel multi-cliente con ${minuscula(cuentasEvolution)}, reseñas con IA, informes por cliente y píxeles por cuenta, para agencias y franquicias.`,
    actividad: [
      { glifo: "informe", titulo: "Informe del cliente listo" },
      { glifo: "infinito", titulo: "Píxel conectado en Café Rivas" },
      { glifo: "escudo", titulo: "Cambio en una ficha revertido" },
    ],
    setup: {
      titulo: "Lo que conviene activar en tu agencia",
      bajada: "Cuatro funciones para manejar muchas marcas desde un solo lugar.",
      piezas: [
        { glifo: "capas", titulo: "Multi-cuenta", texto: "Cada cliente con su panel y cambiás de uno a otro sin cerrar sesión.", etiqueta: `Plan ${plan("evolution").nombre}` },
        { glifo: "informe", titulo: "Informes para el cliente", texto: "Vistas, llamadas, reseñas y valor estimado, listos para exportar.", etiqueta: "Calculadora e informes" },
        { glifo: "infinito", titulo: "Píxeles por cuenta", texto: "Meta, GA4 y Tag Manager de cada cliente, en todas sus páginas.", etiqueta: "Píxeles", feature: "pixeles" },
        { glifo: "estrella", titulo: "Reseñas con IA a escala", texto: "Miles de respuestas por mes, con el tono de cada marca.", etiqueta: "Reseñas con IA", feature: "resenas-ia" },
      ],
    },
    dia: {
      titulo: "Una semana con FlashTag",
      momentos: [
        { momento: "Lunes", glifo: "informe", titulo: "Reporte semanal", texto: "Bajás el informe de cada cliente y lo mandás en minutos." },
        { momento: "Martes", glifo: "infinito", titulo: "Bajar el costo por cliente", texto: "Conectás el píxel y armás audiencias con la gente que escaneó los carteles." },
        { momento: "Siempre", glifo: "escudo", titulo: "Fichas protegidas", texto: "Si alguien toca la ficha de un cliente, te enterás y se revierte sola." },
      ],
    },
    plan: {
      ids: ["evolution"],
      claves: ["Las fichas de Google de todos tus clientes", "Ruletas y Link Pages para cada cliente", "Fidelidad para todas las marcas", "Soporte dedicado"],
    },
    cierre: {
      titular: "Probalo con",
      destacado: "tu primer cliente.",
      bajada: "Conectá una ficha de Google, mirá el panel y sumá el resto de tus cuentas después.",
    },
  },
];
