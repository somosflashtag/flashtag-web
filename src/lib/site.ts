/**
 * FLASHTAG — Configuración global del sitio.
 * Fuente única de verdad para dominios, contacto, redes y prueba social.
 */

export const site = {
  name: "FlashTag",
  domain: "https://www.flashtag.tech",
  locale: "es_AR",
  lang: "es-AR",
  description:
    "Plataforma de marketing phygital para comercios locales: QR dinámicos, Link Pages, métricas y reseñas de Google respondidas con IA.",

  /** Razón social y fiscal — sale de `content/legal/privacidad.md`. */
  legal: {
    titular: "Tomás Martín Cazalá",
    cuit: "20-39644692-9",
    domicilio: "Av. Luis María Campos 70, C1426, CABA, Argentina",
  },

  contacto: {
    email: "hola@flashtag.tech",
    /** Formato de lectura. El E.164 va aparte: uno se muestra, el otro se linkea. */
    telefono: "+54 11 3213 2506",
    telefonoE164: "541132132506",
  },

  urls: {
    app: "https://my.flashtag.tech",
    /** Portal de la app. Es el destino de TODO CTA de "probar / empezar". */
    login: "https://my.flashtag.tech/login",
    shop: "https://shop.flashtag.tech",
    whatsapp: "https://wa.me/541132132506",
  },

  /**
   * Redes. Cadena vacía = no se renderiza el icono.
   * ⚠️ Verificar los handles antes de publicar: un link roto en el footer
   * aparece en todas las páginas del sitio.
   */
  social: {
    instagram: "https://www.instagram.com/flashtag.tech/",
    youtube: "https://www.youtube.com/@flashtag.tech",
    tiktok: "https://www.tiktok.com/@flashtag.tech",
    linkedin: "", // PENDIENTE
  },

  /**
   * Data Fiscal (ARCA/AFIP). El QR es por contribuyente: hasta tener el
   * token real el badge no se muestra — un Data Fiscal que no valida es
   * peor que ninguno.
   * Cuando esté: qr = "https://qr.afip.gob.ar/?qr=<token>".
   */
  dataFiscal: {
    qr: null as string | null,
    imagen: "https://www.afip.gob.ar/images/f960/DATAWEB.jpg",
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
