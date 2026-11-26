import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { cta } from "@/lib/site";

/** A dónde ir desde un 404: las cuatro puertas del sitio. */
const salidas: { label: string; texto: string; href: string; glifo: GlifoId }[] = [
  { label: "Cómo funciona", texto: "Del cartel a las métricas, en cuatro pasos.", href: "/como-funciona", glifo: "cartel" },
  { label: "Precios", texto: "Empezás gratis y subís cuando te rinde.", href: "/precios", glifo: "plata" },
  { label: "Casos", texto: "Comercios argentinos que ya lo usan.", href: "/casos", glifo: "trofeo" },
  { label: "Contacto", texto: "Contesta una persona, y contesta rápido.", href: "/contacto", glifo: "celular" },
];

export default function NotFound() {
  return (
    <Pagina>
      <HeroPagina
        etiqueta="Error 404"
        glifo="qr"
        titulo="Este QR apunta"
        destacado="a ningún lado."
        bajada="La página que buscás se mudó o nunca existió. Lo bueno es que con FlashTag esto no te pasa: cambiás el destino y listo."
      >
        <Button href="/" variant="oro" size="lg" arrow>
          Volver al inicio
        </Button>
        <Button href={cta.primary.href} variant="claro" size="lg">
          {cta.primary.label}
        </Button>
      </HeroPagina>

      <Seccion>
        <Titulo titulo="Tal vez buscabas esto" />
        <ul className="carrusel carrusel-angosto mt-9 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {salidas.map((s, i) => (
            <li key={s.href} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
              <Link
                href={s.href}
                className="group flex h-full min-h-[200px] flex-col rounded-[2rem] bg-brand-soft/70 p-6 transition-[translate,box-shadow] duration-500 ease-fluida hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-paper text-brand transition-transform duration-500 ease-fluida group-hover:-rotate-6 group-hover:scale-110">
                  <Glifo id={s.glifo} size={22} />
                </span>
                <span className="mt-auto pt-6 font-display text-[1.375rem] font-bold tracking-[-0.03em]">{s.label}</span>
                <span className="mt-1 text-[15px] leading-snug text-muted">{s.texto}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Seccion>

      <Cierre />
    </Pagina>
  );
}
