/**
 * CASOS DE ÉXITO
 *
 * Dos fuentes, y cada cifra dice de cuál sale:
 * - El perfil público de Google de cada local (reseñas totales, puntuación).
 *   Esto lo entregó el equipo de FlashTag (documento "Casos de éxito").
 * - El panel de FlashTag (my.flashtag.tech): escaneos de cada QR y, en los
 *   locales que conectaron su Google, las reseñas día por día. Es lo que
 *   permite contar un antes y un después, que es lo que un comercio quiere ver.
 *
 * Actualización del 28/11/2026: los casos se rehicieron con los datos del
 * panel. Se sumaron Treu, Strobel, Dilect, Sommelier en Bicicleta y Aliens
 * Coffee (con permiso de cada uno), y se corrigieron cifras que el panel no
 * sostenía (ver más abajo, en cada caso).
 *
 * ⚠️ AGENTS.md §5: un caso se publica solo con `autorizado: true`, y eso
 * significa que el comercio dio permiso para que su nombre aparezca acá.
 * `metricaVerificada` habilita por separado las cifras.
 *
 * Las cifras se mueven: conviene revisarlas cada tanto y mantener acá el
 * número que se pueda sostener si alguien lo chequea. Las queries que las
 * sacaron están descriptas en `medicion` de cada caso.
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
  /** Foto del cartel en el local del cliente. Cae a la de producto si falta. */
  foto?: { src: string; alt: string };
  /** Logo monocromo (arena) para fondo violeta. Los mismos de clientes.ts. */
  logo?: string;
  /** Nombre del .md en content/casos-detalle/. Habilita /casos/<slug>. */
  detalle?: string;
  /** Portada de la página de detalle. */
  portada?: {
    titular: string;
    bajada: string;
    /** Contexto: sede, rubro, escala. */
    datos: string[];
    /** Se muestran solo si `metricaVerificada`. Valores cortos: van a 3rem. */
    cifras: { valor: string; label: string }[];
  };
  /**
   * Antes y con FlashTag, medido en el panel. Se dibuja como dos barras
   * proporcionales debajo de las cifras. Solo si `metricaVerificada`.
   */
  evolucion?: {
    titulo: string;
    antes: { etiqueta: string; valor: number };
    despues: { etiqueta: string; valor: number };
    /** Período y fuente, en una o dos oraciones. Va siempre. */
    nota: string;
  };
  /** "Cómo lo medimos": va al pie del relato. */
  medicion?: string;
};

export const rubros: { id: Rubro; label: string }[] = [
  { id: "gastronomia", label: "Gastronomía" },
  { id: "retail", label: "Retail" },
  { id: "servicios", label: "Servicios" },
  { id: "corporativo", label: "Corporativo" },
];

/*
 * El orden importa: la home muestra los cuatro primeros. Arriba van los que
 * tienen un antes y un después medido, intercalados con marcas conocidas.
 */
