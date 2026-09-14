import { QRCode } from "./QRCode";
import { cn } from "@/lib/cn";

/**
 * El cartel físico, dibujado.
 *
 * El sitio vende un objeto que llega al local, pero hasta acá eso solo se
 * contaba con palabras. Esto lo muestra: un cartel de pie, con su base, su
 * copy y su QR — lo que el cliente va a tener sobre el mostrador.
 *
 * Es una ilustración, no una foto. Cuando haya fotos de producto reales,
 * reemplazan a este componente: el mockup pierde contra una foto del cartel
 * en una mesa con café al lado.
 */

type Canal = "google" | "instagram" | "combo";

const copy: Record<Canal, { titulo: string; pie: string }> = {
  google: { titulo: "¿Nos dejás tu opinión?", pie: "Escaneá y reseñanos" },
  instagram: { titulo: "Seguinos en Instagram", pie: "Escaneá y seguinos" },
  combo: { titulo: "Conectá con nosotros", pie: "Escaneá con tu celular" },
};

function Estrellas() {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          transform={`translate(${30 + i * 8.5} 30) scale(0.55)`}
          d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z"
          fill="var(--color-gold)"
        />
      ))}
    </g>
  );
}

export function Cartel({
  canal,
  className,
}: {
  canal: Canal;
  className?: string;
}) {
  const { titulo, pie } = copy[canal];

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 160 200"
        className="w-full"
        role="img"
        aria-label={`Cartel FlashTag de ${canal}`}
      >
        <defs>
          <linearGradient id={`ig-${canal}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0a" />
            <stop offset="55%" stopColor="#d13" />
            <stop offset="100%" stopColor="#fc4" />
          </linearGradient>
        </defs>

        {/* Base: lo que lo hace un objeto y no una tarjeta flotando */}
        <ellipse cx="80" cy="190" rx="44" ry="6" fill="var(--color-ink)" opacity="0.1" />
        <path d="M56 178h48l7 9H49z" fill="var(--color-ink)" opacity="0.14" />

        {/* Placa */}
        <rect
          x="22"
          y="8"
          width="116"
          height="172"
          rx="10"
          fill="var(--color-paper)"
          stroke="var(--color-line)"
        />

        {/* Franja de canal */}
        <rect
          x="22"
          y="8"
          width="116"
          height="7"
          rx="3.5"
          fill={
            canal === "instagram"
              ? `url(#ig-${canal})`
              : canal === "combo"
                ? "var(--color-teal)"
                : "var(--color-brand)"
          }
        />

        <text
          x="80"
          y="27"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="700"
          fill="var(--color-ink)"
          fontFamily="var(--font-display)"
        >
          {titulo}
        </text>

        {canal === "google" && <Estrellas />}

        <rect
          x="44"
          y={canal === "google" ? 48 : 44}
          width="72"
          height="72"
          rx="5"
          fill="var(--color-surface)"
        />
        <g transform={`translate(50 ${canal === "google" ? 54 : 50})`}>
          <QRCode size={60} color="var(--color-ink)" />
        </g>

        <text
          x="80"
          y={canal === "google" ? 136 : 132}
          textAnchor="middle"
          fontSize="7"
          fontWeight="500"
          fill="var(--color-muted)"
        >
          {pie}
        </text>

        {/* Marca al pie, como en el producto real */}
        <text
          x="80"
          y="167"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fontFamily="var(--font-display)"
          fill="var(--color-ink)"
        >
          flash
          <tspan fill="var(--color-brand)">tag</tspan>
        </text>
      </svg>
    </div>
  );
}
