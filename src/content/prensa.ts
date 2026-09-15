/**
 * PRENSA
 *
 * ⚠️ REGLA (AGENTS.md §5): una mención se publica solo con `verificada: true`,
 * y verificada significa que existe la URL de la nota publicada. El nombre y
 * el logo de un medio no se usan sin eso: afirmar cobertura que no existe es
 * publicidad engañosa además de uso indebido de marca ajena.
 *
 * Las cuatro menciones vienen del sitio de Framer, ninguna traía URL.
 * Todas arrancan en `false`. Para publicar una: pegar la `url` real y poner
 * `verificada: true`. Sin url, el flag no debe tocarse.
 */

export type Mencion = {
  medio: string;
  fecha: string;
  titulo: string;
  /** URL de la nota publicada. Sin esto no se publica. */
  url: string | null;
  verificada: boolean;
};

export const menciones: Mencion[] = [
  {
    medio: "La Nación",
    fecha: "Marzo 2026",
    titulo: "Las startups argentinas que están transformando el comercio local",
    url: null,
    verificada: false,
  },
  {
    medio: "Infobae",
    fecha: "Enero 2026",
    titulo:
      "FlashTag: el QR inteligente que usan más de 1.500 locales en Argentina",
    url: null,
    verificada: false,
  },
  {
    medio: "Clarín Economía",
    fecha: "Noviembre 2025",
    titulo:
      "Marketing digital para todos: la app que democratiza las herramientas de las grandes marcas",
    url: null,
    verificada: false,
  },
  {
    medio: "Startup Buenos Aires",
    fecha: "Septiembre 2025",
    titulo:
      "Betular Patisserie y El Ateneo entre los primeros clientes premium de FlashTag",
    url: null,
    verificada: false,
  },
];

export const mencionesPublicables = menciones.filter(
  (m) => m.verificada && m.url,
);

/** Kit de prensa. Cada pieza se lista solo cuando el archivo existe. */
export type PiezaKit = { label: string; href: string | null };

export const kitPrensa: PiezaKit[] = [
  { label: "Logo FlashTag (SVG)", href: "/marca/logo-flashtag.svg" },
  { label: "Logo FlashTag en blanco (SVG)", href: "/marca/logo-flashtag-blanco.svg" },
  { label: "Fotos del equipo", href: null },
  { label: "Boilerplate de empresa", href: null },
  { label: "Fact sheet", href: null },
];

export const kitPublicable = kitPrensa.filter((p) => p.href);
