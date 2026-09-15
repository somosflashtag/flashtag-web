import type { MedioDePago } from "@/content/pagos";

/**
 * Chips de medios de pago para el footer.
 *
 * Se dibujan en SVG inline y no como PNG: el footer está sobre violeta
 * profundo y un PNG con fondo blanco recortado se ve sucio a cualquier
 * densidad. Cada chip es una pastilla blanca de 32px de alto — el mismo
 * ritmo que usan los checkouts.
 *
 * ⚠️ Son reconstrucciones tipográficas de los wordmarks, no los archivos
 * oficiales de cada marca. Cuando lleguen los assets de marca (Mercado
 * Pago y Stripe los publican en sus brand kits), se reemplaza el interior
 * de cada <svg> y nada más cambia.
 */

const ALTO = 32;

function Chip({
  ancho,
  label,
  fondo = "#ffffff",
  children,
}: {
  ancho: number;
  label: string;
  fondo?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${ancho} ${ALTO}`}
      width={ancho}
      height={ALTO}
      role="img"
      aria-label={label}
      className="h-8 w-auto"
    >
      <rect width={ancho} height={ALTO} rx="5" fill={fondo} />
      {children}
    </svg>
  );
}

/** Wordmark centrado dentro del chip. */
function Word({
  x,
  ancho,
  fill,
  size,
  children,
  italic = false,
  tracking = 0,
}: {
  x?: number;
  ancho: number;
  fill: string;
  size: number;
  children: string;
  italic?: boolean;
  tracking?: number;
}) {
  return (
    <text
      x={x ?? ancho / 2}
      y={ALTO / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fill={fill}
      fontFamily="var(--font-poppins), system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
      fontSize={size}
      fontWeight="700"
      fontStyle={italic ? "italic" : "normal"}
      letterSpacing={tracking}
    >
      {children}
    </text>
  );
}

const marcas: Record<MedioDePago, React.ReactNode> = {
  mercadopago: (
    <Chip ancho={78} label="Mercado Pago">
      {/* El wordmark va en dos líneas, como el original. */}
      <text
        x="39"
        y="13"
        textAnchor="middle"
        fill="#009EE3"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="700"
      >
        mercado
      </text>
      <text
        x="39"
        y="24.5"
        textAnchor="middle"
        fill="#2D3277"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="700"
      >
        pago
      </text>
    </Chip>
  ),

  stripe: (
    <Chip ancho={62} label="Stripe" fondo="#635BFF">
      <Word ancho={62} fill="#ffffff" size={13} tracking={-0.3}>
        stripe
      </Word>
    </Chip>
  ),

  visa: (
    <Chip ancho={48} label="Visa">
      <Word ancho={48} fill="#1434CB" size={13} italic tracking={0.3}>
        VISA
      </Word>
    </Chip>
  ),

  mastercard: (
    <Chip ancho={48} label="Mastercard">
      <circle cx="20" cy="16" r="8" fill="#EB001B" />
      <circle cx="28" cy="16" r="8" fill="#F79E1B" />
      {/* La lente de intersección: es lo que hace leer el logo. */}
      <path d="M24 9.07a8 8 0 0 1 0 13.86 8 8 0 0 1 0-13.86Z" fill="#FF5F00" />
    </Chip>
  ),

  amex: (
    <Chip ancho={48} label="American Express" fondo="#1F72CD">
      <text
        x="24"
        y="13"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.2"
      >
        AM
      </text>
      <text
        x="24"
        y="23.5"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="var(--font-poppins), system-ui, sans-serif"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.2"
      >
        EX
      </text>
    </Chip>
  ),

  diners: (
    <Chip ancho={48} label="Diners Club">
      <circle cx="24" cy="16" r="9" fill="#0079BE" />
      <circle cx="24" cy="16" r="5.5" fill="#ffffff" />
      <rect x="23.2" y="10.5" width="1.6" height="11" fill="#0079BE" />
    </Chip>
  ),
};

export function PaymentMark({ medio }: { medio: MedioDePago }) {
  return marcas[medio];
}
