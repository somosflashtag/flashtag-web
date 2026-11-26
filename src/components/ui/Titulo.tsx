import { cn } from "@/lib/cn";

/**
 * El encabezado de una sección: titular enorme y apretado que entra
 * desenfocado (`data-reveal="blur"`), con su bajada un instante después.
 *
 * - `alineado`: "centro" (el de casi todas) o "izq" (cuando al lado va otra
 *   columna, o el contenido que sigue arranca a la izquierda).
 * - `claro`: va sobre un bloque oscuro (`tono="noche"`): la bajada pasa a
 *   blanco al 80%.
 * - `etiqueta`: una píldora chica arriba del titular. Usar poco: el titular
 *   tiene que entenderse solo.
 * - Para resaltar una parte del titular: `<span className="text-brand">` sobre
 *   fondo claro, `<span className="text-gold">` sobre fondo oscuro.
 */
export function Titulo({
  titulo,
  bajada,
  etiqueta,
  id,
  claro = false,
  alineado = "centro",
  tamano = "mega",
  className,
}: {
  titulo: React.ReactNode;
  bajada?: React.ReactNode;
  etiqueta?: React.ReactNode;
  id?: string;
  claro?: boolean;
  alineado?: "centro" | "izq";
  tamano?: "mega" | "giga" | "chico";
  className?: string;
}) {
  const centro = alineado === "centro";
  return (
    <div className={cn(centro ? "mx-auto max-w-4xl text-center" : "max-w-3xl", className)}>
      {etiqueta && (
        <span data-reveal className={cn(claro ? "eyebrow-noche" : "eyebrow", "mb-4")}>
          {etiqueta}
        </span>
      )}
      <h2
        id={id}
        data-reveal="blur"
        className={cn(
          "text-balance",
          tamano === "giga" && "t-giga",
          tamano === "mega" && "t-mega",
          tamano === "chico" && "t-mega !text-[clamp(1.75rem,1.2rem+2.4vw,3rem)]",
        )}
      >
        {titulo}
      </h2>
      {bajada && (
        <p
          data-reveal="blur"
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className={cn("t-lead measure mt-4 md:mt-6", centro && "mx-auto", claro ? "text-paper/80" : "text-muted")}
        >
          {bajada}
        </p>
      )}
    </div>
  );
}
