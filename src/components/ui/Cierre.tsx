import { cierre, cta } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Confeti, type Pieza } from "./Confeti";

/**
 * El cierre de TODA página: último bloque antes del footer. Titular gigante,
 * una bajada y los dos CTAs del sitio, con confeti. Va a todo el ancho, con
 * las esquinas de arriba redondeadas, y abajo termina en `ink` liso para
 * fundirse con el footer: cierre y footer se leen como una sola pieza.
 *
 * Cada página puede pasar su propio titular (con `destacado` en gold). Si el
 * titular es una frase larga, `tamano="mega"`. Sin props, es el cierre
 * general del sitio (`cierre` en lib/site.ts).
 *
 * `children` reemplaza los botones (por ejemplo, un cierre que manda a
 * WhatsApp). Sobre este fondo: `variant="oro"` y `variant="claro"`.
 */
const piezas: Pieza[] = [
  { pos: "left-[4%] top-[8%]", lado: 60, tono: "gold", giro: -14, soloMd: true },
  { pos: "left-[2%] top-[44%]", lado: 104, tono: "gold", giro: 12, soloMd: true },
  { pos: "left-[9%] top-[80%]", lado: 40, tono: "coral", giro: -8 },
  { pos: "right-[5%] top-[10%]", lado: 44, tono: "coral", giro: 10 },
  { pos: "right-[3%] top-[46%]", lado: 82, tono: "coral", giro: 8, soloMd: true },
  { pos: "right-[11%] top-[78%]", lado: 38, tono: "gold", giro: 22, soloMd: true },
  { pos: "left-[48%] top-[6%]", lado: 16, tono: "paper", giro: 16 },
  { pos: "right-[26%] top-[90%]", lado: 18, tono: "teal", giro: 30 },
];

export function Cierre({
  titular = cierre.titular,
  destacado = cierre.destacado,
  bajada = cierre.bajada,
  tamano = "giga",
  children,
}: {
  titular?: React.ReactNode;
  destacado?: React.ReactNode;
  bajada?: React.ReactNode;
  tamano?: "giga" | "mega";
  children?: React.ReactNode;
}) {
  return (
    <section
      data-tono="noche"
      aria-labelledby="cierre-titulo"
      className="noche-cierre grano relative mt-3.5 overflow-hidden rounded-t-[2rem] px-5 pb-16 pt-20 text-center md:rounded-t-[3.5rem] md:px-10 md:pb-24 md:pt-32"
    >
      <Confeti piezas={piezas} />
      <div className="relative mx-auto max-w-5xl">
        <h2 id="cierre-titulo" data-reveal="blur" className={cn("text-balance", tamano === "giga" ? "t-giga" : "t-mega")}>
          {titular}
          {destacado && (
            <>
              {" "}
              <span className="text-gold">{destacado}</span>
            </>
          )}
        </h2>
        {bajada && (
          <p
            data-reveal="blur"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="t-lead mx-auto mt-5 max-w-[46ch] text-paper/85 md:mt-7"
          >
            {bajada}
          </p>
        )}
        <div data-reveal className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {children ?? (
            <>
              <Button href={cta.primary.href} variant="oro" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="claro" size="lg">
                {cta.secondary.label}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
