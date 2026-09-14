/**
 * FLASHTAG — Configuración global del sitio.
 * Fuente única de verdad para dominios, CTAs y prueba social.
 */

export const site = {
  name: "FlashTag",
  domain: "https://www.flashtag.tech",
  locale: "es_AR",
  lang: "es-AR",
  description:
    "Plataforma de marketing phygital para comercios locales: QR dinámicos, Link Pages, métricas y reseñas de Google respondidas con IA.",

  urls: {
    app: "https://my.flashtag.tech",
    /** Portal de la app. Es el destino de TODO CTA de "probar / empezar". */
    login: "https://my.flashtag.tech/login",
    shop: "https://shop.flashtag.tech",
    whatsapp: "https://wa.me/54911XXXXXXXX", // PENDIENTE: número real
  },

  social: {
    instagram: "", // PENDIENTE
    linkedin: "", // PENDIENTE
    tiktok: "", // PENDIENTE
    youtube: "", // PENDIENTE
  },

  /**
   * ⚠️ PRUEBA SOCIAL — un solo número en todo el sitio.
   * Mientras sea `null`, ningún componente muestra el contador.
   * Es preferible no mostrar nada a mostrar tres números distintos.
   */
  proof: {
    locales: null as number | null,
    fundacion: null as number | null,
  },
} as const;

/** CTAs: el mismo nombre para la misma acción en todo el sitio. */
export const cta = {
  primary: { label: "Probá la app gratis", href: site.urls.login },
  secondary: { label: "Comprá tu cartel", href: site.urls.shop },
  demo: { label: "Reservá una demo", href: "/contacto?motivo=demo" },
} as const;
