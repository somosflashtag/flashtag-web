/**
 * LOGOS DE CLIENTES
 *
 * Los mismos que FlashTag ya publica en la página de mayoristas de la tienda.
 * Vienen monocromos en el arena de marca, pensados para fondo violeta.
 *
 * ⚠️ AGENTS.md §5: cada logo es marca de un tercero. Se listan porque el
 * equipo los entregó para publicar y ya están online en shop.flashtag.tech.
 * Para sumar uno nuevo hace falta el mismo permiso — no alcanza con ser
 * cliente.
 *
 * `alto` es el ancho relativo que ocupa cada uno en la franja: normaliza la
 * presencia óptica, porque un logo apaisado como YPF pesa distinto que uno
 * circular como Boba's a la misma altura.
 */

export type Cliente = { nombre: string; logo: string; ancho: number };

export const clientes: Cliente[] = [
  { nombre: "YPF", logo: "/logos/ypf.webp", ancho: 92 },
  { nombre: "Mercado Libre", logo: "/logos/mercado-libre.webp", ancho: 120 },
  { nombre: "El Ateneo", logo: "/logos/el-ateneo.webp", ancho: 140 },
  { nombre: "Yenny", logo: "/logos/yenny.webp", ancho: 104 },
  { nombre: "Betular Pâtisserie", logo: "/logos/betular.webp", ancho: 140 },
  { nombre: "Almacén de Pizzas", logo: "/logos/almacen-de-pizzas.webp", ancho: 134 },
  { nombre: "Ganga Home", logo: "/logos/ganga-home.webp", ancho: 88 },
  { nombre: "Taraborelli FIAT", logo: "/logos/taraborelli-fiat.webp", ancho: 140 },
  { nombre: "UCA", logo: "/logos/uca.webp", ancho: 116 },
  { nombre: "Las Leñas", logo: "/logos/las-lenas.webp", ancho: 82 },
  { nombre: "Maru Botana", logo: "/logos/maru-botana.webp", ancho: 128 },
  { nombre: "deRentas", logo: "/logos/derentas.webp", ancho: 124 },
  { nombre: "Brasov", logo: "/logos/brasov.webp", ancho: 92 },
  { nombre: "Boba's Bubble Tea", logo: "/logos/bobas.webp", ancho: 62 },
];
