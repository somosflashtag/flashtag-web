import { articulosPublicables } from "@/content/blog";
import { casosConDetalle } from "@/content/casos";
import { features } from "@/content/features";
import { paginasRubro } from "@/content/rubros";
import { site } from "./site";

/**
 * NAVEGACIÓN — fuente única para Header, Footer y sitemap.
 *
 * ⚠️ Solo se listan rutas que EXISTEN. Un link a una página que todavía no
 * se construyó es un 404 que Google indexa y un usuario que se va.
 * Al crear una página nueva, agregarla acá y recién ahí aparece en el menú.
 *
 * Pendientes de construir (no listar hasta que existan):
 *   /recursos
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
    titulo: "Para tu rubro",
    links: paginasRubro.map((r) => ({
      label: r.nav,
      href: `/para/${r.slug}`,
    })),
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Cursos", href: "/cursos" },
      { label: "Blog", href: "/blog" },
      { label: "Activá tu FlashTag", href: "/activar-tu-flashtag" },
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
    titulo: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Política de privacidad", href: "/privacidad" },
      { label: "Ingresar a la app", href: site.urls.login, externo: true },
    ],
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
  "/terminos",
  "/privacidad",
  "/activar-tu-flashtag",
  ...features.map((f) => `/producto/${f.slug}`),
  ...paginasRubro.map((r) => `/para/${r.slug}`),
  ...articulosPublicables.map((a) => `/blog/${a.slug}`),
  ...casosConDetalle.map((c) => `/casos/${c.slug}`),
];
