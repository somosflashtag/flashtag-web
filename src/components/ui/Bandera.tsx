/**
 * Banderas en SVG (Argentina y Estados Unidos), para que se vean igual en
 * todos los dispositivos (el emoji depende de la fuente de cada teléfono, y
 * en Windows directamente no existe).
 * Los colores son los de cada bandera, no de la marca: es la única excepción
 * a la regla de tokens (AGENTS.md §2), y por eso viven acá y en ningún otro
 * lado.
 */
export function Bandera({ pais = "ar", size = 16, decorativa }: { pais?: "ar" | "us"; size?: number; decorativa?: boolean }) {
  const a11y = decorativa
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": pais === "ar" ? "Argentina" : "Estados Unidos" } as const);
  return (
    <svg viewBox="0 0 20 14" width={size * 1.43} height={size} className="inline-block shrink-0 rounded-[3px]" {...a11y}>
      {pais === "ar" ? (
        <>
          <rect width="20" height="14" fill="#74acdf" />
          <rect y="4.67" width="20" height="4.66" fill="#ffffff" />
          <circle cx="10" cy="7" r="1.6" fill="#f6b40e" />
        </>
      ) : (
        <>
          <rect width="20" height="14" fill="#ffffff" />
          {[0, 4, 8, 12].map((y) => (
            <rect key={y} y={y} width="20" height="2" fill="#b22234" />
          ))}
          <rect width="9" height="8" fill="#3c3b6e" />
          {[2, 4, 6].map((y) =>
            [1.8, 4.5, 7.2].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.55" fill="#ffffff" />),
          )}
        </>
      )}
    </svg>
  );
}
