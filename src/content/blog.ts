/**
 * BLOG — metadatos migrados del sitio de Framer.
 *
 * `cuerpo` es el nombre del .md en content/articulos/. Un índice que linkea a
 * artículos sin texto son 404 nuevos, así que la página publica SOLO los que
 * tienen archivo.
 *
 * Para publicar uno: crear content/articulos/<slug>.md y poner su nombre acá.
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
  /** Nombre del .md en content/articulos/. Sin esto no se publica. */
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
    cuerpo: "qr-dinamicos-para-vender-mas",
  },
  {
    slug: "responder-resenas-google-con-ia",
    categoria: "Reseñas con IA",
    titulo: "Guía completa: respondé las reseñas de Google con IA en minutos",
    bajada:
      "El 90% de los consumidores lee reseñas antes de visitar un local. Acá te mostramos cómo FlashTag te ayuda a responder cada una con tono profesional y personalizado, automáticamente.",
    fecha: "2026-04-03",
    minutos: 7,
    cuerpo: "responder-resenas-google-con-ia",
  },
  {
    slug: "5-metricas-comercio-local",
    categoria: "Métricas",
    titulo: "Las 5 métricas que todo comercio local debería mirar cada semana",
    bajada:
      "No necesitás ser analista de datos. Solo necesitás saber dónde mirar. Te contamos cuáles son los números que realmente importan para tomar decisiones en tu negocio.",
    fecha: "2026-03-28",
    minutos: 6,
    cuerpo: "5-metricas-comercio-local",
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
    cuerpo: "programas-de-fidelidad-argentina",
  },
  {
    slug: "caso-betular-patisserie",
    categoria: "Casos reales",
    titulo: "Cómo Betular Patisserie usa FlashTag para conectar con sus clientes",
    bajada:
      "Más de 5.200 reseñas en Google. Lo interesante no es el número: son las cuatro decisiones de diseño detrás, y ninguna requiere ser famoso. Se copian en un local de diez mesas.",
    fecha: "2026-03-14",
    minutos: 4,
    cuerpo: "caso-betular-patisserie",
  },
  {
    slug: "link-page-vs-linktree",
    categoria: "Link Pages",
    titulo: "Link Page de FlashTag vs Linktree: ¿cuál conviene para tu negocio?",
    bajada:
      "Linktree es genial para creadores de contenido. Para un comercio con stock, precios y QR físicos, hay una herramienta mucho más completa. Acá hacemos la comparación.",
    fecha: "2026-03-07",
    minutos: 5,
    cuerpo: "link-page-vs-linktree",
  },
];

export const articulosPublicables = articulos
  .filter((a) => a.cuerpo && !a.requiereAutorizacion)
  .sort((a, b) => b.fecha.localeCompare(a.fecha));
