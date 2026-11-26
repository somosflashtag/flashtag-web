import { WalletCard } from "./app/WalletCard";
import { Glifo, type GlifoId } from "./ui/Glifo";
import { Seccion } from "./ui/Seccion";
import { Titulo } from "./ui/Titulo";
import {
  herramientas,
  herramientasIntro,
  modalidadesIntro,
  tiposDeTarjeta,
  type Herramienta,
} from "@/content/fidelidad";
import { cn } from "@/lib/cn";

const glifos: Record<Herramienta["id"], GlifoId> = {
  push: "celular",
  cumple: "torta",
  referidos: "persona",
  geo: "ubicacion",
};

const retraso = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

/**
 * En la grilla de tres columnas (tablet apaisada y notebook chica), la última
 * fila puede quedar con una o dos tarjetas: se centra en vez de quedar
 * recostada a la izquierda. La grilla tiene seis pistas y cada tarjeta ocupa
 * dos; esto dice en cuál arranca la primera de esa última fila.
 */
function arranque(i: number, total: number) {
  const resto = total % 3;
  if (resto === 2 && i === total - 2) return "lg:col-start-2 xl:col-start-auto";
  if (resto === 1 && i === total - 1) return "lg:col-start-3 xl:col-start-auto";
  return "";
}

/**
 * Secciones propias de /producto/fidelidad: las ocho modalidades de tarjeta
 * (cada una con su pase dibujado en código) y las cuatro herramientas de
 * retención que funcionan sobre cualquiera.
 */
export function FidelidadDetalle() {
  return (
    <>
      <Seccion id="modalidades" tono="arena" ariaLabelledby="modalidades-titulo">
        <Titulo
          id="modalidades-titulo"
          etiqueta={modalidadesIntro.etiqueta}
          titulo={modalidadesIntro.titular}
          bajada={modalidadesIntro.bajada}
        />

        <ul className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-4">
          {tiposDeTarjeta.map((t, i) => (
            <li
              key={t.id}
              data-reveal
              style={retraso((i % 4) * 70)}
              className={cn(
                "group flex flex-col rounded-[2rem] bg-paper p-4 pb-6 lg:col-span-2 xl:col-span-1",
                arranque(i, tiposDeTarjeta.length),
              )}
            >
              <div className="rounded-[1.5rem] bg-brand-soft p-3">
                <WalletCard
                  t={t.tarjeta}
                  className="mx-auto max-w-[300px] transition-transform duration-500 ease-fluida group-hover:-rotate-2 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-2">
                <h3 className="mt-5 font-display text-[1.375rem] font-bold leading-tight tracking-[-0.03em]">{t.nombre}</h3>
                <p className="mt-1 text-[15px] leading-snug text-muted">{t.para}</p>
                <ul className="mt-4 space-y-2.5">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] leading-snug">
                      <Glifo id="check" size={17} className="mt-px shrink-0 text-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion id="herramientas" tono="noche" ariaLabelledby="herramientas-titulo">
        <Titulo
          claro
          alineado="izq"
          id="herramientas-titulo"
          etiqueta={herramientasIntro.etiqueta}
          titulo={herramientasIntro.titular}
          bajada={herramientasIntro.bajada}
        />

        <ul className="carrusel mt-9 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {herramientas.map((h, i) => (
            <li key={h.id} data-reveal style={retraso(i * 70)} className="vidrio-claro flex flex-col rounded-[2rem] p-6">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gold text-ink">
                <Glifo id={glifos[h.id]} size={22} />
              </span>
              <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.08em] text-gold">{h.nombre}</p>
              <h3 className="mt-1.5 font-display text-[1.375rem] font-bold leading-[1.12] tracking-[-0.03em]">{h.titular}</h3>
              <ul className="mt-4 space-y-2.5">
                {h.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5 text-[15px] leading-snug text-paper/85">
                    <Glifo id="check" size={17} className="mt-px shrink-0 text-gold" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Seccion>
    </>
  );
}
