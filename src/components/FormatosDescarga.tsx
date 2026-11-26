import { Glifo, type GlifoId } from "./ui/Glifo";
import { Seccion } from "./ui/Seccion";
import { Titulo } from "./ui/Titulo";
import { formatos, formatosIntro, puntosImprenta, type FormatoDescarga } from "@/content/formatos";
import { cn } from "@/lib/cn";

/** El color del nombre de cada formato, por familia. */
const tonosTipo: Record<FormatoDescarga["tipo"], string> = {
  Imagen: "bg-ink text-paper",
  Vectorial: "bg-brand text-paper",
  Texto: "bg-gold text-ink",
};

/** Una tarjeta de color y un ícono por punto, en el orden de `puntosImprenta`. */
const puntos: { tono: string; glifo: GlifoId }[] = [
  { tono: "dato-brand", glifo: "capas" },
  { tono: "dato-coral", glifo: "objetivo" },
  { tono: "dato-teal", glifo: "qr" },
];

const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * Sección propia de /producto/qr-dinamicos: en qué formatos baja el QR.
 *
 * No tiene página propia a propósito. Quien busca "QR para imprenta" no es un
 * público aparte: es el mismo comercio con un diseñador al lado, o la agencia
 * que le maneja la marca. Va donde ya está mirando el QR dinámico, después de
 * "Cómo funciona", que es el momento en que aparece la pregunta: *bueno, ¿y
 * cómo se lo paso a la gráfica?*
 *
 * A la izquierda, el argumento; a la derecha, los siete formatos; abajo, los
 * tres detalles que hacen que el archivo no vuelva de la imprenta.
 */
export function FormatosDescarga() {
  return (
    <Seccion id="formatos" tono="arena" ariaLabelledby="formatos-titulo">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Titulo
            alineado="izq"
            tamano="chico"
            id="formatos-titulo"
            etiqueta={formatosIntro.etiqueta}
            titulo={formatosIntro.titular}
            bajada={formatosIntro.bajada}
          />
          <p data-reveal className="mt-6 flex gap-3.5 rounded-[1.5rem] bg-paper p-5 text-[15px] leading-relaxed text-muted">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <Glifo id="repetir" size={18} />
            </span>
            {formatosIntro.nota}
          </p>
        </div>

        <ul className="carrusel carrusel-angosto grid gap-3 sm:grid-cols-2">
          {formatos.map((f, i) => (
            <li
              key={f.nombre}
              data-reveal
              style={retraso((i % 2) * 70)}
              className="flex flex-col rounded-[1.5rem] bg-paper p-5 sm:last:odd:col-span-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h3
                  className={cn(
                    "flex h-11 items-center rounded-xl px-3.5 font-display text-[1.0625rem] font-bold tracking-[-0.01em]",
                    tonosTipo[f.tipo],
                  )}
                >
                  {f.nombre}
                </h3>
                <span className="eyebrow">{f.tipo}</span>
              </div>
              <p className="mt-3.5 text-[15px] leading-relaxed text-muted">{f.para}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="carrusel mt-4 grid gap-4 md:mt-12 md:grid-cols-3">
        {puntosImprenta.map((p, i) => {
          const { tono, glifo } = puntos[i % puntos.length];
          return (
            <li
              key={p.titulo}
              data-reveal
              style={retraso(i * 90)}
              className={cn("rounded-[2rem] p-6 text-paper lg:p-8", tono)}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/20">
                <Glifo id={glifo} size={22} />
              </span>
              <h3 className="mt-5 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">{p.titulo}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-white/90">{p.texto}</p>
            </li>
          );
        })}
      </ul>
    </Seccion>
  );
}
