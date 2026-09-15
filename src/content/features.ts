import type { MockId } from "@/components/app/mocks";
import { pasos as pasosBase } from "./pasos";

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
    corto: "Un QR para lo que necesites hoy",
    titular: "Creá un QR que apunta a lo que vos decidas",
    bajada:
      "Cada cartel de FlashTag tiene su canal: Google, Instagram, WhatsApp. Cuando necesitás algo distinto, creás un QR dinámico desde la app: una promo, el menú de temporada, un formulario de turnos. El destino lo cambiás cuando quieras desde el celular, con métricas de cada escaneo.",
    analogia:
      "Es un QR que hoy dice una cosa y mañana otra, sin que nadie en el local tenga que hacer nada.",
    casos: [
      "El menú de temporada",
      "La promo de la semana",
      "Un formulario de turnos o reservas",
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
        titulo: "Lo cambiás cuando quieras",
        texto: "Desde el celular, al instante, y ves cuántos lo escanearon.",
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
      "Cuántos escanean el cartel de Google, cuántos siguen tu Instagram, cuántos giran la ruleta, cuántos entran al programa de fidelidad y cuándo lo hacen. Métricas sobre la interacción con cada uno de tus productos, en un panel que te dice qué está funcionando.",
    casos: [
      "Qué producto genera más interacción",
      "Cuánta gente usa la ruleta cada semana",
      "Cuántos clientes vuelven por la fidelidad",
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
        texto: "Ajustás premios, horarios y ubicación de cada producto. Y volvés a medir.",
      },
    ],
    mock: "metricas",
    desde: "Free",
  },
  {
    slug: "fidelidad",
    nombre: "Programa de fidelidad",
    corto: "Una comunidad que te elige y vuelve",
    titular: "Tu tarjeta de fidelidad, en la billetera del celular de tu cliente",
    bajada:
      "Construí una comunidad de clientes que te compran varias veces, te eligen y son premiados por eso. Tu cliente no descarga ninguna app: escanea y guarda tu tarjeta, con tu logo y el esquema de puntos que vos elegiste, en Apple Wallet o en la billetera de Android. Sin imprimir nada, siempre a mano.",
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
      "Una experiencia gamificada con tu marca: el cliente escanea, gira la ruleta y se lleva un premio. Vos la personalizás entera: los premios, los colores de cada casillero y el porcentaje de suerte de cada uno. La excusa perfecta para que dejen la reseña o te sigan en tus redes.",
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
        texto: "Desde un QR dinámico, tu Link Page o el cartel del mostrador.",
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

/** Los 4 pasos de la home: la misma fuente que /como-funciona, numerada. */
export const pasos = pasosBase.map((p, i) => ({ n: i + 1, ...p }));
