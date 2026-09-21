/**
 * ANALÍTICA — un dato, una fuente.
 *
 * Lo que la app mide de cada escaneo y con qué herramientas se conecta.
 * Lo consumen el bloque <Analitica /> de la home, las páginas de
 * /producto/[slug] y el FAQ. Si la app suma una métrica o una integración,
 * se cambia acá y aparece en todos lados.
 *
 * ⚠️ Nada de esto es aspiracional. Si una integración todavía no está en
 * producción va en `proximamente`, nunca en `activas`. Lo mismo con las
 * métricas: si la app no la muestra, no se lista.
 */

export type DatoMedido = { titulo: string; texto: string };

/** Lo que queda registrado en cada escaneo, toque NFC o clic. */
export const datosMedidos: DatoMedido[] = [
  {
    titulo: "Escaneos, únicos y visitas",
    texto:
      "Los totales incluyen los escaneos repetidos del mismo teléfono; los únicos cuentan una vez por dispositivo. Son tres números distintos y los tres importan.",
  },
  {
    titulo: "Día y hora",
    texto:
      "Un mapa de calor cruza las horas del día con los siete días de la semana. El cuadrado más oscuro es tu mejor momento para lanzar la promo.",
  },
  {
    titulo: "Ciudad y país",
    texto:
      "Un ranking ordenado de mayor a menor, con los escaneos de cada ciudad y su porcentaje sobre el total. Si tu zona es turística, lo vas a ver ahí.",
  },
  {
    titulo: "Dispositivo, sistema e idioma",
    texto:
      "Android, iOS, Windows o macOS, con el porcentaje de cada uno. Más el navegador y el idioma del teléfono: así sabés cómo te ven del otro lado.",
  },
  {
    titulo: "Qué producto lo generó",
    texto:
      "El cartel del mostrador, el sticker de la vidriera, la tarjeta o un QR dinámico suelto. Cada pieza con su propio número.",
  },
  {
    titulo: "En tiempo real",
    texto:
      "El dato entra en segundos. Escaneás vos para probar y ya lo ves reflejado en el panel, sin esperar al día siguiente.",
  },
];

/**
 * QUÉ HACÉS CON EL PANEL — la capa de arriba del dato crudo.
 *
 * `confirmado: false` NO se publica: el componente lo filtra. Es el mismo
 * criterio que `site.proof.locales` o `casos.autorizado`. Se pone en `true`
 * recién cuando la capacidad está verificada en my.flashtag.tech.
 */
export type CapacidadPanel = {
  titulo: string;
  texto: string;
  confirmado: boolean;
};

export const capacidadesPanel: CapacidadPanel[] = [
  {
    titulo: "Por día, por mes o por año",
    texto:
      "Cambiás la granularidad y comparás esta semana con la anterior, o este mes con el mismo mes del año pasado. En gráfico de líneas o de barras, como prefieras leerlo.",
    confirmado: true,
  },
  {
    titulo: "Las tres series, juntas o por separado",
    texto:
      "Prendés y apagás totales, únicos y visitas sobre el mismo gráfico. Ahí se ve si tenés mucha gente distinta o poca gente que escanea muchas veces.",
    confirmado: true,
  },
  {
    titulo: "Exportás a CSV o XLSX",
    texto:
      "Te llevás el dato a tu planilla para cruzarlo con tus ventas, armar tu propio reporte o pasárselo a tu agencia.",
    confirmado: false,
  },
  {
    titulo: "Reiniciás el contador",
    texto:
      "Arrancás una campaña nueva desde cero sin perder el cartel ni cambiar el QR: volvés el contador a cero y medís limpio.",
    confirmado: false,
  },
];

