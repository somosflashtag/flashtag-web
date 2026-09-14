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
    pregunta: "¿Puedo cambiar el destino del QR después de imprimirlo?",
    respuesta:
      "Sí, esa es justamente la idea. El QR impreso nunca cambia, pero desde el dashboard editás a dónde apunta y el cambio es instantáneo. No tenés que reimprimir nada.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Cómo funcionan las reseñas con IA?",
    respuesta:
      "Conectás tu cuenta de Google Business Profile, FlashTag trae tus reseñas y genera una respuesta personalizada en el tono de tu marca. Vos la revisás, la ajustás si querés y la publicás.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Necesito saber de tecnología para usarlo?",
    respuesta:
      "No. Si sabés usar Instagram, sabés usar FlashTag. Todo se edita desde el celular y el soporte es por WhatsApp, en castellano.",
    mostrarEn: ["home"],
  },
  {
    pregunta: "¿Los precios incluyen IVA?",
    respuesta:
      "No. Los precios son sin IVA (21%). Emitimos factura A, B o C en Argentina. Pagás con tarjeta internacional vía Stripe o en pesos con Mercado Pago al cambio MEP del día.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Hay permanencia o puedo cancelar cuando quiera?",
    respuesta:
      "No hay permanencia. Cancelás cuando quieras desde tu cuenta y seguís usando el plan hasta el final del período que ya pagaste.",
    mostrarEn: ["home", "precios"],
  },
  {
    pregunta: "¿Qué pasa si tengo más de 30 comercios?",
    respuesta:
      "Ahí entrás en Enterprise: armamos un plan a medida con multi-cuenta, reportes consolidados y soporte dedicado. Escribinos y lo vemos.",
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
      "Usamos el dólar MEP del día de la facturación. El valor equivalente en pesos lo mostramos en la web y en el checkout antes de cobrarte.",
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
      "Todavía no está disponible: es lo próximo que estamos construyendo. La idea es que tus clientes acumulen puntos por compra o visita y los canjeen por beneficios que configurás vos, todo vía QR desde el celular y sin apps extras.",
    mostrarEn: ["precios"],
  },
];
