/**
 * HOME — el copy del rediseño (noviembre 2026).
 *
 * Lo que es dato compartido NO vive acá: precios y planes salen de
 * `planes.ts`, casos y logos de `casos.ts` y `clientes.ts`, productos de
 * `productos.ts`, rubros de `rubros.ts` y el "desde qué plan" de cada
 * funcionalidad de `features.ts`. Acá queda solo el texto propio de la home.
 */

import type { GlifoId } from "@/components/ui/Glifo";

export const hero = {
  eyebrow: "Marketing phygital para locales",
  titular: "Carteles con QR y NFC que llenan tu local de",
  destacado: "reseñas, contactos y clientes que vuelven.",
  bajada:
    "Ponés el cartel en el mostrador y la app hace el resto: responde tus reseñas de Google con IA, guarda el contacto de cada cliente, le suma sellos en su club y te muestra qué está funcionando.",
  checks: ["Sin tarjeta de crédito", "Lo activás en minutos", "Soporte por WhatsApp"],
  activar: "¿Ya tenés tu FlashTag?",
};

/** El loop: los cuatro pasos que se repiten solos. */
export const loop = {
  eyebrow: "Cómo funciona",
  titular: "Por tu local pasa gente todos los días.",
  titular2: "Con FlashTag, esa gente vuelve.",
  bajada: "Un objeto en el mostrador y una app detrás. Cuatro pasos que se repiten solos.",
  pasos: [
    {
      glifo: "cartel",
      titulo: "Poné el cartel",
      texto: "Cartel, sticker o tarjeta NFC. Llega con el QR y el chip listos y lo activás con el código impreso.",
    },
    {
      glifo: "celular",
      titulo: "El cliente escanea",
      texto: "Deja una reseña, te sigue, te escribe por WhatsApp, se suma al club o gira la ruleta. Sin bajar ninguna app.",
    },
    {
      glifo: "chispa",
      titulo: "FlashTag hace el resto",
      texto: "Responde reseñas con IA, guarda el contacto, le suma sellos y le manda el saludo de cumple.",
    },
    {
      glifo: "repetir",
      titulo: "Medís todo lo que pasa",
      texto: "Escaneos por cartel, local y vendedor, reseñas, sellos, canjes y clientes en riesgo. Y se lo mandás a tus anuncios.",
    },
  ] satisfies { glifo: GlifoId; titulo: string; texto: string }[],
};

/** Las tres tarjetas de datos. Son datos de contexto, no prueba social. */
export const datos: { glifo: GlifoId; valor: string; texto: string; tono: "brand" | "coral" | "teal" }[] = [
  {
    glifo: "ubicacion",
    valor: "76%",
    texto: "de quienes buscan un negocio cerca lo visitan en menos de 24 horas",
    tono: "brand",
  },
  {
    glifo: "chispa",
    valor: "2 seg",
    texto: "tarda un cliente en dejarte una reseña apoyando el celular en el cartel",
    tono: "coral",
  },
  {
    glifo: "celular",
    valor: "0 apps",
    texto: "tiene que descargar tu cliente: todo pasa en el navegador y en su Wallet",
    tono: "teal",
  },
];

/* ── Pilares: la app ordenada por lo que querés lograr ──────────── */

export type PilarId = "encontrar" | "elegir" | "conectar" | "volver" | "medir";

export type FuncionPilar = {
  /** Clave de la pantalla en `components/app/panel.tsx`. */
  pantalla: string;
  glifo: GlifoId;
  titulo: string;
  texto: string;
  /** Si la funcionalidad tiene página propia: de ahí sale el "Desde <plan>". */
  feature?: string;
};

export type Pilar = {
  id: PilarId;
  glifo: GlifoId;
  /** Color del ícono de la pestaña. Tokens del manual. */
  tono: "brand" | "gold" | "teal" | "coral" | "ink";
  tab: string;
  tabBajada: string;
  titular: string;
  bajada: string;
  funciones: FuncionPilar[];
};

export const pilaresIntro = {
  eyebrow: "La app",
  titular: "Todo lo que tu local necesita, en un solo panel",
  bajada: "Ordenado por lo que querés lograr. Tocá cada función y mirala por dentro.",
};

