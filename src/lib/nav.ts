import { features } from "@/content/features";
import { site } from "./site";

/**
 * NAVEGACIÓN — fuente única para Header, Footer y sitemap.
 *
 * ⚠️ Solo se listan rutas que EXISTEN. Un link a una página que todavía no
 * se construyó es un 404 que Google indexa y un usuario que se va.
 * Al crear una página nueva, agregarla acá y recién ahí aparece en el menú.
 *
 * Pendientes de construir (no listar hasta que existan):
 *   /recursos, /para/[rubro], /privacidad, /terminos
 */

export type NavItem = { label: string; href: string; externo?: boolean };

/** Menú principal. Máximo 5 ítems: más que eso deja de ser navegable. */
export const navPrincipal: NavItem[] = [
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Precios", href: "/precios" },
  { label: "Casos", href: "/casos" },
  { label: "Cursos", href: "/cursos" },
  { label: "Nosotros", href: "/nosotros" },
];

export const columnasFooter: { titulo: string; links: NavItem[] }[] = [
  {
    titulo: "Producto",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Precios", href: "/precios" },
      { label: "Casos", href: "/casos" },
      { label: "Tienda", href: site.urls.shop, externo: true },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Cursos", href: "/cursos" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Contacto", href: "/contacto" },
      { label: "Prensa", href: "/prensa" },
    ],
  },
  {
    titulo: "Entrar",
    links: [{ label: "Ingresar a la app", href: site.urls.login, externo: true }],
  },
];

/** Rutas propias, para el sitemap. Incluye una página por feature. */
export const rutas = [
  "/",
  "/como-funciona",
  "/precios",
  "/casos",
  "/cursos",
  "/nosotros",
  "/prensa",
  "/contacto",
  "/blog",
  ...features.map((f) => `/producto/${f.slug}`),
];
