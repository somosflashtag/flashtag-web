export type FaqItem = {
  pregunta: string;
  respuesta: string;
  mostrarEn: ("home" | "precios")[];
};

export const faqs: FaqItem[] = [
  {
    pregunta: "¿Necesito comprar un cartel para usar FlashTag?",
    respuesta:
      "No. Podés crear tu cuenta gratis y usar QR dinámicos y tu Link Page sin comprar nada. El cartel te sirve para que tus clientes escaneen dentro del local, pero no es obligatorio.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Puedo usar el cartel de Google para otra cosa?",
    respuesta:
      "No. Cada cartel tiene un solo uso: el de Google es solo para que te dejen reseñas, el de Instagram solo para que te sigan en Instagram y el de WhatsApp solo para iniciar una conversación por WhatsApp. Si querés un QR que apunte a lo que vos decidas (una promo, un menú, un formulario), eso es un QR dinámico: lo creás desde la app y lo cambiás cuando quieras.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Cómo funcionan las reseñas con IA?",
    respuesta:
      "Conectás tu cuenta de Google Business Profile y FlashTag responde tus reseñas automáticamente con la voz de tu marca: vos definís el tono, el saludo y las palabras que usás. Podés aprobar cada respuesta antes de publicar o dejar que salgan solas.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Qué datos veo de cada escaneo?",
    respuesta:
      "Escaneos totales, escaneos únicos y visitas; un mapa de calor de las horas cruzadas con los días de la semana; el ranking de ciudades y países con su porcentaje; el dispositivo, el sistema operativo y el idioma del teléfono; y qué producto lo generó (el cartel del mostrador, el sticker de la vidriera, la tarjeta o un QR dinámico). Lo mirás por día, por mes o por año, y todo entra en tiempo real: escaneás para probar y ya lo ves en el panel. Si querés trabajarlo por tu cuenta, exportás todo a CSV.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Puedo conectar mi píxel de Meta o mi Google Analytics?",
    respuesta:
      "Sí. Podés conectar tu píxel de Meta para armar públicos de remarketing en Instagram y Facebook con la gente que escaneó en tu local, y tu Google Analytics para que el tráfico de tus QR y tus Link Pages entre como una fuente más de tu marketing. Ambas se habilitan desde el plan Starter, igual que la exportación a CSV. Próximamente sumamos más integraciones de analítica, como el píxel de TikTok.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Necesito saber de tecnología para usarlo?",
    respuesta:
      "No. Si sabés usar Instagram, sabés usar FlashTag. Todo se edita desde el celular y el soporte es por WhatsApp, en castellano.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Cómo se paga y qué factura recibo?",
    respuesta:
      "Emitimos factura A, B o C en Argentina. Pagás en dólares con tarjeta internacional vía Stripe o en pesos con Mercado Pago.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Hay permanencia o puedo cancelar cuando quiera?",
    respuesta:
      "No hay permanencia. Cancelás cuando quieras desde tu cuenta y seguís usando el plan hasta el final del período que ya pagaste.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Qué pasa si tengo más de 20 comercios?",
    respuesta:
      "Armamos un plan a medida: multicuenta, reportes consolidados por cliente y soporte dedicado, pensado para agencias de marketing y grandes franquicias. Escribinos y lo vemos.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Cuándo conviene Evolution en vez de Full?",
    respuesta:
      "Cuando manejás más de 3 cuentas de Google Business, ya sea porque sos agencia o porque tu franquicia creció. Evolution suma hasta 5.000 reseñas con IA por mes, fidelidad hasta 10.000 miembros activos y asesoramiento en SEO local para que cada ficha rankee mejor en su zona.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Puedo cambiar de plan más adelante?",
    respuesta:
      "Sí, subís o bajás de plan cuando quieras desde tu cuenta. El cambio se prorratea sobre el período en curso.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Qué pasa con mis QR si cancelo el plan pago?",
    respuesta:
      "Tus QR siguen funcionando en el plan Free. Si tenías más QR o Link Pages que los que incluye Free, los excedentes quedan pausados — no se borran. Si volvés a un plan pago, se reactivan.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Cómo se calcula el precio en pesos?",
    respuesta:
      "El precio en pesos está publicado en cada plan y es el que ves en el checkout antes de confirmar. Lo revisamos cuando se mueve el tipo de cambio, pero nunca pagás algo distinto de lo que viste.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Puedo probar antes de pagar?",
    respuesta:
      "Sí. El plan Free es gratis para siempre e incluye lo básico para que uses la app y decidas después si querés pasar a uno pago. No pedimos tarjeta.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Qué incluye el plan Free para siempre?",
    respuesta:
      "Productos asociados ilimitados, 3 QR dinámicos, 1 Link Page y métricas básicas. No requiere tarjeta de crédito.",
    mostrarEn: ["precios"],
  },
  {
    pregunta: "¿Cómo conecto mi Google Business Profile?",
    respuesta:
      "Desde la app, en la sección Reseñas, hacés clic en \u201cConectar Google\u201d. Te lleva al login de Google con los permisos necesarios. En un par de minutos ves todas las reseñas de tus fichas en el dashboard.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Cómo funciona el programa de fidelidad?",
    respuesta:
      "Tu cliente no descarga ninguna app. Escanea el cartel y guarda tu tarjeta de fidelidad, con tu logo y el esquema de puntos que elegiste, en Apple Wallet o en la billetera de Android. Suma visitas o puntos con el mismo cartel de siempre y canjea los premios que configurás vos. Sin imprimir nada, siempre a mano. Está incluido en el plan Full.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Qué es la ruleta de premios?",
    respuesta:
      "Un juego al que se llega escaneando el QR: el cliente gira y se lleva un premio. Es completamente personalizable: los premios, los colores de la ruleta y el porcentaje de suerte de cada casillero los elegís vos. Está incluida desde el plan Starter.",
    mostrarEn: ["precios"],
  },
];