export const pilares: Pilar[] = [
  {
    id: "encontrar",
    glifo: "ubicacion",
    tono: "brand",
    tab: "Que te encuentren",
    tabBajada: "Google, Maps y competencia",
    titular: "Aparecé primero cuando te buscan cerca",
    bajada:
      "Tu ficha de Google completa, protegida y activa, y un mapa que te muestra en qué cuadras ganás y en cuáles no.",
    funciones: [
      { pantalla: "ficha", glifo: "google", titulo: "Gestión de tu ficha", texto: "Descripción, horarios, feriados, fotos y publicaciones, sin entrar a Google" },
      { pantalla: "maps", glifo: "objetivo", titulo: "Posición en Maps", texto: "49 puntos alrededor de tu local: dónde salís en el top 3" },
      { pantalla: "proteccion", glifo: "escudo", titulo: "Protección y auditoría", texto: "Revertimos cambios de terceros y puntuamos tu ficha sobre 100" },
      { pantalla: "competidores", glifo: "espadas", titulo: "Competidores", texto: "Tu valoración y tus reseñas al lado de las de tu zona" },
    ],
  },
  {
    id: "elegir",
    glifo: "estrella",
    tono: "gold",
    tab: "Que te elijan",
    tabBajada: "Reseñas con IA y reputación",
    titular: "Más reseñas, mejores y todas respondidas",
    bajada:
      "Google premia a los negocios que responden. FlashTag lo hace por vos, con tu tono, y te ayuda a pedir reseñas en el momento justo.",
    funciones: [
      { pantalla: "ia", glifo: "chispa", titulo: "Reseñas con IA", texto: "Se responden solas con la voz de tu marca, o en lote con un clic", feature: "resenas-ia" },
      { pantalla: "filtro", glifo: "escudo", titulo: "Filtro de reseñas negativas", texto: "Las quejas llegan primero a un formulario privado, siempre dentro de la política de Google" },
      { pantalla: "sentimiento", glifo: "persona", titulo: "Análisis de sentimiento", texto: "De qué hablan tus clientes: atención, calidad, espera, precio" },
      { pantalla: "equipo", glifo: "trofeo", titulo: "Ranking del equipo y widget", texto: "Quién suma más reseñas, y tus mejores reseñas en tu web" },
    ],
  },
  {
    id: "conectar",
    glifo: "qr",
    tono: "teal",
    tab: "Que te escriban",
    tabBajada: "QR, Link Pages, ruleta y WiFi",
    titular: "Que te escriban, te sigan y te dejen sus datos",
    bajada: "Cada escaneo puede llevar a donde quieras, y lo cambiás cuando quieras sin reimprimir nada.",
    funciones: [
      { pantalla: "qr", glifo: "qr", titulo: "QR dinámicos", texto: "PNG, SVG, EPS o PDF en CMYK. Cambiás el destino y medís cada escaneo", feature: "qr-dinamicos" },
      { pantalla: "linkpage", glifo: "link", titulo: "Link Pages", texto: "Tu minisitio con WhatsApp, redes, reseñas y club, con métricas por botón", feature: "link-pages" },
      { pantalla: "ruleta", glifo: "ruleta", titulo: "Ruleta de premios y WiFi", texto: "Juntá mails, teléfonos y cumpleaños a cambio de un premio o de internet", feature: "ruleta" },
      { pantalla: "flashcard", glifo: "tarjeta", titulo: "FlashCard y cobros", texto: "Tarjeta digital para cada vendedor, y cobros con Mercado Pago desde el cartel" },
    ],
  },
  {
    id: "volver",
    glifo: "corona",
    tono: "coral",
    tab: "Que vuelvan",
    tabBajada: "Club en la Wallet y cumpleaños",
    titular: "Que vuelvan, y que vuelvan seguido",
    bajada:
      "Un club en la billetera del celular de tu cliente, sin que tenga que bajar nada, y avisos que lo traen de vuelta.",
    funciones: [
      { pantalla: "club", glifo: "corona", titulo: "Programa de fidelidad", texto: "Sellos, puntos, cashback, cupones, membresías, gift cards y packs", feature: "fidelidad" },
      { pantalla: "caja", glifo: "teclado", titulo: "Modo caja", texto: "Tu equipo suma sellos con su PIN desde la tablet del mostrador" },
      { pantalla: "cumple", glifo: "torta", titulo: "Cumpleaños por WhatsApp", texto: "Un saludo con regalo y código, unos días antes del cumple" },
      { pantalla: "riesgo", glifo: "repetir", titulo: "Clientes en riesgo", texto: "Quién dejó de venir, para invitarlo a volver a tiempo" },
    ],
  },
  {
    id: "medir",
    glifo: "barras",
    tono: "ink",
    tab: "Medí y vendé más",
    tabBajada: "Métricas, píxeles y anuncios",
    titular: "Cada escaneo deja un dato. Y el dato es tuyo.",
    bajada:
      "Métricas por local, por cartel y por vendedor. Y si querés, esos datos salen a tus anuncios para que Meta y Google busquen gente que compra.",
    funciones: [
      { pantalla: "metricas", glifo: "barras", titulo: "Métricas en tiempo real", texto: "Escaneos, únicos, día y hora, ciudad, dispositivo y producto de origen", feature: "metricas" },
      { pantalla: "pixeles", glifo: "infinito", titulo: "Meta Pixel, GA4 y Tag Manager", texto: "Tus IDs una sola vez, en todas tus páginas públicas, listos para audiencias y conversiones", feature: "pixeles" },
      { pantalla: "valor", glifo: "plata", titulo: "Calculadora de valor", texto: "Cuánta plata te trae tu ficha de Google por mes" },
      { pantalla: "sucursales", glifo: "ubicacion", titulo: "Multi-sucursal", texto: "Todas tus fichas y locales en un panel, con ranking entre ellos" },
    ],
  },
];

