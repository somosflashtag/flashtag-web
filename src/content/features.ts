export type Feature = {
  slug: string;
  nombre: string;
  titular: string;
  bajada: string;
  analogia?: string;
  casos: string[];
  /** Foto del producto ilustrando la feature. */
  foto?: { src: string; alt: string };
};

export const features: Feature[] = [
  {
    slug: "qr-dinamicos",
    foto: {
      src: "/productos/cartel-google-2.webp",
      alt: "Cartel acrílico de Google de FlashTag con QR y NFC sobre una mesa",
    },
    nombre: "QR dinámicos",
    titular: "Un cartel que podés reescribir desde el celular",
    bajada:
      "El QR impreso nunca cambia, pero el destino sí. Editás el link desde el dashboard y el cartel que está pegado en la pared apunta a otro lado al instante. Sin reimprimir nada.",
    analogia:
      "Es como tener un cartel que podés reescribir desde el mostrador, sin levantarte.",
    casos: [
      "Menú que cambia por temporada",
      "La promo del día, sin imprimir nada nuevo",
      "Pedido directo por WhatsApp",
    ],
  },
  {
    slug: "link-pages",
    foto: {
      src: "/productos/pack.webp",
      alt: "Carteles, stickers y tarjetas de FlashTag con sus soportes",
    },
    nombre: "Link Pages",
    titular: "Tu minisitio, conectado al cartel de tu local",
    bajada:
      "Un lugar propio con botones a WhatsApp, Google Maps, menú, catálogo, redes y promos. Con tu marca, editable en un minuto, y con métricas de clic por cada botón.",
    casos: [
      "Reservas y turnos sin llamadas",
      "Catálogo completo desde la góndola",
      "Todas tus redes en un solo lugar",
    ],
  },
  {
    slug: "metricas",
    foto: {
      src: "/productos/cartel-tripadvisor.webp",
      alt: "Cartel de Tripadvisor de FlashTag en un local",
    },
    nombre: "Métricas",
    titular: "Qué hacer la semana que viene, no un gráfico más",
    bajada:
      "Escaneos por día, hora, dispositivo y ubicación. Clics por botón. Comparativa entre carteles. Todo apunta a tres preguntas: cuándo escanean, qué cartel funciona mejor, y qué hacés después.",
    casos: [
      "Descubrí tu hora pico real",
      "Compará qué cartel rinde más",
      "Medí si la promo funcionó",
    ],
  },
  {
    slug: "resenas-ia",
    foto: {
      src: "/productos/cartel-facebook.webp",
      alt: "Cartel de Facebook de FlashTag apoyado en un mostrador",
    },
    nombre: "Reseñas con IA",
    titular: "Respondé todas tus reseñas en 30 segundos",
    bajada:
      "Conectás tu cuenta de Google Business, FlashTag trae tus reseñas y genera una respuesta personalizada en el tono de tu marca. Vos la revisás, la ajustás si querés y la publicás.",
    casos: [
      "Respondé las de 5 estrellas sin repetirte",
      "Bajá el tono de una reseña negativa",
      "Mejorá tu posición en Google Maps",
    ],
  },
];

export const pasos = [
  {
    n: 1,
    titulo: "Elegís tu cartel",
    texto: "Carteles de mesa, tarjetas, stickers o combos. O empezás sin comprar nada.",
  },
  {
    n: 2,
    titulo: "Lo recibís con el QR impreso",
    texto: "Envíos a todo el país. Llega listo para usar, sin configuración.",
  },
  {
    n: 3,
    titulo: "Activás tu cuenta gratis",
    texto: "Escaneás tu propio cartel, creás la cuenta y ya podés editar el destino.",
  },
  {
    n: 4,
    titulo: "Medís y ajustás",
    texto: "Mirás qué pasa cada semana y cambiás lo que haga falta. Sin reimprimir.",
  },
] as const;
