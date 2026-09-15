/**
 * PROGRAMA DE FIDELIDAD — modalidades y herramientas.
 *
 * Ocho tipos de tarjeta (una por modelo de negocio) y cuatro herramientas de
 * retención que funcionan sobre cualquiera de ellas. Cada tarjeta se dibuja
 * en código en components/app/WalletCard.tsx con un comercio ficticio.
 */

export type ColorTarjeta = "ink" | "brand" | "teal" | "coral" | "gold" | "surface";

export type TipoTarjeta = {
  id: string;
  nombre: string;
  /** Qué resuelve, en una línea. */
  para: string;
  bullets: string[];
  tarjeta: {
    negocio: string;
    color: ColorTarjeta;
    arriba: { label: string; valor: string };
    /** Texto de la franja central. `sellos` dibuja la grilla en vez de texto. */
    franja?: string;
    sellos?: { total: number; hechos: number };
    campos: [{ label: string; valor: string }, { label: string; valor: string }];
  };
};

export const tiposDeTarjeta: TipoTarjeta[] = [
  {
    id: "sellos",
    nombre: "Sellos",
    para: "La tarjeta de sellos de siempre, sin cartón.",
    bullets: [
      "Un sello por compra o visita, y un premio al completar",
      "De 1 a 30 sellos: vos elegís cuántos",
      "Sello doble en horario valle para llenar el local",
      "Fácil de validar en caja",
    ],
    tarjeta: {
      negocio: "Spa Río",
      color: "surface",
      arriba: { label: "Miembro", valor: "Marina G." },
      sellos: { total: 10, hechos: 4 },
      campos: [
        { label: "Sellos para el premio", valor: "6" },
        { label: "Premios disponibles", valor: "1" },
      ],
    },
  },
  {
    id: "cashback",
    nombre: "Cashback",
    para: "Puntos por cada compra que se usan como plata.",
    bullets: [
      "Puntos por cada compra, canjeables como pago",
      "Saldo siempre visible en la tarjeta",
      "Niveles de Silver a Gold con más beneficios",
    ],
    tarjeta: {
      negocio: "Flor Market",
      color: "teal",
      arriba: { label: "Puntos", valor: "4.500" },
      franja: "Silver 3% · Gold 5% y envío gratis",
      campos: [
        { label: "Cashback", valor: "3%" },
        { label: "Nivel", valor: "Silver" },
      ],
    },
  },
  {
    id: "descuento",
    nombre: "Descuento",
    para: "Un porcentaje fijo para tus clientes de siempre.",
    bullets: [
      "Tarjeta de descuento clásica, con uno o varios niveles",
      "Descuento inmediato en caja",
      "Fácil de usar para el cliente y para tu equipo",
    ],
    tarjeta: {
      negocio: "Iconic",
      color: "coral",
      arriba: { label: "Nivel", valor: "Silver" },
      franja: "Nuevos ingresos · zapatos, carteras, abrigos",
      campos: [
        { label: "Descuento", valor: "5%" },
        { label: "Estado", valor: "Activo" },
      ],
    },
  },
  {
    id: "cupon",
    nombre: "Cupón",
    para: "Para traer clientes nuevos y convertirlos en habituales.",
    bullets: [
      "Cupones de un solo uso para atraer clientes nuevos",
      "Una serie de push para calentar al que todavía no compró",
      "Hacé crecer tu lista de contactos",
      "Ideal para anuncios en Meta y Google",
    ],
    tarjeta: {
      negocio: "Stretch",
      color: "ink",
      arriba: { label: "Válido hasta", valor: "24/10" },
      franja: "Clase de stretching gratis todos los martes",
      campos: [
        { label: "Clase gratis", valor: "Stretching" },
        { label: "Usos", valor: "1" },
      ],
    },
  },
  {
    id: "recompensas",
    nombre: "Recompensas",
    para: "Puntos que se canjean por premios escalonados.",
    bullets: [
      "Puntos por compra, canjeables por premios",
      "1 punto: regalo de bienvenida · 2: café gratis · 3: medialuna · 10: cupón de $10.000",
      "Tarifa especial para la primera visita",
    ],
    tarjeta: {
      negocio: "Bisou",
      color: "brand",
      arriba: { label: "Puntos", valor: "105" },
      franja: "$1.000 = 10 puntos",
      campos: [
        { label: "Premio", valor: "Cupón $10.000" },
        { label: "Próximo premio en", valor: "95" },
      ],
    },
  },
  {
    id: "membresia",
    nombre: "Membresía",
    para: "Vendé suscripciones y cobralas todos los meses.",
    bullets: [
      "Suscripciones a productos o servicios",
      "Cobro con Stripe o Mercado Pago",
      "Límite de uso semanal o mensual",
      "Niveles de tarifa con beneficios extra",
    ],
    tarjeta: {
      negocio: "Studio Om",
      color: "gold",
      arriba: { label: "Plan", valor: "Ilimitado" },
      franja: "Yoga ilimitado · hasta 4 clases por semana",
      campos: [
        { label: "Esta semana", valor: "2 de 4" },
        { label: "Renueva", valor: "30/10" },
      ],
    },
  },
  {
    id: "gift",
    nombre: "Gift card",
    para: "Saldo prepago para regalar, con el saldo a la vista.",
    bullets: [
      "Tarjetas prepagas con saldo en pesos",
      "Se canjea de una vez o en varias visitas",
      "Saldo visible en la tarjeta",
    ],
    tarjeta: {
      negocio: "Abi Nails",
      color: "coral",
      arriba: { label: "Saldo", valor: "$18.000" },
      franja: "Regalá una sesión",
      campos: [
        { label: "Gift card N.º", valor: "3777248" },
        { label: "Vence", valor: "Sin vencimiento" },
      ],
    },
  },
  {
    id: "multipass",
    nombre: "Multipass",
    para: "Paquetes de sesiones o visitas, con el contador en la tarjeta.",
    bullets: [
      "Vendé packs de sesiones y construí relación a largo plazo",
      "Vos controlás cuántas visitas muestra la tarjeta",
    ],
    tarjeta: {
      negocio: "Trimi",
      color: "ink",
      arriba: { label: "Cortes", valor: "3 de 5" },
      sellos: { total: 5, hechos: 3 },
      campos: [
        { label: "Pack", valor: "5 cortes" },
        { label: "Restan", valor: "2" },
      ],
    },
  },
];

