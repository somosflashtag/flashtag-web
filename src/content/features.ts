import type { MockId } from "@/components/app/mocks";
import { pasos as pasosBase } from "./pasos";

/**
 * FEATURES — las siete capacidades de la app, en el orden en que se venden.
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
    corto: "Un QR para lo que necesites hoy",
    titular: "Creá un QR que apunta a lo que vos decidas",
    bajada:
      "Cada cartel de FlashTag tiene su canal: Google, Instagram, WhatsApp. Cuando necesitás algo distinto, creás un QR dinámico desde la app: una promo, el menú de temporada, un formulario de turnos. El destino lo cambiás cuando quieras desde el celular, y cada escaneo queda medido: cuántos fueron, cuántas personas distintas, a qué hora y desde dónde.",
    analogia:
      "Es un QR que hoy dice una cosa y mañana otra, sin que nadie en el local tenga que hacer nada.",
    casos: [
      "El menú de temporada",
      "La promo de la semana",
      "Un formulario de turnos o reservas",
      "Medir qué campaña o qué pieza trajo gente de verdad",
    ],
    pasos: [
      {
        titulo: "Creás el QR en la app",
        texto: "Le ponés nombre, lo descargás y lo ponés donde quieras: un flyer, un packaging, la vidriera.",
      },
      {
        titulo: "Elegís a dónde apunta",
        texto: "Una promo, un menú, un formulario, tu Link Page. Lo que necesites hoy.",
      },
      {
        titulo: "Lo cambiás y lo medís",
        texto:
          "Cambiás el destino desde el celular al instante y ves cuántos lo escanearon, cuándo y desde qué dispositivo.",
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
      "Un lugar propio con botones a WhatsApp, Google Maps, menú, catálogo, redes y promos. Con tu marca, editable en un minuto, y con analítica completa: visitas, clics por botón y de dónde llegó cada una.",
    casos: [
      "Reservas y turnos sin llamadas",
      "Catálogo completo desde la góndola",
      "Todas tus redes en un solo lugar",
      "Saber qué botón se lleva los clics y cuál sobra",
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
        texto:
          "Visitas, clics por botón y origen de cada una. Si nadie toca 'Reservar', ya sabés qué cambiar.",
      },
    ],
    mock: "links",
    desde: "Free",
  },
  {
    slug: "resenas-ia",
    nombre: "Reseñas con IA",
    corto: "Respuestas automáticas con la voz de tu marca",
    titular: "Tus reseñas de Google, respondidas automáticamente con tu voz",
    bajada:
      "Conectás tu cuenta de Google Business y FlashTag responde cada reseña de forma automática, con la voz de tu marca: vos definís el tono, cómo saludás, qué palabras usás y cuáles no. Podés revisar cada respuesta antes de publicar o dejar que salgan solas.",
    casos: [
      "Las de 5 estrellas, respondidas sin repetirte",
      "Una reseña negativa, con el tono justo",
      "Mejor posición en Google Maps sin esfuerzo",
    ],
    pasos: [
      {
        titulo: "Conectás Google",
        texto: "Un clic en 'Conectar Google' y tus fichas aparecen en la app.",
      },
      {
        titulo: "Definís tu voz",
        texto: "Tono, saludo, firma, palabras prohibidas. La IA responde como vos.",
      },
      {
        titulo: "Se responden solas",
        texto: "Automático, o con tu aprobación antes de publicar. Vos elegís.",
      },
    ],
    mock: "resenas",
    desde: "Starter",
  },
  {
    slug: "metricas",
    nombre: "Métricas",
    corto: "Cómo interactúan con cada producto",
    titular: "Métricas de cómo tus clientes interactúan con tu negocio",
    bajada:
      "Cuántos escanean el cartel de Google, cuántos siguen tu Instagram, cuántos giran la ruleta, cuántos entran al programa de fidelidad y cuándo lo hacen. Analítica completa de cada escaneo —totales, únicos, visitas, día y hora, ciudad, dispositivo— en un panel en tiempo real. Y si querés llevarte el dato, lo conectás con tu píxel de Meta o tu Google Analytics.",
    casos: [
      "Qué producto genera más interacción",
      "Cuánta gente usa la ruleta cada semana",
      "Cuántos clientes vuelven por la fidelidad",
      "Armar públicos de remarketing con quienes ya pasaron por tu local",
    ],
    pasos: [
      {
        titulo: "Se mide solo",
        texto: "Cada escaneo, toque NFC, giro y canje queda registrado. Sin configurar nada.",
      },
      {
        titulo: "Lo ves en el celular",
        texto: "Un panel con lo que importa: productos, horarios, ruleta, fidelidad, recurrencia.",
      },
      {
        titulo: "Decidís con datos",
        texto:
          "Ajustás premios, horarios y ubicación de cada producto. Y si querés, el dato también viaja a tu píxel y a tu Google Analytics.",
      },
    ],
    mock: "metricas",
    desde: "Free",
  },
  {
    slug: "fidelidad",
    nombre: "Programa de fidelidad",
    corto: "Una comunidad que te elige y vuelve",
    titular: "Tu programa de fidelidad, en la billetera del celular de tu cliente",
    bajada:
      "Sellos, puntos, cashback, descuentos, cupones, membresías, gift cards o packs de sesiones: elegís la modalidad, le ponés tu logo y tu esquema de premios. Tu cliente no descarga ninguna app: escanea y la guarda en Apple Wallet o Google Wallet. Y desde ahí le mandás push gratis, lo saludás en su cumpleaños y lo premiás por traer amigos.",
    analogia:
      "Es la tarjeta de sellos de toda la vida, pero vive al lado de su tarjeta de embarque y su SUBE: no se pierde, y te dice quién volvió.",
    casos: [
      "El café número 10 es gratis",
      "Una membresía mensual con cupo de clases",
      "Una gift card para regalar en fechas especiales",
      "Puntos extra por traer a un amigo",
    ],
    pasos: [
      {
        titulo: "Diseñás tu tarjeta",
        texto: "Tu logo, tus colores y el esquema de puntos o visitas que elijas.",
      },
      {
        titulo: "El cliente la guarda en su Wallet",
        texto: "Escanea o apoya el teléfono y la agrega a Apple Wallet o Google Wallet. Sin descargar nada.",
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
    corto: "Una experiencia gamificada con tu marca",
    titular: "Divertí a tus clientes y dales algo a cambio",
    bajada:
      "Una experiencia gamificada con tu marca: el cliente escanea, gira la ruleta y se lleva un premio. Vos la personalizás entera: los premios, los colores de cada casillero y el porcentaje de suerte de cada uno. La excusa perfecta para que dejen la reseña o te sigan en tus redes. Y cada giro se mide: cuántos, a qué hora y qué premio salió.",
    casos: [
      "Un giro a cambio de una reseña",
      "Premios distintos por franja horaria",
      "Lanzamientos y fechas especiales",
      "Ajustar los porcentajes de suerte con los datos en la mano",
    ],
    pasos: [
      {
        titulo: "Armás tu ruleta",
        texto: "Premios, colores y porcentaje de suerte de cada casillero. Con tope diario si querés.",
      },
      {
        titulo: "Lo linkeás al QR",
        texto: "Desde un QR dinámico, tu Link Page o el cartel del mostrador.",
      },
      {
        titulo: "Validás el premio y medís",
        texto:
          "El cliente muestra el código, vos lo marcás como canjeado y el giro queda registrado en tus métricas.",
      },
    ],
    mock: "ruleta",
    desde: "Starter",
  },
  {
    slug: "pixeles",
    nombre: "Píxeles de Google y Meta",
    corto: "Tus escaneos, en Google Analytics y Meta Ads",
    titular: "Conectá tus QR con Google Analytics, Meta y Tag Manager",
    bajada:
      "Pegás tu ID de Google Analytics 4, tu Meta Pixel o tu contenedor de Google Tag Manager en la app, y cada escaneo de tus QR y cada visita a tu Link Page llega a las herramientas que ya usás. Sirve para armar públicos de remarketing con la gente que pasó por tu local, medir qué escaneo terminó en una venta y comparar el cartel con tus anuncios en el mismo panel.",
    analogia:
      "Es ponerle a tu cartel el mismo píxel que tiene tu sitio: quien lo escaneó en el local entra a tus públicos de Meta y a tus informes de Google como cualquier otra visita.",
    casos: [
      "Remarketing en Instagram a quienes escanearon en el local",
      "Medir cuántas ventas online arrancaron en un flyer",
      "Comparar el cartel del mostrador contra tus anuncios",
    ],
    pasos: [
      {
        titulo: "Copiás el ID",
        texto: "El Measurement ID de Google Analytics (G-…), el ID numérico de tu Meta Pixel o el contenedor de Tag Manager (GTM-…).",
      },
      {
        titulo: "Lo pegás en la app",
        texto: "En 'Análisis de seguimiento', dentro de Estadísticas de tu QR o tu Link Page. Activás el seguimiento de eventos si querés medir los clics.",
      },
      {
        titulo: "Lo ves donde siempre",
        texto: "Escaneos y clics aparecen en Google Analytics, Meta o Tag Manager como una visita más. Sin instalar nada.",
      },
    ],
    mock: "pixeles",
    desde: "Starter",
  },
];

export const featurePorSlug = (slug: string) =>
  features.find((f) => f.slug === slug);

/** Los 4 pasos de la home: la misma fuente que /como-funciona, numerada. */
export const pasos = pasosBase.map((p, i) => ({ n: i + 1, ...p }));