export const casos: Caso[] = [
  /*
   * Corregido el 28/11/2026. Decía "3.000 QR generados" y "107.000+
   * interacciones": el panel registra 177 QR y unos 77.000 escaneos. Tampoco
   * se sostenía "850-1.000 reseñas al cierre del mes" en Unicenter. La
   * historia nueva es la que muestran los datos: tarjetas por mozo.
   */
  {
    slug: "almacen-de-pizzas",
    logo: "/logos/almacen-de-pizzas.webp",
    negocio: "Almacén de Pizzas",
    ciudad: "AMBA e interior",
    rubro: "gastronomia",
    uso: "Una tarjeta FlashTag para cada mozo, en 15 sucursales",
    metrica: "+35% de reseñas por mes en la cadena",
    metricaVerificada: true,
    autorizado: true,
    detalle: "almacen-de-pizzas",
    portada: {
      titular: "Una tarjeta por mozo: así sumó Almacén de Pizzas un 35% más de reseñas en toda la cadena",
      bajada:
        "Empezaron con un piloto en Unicenter. Hoy cada mozo de 15 sucursales lleva su propia tarjeta FlashTag, y la cadena recibe un tercio más de reseñas por mes que hace un año.",
      datos: ["Cadena de pizzerías", "15 sucursales con tarjetas", "Desde enero de 2025"],
      cifras: [
        { valor: "+35%", label: "Reseñas por mes contra el mismo período de 2025" },
        { valor: "77.000", label: "Escaneos de carteles y tarjetas" },
        { valor: "×3,2", label: "Reseñas por mes en Caballito" },
        { valor: "+200", label: "Escaneos por mes de una sola moza en Tortugas" },
      ],
    },
    evolucion: {
      titulo: "Reseñas por mes en toda la cadena",
      antes: { etiqueta: "Mayo a noviembre de 2025", valor: 2504 },
      despues: { etiqueta: "Mayo a noviembre de 2026", valor: 3378 },
      nota: "Promedio mensual de reseñas nuevas en Google, sumando todas las sucursales. Noviembre de 2026 cuenta hasta el día 28, así que la suba real es un poco mayor.",
    },
    medicion:
      "Las reseñas salen de los perfiles de Google de cada sucursal, conectados al panel de FlashTag. Por sucursal, comparamos el promedio mensual de los 12 meses anteriores a sus tarjetas con el de los últimos 6 meses. Los escaneos son los que registró el panel desde enero de 2025, en 177 tarjetas y carteles.",
  },
  {
    slug: "treu",
    negocio: "Treu, Lugar de Encuentro",
    ciudad: "San Francisco, Córdoba",
    rubro: "gastronomia",
    uso: "Carteles y tarjetas FlashTag en el local",
    metrica: "De 5 a 61 reseñas por mes",
    metricaVerificada: true,
    autorizado: true,
    detalle: "treu",
    portada: {
      titular: "En 57 días, más reseñas que en todo el año anterior",
      bajada:
        "Treu es un restaurante de San Francisco, Córdoba. Recibía unas cinco reseñas por mes. Desde que sumó FlashTag, recibe más de sesenta.",
      datos: ["San Francisco, Córdoba", "Restaurante", "Con FlashTag desde octubre de 2026"],
      cifras: [
        { valor: "116", label: "Reseñas nuevas en 57 días" },
        { valor: "80", label: "Reseñas en los 12 meses anteriores" },
        { valor: "×12", label: "Ritmo de reseñas por mes" },
        { valor: "4,78", label: "Promedio de las reseñas nuevas (antes, 4,19)" },
      ],
    },
    evolucion: {
      titulo: "Reseñas nuevas por mes",
      antes: { etiqueta: "Antes de FlashTag", valor: 5 },
      despues: { etiqueta: "Con FlashTag", valor: 61 },
      nota: "Antes: promedio de los 90 días previos al primer escaneo (2 de octubre de 2026). Con FlashTag: del 2 de octubre al 28 de noviembre de 2026.",
    },
    medicion:
      "Contamos las reseñas nuevas del perfil de Google de Treu, conectado al panel de FlashTag, y las comparamos por mes antes y después del primer escaneo de sus carteles.",
  },
  /*
   * Corregido el 28/11/2026. Decía "+600 activaciones por mes". Los toques
   * NFC de estos carteles van directo a Google y no pasan por FlashTag, así
   * que ese número no se puede medir. Se reemplazó por los escaneos de QR
   * que sí registra el panel, en toda la red Yenny–El Ateneo.
   */
  {
    slug: "el-ateneo",
    logo: "/logos/el-ateneo.webp",
    foto: {
      src: "/locales/el-ateneo.webp",
      alt: "Cartel de FlashTag con la marca El Ateneo en el mostrador del local",
    },
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
        { valor: "62", label: "Locales de la red Yenny–El Ateneo con cartel" },
        { valor: "1919", label: "Año del Grand Splendid" },
      ],
    },
    medicion:
      "Las reseñas y la puntuación son las del perfil público de Google del Grand Splendid. Los locales con cartel salen del panel de FlashTag. Los toques NFC van directo a Google y no los contamos.",
  },
  {
    slug: "strobel",
    negocio: "Strobel Panadería & Café",
    ciudad: "Córdoba",
    rubro: "gastronomia",
    uso: "Un cartel FlashTag en cada local",
    metrica: "Del 3,8 al 4,7 en las reseñas nuevas",
    metricaVerificada: true,
    autorizado: true,
    detalle: "strobel",
    portada: {
      titular: "Cuando opinan todos los clientes, y no solo los enojados, la puntuación sube",
      bajada:
        "Strobel tiene dos locales en Córdoba. En dos meses con FlashTag recibió casi tantas reseñas como en todo el año anterior, y su promedio pasó de 3,8 a 4,7 estrellas.",
      datos: ["Córdoba", "Panadería y cafetería", "2 locales"],
      cifras: [
        { valor: "63", label: "Reseñas nuevas en 64 días" },
        { valor: "72", label: "Reseñas en los 12 meses anteriores" },
        { valor: "4,7", label: "Promedio de las reseñas nuevas (antes, 3,8)" },
        { valor: "×3,7", label: "Ritmo de reseñas por mes" },
      ],
    },
    evolucion: {
      titulo: "Reseñas nuevas por mes, sumando los dos locales",
      antes: { etiqueta: "Antes de FlashTag", valor: 8 },
      despues: { etiqueta: "Con FlashTag", valor: 30 },
      nota: "Antes: promedio de los 90 días previos al primer escaneo (25 de septiembre de 2026). Con FlashTag: del 25 de septiembre al 28 de noviembre de 2026.",
    },
    medicion:
      "Contamos las reseñas nuevas de los dos perfiles de Google de Strobel, conectados al panel de FlashTag. Strobel no usa ningún filtro de reseñas: todas van directo a Google, buenas y malas.",
  },
  /*
   * Corregido el 28/11/2026. Decía "+400 activaciones por local al mes" y
   * "2.732 QR escaneados". El panel registra unos 5.300 escaneos de QR en
   * toda la red desde octubre de 2025 (los toques NFC van directo a Google y
   * no se cuentan). Se dejó la cifra medible y se sacó la otra.
   */
  {
    slug: "yenny",
    logo: "/logos/yenny.webp",
    foto: {
      src: "/locales/yenny.webp",
      alt: "Cartel de FlashTag con la marca Yenny sobre el mostrador de la librería",
    },
    negocio: "Yenny",
    ciudad: "Todo el país",
    rubro: "retail",
    uso: "Carteles por sucursal, cada uno a su perfil de Google",
    metrica: "+5.000 escaneos en 62 locales",
    metricaVerificada: true,
    autorizado: true,
    detalle: "yenny",
    portada: {
      titular: "Cómo Yenny convierte cada visita en reputación online, de Ushuaia a Jujuy",
      bajada:
        "La cadena de librerías puso carteles de FlashTag en sus sucursales de todo el país. Cada uno lleva al perfil de Google de su local, y funciona sin que el equipo tenga que pedir nada.",
      datos: ["Todo el país", "Librerías", "Grupo El Ateneo"],
      cifras: [
        { valor: "+5.000", label: "Escaneos de QR desde octubre de 2025" },
        { valor: "62", label: "Locales de la red con cartel" },
        { valor: "+1.000", label: "Reseñas en el local de Paraná" },
        { valor: "4,4", label: "Puntuación promedio" },
      ],
    },
    medicion:
      "Los escaneos son los que registró el panel de FlashTag en los QR de la red Yenny–El Ateneo. Los toques NFC van directo a Google y no pasan por FlashTag, así que las activaciones reales son más. Las reseñas y la puntuación son las del perfil público de Google.",
  },
  {
    slug: "dilect",
    negocio: "Dilect",
    ciudad: "Martínez, GBA",
    rubro: "retail",
    uso: "Tres carteles FlashTag en el local",
    metrica: "De 2 a 27 reseñas por mes",
    metricaVerificada: true,
    autorizado: true,
    detalle: "dilect",
    portada: {
      titular: "Diez años en Google, y en dos meses más reseñas que en todo el año anterior",
      bajada:
        "Dilect es una tienda de trajes y esmóquines de Martínez, con reseñas en Google desde 2016. Recibía unas dos por mes. Con tres carteles de FlashTag, pasó a recibir casi una por día.",
      datos: ["Martínez, GBA", "Trajes y esmóquines", "3 carteles"],
      cifras: [
        { valor: "56", label: "Reseñas nuevas en 63 días" },
        { valor: "34", label: "Reseñas en los 12 meses anteriores" },
        { valor: "×13", label: "Ritmo de reseñas por mes" },
        { valor: "4,93", label: "Promedio de las reseñas nuevas" },
      ],
    },
    evolucion: {
      titulo: "Reseñas nuevas por mes",
      antes: { etiqueta: "Antes de FlashTag", valor: 2 },
      despues: { etiqueta: "Con FlashTag", valor: 27 },
      nota: "Antes: promedio de los 90 días previos al primer escaneo (26 de septiembre de 2026). Con FlashTag: del 26 de septiembre al 28 de noviembre de 2026.",
    },
    medicion:
      "Contamos las reseñas nuevas del perfil de Google de Dilect, conectado al panel de FlashTag, y las comparamos por mes antes y después del primer escaneo.",
  },
  {
    slug: "sommelier-en-bicicleta",
    negocio: "Sommelier en Bicicleta",
    ciudad: "Palermo, CABA",
    rubro: "retail",
    uso: "Dos carteles FlashTag en la vinoteca",
    metrica: "×2,7 reseñas por mes · 4,98 ★",
    metricaVerificada: true,
    autorizado: true,
    detalle: "sommelier-en-bicicleta",
    portada: {
      titular: "Ya tenía buenas reseñas. Ahora le llegan casi tres veces más rápido",
      bajada:
        "Sommelier en Bicicleta es una vinoteca de Palermo que ya tenía un perfil sólido: más de 700 reseñas y 4,8 estrellas. FlashTag no le cambió la puntuación: le multiplicó el ritmo.",
      datos: ["Palermo, CABA", "Vinoteca", "Con FlashTag desde octubre de 2026"],
      cifras: [
        { valor: "63", label: "Reseñas nuevas en 40 días" },
        { valor: "×2,7", label: "Ritmo de reseñas por mes" },
        { valor: "4,98", label: "Promedio de las reseñas nuevas" },
        { valor: "0", label: "Reseñas de 3 estrellas o menos" },
      ],
    },
    evolucion: {
      titulo: "Reseñas nuevas por mes",
      antes: { etiqueta: "Antes de FlashTag", valor: 18 },
      despues: { etiqueta: "Con FlashTag", valor: 47 },
      nota: "Antes: promedio de los 90 días previos al primer escaneo (19 de octubre de 2026). Con FlashTag: del 19 de octubre al 28 de noviembre de 2026.",
    },
    medicion:
      "Contamos las reseñas nuevas del perfil de Google de la vinoteca, conectado al panel de FlashTag, y las comparamos por mes antes y después del primer escaneo.",
  },
  {
    slug: "aliens-coffee",
    negocio: "Aliens Coffee",
    ciudad: "CABA",
    rubro: "gastronomia",
    uso: "Cartel y tarjetas FlashTag desde sus primeras semanas",
    metrica: "+200 reseñas a tres meses de abrir",
    metricaVerificada: true,
    autorizado: true,
    detalle: "aliens-coffee",
    portada: {
      titular: "Un café nuevo que construyó su reputación desde el primer mes",
      bajada:
        "Aliens Coffee abrió a fines de agosto de 2026. Sumó FlashTag a las seis semanas, y desde entonces las reseñas le llegan casi al doble de velocidad.",
      datos: ["CABA", "Cafetería", "Abrió en agosto de 2026"],
      cifras: [
        { valor: "151", label: "Reseñas en sus primeros 51 días con FlashTag" },
        { valor: "2 de 3", label: "De todas sus reseñas llegaron con FlashTag" },
        { valor: "×1,7", label: "Reseñas por día, contra antes de FlashTag" },
        { valor: "4,8", label: "Puntuación en Google" },
      ],
    },
    evolucion: {
      titulo: "Reseñas en Google",
      antes: { etiqueta: "Desde la apertura hasta FlashTag (41 días)", valor: 73 },
      despues: { etiqueta: "Primeros 51 días con FlashTag", valor: 151 },
      nota: "La primera reseña es del 28 de agosto de 2026 y el primer escaneo, del 8 de octubre. Datos al 28 de noviembre de 2026.",
    },
    medicion:
      "Contamos las reseñas del perfil de Google de Aliens Coffee, conectado al panel de FlashTag, antes y después del primer escaneo de sus carteles.",
  },
  {
    slug: "betular-patisserie",
    logo: "/logos/betular.webp",
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
  /* Actualizado el 28/11/2026: decía "+180 QR escaneados"; el panel registra 1.208. */
  {
    slug: "derentas",
    logo: "/logos/derentas.webp",
    foto: {
      src: "/locales/derentas.webp",
      alt: "Tarjeta de FlashTag con la marca deRentas, con lanyard, en la mano",
    },
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
        { valor: "+1.200", label: "Escaneos desde octubre de 2025" },
        { valor: "36", label: "Meses hasta ser dueño" },
      ],
    },
  },
  /* Actualizado el 28/11/2026: se cambió "2021, año de fundación" por los escaneos del panel. */
  {
    slug: "ganga-home",
    logo: "/logos/ganga-home.webp",
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
        { valor: "+1.400", label: "Escaneos de sus 13 carteles" },
        { valor: "3 M", label: "Seguidores en Instagram" },
      ],
    },
  },
  /* Actualizado el 28/11/2026: se cambió "2.300+ reseñas del local top" por los escaneos del panel. */
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
      datos: ["Buenos Aires", "Retail gastronómico", "Con FlashTag desde 2024"],
      cifras: [
        { valor: "3.786", label: "Reseñas en Google" },
        { valor: "4,7", label: "Puntuación promedio" },
        { valor: "4,9", label: "Puntuación en San Telmo" },
        { valor: "+3.400", label: "Escaneos desde mayo de 2024" },
      ],
    },
  },
  /* Actualizado el 28/11/2026: se cambió "0, carga operativa" por los puntos del grupo con cartel. */
  {
    slug: "fiat-autodrive",
    logo: "/logos/autodrive.webp",
    foto: {
      src: "/locales/fiat-autodrive.webp",
      alt: "Cartel de FlashTag con la marca AutoDrive sostenido en la mano",
    },
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
        { valor: "11", label: "Puntos del grupo AutoDrive con cartel" },
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
