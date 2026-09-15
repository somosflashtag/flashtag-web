/**
 * Bandera argentina en SVG, para que se vea igual en todos los dispositivos
 * (el emoji depende de la fuente de cada teléfono).
 * Los colores son los de la bandera, no de la marca: es la única excepción
 * a la regla de tokens (AGENTS.md §2), y por eso viven acá y en ningún otro
 * lado.
 */
export function Bandera({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 20 14"
      width={size * 1.43}
      height={size}
      role="img"
      aria-label="Argentina"
      className="inline-block shrink-0 rounded-[2px]"
    >
      <rect width="20" height="14" fill="#74acdf" />
      <rect y="4.67" width="20" height="4.66" fill="#ffffff" />
      <circle cx="10" cy="7" r="1.6" fill="#f6b40e" />
    </svg>
  );
}
