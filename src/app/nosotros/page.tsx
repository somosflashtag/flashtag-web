import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { fotos } from "@/content/fotos";
import { equipo, historia, mision, valores } from "@/content/nosotros";
import { cn } from "@/lib/cn";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Nosotros",
  description:
    "FlashTag nació en Buenos Aires con una convicción simple: los comercios locales merecen las mismas herramientas de marketing que las grandes marcas.",
  path: "/nosotros",
});

/** Un color y un ícono por valor, en el orden de `valores` (content/nosotros.ts). */
const estilosValor: { tono: string; glifo: GlifoId }[] = [
  { tono: "paso-brand", glifo: "ubicacion" },
  { tono: "paso-coral", glifo: "objetivo" },
  { tono: "paso-teal", glifo: "chispa" },
  { tono: "paso-gold", glifo: "barras" },
];

export default function NosotrosPage() {
  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Nosotros" }]}
        etiqueta="Nosotros"
        glifo="persona"
        titulo="Construimos el puente entre el comercio físico y"
        destacado="el mundo digital."
        bajada="FlashTag nació de una convicción simple: los comercios locales merecen las mismas herramientas de marketing que las grandes marcas, sin necesitar un equipo técnico ni un presupuesto enorme."
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={`mailto:${equipo.email}`} variant="claro" size="lg">
          Escribinos
        </Button>
      </HeroPagina>

      {/* ── MISIÓN ───────────────────────────────────────────── */}
      <Seccion>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Titulo alineado="izq" etiqueta={mision.eyebrow} titulo={mision.titular} />
            {mision.parrafos.map((p, i) => (
              <p
                key={p}
                data-reveal="blur"
                style={{ "--reveal-delay": `${160 + i * 80}ms` } as React.CSSProperties}
                className="t-lead measure mt-5 text-muted"
              >
                {p}
              </p>
            ))}

            {/* Un solo dato duro: el año. El contador de comercios queda fuera
                hasta que site.proof tenga un número que podamos sostener. */}
            <dl data-reveal className="mt-8 flex flex-wrap gap-4">
              <div className="dato-brand rounded-[1.5rem] px-6 py-5 text-paper">
                <dt className="text-sm text-paper/85">Año de fundación</dt>
                <dd className="mt-1 font-display text-[2.5rem] font-bold leading-none tracking-[-0.045em] tnum">2024</dd>
              </div>
              {site.proof.locales !== null && (
                <div className="dato-teal rounded-[1.5rem] px-6 py-5 text-paper">
                  <dt className="text-sm text-paper/85">Comercios activos</dt>
                  <dd className="mt-1 font-display text-[2.5rem] font-bold leading-none tracking-[-0.045em] tnum">
                    {site.proof.locales.toLocaleString("es-AR")}+
                  </dd>
                </div>
              )}
            </dl>
          </div>

          {/* A quién le hablamos. Foto ilustrativa (AGENTS.md §4): no es el equipo ni un cliente. */}
          <figure data-reveal="zoom" className="relative mx-auto aspect-[4/5] w-full max-w-[440px]">
            <div className="foto-b relative size-full overflow-hidden shadow-[var(--shadow-device)]">
              <Image src={fotos.dueno.src} alt={fotos.dueno.alt} fill sizes="(min-width: 1024px) 440px, 90vw" className="object-cover" />
              <span aria-hidden="true" className="velo absolute inset-0" />
              <figcaption className="absolute inset-x-6 bottom-6 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em] text-paper">
                Para el que atiende su local todos los días.
              </figcaption>
            </div>
          </figure>
        </div>
      </Seccion>

      {/* ── VALORES ──────────────────────────────────────────── */}
      <Seccion tono="arena">
        <Titulo titulo="Lo que nos guía" />
        <ul className="carrusel mt-9 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {valores.map((v, i) => {
            const e = estilosValor[i % estilosValor.length];
            return (
              <li
                key={v.titulo}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className={cn("flex min-h-[300px] flex-col rounded-[2rem] p-6 text-paper md:p-7", e.tono)}
              >
                <span className="vidrio-claro flex size-12 items-center justify-center rounded-2xl">
                  <Glifo id={e.glifo} size={22} />
                </span>
                <h3 className="mt-auto pt-8 font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em]">{v.titulo}</h3>
                <p className="mt-2 text-[15px] leading-snug text-paper/85">{v.texto}</p>
              </li>
            );
          })}
        </ul>
      </Seccion>

      {/* ── HISTORIA ─────────────────────────────────────────── */}
      <Seccion>
        <Titulo titulo="Tres años, un cartel a la vez" bajada="De los primeros carteles a una app propia." />
        <ol className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {historia.map((h, i) => (
            <li
              key={h.anio}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className="relative rounded-[2rem] bg-brand-soft/70 p-6 md:p-8"
            >
              <span className="eyebrow !bg-paper">
                {i === historia.length - 1 ? "Hoy" : `Paso ${i + 1}`}
              </span>
              <p className="mt-4 font-display text-[3.5rem] font-bold leading-none tracking-[-0.05em] text-brand tnum md:text-[4.5rem]">
                {h.anio}
              </p>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80">{h.texto}</p>
            </li>
          ))}
        </ol>
      </Seccion>

      {/* ── EQUIPO ───────────────────────────────────────────── */}
      <Seccion tono="lila">
        <Titulo titulo={equipo.titular} bajada={equipo.texto} />
        <div data-reveal className="mt-8 flex justify-center">
          <Button href={`mailto:${equipo.email}`} variant="primary" size="lg" arrow>
            Escribinos a {equipo.email}
          </Button>
        </div>
      </Seccion>

      <Cierre titular="Tu local," destacado="en serio." bajada="Un cartel en el mostrador y una app detrás. Empezás gratis y lo activás en minutos." />
    </Pagina>
  );
}
