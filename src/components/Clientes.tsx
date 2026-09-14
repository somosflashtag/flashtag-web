import Image from "next/image";
import { Container } from "./ui/Container";
import { clientes } from "@/content/clientes";

/**
 * Franja de logos de clientes.
 *
 * Los archivos son monocromos en el arena de marca, así que la franja va
 * sobre violeta profundo: es el fondo para el que fueron hechos. Nada de
 * filtros CSS ni mix-blend para forzarlos a otro lado.
 *
 * No es un carrusel. Un carrusel esconde la mitad de los logos y obliga a
 * esperar; una grilla los muestra todos de una.
 */
export function Clientes({ titulo = "Marcas que ya lo usan" }: { titulo?: string }) {
  return (
    <section className="bg-ink py-12 text-paper md:py-16">
      <Container>
        <h2 className="t-caption text-center uppercase tracking-[0.12em] text-muted-dark">
          {titulo}
        </h2>
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
          {clientes.map((c) => (
            <li key={c.nombre} className="flex items-center">
              <Image
                src={c.logo}
                alt={c.nombre}
                width={c.ancho}
                height={44}
                sizes={`${c.ancho}px`}
                style={{ width: c.ancho, height: "auto" }}
                className="opacity-75 transition-opacity duration-200 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
