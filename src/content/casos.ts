/**
 * CASOS DE ÉXITO
 *
 * ⚠️ REGLA (AGENTS.md §5): un caso se publica solo si `autorizado: true`.
 * Eso significa que el comercio dio permiso POR ESCRITO para que su nombre
 * y su logo aparezcan acá. No alcanza con ser cliente.
 *
 * Todos arrancan en `false` a propósito. La página filtra por este flag,
 * así que un caso sin autorizar simplemente no se renderiza — no hay forma
 * de que se publique por olvido.
 *
 * Las métricas vienen del sitio de Framer y están sin verificar contra el
 * dashboard: `metrica` se muestra únicamente si `metricaVerificada` es true.
 */

export type Rubro = "gastronomia" | "retail" | "servicios" | "corporativo";

export type Caso = {
  slug: string;
  negocio: string;
  ciudad: string;
  rubro: Rubro;
  /** Qué hicieron con FlashTag, en una línea. */
  uso: string;
  /** Resultado. Solo se muestra si `metricaVerificada`. */
  metrica: string;
  metricaVerificada: boolean;
  /** Permiso escrito del comercio para usar su nombre. */
  autorizado: boolean;
  testimonio?: { texto: string; autor: string; cargo: string };
  /** Nombre del .md en content/casos-detalle/. Habilita /casos/<slug>. */
  detalle?: string;
  /** Titular y cifras de la página de detalle. */
  portada?: {
    titular: string;
    bajada: string;
    plan: string;
    /** Se muestran solo si `metricaVerificada`. */
    cifras: { valor: string; label: string }[];
  };
};

export const rubros: { id: Rubro; label: string }[] = [
  { id: "gastronomia", label: "Gastronomía" },
  { id: "retail", label: "Retail" },
  { id: "servicios", label: "Servicios" },
  { id: "corporativo", label: "Corporativo" },
];

export const casos: Caso[] = [
  {
    slug: "almacen-de-pizzas",
    negocio: "Almacén de Pizzas",
    ciudad: "Buenos Aires",
    rubro: "gastronomia",
    uso: "QR en mesa para ver el menú y pedir delivery",
    // El sitio de Framer decía +220 en la home y +320 en la página de casos.
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "la-casa-del-dulce-de-leche",
    negocio: "La Casa del Dulce de Leche",
    ciudad: "Argentina",
    rubro: "gastronomia",
    uso: "Reseñas con IA y QR en el packaging",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "ganga-home",
    negocio: "Ganga Home",
    ciudad: "Argentina",
    rubro: "retail",
    uso: "Link Pages por categoría de productos",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "yenny",
    negocio: "Yenny",
    ciudad: "Argentina",
    rubro: "retail",
    uso: "QR en góndolas para novedades editoriales",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "el-ateneo",
    negocio: "El Ateneo",
    ciudad: "Buenos Aires",
    rubro: "retail",
    uso: "QR en puntos de venta para catálogo digital",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "derentas",
    negocio: "Derentas",
    ciudad: "Argentina",
    rubro: "servicios",
    uso: "Link Page de servicios con botón de WhatsApp",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
  {
    slug: "betular-patisserie",
    negocio: "Betular Patisserie",
    ciudad: "Buenos Aires",
    rubro: "gastronomia",
    uso: "QR en mesas y packaging premium con menú digital",
    metrica: "+525% de escaneos en 3 meses",
    metricaVerificada: false,
    autorizado: false,
    detalle: "betular-patisserie",
    portada: {
      titular: "Betular Patisserie: de 80 a 500+ escaneos por mes",
      bajada:
        "La pastelería porteña implementó FlashTag en sus locales y transformó cada mesa en un punto de contacto digital con sus clientes.",
      plan: "Plan Starter",
      cifras: [
        { valor: "+525%", label: "Aumento de escaneos en 3 meses" },
        { valor: "500+", label: "Escaneos mensuales activos" },
        { valor: "4,8", label: "Rating de Google promedio" },
        { valor: "48 h", label: "Setup completo en el local" },
      ],
    },
  },
  {
    slug: "fiat-autodrive",
    negocio: "Fiat Autodrive",
    ciudad: "Argentina",
    rubro: "corporativo",
    uso: "QR en concesionarios para la ficha técnica de vehículos",
    metrica: "",
    metricaVerificada: false,
    autorizado: false,
  },
];

/** Lo único que la web puede mostrar. */
export const casosPublicables = casos.filter((c) => c.autorizado);

/** Casos con página propia: además de autorizados, tienen texto escrito. */
export const casosConDetalle = casosPublicables.filter(
  (c) => c.detalle && c.portada,
);
