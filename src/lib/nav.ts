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

/**
 * Menú principal (rediseño 2026-11): Producto y Rubros abren un panel; el
 * resto son links. Cursos, Blog, Nosotros y Contacto viven en el footer.
 * "Activá tu FlashTag" quedó en el hero y en el footer.
 */
export const navPrincipal: NavItem[] = [
  { label: "Precios", href: "/precios" },
  { label: "Casos", href: "/casos" },
  { label: "Tienda", href: site.urls.shop, externo: true },
];

/** El link de texto "Ingresar", al lado de los botones del header. */
export const ingresar: NavItem = { label: "Ingresar", href: site.urls.login, externo: true };

const feature = (slug: string) => {
  const f = features.find((x) => x.slug === slug);
  if (!f) throw new Error(`nav.ts: no existe la feature "${slug}"`);
  return { label: f.nombre, descripcion: f.corto, href: `/producto/${f.slug}`, slug: f.slug };
};

/**
 * Desplegable de "Producto": las páginas de producto agrupadas por lo que el
 * comercio quiere lograr, igual que los pilares de la home. Solo páginas que
 * existen; si se suma una en `features.ts`, se ubica acá.
 */
export const menuProducto = {
  grupos: [
    { titulo: "Que te encuentren y te elijan", items: [feature("resenas-ia"), feature("link-pages")] },
    { titulo: "Que te escriban", items: [feature("qr-dinamicos"), feature("ruleta")] },
    { titulo: "Que vuelvan y vendas más", items: [feature("fidelidad"), feature("metricas"), feature("pixeles")] },
  ],
  extra: [
    { label: "Cómo funciona", href: "/como-funciona" },
    { label: "Activá tu FlashTag", href: "/activar-tu-flashtag" },
  ] as NavItem[],
};

/** Desplegable de "Rubros": una entrada por landing de /para. */
export const menuRubros = paginasRubro.map((r) => ({
  label: r.nav,
  descripcion: r.resumen,
  href: `/para/${r.slug}`,
  glifo: r.glifo,
}));

export const columnasFooter: { titulo: string; links: NavItem[] }[] = [
  {
    titulo: "Aplicación",
    links: [
      ...features.map((f) => ({ label: f.nombre, href: `/producto/${f.slug}` })),
      { label: "Precios", href: "/precios" },
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
      { label: "Ingresar a la app", href: site.urls.login, externo: true },
    ],
  },
];

/** Van en línea al pie, después de la raya. */
export const linksLegales: NavItem[] = [
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Política de privacidad", href: "/privacidad" },
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