export type Herramienta = {
  id: "push" | "cumple" | "referidos" | "geo";
  nombre: string;
  titular: string;
  bullets: string[];
};

export const herramientas: Herramienta[] = [
  {
    id: "push",
    nombre: "Push gratis",
    titular: "Mandá mensajes push sin costo",
    bullets: [
      "Contales sobre productos nuevos, ofertas y eventos sin pagar SMS ni mails",
      "Llega directo al teléfono, sobre la tarjeta que ya guardaron",
    ],
  },
  {
    id: "cumple",
    nombre: "Cumpleaños",
    titular: "Saludalos en su cumpleaños",
    bullets: [
      "Un saludo automático con una oferta especial para la fecha",
      "Programalo unos días antes para que puedan planear la visita",
    ],
  },
  {
    id: "referidos",
    nombre: "Referidos",
    titular: "Que tus clientes traigan clientes",
    bullets: [
      "Cada cliente comparte su link o QR personal y gana puntos",
      "El bonus se acredita automáticamente al que refiere y al nuevo",
      "Podés darlo recién cuando el nuevo hace su primera compra",
    ],
  },
  {
    id: "geo",
    nombre: "Notificaciones por cercanía",
    titular: "Avisales cuando pasan cerca",
    bullets: [
      "Un mensaje automático cuando el cliente está a 100 metros de tu local",
      "Hasta 10 direcciones, para cadenas y varias sucursales",
    ],
  },
];