/* ── Flashy, la IA ─────────────────────────────────────────────── */

export const flashy = {
  eyebrow: "Inteligencia artificial",
  titular: "Conocé a",
  nombre: "Flashy",
  titular2: ", la IA que conoce tu negocio",
  bajada:
    "Le escribís como a una persona y te contesta con los datos reales de tu cuenta: qué local rinde mejor, qué vendedor suma más reseñas, de qué se quejan tus clientes. Y además te escribe las publicaciones para Google.",
  cta: "Probalo en la app",
  /** Conversación de ejemplo, con los locales ficticios de las maquetas. */
  charla: [
    {
      chip: "¿Qué local rinde mejor?",
      pregunta: "¿Qué local está rindiendo mejor este mes?",
      respuesta:
        "Palermo, por lejos: 412 escaneos y 21 reseñas nuevas. Nordelta viene flojo, con 8 reseñas sin responder y el cartel pegado lejos de la caja. Si respondés esas 8, en dos semanas deberías verlo subir en Maps.",
    },
    {
      chip: "¿Qué vendedor sumó más?",
      pregunta: "¿Qué vendedor sumó más reseñas?",
      respuesta:
        "Sofi, con 39 pedidos de reseña este mes. Martín todavía no tiene tarjeta asignada, así que no suma en el ranking.",
    },
    {
      chip: "Armame una publicación",
      pregunta: "Armame una publicación para Google",
      respuesta:
        "Listo: “Llegó el frío y volvió el chocolate caliente. Vení esta semana y con tu tarjeta del club el segundo es gratis.” ¿La publico con el botón “Cómo llegar”?",
    },
    {
      chip: "¿De qué se quejan?",
      pregunta: "¿De qué se quejan mis clientes?",
      respuesta:
        "De la espera al mediodía: es el tema con menos reseñas positivas. Atención y calidad vienen muy bien. Te sugiero sumar una persona de 12 a 14.",
    },
  ],
};

/** Lo que va pasando alrededor de la maqueta del hero. Demo, no prueba social. */
export const actividad: { glifo: GlifoId; tono: "teal" | "brand" | "coral" | "gold"; titulo: string; detalle: string }[] = [
  { glifo: "estrella", tono: "teal", titulo: "Nueva reseña de 5 estrellas", detalle: "Escaneó el cartel de Google · recién" },
  { glifo: "corona", tono: "brand", titulo: "Nuevo sello sumado", detalle: "3 de 8 · le faltan 5 para su premio" },
  { glifo: "chispa", tono: "coral", titulo: "La IA respondió a Daniel H.", detalle: "Reseña de 5 ★ · con el tono de tu marca" },
  { glifo: "torta", tono: "gold", titulo: "Saludo de cumple enviado", detalle: "A Ana, con su cupón" },
  { glifo: "infinito", tono: "teal", titulo: "Escaneo enviado a Meta", detalle: "Para tus audiencias de remarketing" },
  { glifo: "persona", tono: "brand", titulo: "Nuevo miembro del club", detalle: "Se sumó desde el QR del mostrador" },
];

export const rubrosIntro = {
  eyebrow: "Para tu rubro",
  titular: "Una solución para",
  destacado: "tu",
  titular2: "negocio",
  bajada:
    "Cada rubro tiene su propia solución armada: qué carteles poner, qué club conviene y cómo se ve un día con FlashTag.",
};

export const tiendaHome = {
  eyebrow: "Tienda",
  titular: "Top 3 más vendidos",
  bajada: "Cada pieza trae QR y chip NFC activados. La activás gratis desde la app con el código impreso.",
};

export const ctaFinal = {
  titular: "Probalo gratis y mirá qué pasa en una semana",
  bajada: "Sin tarjeta, sin permanencia y sin instalar nada. Si ya tenés tu cartel, lo activás en dos minutos.",
};
