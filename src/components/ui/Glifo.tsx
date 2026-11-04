/**
 * Íconos de línea para el rediseño, en currentColor.
 *
 * El diseño original usaba glifos Unicode (⌖ ⛨ ⚔ ⌗ ♛…). Según la fuente del
 * sistema, varios salen como un cuadradito en Android. Acá son SVG: se ven
 * igual en todos lados y toman el color del contenedor.
 */

export type GlifoId =
  | "ubicacion"
  | "estrella"
  | "qr"
  | "corona"
  | "objetivo"
  | "escudo"
  | "espadas"
  | "chispa"
  | "persona"
  | "link"
  | "ruleta"
  | "tarjeta"
  | "barras"
  | "infinito"
  | "plata"
  | "repetir"
  | "cartel"
  | "celular"
  | "torta"
  | "teclado"
  | "trofeo"
  | "wifi"
  | "porcentaje"
  | "capas"
  | "informe"
  | "taza"
  | "bolsa"
  | "tijera"
  | "ticket"
  | "menu"
  | "sticker"
  | "google"
  | "alerta"
  | "check";

const p = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const trazos: Record<GlifoId, React.ReactNode> = {
  ubicacion: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  estrella: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  qr: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2.5v2.5H14zM18 18h2v2h-2zM18 14h2M14 18v2" />
    </>
  ),
  corona: <path d="M4 17.5 3 7.5l5 4 4-6 4 6 5-4-1 10zM5 20.5h14" />,
  objetivo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </>
  ),
  escudo: <path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6zM9 12l2.2 2.2L15.5 10" />,
  espadas: <path d="M4 4l9 9M4 4v4M4 4h4M20 4l-9 9M20 4v4M20 4h-4M7.5 16.5l-3 3M16.5 16.5l3 3M9 15l-2-2M15 15l2-2" />,
  chispa: <path d="M12 3c.5 4.6 3.4 7.5 8 8-4.6.5-7.5 3.4-8 8-.5-4.6-3.4-7.5-8-8 4.6-.5 7.5-3.4 8-8z" />,
  persona: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2" />,
  ruleta: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17M6 6l12 12M18 6 6 18" />
    </>
  ),
  tarjeta: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2.5" />
      <path d="M3 10h18M7 14.5h4" />
    </>
  ),
  barras: <path d="M5 20V12M10 20V6M15 20v-9M20 20V4M3 20.5h18" />,
  infinito: <path d="M8 8.5c-2 0-3.5 1.6-3.5 3.5S6 15.5 8 15.5c3.5 0 4.5-7 8-7 2 0 3.5 1.6 3.5 3.5S18 15.5 16 15.5c-3.5 0-4.5-7-8-7z" />,
  plata: <path d="M12 3v18M16.5 7.5C16 6 14.3 5 12 5 9.5 5 7.5 6.3 7.5 8.3c0 4.7 9 2.6 9 7.4 0 2-2 3.3-4.5 3.3-2.5 0-4.3-1.1-4.8-2.8" />,
  repetir: <path d="M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" />,
  cartel: (
    <>
      <rect x="5" y="3" width="14" height="14" rx="2" />
      <rect x="8.5" y="6.5" width="7" height="7" rx="1" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  celular: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  torta: <path d="M4 20.5h16M5 20.5v-7h14v7M5 16.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 5 0M12 13.5v-3M12 7.5c-1-.8-1-2 0-3.5 1 1.5 1 2.7 0 3.5z" />,
  teclado: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <path d="M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" strokeWidth="2.6" />
    </>
  ),
  trofeo: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20.5h7M9.5 17h5" />,
  wifi: <path d="M3.5 9.5a12 12 0 0 1 17 0M6.5 12.5a7.5 7.5 0 0 1 11 0M9.5 15.5a3.3 3.3 0 0 1 5 0M12 19h.01" />,
  porcentaje: <path d="M18 6 6 18M7.5 9.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM16.5 18.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />,
  capas: <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8zM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />,
  informe: (
    <>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4M9 16v-3M12 16v-5M15 16v-2" />
    </>
  ),
  taza: <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M7 3.5c-.6.8-.6 1.7 0 2.5M11 3.5c-.6.8-.6 1.7 0 2.5" />,
  bolsa: (
    <>
      <path d="M5.5 8.5h13l-.9 11a1.5 1.5 0 0 1-1.5 1.4H7.9a1.5 1.5 0 0 1-1.5-1.4z" />
      <path d="M8.5 8.5V7a3.5 3.5 0 0 1 7 0v1.5" />
    </>
  ),
  tijera: (
    <>
      <circle cx="6.5" cy="7" r="2.5" />
      <circle cx="6.5" cy="17" r="2.5" />
      <path d="M8.6 8.4 20 17M8.6 15.6 20 7" />
    </>
  ),
  ticket: <path d="M3 8a2 2 0 0 0 2-2h14a2 2 0 0 0 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 0-2 2H5a2 2 0 0 0-2-2v-2a2 2 0 0 0 0-4zM10 6v12" />,
  menu: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
    </>
  ),
  sticker: <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8l-6 6H6a2 2 0 0 1-2-2zM20 14h-4a2 2 0 0 0-2 2v4" />,
  google: <path d="M19.5 12.2c0-.6-.1-1.1-.2-1.7H12v3.3h4.2a3.7 3.7 0 0 1-1.6 2.4M19.5 12.2A7.5 7.5 0 1 1 17 6.6l-2.3 2.2A4.3 4.3 0 1 0 14.6 16" />,
  alerta: <path d="M12 4 2.8 19.5h18.4zM12 10v4.5M12 17h.01" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export function Glifo({ id, size = 18, className }: { id: GlifoId; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" className={className} {...p}>
      {trazos[id]}
    </svg>
  );
}
