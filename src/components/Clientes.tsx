import Image from "next/image";
import { Container } from "./ui/Container";
import { clientes, type Cliente } from "@/content/clientes";
import { cn } from "@/lib/cn";

/**
 * Franja de logos de clientes.
 *
 * Los archivos son monocromos en el arena de marca, hechos para fondo
 * violeta. Por eso la franja va siempre sobre `ink` y los logos se muestran
 * tal cual vienen: nada de grayscale, invert ni mix-blend para forzarlos a
 * un fondo blanco (ahí el arena no se lee).
 *
 * `grilla`: todos a la vista, sin movimiento.
 * `marquesina` (home): la lista corre en loop. Se pausa con el mouse o el
 * foco, y con `prefers-reduced-motion` vuelve a ser una grilla quieta. La
 * segunda copia de la lista es solo visual (aria-hidden), para que el lector
 * de pantalla no lea cada marca dos veces.
 */
function LogoCliente({ c, className }: { c: Cliente; className?: string }) {
  return (
    <Image
      src={c.logo}
      alt={c.nombre}
      width={c.ancho}
      height={44}
      sizes={`${c.ancho}px`}
      style={{ "--w": `${c.ancho}px`, height: "auto" } as React.CSSProperties}
      className={cn("w-[calc(var(--w)*0.72)] opacity-80 transition-opacity duration-200 hover:opacity-100 md:w-[var(--w)]", className)}
    />
  );
}

export function Clientes({
  titulo = "Marcas que ya lo usan",
  variante = "grilla",
}: {
  titulo?: string;
  variante?: "grilla" | "marquesina";
}) {
  if (variante === "marquesina") {
    return (
      <section className="blk bg-ink py-9 text-paper md:py-11" aria-labelledby="clientes-titulo">
        <h2 id="clientes-titulo" className="t-caption px-6 text-center uppercase tracking-[0.12em] text-muted-dark">
          {titulo}
        </h2>
        <div className="ft-marquee-wrap ft-marquee-mask mt-7 overflow-hidden motion-reduce:[mask:none] motion-reduce:[-webkit-mask:none]">
          <div className="ft-marquee flex w-max items-center motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-12 motion-reduce:gap-y-8 motion-reduce:px-6">
            <ul className="flex shrink-0 items-center gap-9 pr-9 motion-reduce:contents md:gap-16 md:pr-16">
              {clientes.map((c) => (
                <li key={c.nombre} className="flex items-center">
                  <LogoCliente c={c} />
                </li>
              ))}
            </ul>
            <ul aria-hidden="true" className="flex shrink-0 items-center gap-9 pr-9 motion-reduce:hidden md:gap-16 md:pr-16">
              {clientes.map((c) => (
                <li key={c.nombre} className="flex items-center">
                  <LogoCliente c={{ ...c, nombre: "" }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ink py-12 text-paper md:py-16">
      <Container>
        <h2 className="t-caption text-center uppercase tracking-[0.12em] text-muted-dark">
          {titulo}
        </h2>
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {clientes.map((c) => (
            <li key={c.nombre} className="flex items-center">
              <LogoCliente c={c} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
