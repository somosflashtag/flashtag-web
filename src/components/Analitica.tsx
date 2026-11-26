import { Button } from "./ui/Button";
import { Glifo, type GlifoId } from "./ui/Glifo";
import { Seccion } from "./ui/Seccion";
import { Titulo } from "./ui/Titulo";
import {
  analitica,
  analiticaPara,
  capacidadesPublicadas,
  capacidadesTitulo,
  datosMedidos,
  focoTitulo,
  integraciones,
} from "@/content/analitica";
import { cn } from "@/lib/cn";

/** El ícono de cada dato medido, en el orden de `datosMedidos`. */
const glifosDatos: GlifoId[] = ["barras", "repetir", "ubicacion", "celular", "cartel", "chispa"];

const tonosIcono = ["bg-brand text-paper", "bg-gold text-ink", "bg-teal text-paper", "bg-coral text-paper", "bg-ink text-paper"] as const;

const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/** "Desde Starter" sobre una tarjeta de color: blanco liso, se lee siempre. */
function DesdePlan({ plan }: { plan: string }) {
  return (
    <span className="rounded-full bg-paper px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-normal text-ink">
      Desde {plan}
    </span>
  );
}

/**
 * Bloque de analítica. Un solo componente para cada página de /producto que
 * mide algo: el copy de arriba cambia según el feature (`slug`); lo que se
 * mide, cómo se lee y el puente a los píxeles son los mismos en todos lados.
 *
 * De arriba abajo: qué queda registrado en cada escaneo (seis tarjetas), cómo
 * lo leés (la franja violeta), qué decidís con eso y la salida a
 * /producto/pixeles.
 *
 * Un dato, una fuente: todo sale de content/analitica.ts. Si acá aparece un
 * número o una integración escrita a mano, es un bug.
 *
 * `tono`: el del bloque. Sobre `papel` las tarjetas claras van en lila; sobre
 * `arena` o `lila`, en blanco.
 */
export function Analitica({
  slug,
  tono = "papel",
  className,
}: {
  slug?: string;
  tono?: "papel" | "arena" | "lila";
  className?: string;
}) {
  const f = slug ? analiticaPara(slug) : undefined;
  const titular = f?.titular ?? analitica.titular;
  const bajada = f?.bajada ?? analitica.bajada;
  const clara = tono === "papel" ? "bg-brand-soft/70" : "bg-paper";

  return (
    <Seccion id="analitica" tono={tono} className={className} ariaLabelledby="analitica-titulo">
      <Titulo id="analitica-titulo" etiqueta={analitica.eyebrow} titulo={titular} bajada={bajada} />

      {/* Lo que queda registrado en cada escaneo */}
      <ul className="carrusel mt-9 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
        {datosMedidos.map((d, i) => (
          <li key={d.titulo} data-reveal style={retraso((i % 3) * 80)} className={cn("rounded-[2rem] p-6 lg:p-7", clara)}>
            <span className={cn("flex size-12 items-center justify-center rounded-2xl", tonosIcono[i % tonosIcono.length])}>
              <Glifo id={glifosDatos[i] ?? "check"} size={22} />
            </span>
            <h3 className="mt-5 font-display text-[1.25rem] font-bold leading-tight tracking-[-0.025em]">{d.titulo}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{d.texto}</p>
          </li>
        ))}
      </ul>

      {/* Qué hacés con el dato una vez que está adentro */}
      {capacidadesPublicadas.length > 0 && (
        <div data-reveal className="dato-brand mt-4 rounded-[2rem] p-6 text-paper md:p-9">
          <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em] md:text-[1.75rem]">{capacidadesTitulo}</h3>
          <ul className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {capacidadesPublicadas.map((c) => (
              <li key={c.titulo} className="flex gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                  <Glifo id="check" size={14} />
                </span>
                <div>
                  <p className="flex flex-wrap items-center gap-2 font-semibold leading-snug">
                    {c.titulo}
                    {c.desde && <DesdePlan plan={c.desde} />}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-paper/85">{c.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Qué decidís con eso — solo cuando el bloque está en un producto */}
        {f && (
          <div data-reveal className={cn("rounded-[2rem] p-6 md:p-9", clara)}>
            <h3 className="font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em]">{focoTitulo}</h3>
            <ul className="mt-5 space-y-3.5">
              {f.foco.map((t) => (
                <li key={t} className="flex gap-3 text-[1.0625rem] font-medium leading-snug">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-paper">
                    <Glifo id="check" size={14} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Puente a /producto/pixeles. El detalle de cada campo vive allá:
            repetirlo acá hacía que las dos páginas pelearan la misma búsqueda. */}
        <div
          data-reveal
          style={retraso(100)}
          className={cn("dato-teal flex flex-col rounded-[2rem] p-6 text-paper md:p-9", !f && "lg:col-span-2")}
        >
          <h3 className="flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[1.5rem] font-bold leading-tight tracking-[-0.03em]">
            {integraciones.titulo}
            <DesdePlan plan={integraciones.desde} />
          </h3>
          <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-paper/90">{integraciones.texto}</p>
          <Button href={integraciones.href} variant="blanco" size="md" arrow className="mt-6 w-full sm:w-auto sm:self-start">
            {integraciones.cta}
          </Button>
        </div>
      </div>
    </Seccion>
  );
}
