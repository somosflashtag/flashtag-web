import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Una sección de página. El ritmo del sitio sale de alternar tonos:
 *
 *   papel   blanco, a todo el ancho (el descanso entre bloques)
 *   noche   ink con halos y grano, texto blanco (para lo que tiene que pegar)
 *   arena   la arena de marca (cálido: casos, historias, rubros)
 *   lila    violeta muy suave (producto, precios)
 *
 * Todo lo que no es papel va como BLOQUE redondeado que se despega de los
 * bordes de la pantalla (`.blk`). Nunca dos `noche` seguidos, y nunca dos
 * bloques del mismo tono seguidos: en el medio va un `papel`.
 *
 * `data-tono` lo lee el header flotante para saber sobre qué fondo está.
 *
 * `contenedor={false}` deja el contenido a todo el ancho del bloque (un
 * carrusel que sangra, por ejemplo); adentro se usa `<Container>` a mano
 * para lo que sí va en caja.
 */
export type Tono = "papel" | "noche" | "arena" | "lila";

const tonos: Record<Tono, string> = {
  papel: "",
  noche: "noche grano overflow-hidden",
  arena: "bg-surface",
  lila: "bg-brand-soft",
};

const aires = {
  normal: "py-16 md:py-28",
  chico: "py-11 md:py-16",
  nada: "",
} as const;

export function Seccion({
  children,
  tono = "papel",
  aire = "normal",
  contenedor = true,
  id,
  className,
  ariaLabelledby,
}: {
  children: React.ReactNode;
  tono?: Tono;
  aire?: keyof typeof aires;
  contenedor?: boolean;
  id?: string;
  className?: string;
  ariaLabelledby?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      data-tono={tono === "noche" ? "noche" : "claro"}
      className={cn("relative scroll-mt-24", tono !== "papel" && "blk", tonos[tono], aires[aire], className)}
    >
      {contenedor ? <Container className="relative">{children}</Container> : children}
    </section>
  );
}
