/**
 * FORMATOS DE DESCARGA — el detalle de /producto/qr-dinamicos.
 *
 * Espeja el diálogo "Guardar como…" de la app (`lib/qr-export.ts` en
 * my.flashtag.tech): los mismos siete formatos, en el mismo orden. Si allá se
 * suma o se saca uno, se cambia acá. No se lista un formato que la app no
 * genere de verdad — es la misma regla que en píxeles: el copy es la promesa.
 */

export type FormatoDescarga = {
  nombre: string;
  /** Familia, para el chip. */
  tipo: "Imagen" | "Vectorial" | "Texto";
  /** Para qué sirve y quién lo pide, en una línea. */
  para: string;
};

export const formatos: FormatoDescarga[] = [
  {
    nombre: "PNG",
    tipo: "Imagen",
    para: "Redes, web y WhatsApp. Mantiene el fondo transparente si tu diseño no tiene color.",
  },
  {
    nombre: "JPEG",
    tipo: "Imagen",
    para: "La imagen de siempre, liviana para mandar por mail.",
  },
  {
    nombre: "SVG",
    tipo: "Vectorial",
    para: "Escala de un sticker a una gigantografía sin pixelarse un milímetro.",
  },
  {
    nombre: "EPS",
    tipo: "Vectorial",
    para: "El archivo que te pide la imprenta. Abre en Illustrator y en Corel sin convertir nada.",
  },
  {
    nombre: "PDF",
    tipo: "Vectorial",
    para: "Universal: se imprime igual en la esquina y en una gráfica grande.",
  },
  {
    nombre: "SVG Tiny",
    tipo: "Vectorial",
    para: "Vectorial simplificado, para plotters de corte y software viejo.",
  },
  {
    nombre: "ASCII",
    tipo: "Texto",
    para: "El QR en texto plano, para un ticket térmico o una terminal.",
  },
];

export type PuntoImprenta = { titulo: string; texto: string };

/** Los tres detalles que hacen que el archivo no vuelva de la gráfica. */
export const puntosImprenta: PuntoImprenta[] = [
  {
    titulo: "CMYK de verdad",
    texto:
      "El EPS y el PDF salen siempre en modo CMYK, que es lo que espera la máquina de imprenta, y el JPEG te deja elegir entre RGB y CMYK. El PNG y el SVG son RGB por definición del formato: ahí no te hacemos elegir algo que el archivo no puede guardar.",
  },
  {
    titulo: "La medida, en milímetros",
    texto:
      "En los vectoriales elegís el tamaño impreso (30, 50, 100, 150, 300 mm o el que quieras). En PNG y JPEG elegís los píxeles: 512, 1024, 2048, 4096 o una medida propia.",
  },
  {
    titulo: "Zona de silencio incluida",
    texto:
      "Todo archivo sale con el margen blanco que pide la norma ISO. Es lo primero que se come un diseño apretado y la razón número uno por la que un QR impreso no escanea.",
  },
];
