/**
 * BLOG — metadatos migrados del sitio de Framer.
 *
 * ⚠️ Ninguno tiene `cuerpo`: de Framer solo se pudo recuperar título, bajada,
 * categoría y fecha. Un índice que linkea a artículos sin texto son seis 404
 * nuevos, así que la página publica SOLO los que tienen cuerpo.
 *
 * Para publicar uno: pegar el texto en `cuerpo` (Markdown) y aparece solo.
 * Cuando esté montado Sanity, este archivo se reemplaza por el CMS y la
 * página no cambia — lee la misma forma de datos.
 */

export type Articulo = {
  slug: string;
  categoria: string;
  titulo: string;
  bajada: string;
  fecha: string; // ISO
  minutos: number;
  /** Markdown. Sin esto el artículo no se publica. */
  cuerpo: string | null;
  /** El caso usa una marca de tercero: requiere autorización (AGENTS.md §5). */
  requiereAutorizacion?: boolean;
};

export const articulos: Articulo[] = [
  {
    slug: "qr-dinamicos-para-vender-mas",
    categoria: "QR & Link Pages",
    titulo: "Cómo usar QR dinámicos para vender más en tu local",
    bajada:
      "Un QR estático es un link que no podés cambiar. Un QR dinámico es una herramienta de marketing. Te explicamos la diferencia y cómo sacarle provecho desde el primer día.",
    fecha: "2026-04-10",
    minutos: 5,
    cuerpo: null,
  },
  {
    slug: "responder-resenas-google-con-ia",
    categoria: "Reseñas con IA",
    titulo: "Guía completa: respondé las reseñas de Google con IA en minutos",
    bajada:
      "El 90% de los consumidores lee reseñas antes de visitar un local. Acá te mostramos cómo FlashTag te ayuda a responder cada una con tono profesional y personalizado, automáticamente.",
    fecha: "2026-04-03",
    minutos: 7,
    cuerpo: null,
  },
  {
    slug: "5-metricas-comercio-local",
    categoria: "Métricas",
    titulo: "Las 5 métricas que todo comercio local debería mirar cada semana",
    bajada:
      "No necesitás ser analista de datos. Solo necesitás saber dónde mirar. Te contamos cuáles son los números que realmente importan para tomar decisiones en tu negocio.",
    fecha: "2026-03-28",
    minutos: 6,
    cuerpo: null,
  },
  {
    slug: "programas-de-fidelidad-argentina",
    categoria: "Fidelización",
    titulo:
      "Programas de fidelidad para comercios: qué funcionan y qué no en Argentina",
    bajada:
      "Las tarjetas de puntos pasaron de moda. Los clientes quieren recompensas digitales, instantáneas y sin fricciones. Te mostramos el modelo que funciona hoy.",
    fecha: "2026-03-21",
    minutos: 8,
    cuerpo: null,
  },
  {
    slug: "caso-betular-patisserie",
    categoria: "Casos reales",
    titulo: "Cómo Betular Patisserie usa FlashTag para conectar con sus clientes",
    bajada:
      "La pastelería de Mariano Betular implementó QR en sus mesas y packaging.",
    fecha: "2026-03-14",
    minutos: 4,
    cuerpo: null,
    requiereAutorizacion: true,
  },
  {
    slug: "link-page-vs-linktree",
    categoria: "Link Pages",
    titulo: "Link Page de FlashTag vs Linktree: ¿cuál conviene para tu negocio?",
    bajada:
      "Linktree es genial para creadores de contenido. Para un comercio con stock, precios y QR físicos, hay una herramienta mucho más completa. Acá hacemos la comparación.",
    fecha: "2026-03-07",
    minutos: 5,
    cuerpo: null,
  },
];

export const articulosPublicables = articulos
  .filter((a) => a.cuerpo && !a.requiereAutorizacion)
  .sort((a, b) => b.fecha.localeCompare(a.fecha));
