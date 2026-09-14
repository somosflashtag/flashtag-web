/**
 * PÁGINAS POR RUBRO — /para/[slug]
 *
 * Cada rubro entra a FlashTag por una puerta distinta: el restaurante por la
 * carta, el local de ropa por la ficha de producto, el peluquero por la agenda
 * y la agencia por el panel multi-cliente. Una sola landing genérica los obliga
 * a traducir; esto les habla en su idioma.
 *
 * Contenido migrado del sitio de Framer.
 */

import type { Rubro } from "./casos";

export type PaginaRubro = {
  slug: string;
  /** Clave del rubro en casos.ts, para cruzar los comercios del mismo perfil. */
  rubro: Rubro;
  nav: string;
  eyebrow: string;
  titular: string;
  bajada: string;
  metaDescripcion: string;
  beneficios: { titulo: string; texto: string }[];
};

export const paginasRubro: PaginaRubro[] = [
  {
    slug: "gastronomia",
    rubro: "gastronomia",
    nav: "Gastronomía",
    eyebrow: "Para restaurantes, cafeterías y pastelerías",
    titular:
      "Tu restaurante con carta digital, reseñas respondidas y clientes que vuelven.",
    bajada:
      "QR en mesas para ver el menú, reseñas de Google respondidas con IA y métricas de escaneo. Empezá con el cartel y escalá cuando quieras.",
    metaDescripcion:
      "Carta digital por QR, reseñas de Google respondidas con IA y métricas de escaneo para restaurantes, cafeterías y pastelerías.",
    beneficios: [
      {
        titulo: "Carta digital en el QR de la mesa",
        texto:
          "Cambiá el menú del día sin reimprimir nada. El QR en la mesa siempre apunta a lo último.",
      },
      {
        titulo: "Reseñas de Google en segundos",
        texto:
          "Respondé cada reseña con IA, con el tono de tu local. Subí tu posición en Maps sin esfuerzo.",
      },
      {
        titulo: "Link Page del local",
        texto:
          "Reservas, delivery, WhatsApp, redes sociales. Todo en una sola página linkeada desde tu QR.",
      },
      {
        titulo: "Picos de escaneo",
        texto:
          "Sabé en qué horarios y días escanean más tus clientes. Tomá decisiones con datos reales.",
      },
    ],
  },
  {
    slug: "retail",
    rubro: "retail",
    nav: "Retail",
    eyebrow: "Para tiendas y locales comerciales",
    titular: "Tu local de ropa, deco o lifestyle, con marketing inteligente.",
    bajada:
      "QR en probadores, Link Pages por colección, métricas de escaneo y reseñas respondidas con IA. Todo desde un solo lugar.",
    metaDescripcion:
      "QR en góndolas y probadores, Link Pages por colección y métricas de escaneo para tiendas de ropa, deco y lifestyle.",
    beneficios: [
      {
        titulo: "QR en góndolas y probadores",
        texto:
          "Mostrá fichas de producto, colecciones nuevas o catálogos digitales. El QR impreso no cambia aunque modifiques el contenido.",
      },
      {
        titulo: "Link Pages por colección",
        texto:
          "Una URL por temporada, categoría o promo. Cambiala cuando quieras sin reimprimir carteles.",
      },
      {
        titulo: "Reseñas de Google con IA",
        texto:
          "Respondé cada reseña con tono profesional en segundos. Construí tu reputación sin dedicarle horas.",
      },
      {
        titulo: "Métricas que se entienden",
        texto:
          "Cuántos escanearon, cuándo y desde dónde. Sin necesitar a nadie para interpretarlas.",
      },
    ],
  },
  {
    slug: "servicios",
    rubro: "servicios",
    nav: "Servicios",
    eyebrow: "Para peluqueros, trainers, tatuadores y profesionales",
    titular: "Tu servicio personal, con presencia digital desde un solo QR.",
    bajada:
      "Una Link Page con tu agenda, servicios, precios y WhatsApp. Reseñas respondidas con IA y métricas para entender de dónde vienen tus clientes.",
    metaDescripcion:
      "Link Page con agenda, servicios y WhatsApp, más reseñas con IA, para peluqueros, trainers, tatuadores y profesionales independientes.",
    beneficios: [
      {
        titulo: "Tu Link Page profesional",
        texto:
          "Agenda, servicios, precios, WhatsApp, Instagram. Todo en una sola URL que podés compartir en cualquier lado.",
      },
      {
        titulo: "QR en tu local o en tu tarjeta",
        texto:
          "El cliente escanea y llega directo a tu página. Sin apps extras, sin fricciones.",
      },
      {
        titulo: "Reseñas que construyen reputación",
        texto:
          "Respondé cada reseña con IA, con tu tono personal. Más reseñas positivas, más clientes nuevos.",
      },
      {
        titulo: "Métricas de tu alcance",
        texto:
          "Cuántas personas visitaron tu Link Page, desde qué canal llegaron y qué botón hicieron click.",
      },
    ],
  },
  {
    slug: "agencias",
    rubro: "corporativo",
    nav: "Agencias",
    eyebrow: "Para agencias con múltiples clientes",
    titular: "Gestioná 5, 10 o 30 comercios desde un solo panel.",
    bajada:
      "El plan Full incluye hasta 500 QR, 100 Link Pages y 3 cuentas de Google Business. Pensado para agencias que manejan varios locales o franquicias.",
    metaDescripcion:
      "Panel multi-cliente con 500 QR dinámicos, 100 Link Pages y 3 cuentas de Google Business para agencias y franquicias.",
    beneficios: [
      {
        titulo: "Panel centralizado multi-cliente",
        texto:
          "Un solo login para ver los QR, las métricas y las reseñas de todos tus clientes. Sin saltar entre cuentas.",
      },
      {
        titulo: "Hasta 500 QR dinámicos",
        texto:
          "Escalá con tu cartera. Asigná QR por cliente, por punto de venta o por campaña.",
      },
      {
        titulo: "IA de reseñas por marca",
        texto:
          "Cada cliente con su propio tono. La IA responde como habla cada marca, no como hablás vos.",
      },
      {
        titulo: "100 Link Pages",
        texto:
          "Una por local, por temporada o por promo. Creá y modificá sin pedirle nada a nadie.",
      },
    ],
  },
];
