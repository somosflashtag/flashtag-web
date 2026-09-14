import type { MockId } from "@/components/app/mocks";

/**
 * FEATURES — las seis capacidades de la app, en el orden en que se venden.
 *
 * Cada una tiene su pantalla (`mock`) construida en código en
 * components/app/mocks.tsx, su página en /producto/[slug] y su lugar en el
 * tour de la home. Un dato, una fuente: el copy vive acá.
 */

export type Feature = {
  slug: string;
  nombre: string;
  /** Verbo corto para el menú y el bento. */
  corto: string;
  titular: string;
  bajada: string;
  analogia?: string;
  casos: string[];
  /** Cómo funciona, en tres pasos. */
  pasos: { titulo: string; texto: string }[];
  /** Pantalla de la app que lo muestra. */
  mock: MockId;
  /** En qué plan entra. */
  desde: "Free" | "Starter" | "Full";
};

export const features: Feature[] = [
  {
    slug: "qr-dinamicos",
    nombre: "QR dinámicos",
    corto: "Cambiá el destino sin reimprimir",
    titular: "Un cartel que podés reescribir desde el celular",
    bajada:
      "El QR impreso nunca cambia, pero el destino sí. Editás el link desde la app y el cartel que está en la mesa apunta a otro lado al instante. Con QR y NFC: se escanea o se apoya el teléfono.",
    analogia:
      "Es como tener un cartel que podés reescribir desde el mostrador, sin levantarte.",
    casos: [
      "Menú que cambia por temporada",
      "La promo del día, sin imprimir nada nuevo",
      "Pedido directo por WhatsApp",
    ],
    pasos: [
      {
        titulo: "Activás el cartel",
        texto: "Escaneás tu propio QR, creás la cuenta y el cartel queda vinculado.",
      },
      {
        titulo: "Elegís a dónde apunta",
        texto: "Reseña de Google, menú, WhatsApp, tu Link Page. Lo que necesites hoy.",
      },
      {
        titulo: "Lo cambiás cuando quieras",
        texto: "El cambio es instantáneo. El cartel de la pared sigue siendo el mismo.",
      },
    ],
    mock: "qr",
    desde: "Free",
  },
  {
    slug: "link-pages",
    nombre: "Link Pages",
    corto: "Tu minisitio con métricas por botón",
    titular: "Tu minisitio, conectado al cartel de tu local",
    bajada:
      "Un lugar propio con botones a WhatsApp, Google Maps, menú, catálogo, redes y promos. Con tu marca, editable en un minuto, y con métricas de clic por cada botón.",
    casos: [
      "Reservas y turnos sin llamadas",
      "Catálogo completo desde la góndola",
      "Todas tus redes en un solo lugar",
    ],
    pasos: [
      {
        titulo: "Armás la página",
        texto: "Logo, colores y los botones que quieras. Sin diseñador ni código.",
      },
      {
        titulo: "La conectás al QR",
        texto: "Un cartel, una vidriera o tu bio de Instagram: todos llevan al mismo lugar.",
      },
      {
        titulo: "Mirás qué tocan",
        texto: "Clics por botón. Si nadie toca 'Reservar', ya sabés qué cambiar.",
      },
    ],
    mock: "links",
    desde: "Free",
  },
  {
    slug: "resenas-ia",
    nombre: "Reseñas con IA",
    corto: "Respondé Google en 30 segundos",
    titular: "Respondé todas tus reseñas en 30 segundos",
    bajada:
      "Conectás tu cuenta de Google Business, FlashTag trae tus reseñas y genera una respuesta personalizada en el tono de tu marca. Vos la revisás, la ajustás si querés y la publicás.",
    casos: [
      "Respondé las de 5 estrellas sin repetirte",
      "Bajá el tono de una reseña negativa",
      "Mejorá tu posición en Google Maps",
    ],
    pasos: [
      {
        titulo: "Conectás Google",
        texto: "Un clic en 'Conectar Google' y tus fichas aparecen en la app.",
      },
      {
        titulo: "La IA propone",
        texto: "Cada reseña llega con una respuesta sugerida en el tono de tu local.",
      },
      {
        titulo: "Vos publicás",
        texto: "Aprobás, editás o descartás. Nada sale sin que lo veas.",
      },
    ],
    mock: "resenas",
    desde: "Starter",
  },
  {
    slug: "metricas",
    nombre: "Métricas",
    corto: "Qué hacer la semana que viene",
    titular: "Qué hacer la semana que viene, no un gráfico más",
    bajada:
      "Escaneos por día, hora, dispositivo y ubicación. Clics por botón. Comparativa entre carteles. Todo apunta a tres preguntas: cuándo escanean, qué cartel funciona mejor, y qué hacés después.",
    casos: [
      "Descubrí tu hora pico real",
      "Compará qué cartel rinde más",
      "Medí si la promo funcionó",
    ],
    pasos: [
      {
        titulo: "Se mide solo",
        texto: "Cada escaneo, toque NFC y clic queda registrado. Sin configurar nada.",
      },
      {
        titulo: "Lo ves en el celular",
        texto: "Un panel con lo que importa: picos, carteles, botones, recurrencia.",
      },
      {
        titulo: "Decidís con datos",
        texto: "Movés el cartel, cambiás la promo, ajustás el horario. Y volvés a medir.",
      },
    ],
    mock: "metricas",
    desde: "Free",
  },
  {
    slug: "fidelidad",
    nombre: "Programa de fidelidad",
    corto: "Que vuelvan, y que se note",
    titular: "Tu tarjeta de fidelidad, en la billetera del celular de tu cliente",
    bajada:
      "Tu cliente no descarga ninguna app. Escanea el cartel y guarda tu tarjeta, con tu logo y el esquema de puntos que vos elegiste, en Apple Wallet o en la billetera de Android. Suma visitas con el mismo cartel de siempre y canjea los premios que configurás vos. Sin imprimir nada, siempre a mano.",
    analogia:
      "Es la tarjeta de sellos de toda la vida, pero vive al lado de su tarjeta de embarque y su SUBE: no se pierde, y te dice quién volvió.",
    casos: [
      "El café número 10 es gratis",
      "Un descuento por traer a un amigo",
      "Un regalo a cambio de la primera reseña",
    ],
    pasos: [
      {
        titulo: "Diseñás tu tarjeta",
        texto: "Tu logo, tus colores y el esquema de puntos o visitas que elijas.",
      },
      {
        titulo: "El cliente la guarda en su Wallet",
        texto: "Escanea o apoya el teléfono y la agrega a Apple Wallet o Google Wallet. Sin bajar nada.",
      },
      {
        titulo: "Canjea desde el celular",
        texto: "Muestra el código, vos lo validás en la app. Queda registrado.",
      },
    ],
    mock: "fidelidad",
    desde: "Full",
  },
  {
    slug: "ruleta",
    nombre: "Ruleta de premios",
    corto: "Un giro por visita",
    titular: "Convertí cada visita en un juego",
    bajada:
      "El cliente escanea, gira la ruleta y se lleva un premio. Vos la personalizás entera: los premios, los colores de cada casillero y el porcentaje de suerte de cada uno. Es la excusa perfecta para que dejen la reseña o te sigan en Instagram.",
    casos: [
      "Un giro a cambio de una reseña",
      "Premios distintos por franja horaria",
      "Lanzamientos y fechas especiales",
    ],
    pasos: [
      {
        titulo: "Armás tu ruleta",
        texto: "Premios, colores y porcentaje de suerte de cada casillero. Con tope diario si querés.",
      },
      {
        titulo: "Lo linkeás al QR",
        texto: "El cartel de la mesa o de la caja lleva a la ruleta.",
      },
      {
        titulo: "Validás el premio",
        texto: "El cliente muestra el código, vos lo marcás como canjeado.",
      },
    ],
    mock: "ruleta",
    desde: "Starter",
  },
];

export const featurePorSlug = (slug: string) =>
  features.find((f) => f.slug === slug);

export const pasos = [
  {
    n: 1,
    titulo: "Elegís tu cartel",
    texto: "Carteles de mesa, tarjetas, stickers o combos. O empezás sin comprar nada.",
  },
  {
    n: 2,
    titulo: "Lo recibís con el QR impreso",
    texto: "Envíos a todo el país. Llega listo para usar, sin configuración.",
  },
  {
    n: 3,
    titulo: "Activás tu cuenta gratis",
    texto: "Escaneás tu propio cartel, creás la cuenta y ya podés editar el destino.",
  },
  {
    n: 4,
    titulo: "Medís y ajustás",
    texto: "Mirás qué pasa cada semana y cambiás lo que haga falta. Sin reimprimir.",
  },
] as const;