/** Integraciones de tracking. Solo lo que ya funciona en producción. */
export const integraciones = {
  titulo: "Conectá tus propias herramientas",
  texto:
    "El dato no se queda encerrado en FlashTag. Enchufás tu píxel y tu analítica y el tráfico de tus QR entra a tu ecosistema como cualquier otra fuente de tu marketing.",
  activas: [
    {
      nombre: "Píxel de Meta",
      texto:
        "Cada escaneo puede disparar un evento a tu píxel: armás públicos de remarketing en Instagram y Facebook con la gente que ya pasó por tu local.",
    },
    {
      nombre: "Google Analytics",
      texto:
        "Las visitas de tus QR y tus Link Pages entran a tu GA4 como una fuente más y las cruzás con el resto de tus campañas.",
    },
  ],
  proximamente: {
    titulo: "Próximamente",
    texto:
      "Estamos sumando más analítica y más integraciones de tracking a la plataforma.",
    items: ["Píxel de TikTok", "Más plataformas de anuncios"],
  },
} as const;

/** El encuadre por feature: el mismo bloque, con el foco de cada producto. */
export type AnaliticaFeature = {
  titular: string;
  bajada: string;
  /** Tres decisiones concretas que se toman con ese dato. */
  foco: string[];
};

export const analiticaPorFeature: Record<string, AnaliticaFeature> = {
  "qr-dinamicos": {
    titular: "Cada QR te dice cuántos lo escanearon, cuándo y desde dónde",
    bajada:
      "Un QR dinámico de FlashTag no solo abre un link: registra cada escaneo. Cuántos fueron, cuántas personas distintas, a qué hora, desde qué ciudad y con qué teléfono. Y como el destino lo cambiás vos, podés comparar el antes y el después de cada cambio.",
    foco: [
      "El mismo QR en la vidriera y en el mostrador: cuál de los dos rinde",
      "Si cambiar el destino movió la aguja, con el número al lado",
      "Qué flyer, packaging o campaña trajo gente de verdad",
    ],
  },
  "link-pages": {
    titular: "Visitas, clics por botón y de dónde llegó cada uno",
    bajada:
      "Tu Link Page cuenta visitas, pero sobre todo cuenta clics: qué botón se toca y cuál no toca nadie. Si nadie aprieta «Reservar», no es que no quieran reservar — es que el botón está en el lugar equivocado.",
    foco: [
      "Qué botón se lleva los clics y cuál conviene sacar",
      "Qué canal trae más visitas: el cartel, la bio de Instagram o la vidriera",
      "A qué hora entra la gente a tu página",
    ],
  },
  ruleta: {
    titular: "Cuántos giran, a qué hora y qué premio se llevan",
    bajada:
      "La ruleta no es solo un juego: es una fuente de datos. Cada giro queda registrado con su premio y su horario, así ajustás los porcentajes de suerte con evidencia y no a ojo.",
    foco: [
      "Cuántos giros por día y en qué franja horaria",
      "Qué premio sale más y cuántos se canjean de verdad",
      "Qué QR o cartel alimenta la ruleta",
    ],
  },
  metricas: {
    titular: "Analítica completa de cada escaneo, en un solo panel",
    bajada:
      "Todo lo que pasa con tus productos, tus QR, tus Link Pages, tu ruleta y tu programa de fidelidad, junto y en tiempo real. Y si querés llevarte el dato a tu propio stack, lo conectás con tu píxel y tu analítica.",
    foco: [
      "Qué producto genera más interacción y cuál conviene mover de lugar",
      "Qué horarios y qué días concentran los escaneos",
      "Cuántos clientes vuelven, giran la ruleta o entran al programa de fidelidad",
    ],
  },
};

/** El encuadre genérico, para la home y cualquier página sin feature. */
export const analitica = {
  eyebrow: "Analítica",
  titular: "Cada escaneo deja un dato. Y el dato es tuyo.",
  bajada:
    "No alcanza con que el QR funcione: necesitás saber si está funcionando. FlashTag mide cada escaneo, cada toque NFC y cada clic, y te lo muestra en un panel en tiempo real. Después lo conectás con tu píxel y tu analítica para cerrar el círculo con tus campañas.",
} as const;

export const analiticaPara = (slug: string): AnaliticaFeature | undefined =>
  analiticaPorFeature[slug];

/** Lo único publicable: nada sale al sitio sin estar confirmado en la app. */
export const capacidadesPublicadas = capacidadesPanel.filter((c) => c.confirmado);
