/**
 * CURSOS — contenido migrado del sitio de Framer.
 *
 * ⚠️ La "Certificación FlashTag (colaboración UBA)" lleva `avalPendiente`.
 * Nombrar a la Universidad de Buenos Aires requiere autorización institucional
 * escrita: que alguien del equipo dé clase ahí no equivale a un aval de la UBA
 * a FlashTag. Mientras el flag esté activo, el curso se muestra sin mención
 * a la universidad.
 */

export type Nivel = "Principiante" | "Básico" | "Intermedio" | "Avanzado";

export type Curso = {
  slug: string;
  titulo: string;
  nivel: Nivel;
  modulos: number;
  horas: number;
  /** false = "Próximamente", sin CTA activo. */
  disponible: boolean;
  /** Se muestra solo si el aval institucional está confirmado. */
  institucion?: { nombre: string; avalPendiente: boolean };
};

export const cursos: Curso[] = [
  {
    slug: "marketing-digital-para-comercios",
    titulo: "Marketing digital para comercios: de cero a resultados",
    nivel: "Principiante",
    modulos: 6,
    horas: 3,
    disponible: true,
  },
  {
    slug: "qr-dinamicos",
    titulo: "QR dinámicos: cómo convertir cada escaneo en un cliente",
    nivel: "Básico",
    modulos: 4,
    horas: 2,
    disponible: true,
  },
  {
    slug: "google-business-profile",
    titulo: "Google Business Profile: optimizá tu ficha y conseguí más clientes",
    nivel: "Intermedio",
    modulos: 5,
    horas: 2.5,
    disponible: true,
  },
  {
    slug: "certificacion-flashtag",
    titulo: "Certificación FlashTag: Marketing para Comercios",
    nivel: "Avanzado",
    modulos: 12,
    horas: 20,
    disponible: false,
    institucion: { nombre: "UBA", avalPendiente: true },
  },
  {
    slug: "programa-de-fidelidad",
    titulo: "Programa de fidelidad: diseñá tu estrategia de retención",
    nivel: "Intermedio",
    modulos: 4,
    horas: 2,
    disponible: false,
  },
];
