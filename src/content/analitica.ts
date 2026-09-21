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
      "Cuántas veces se escaneó, cuántas personas distintas lo hicieron y cuántas terminaron entrando. Son tres números diferentes y los tres importan.",
  },
  {
    titulo: "Día y hora",
    texto:
      "A qué hora se mueve tu local y qué día rinde más. El dato que te dice cuándo conviene lanzar la promo.",
  },
  {
    titulo: "Ciudad y país",
    texto:
      "De dónde viene la gente que te escanea. Si tu zona es turística o si tus clientes son del barrio, lo vas a ver en el mapa.",
  },
  {
    titulo: "Dispositivo, sistema e idioma",
    texto:
      "Android o iPhone, navegador e idioma del teléfono. Sirve para saber cómo te están viendo del otro lado.",
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
