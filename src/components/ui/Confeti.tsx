import { cn } from "@/lib/cn";

/**
 * Confeti de marca: cuadraditos redondeados en los acentos del manual, que
 * flotan despacio alrededor de un bloque. Puro adorno (aria-hidden), sin JS;
 * el movimiento es `.conf` en globals.css y se apaga con reduced-motion.
 *
 * Cada pieza: posición en clases (`left-[4%] top-10`), tamaño en px, color
 * por token y giro inicial.
 */
export type Pieza = {
  pos: string;
  lado: number;
  tono: "gold" | "coral" | "teal" | "brand" | "paper";
  giro?: number;
  /** Solo desde tablet: en el celular estorba al texto. */
  soloMd?: boolean;
};

const tonos: Record<Pieza["tono"], string> = {
  gold: "text-gold",
  coral: "text-coral",
  teal: "text-teal",
  brand: "text-brand",
  paper: "text-paper",
};

export function Confeti({ piezas }: { piezas: Pieza[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      {piezas.map((p, i) => (
        <i
          key={i}
          className={cn("conf", tonos[p.tono], p.pos, p.soloMd && "max-md:hidden")}
          style={
            {
              width: p.lado,
              height: p.lado,
              "--giro": `${p.giro ?? 12}deg`,
              "--t": `${6 + (i % 4) * 1.3}s`,
              "--dy": `${i % 2 ? 16 : -18}px`,
              "--dx": `${i % 3 ? 8 : -6}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
