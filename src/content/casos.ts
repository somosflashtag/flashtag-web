/**
 * CASOS DE ÉXITO
 *
 * Contenido provisto por el equipo de FlashTag (documento "Casos de éxito"),
 * con los datos reales de reseñas y puntuación de cada perfil de Google.
 *
 * ⚠️ AGENTS.md §5: un caso se publica solo con `autorizado: true`, y eso
 * significa que el comercio dio permiso para que su nombre aparezca acá.
 * `metricaVerificada` habilita por separado las cifras.
 *
 * Las puntuaciones de Google se mueven: conviene revisarlas cada tanto y
 * mantener acá el número que se pueda sostener si alguien lo chequea.
 */

export type Rubro = "gastronomia" | "retail" | "servicios" | "corporativo";

export type Caso = {
  slug: string;
  negocio: string;
  ciudad: string;
  rubro: Rubro;
  /** Qué hicieron con FlashTag, en una línea. */
  uso: string;
  /** Titular del resultado. Solo se muestra si `metricaVerificada`. */
  metrica: string;
  metricaVerificada: boolean;
  /** Permiso del comercio para usar su nombre. */
  autorizado: boolean;
  testimonio?: { texto: string; autor: string; cargo: string };
  /** Nombre del .md en content/casos-detalle/. Habilita /casos/<slug>. */
  detalle?: string;
  /** Portada de la página de detalle. */
  portada?: {
    titular: string;
    bajada: string;
    /** Contexto: sede, rubro, escala. */
    datos: string[];
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
    slug: "el-ateneo",
    negocio: "El Ateneo Grand Splendid",
    ciudad: "Recoleta, CABA",
    rubro: "retail",
    uso: "Carteles en los puntos de mayor permanencia del local",
    metrica: "98.500 reseñas · 4,8 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "el-ateneo",
    portada: {
      titular:
        "98.500 reseñas en Google: la librería más bella del mundo también lidera en reputación online",
      bajada:
        "Yenny–El Ateneo implementó carteles personalizados de FlashTag para que cada visitante pueda escanear el QR o apoyar el celular y dejar su reseña en Google al instante.",
      datos: ["Av. Santa Fe 1860, Recoleta", "Retail cultural", "52 sucursales"],
      cifras: [
        { valor: "98.500", label: "Reseñas en Google" },
        { valor: "4,8", label: "Puntuación promedio" },
        { valor: "+600", label: "Activaciones por mes" },
        { valor: "1919", label: "Año del Grand Splendid" },
      ],
    },
  },
  {
    slug: "betular-patisserie",
    negocio: "Betular Pâtisserie",
    ciudad: "Villa Devoto, CABA",
    rubro: "gastronomia",
    uso: "Carteles a medida de la marca, en mesas y mostrador",
    metrica: "5.200 reseñas · 4,4 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "betular-patisserie",
    portada: {
      titular:
        "+5.200 reseñas en Google: cómo un cartel convierte cada visita en reputación online",
      bajada:
        "La pastelería del chef Damián Betular implementó carteles de FlashTag con acceso directo a su perfil de Google. Un solo escaneo en el momento justo, y la experiencia del cliente queda registrada online.",
      datos: ["Villa Devoto, CABA", "Alta pastelería", "Equipo de 48 personas"],
      cifras: [
        { valor: "5.200+", label: "Reseñas en Google" },
        { valor: "4,4", label: "Puntuación promedio" },
        { valor: "48", label: "Personas en el equipo" },
        { valor: "7 días", label: "Abierto de lunes a lunes" },
      ],
    },
  },
  {
    slug: "derentas",
    negocio: "deRentas",
    ciudad: "Vicente López, GBA",
    rubro: "servicios",
    uso: "Carteles en las instancias de mayor satisfacción del proceso",
    metrica: "4.098 reseñas · 4,8 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "derentas",
    portada: {
      titular: "El servicio que genera confianza, ahora también en Google",
      bajada:
        "deRentas, la empresa de alquiler y Rent to Own de autos en Vicente López, convirtió la satisfacción de sus clientes en reputación verificable: el activo más importante para un negocio que requiere alta confianza.",
      datos: ["Vicente López, GBA", "Rent to Own", "Compromiso a 36 meses"],
      cifras: [
        { valor: "4.098", label: "Reseñas en Google" },
        { valor: "4,8", label: "Puntuación promedio" },
        { valor: "36", label: "Meses hasta ser dueño" },
        { valor: "+180", label: "QR escaneados" },
      ],
    },
  },
  {
    slug: "ganga-home",
    negocio: "Ganga Home",
    ciudad: "Dot Baires Shopping, CABA",
    rubro: "retail",
    uso: "Carteles a medida en un local de 2.000 m²",
    metrica: "~5.000 reseñas · 4,3 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "ganga-home",
    portada: {
      titular:
        "Casi 5.000 reseñas en Google para la marca de deco más viral de Argentina",
      bajada:
        "Ganga Home, fundada por Ara y Jony, implementó carteles de FlashTag para convertir su tráfico masivo en reputación online: un perfil de Google tan activo como su Instagram.",
      datos: ["Dot Baires Shopping", "Deco y hogar", "Local de 2.000 m²"],
      cifras: [
        { valor: "~5.000", label: "Reseñas en Google" },
        { valor: "4,3", label: "Puntuación promedio" },
        { valor: "3 M", label: "Seguidores en Instagram" },
        { valor: "2021", label: "Año de fundación" },
      ],
    },
  },
  {
    slug: "la-casa-del-dulce-de-leche",
    negocio: "La Casa del Dulce de Leche",
    ciudad: "Buenos Aires",
    rubro: "gastronomia",
    uso: "Carteles en cada local, con el perfil de Google de esa sucursal",
    metrica: "3.786 reseñas · 4,7 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "la-casa-del-dulce-de-leche",
    portada: {
      titular:
        "Casi 4.000 reseñas para la marca más emblemática del dulce de leche argentino",
      bajada:
        "Con locales en el Mercado de San Telmo y zonas de alto tráfico turístico, la cadena implementó carteles de FlashTag para convertir cada visita en reputación online.",
      datos: ["Buenos Aires", "Retail gastronómico", "Varios locales"],
      cifras: [
        { valor: "3.786", label: "Reseñas en Google" },
        { valor: "4,7", label: "Puntuación promedio" },
        { valor: "4,9", label: "Puntuación en San Telmo" },
        { valor: "2.300+", label: "Reseñas del local top" },
      ],
    },
  },
  {
    slug: "almacen-de-pizzas",
    negocio: "Almacén de Pizzas",
    ciudad: "AMBA",
    rubro: "gastronomia",
    uso: "Piloto en Unicenter, replicado a toda la cadena",
    metrica: "3.000 QR · 107.000 interacciones",
    metricaVerificada: true,
    autorizado: true,
    detalle: "almacen-de-pizzas",
    portada: {
      titular:
        "Probaron en un local, los resultados los convencieron de expandir a toda la cadena",
      bajada:
        "Almacén de Pizzas implementó carteles de FlashTag en el local de Unicenter. Los números superaron todas las expectativas, y la cadena decidió replicarlo en todos sus locales.",
      datos: ["AMBA", "Cadena de pizzerías", "Unicenter, Nordelta, Pilar y más"],
      cifras: [
        { valor: "4,8", label: "Puntuación en Unicenter" },
        { valor: "850-1.000", label: "Reseñas al cierre del mes" },
        { valor: "3.000", label: "QR generados en la cadena" },
        { valor: "107.000+", label: "Interacciones totales" },
      ],
    },
  },
  {
    slug: "yenny",
    negocio: "Yenny",
    ciudad: "Argentina",
    rubro: "retail",
    uso: "Carteles por sucursal, cada uno a su perfil de Google",
    metrica: "+400 activaciones por local al mes",
    metricaVerificada: true,
    autorizado: true,
    detalle: "yenny",
    portada: {
      titular: "Cómo Yenny convierte cada visita en reputación online",
      bajada:
        "La cadena de librerías implementó carteles de FlashTag en sus sucursales. Una solución que opera en silencio y construye reputación online en cada local, todos los días.",
      datos: ["Todo el país", "Librerías", "Grupo El Ateneo"],
      cifras: [
        { valor: "+1.000", label: "Reseñas en el local de Paraná" },
        { valor: "4,4", label: "Puntuación promedio" },
        { valor: "+400", label: "Activaciones por local al mes" },
        { valor: "2.732", label: "QR escaneados" },
      ],
    },
  },
  {
    slug: "fiat-autodrive",
    negocio: "Fiat AutoDrive",
    ciudad: "Belgrano, CABA",
    rubro: "corporativo",
    uso: "Carteles en el salón, con la identidad visual de la marca",
    metrica: "946 reseñas · 4,3 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "fiat-autodrive",
    portada: {
      titular:
        "946 reseñas en Google: cómo un concesionario convirtió cada visita en reputación online",
      bajada:
        "Fiat AutoDrive, concesionario oficial en Belgrano, implementó carteles de FlashTag para que cada cliente deje su reseña al instante. Sin pedirlo, sin interrumpir la visita, sin depender del equipo de ventas.",
      datos: ["Av. del Libertador 5900", "Concesionario oficial", "0km y usados"],
      cifras: [
        { valor: "946", label: "Reseñas en Google" },
        { valor: "4,3", label: "Puntuación promedio" },
        { valor: "0", label: "Carga operativa para el equipo" },
        { valor: "1 gesto", label: "Escanear o apoyar el celular" },
      ],
    },
  },
];

/** Lo único que la web puede mostrar. */
export const casosPublicables = casos.filter((c) => c.autorizado);

/** Casos con página propia: autorizados y con texto escrito. */
export const casosConDetalle = casosPublicables.filter(
  (c) => c.detalle && c.portada,
);
