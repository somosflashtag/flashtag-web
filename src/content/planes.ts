/**
 * PLANES — fuente única de verdad de precios (brief 1.4).
 * Cualquier página que muestre precios lee de acá. Sin excepciones.
 */

import { site } from "@/lib/site";

export type Feature = { label: string; incluido: boolean; nota?: string };

export type Ciclo = "mensual" | "anual";

export type Plan = {
  id: "free" | "starter" | "full" | "evolution";
  nombre: string;
  paraQuien: string;
  precioMensual: number;
  /** Precio publicado en pesos, por mes. Se paga con Mercado Pago. */
  precioARS: number;
  precioAnualPorMes: number | null;
  totalAnual: number | null;
  /** Total anual publicado en pesos. */
  totalAnualARS: number | null;
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
    totalAnualARS: 0,
    destacado: false,
    cta: { label: "Empezá gratis", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 3 QR dinámicos", incluido: true },
      { label: "1 Link Page", incluido: true },
      { label: "Métricas básicas", incluido: true, nota: "escaneos y clics de tus QR" },
      { label: "Píxeles de Google y Meta", incluido: false },
      { label: "Exportación de métricas a CSV", incluido: false },
      { label: "Cuentas de Google Business", incluido: false },
      { label: "Reseñas con IA", incluido: false },
      { label: "Ruleta de premios", incluido: false },
      { label: "Programa de fidelidad", incluido: false },
      { label: "Asesoramiento en SEO local", incluido: false },
      { label: "Soporte por comunidad", incluido: true },
    ],
  },
  {
    id: "starter",
    nombre: "Starter",
    paraQuien: "El local que invierte en publicidad y quiere saber si le rinde",
    precioMensual: 49,
    precioARS: 75000,
    precioAnualPorMes: 42,
    totalAnual: 499,
    totalAnualARS: 750000,
    destacado: true,
    cta: { label: "Empezar con Starter", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 20 QR dinámicos", incluido: true },
      { label: "Hasta 5 Link Pages", incluido: true },
      { label: "Métricas avanzadas de Google Business", incluido: true },
      { label: "Píxeles de Google y Meta", incluido: true },
      { label: "Exportación de métricas a CSV", incluido: true },
      { label: "1 cuenta de Google Business", incluido: true },
      { label: "100 reseñas con IA por mes", incluido: true },
      { label: "Hasta 3 ruletas de premios", incluido: true },
      { label: "Programa de fidelidad", incluido: false },
      { label: "Asesoramiento en SEO local", incluido: false },
      { label: "Soporte por email", incluido: true },
    ],
  },
  {
    id: "full",
    nombre: "Full",
    paraQuien: "Mini-cadenas y franquicias de hasta 3 locales",
    precioMensual: 99,
    precioARS: 149000,
    precioAnualPorMes: 83,
    totalAnual: 999,
    totalAnualARS: 1500000,
    destacado: false,
    cta: { label: "Empezar con Full", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 500 QR dinámicos", incluido: true },
      { label: "Hasta 50 Link Pages", incluido: true },
      { label: "Métricas avanzadas de Google Business", incluido: true },
      { label: "Píxeles de Google y Meta", incluido: true },
      { label: "Exportación de métricas a CSV", incluido: true },
      { label: "3 cuentas de Google Business", incluido: true },
      { label: "2.000 reseñas con IA por mes", incluido: true },
      { label: "Hasta 10 ruletas de premios", incluido: true },
      { label: "Programa de fidelidad", incluido: true, nota: "hasta 2.500 miembros activos" },
      { label: "Asesoramiento en SEO local", incluido: false },
      { label: "Soporte prioritario", incluido: true },
    ],
  },
  {
    id: "evolution",
    nombre: "Evolution",
    paraQuien: "Agencias y franquicias con más de 3 cuentas de Google",
    precioMensual: 299,
    // ARS y anual siguen la misma relación que Full (~1.500 ARS/USD, anual ≈ 10 meses).
    precioARS: 450000,
    precioAnualPorMes: 249,
    totalAnual: 2990,
    totalAnualARS: 4500000,
    destacado: false,
    cta: { label: "Elegir Evolution", href: "https://my.flashtag.tech/login" },
    features: [
      { label: "Productos asociados ilimitados", incluido: true },
      { label: "Hasta 2.500 QR dinámicos", incluido: true },
      { label: "Hasta 100 Link Pages", incluido: true },
      { label: "Métricas avanzadas de Google Business", incluido: true },
      { label: "Píxeles de Google y Meta", incluido: true },
      { label: "Exportación de métricas a CSV", incluido: true },
      { label: "Hasta 20 cuentas de Google Business", incluido: true },
      { label: "5.000 reseñas con IA por mes", incluido: true },
      { label: "Hasta 50 ruletas de premios", incluido: true },
      { label: "Programa de fidelidad", incluido: true, nota: "hasta 10.000 miembros activos" },
      { label: "Asesoramiento en SEO local", incluido: true },
      { label: "Soporte dedicado", incluido: true },
    ],
  },
];

/**
 * A dónde va el botón de un plan según el ciclo elegido en el toggle.
 *
 * Los planes pagos van al checkout de la app: `/suscribirse` arma la
 * suscripción de Mercado Pago para ese plan y ciclo y redirige a pagar. Si el
 * visitante no tiene cuenta, la app lo lleva a registrarse y, al confirmar el
 * mail, sigue solo hasta el pago. El plan lo activa el webhook de la pasarela
 * cuando confirma el primer cobro. Free sigue yendo al login: no hay nada que
 * cobrar.
 */
export function hrefContratar(plan: Plan, ciclo: Ciclo): string {
  if (plan.precioMensual === 0) return plan.cta.href;
  return `${site.urls.app}/suscribirse?plan=${plan.id}&ciclo=${ciclo}`;
}

export const notaFiscal =
  "Todos los precios son finales: ya incluyen IVA. Facturación A/B/C en Argentina. Pagá en dólares con tarjeta internacional (Stripe) o en pesos con Mercado Pago.";

const fmtARS = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});
export const precioARS = (n: number) => fmtARS.format(n);
