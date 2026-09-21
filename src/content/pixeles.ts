/**
 * PÍXELES — el detalle de /producto/pixeles.
 *
 * Los tres campos son exactamente los que tiene la app (sección
 * "Análisis de seguimiento", dentro de Estadísticas): si la app suma o
 * renombra uno, se cambia acá. Las pistas de dónde encontrar cada ID son las
 * mismas que muestra la app debajo de cada campo.
 *
 * Solo nombres de producto en texto, sin logos (AGENTS.md §7).
 */

export type Beneficio = { titulo: string; texto: string };

export const beneficios: Beneficio[] = [
  {
    titulo: "Públicos de remarketing reales",
    texto:
      "Quien escaneó en tu local entra a un público de Meta o de Google. Le mostrás un anuncio a alguien que ya te conoce, que es quien más convierte.",
  },
  {
    titulo: "Conversiones de lo impreso",
    texto:
      "Un flyer, un cartel o un packaging dejan de ser una caja negra: ves qué escaneo terminó en una compra, una reserva o un pedido por WhatsApp.",
  },
  {
    titulo: "Todo en el mismo panel",
    texto:
      "No mirás dos herramientas. El cartel del mostrador se compara con tus campañas de Instagram y Google en el informe que ya usás.",
  },
];

/**
 * La tira de "estas tres, listas" que abre la sección de campos.
 *
 * ⚠️ Badges TIPOGRÁFICOS, no logos (AGENTS.md §7): los kits de marca de Google
 * y Meta no están autorizados por escrito todavía. Mismo criterio que las
 * tarjetas en MediosDePago.tsx. Cuando lleguen los kits se reemplaza `sigla`
 * por el SVG oficial y no se toca nada más.
 */
export const herramientas = [
  { sigla: "GA4", nombre: "Google Analytics", que: "Informes, embudos y audiencias" },
  { sigla: "GTM", nombre: "Google Tag Manager", que: "Todo lo que ya tengas en el contenedor" },
  { sigla: "Meta", nombre: "Meta Pixel", que: "Públicos y conversiones en Instagram y Facebook" },
];

export type CampoPixel = {
  /** Como se llama el campo en la app. */
  label: string;
  /** Qué forma tiene el ID, para que lo reconozcan. */
  formato: string;
  /** Dónde lo encuentran, igual que la pista de la app. */
  donde: string;
  /** Qué hacen con eso una vez conectado. */
  para: string;
};

export const campos: CampoPixel[] = [
  {
    label: "Google Analytics 4",
    formato: "G-XXXXXXXXXX",
    donde: "Google Analytics → Admin → Data Streams.",
    para: "Escaneos y clics como sesiones de tu propiedad. Los ves en informes, embudos y audiencias.",
  },
  {
    label: "Meta Pixel",
    formato: "1234567890",
    donde: "Meta Business Suite → Events Manager.",
    para: "Un público de remarketing con quien escaneó y conversiones para optimizar tus campañas de Instagram y Facebook.",
  },
  {
    label: "Google Tag Manager",
    formato: "GTM-XXXXXXX",
    donde: "tagmanager.google.com → tu cuenta y contenedor.",
    para: "Todo lo que ya tengas en el contenedor: Google Ads, TikTok, LinkedIn o lo que agregues después, sin volver a tocar la app.",
  },
];

/** Qué se manda a cada herramienta. Solo lo que la app hace de verdad. */
export const eventos = [
  {
    nombre: "Visita a la Link Page",
    texto: "Cada vez que alguien abre tu Link Page desde un QR, un cartel o tu bio de Instagram.",
  },
  {
    nombre: "Escaneo de un QR",
    texto: "Cada escaneo de tus QR dinámicos, con el nombre del QR para saber cuál fue.",
  },
  {
    nombre: "Clic en un botón",
    texto: "Con el seguimiento de eventos activado: WhatsApp, menú, reservas, cada botón por separado.",
  },
];

/** Puente de vuelta: píxeles ACTIVA el dato, métricas lo LEE. */
export const puenteMetricas = {
  texto:
    "El panel propio de FlashTag mide todo esto igual, sin conectar nada. Los píxeles son para llevarlo a tus campañas.",
  cta: "Ver el panel de métricas",
  href: "/producto/metricas",
};

export const privacidad =
  "Los datos van a tu cuenta de Google o de Meta, no a la nuestra. FlashTag no ve lo que hay en tu Analytics: solo dispara el píxel con el ID que vos pegaste.";
