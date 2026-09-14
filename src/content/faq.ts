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
];
