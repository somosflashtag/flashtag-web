/**
 * PLANES — fuente única de verdad de precios (brief 1.4).
 * Cualquier página que muestre precios lee de acá. Sin excepciones.
 */

export type Feature = { label: string; incluido: boolean; nota?: string };

export type Plan = {
  id: "free" | "starter" | "full";
  nombre: string;
  paraQuien: string;
  precioMensual: number;
  /** Precio publicado en pesos, por mes. Se paga con Mercado Pago. */
  precioARS: number;
  precioAnualPorMes: number | null;
  totalAnual: number | null;
  destacado: boolean;
  cta: { label: string; href: string };
  features: Feature[];
};

export const DESCUENTO_ANUAL = 0.15;

export const planes: Plan[] = [
  {
    id: "free",
    nombre: "Free",
    paraQuien: "Clientes que compraron un cartel FlashTag",
    precioMensual: 0,
    precioARS: 0,
    precioAnualPorMes: 0,
    totalAnual: 0,
    destacado: false,
    cta: { label: "Empezá gratis", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 3 QR dinámicos", incluido: true },
      { label: "1 Link Page", incluido: true },
      { label: "Métricas básicas", incluido: true },
      { label: "Cuentas de Google Business", incluido: false },
      { label: "Reseñas con IA", incluido: false },
      { label: "Ruleta de premios", incluido: false },
      { label: "Programa de fidelidad", incluido: false },
      { label: "Soporte por comunidad", incluido: true },
    ],
  },
  {
    id: "starter",
    nombre: "Starter",
    paraQuien: "Un local único que quiere profesionalizarse",
    precioMensual: 49,
    precioARS: 75000,
    precioAnualPorMes: 42,
    totalAnual: 500,
    destacado: true,
    cta: { label: "Empezar con Starter", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 20 QR dinámicos", incluido: true },
      { label: "Hasta 5 Link Pages", incluido: true },
      { label: "Métricas avanzadas de Google Business", incluido: true },
      { label: "1 cuenta de Google Business", incluido: true },
      { label: "100 reseñas con IA por mes", incluido: true },
      { label: "Ruleta de premios", incluido: true },
      { label: "Programa de fidelidad", incluido: false },
      { label: "Soporte por email", incluido: true },
    ],
  },
  {
    id: "full",
    nombre: "Full",
    paraQuien: "Mini-cadenas, franquicias y agencias",
    precioMensual: 99,
    precioARS: 149000,
    precioAnualPorMes: 84,
    totalAnual: 1009,
    destacado: false,
    cta: { label: "Empezar con Full", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 500 QR dinámicos", incluido: true },
      { label: "Hasta 100 Link Pages", incluido: true },
      { label: "Métricas avanzadas de Google Business", incluido: true },
      { label: "3 cuentas de Google Business", incluido: true },
      { label: "2.000 reseñas con IA por mes", incluido: true },
      { label: "Ruleta de premios", incluido: true },
      { label: "Programa de fidelidad", incluido: true },
      { label: "Soporte prioritario", incluido: true },
    ],
  },
];

export const notaFiscal =
  "Precios sin IVA (21%). Facturación A/B/C en Argentina. Pagá en dólares con tarjeta internacional (Stripe) o en pesos con Mercado Pago.";

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
export const precioARS = (n: number) => fmtARS.format(n);
