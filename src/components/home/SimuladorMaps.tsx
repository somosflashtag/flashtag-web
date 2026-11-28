"use client";

import { useMemo, useState } from "react";
import { Glifo } from "@/components/ui/Glifo";
import { Button } from "@/components/ui/Button";
import {
  CENTRO,
  LADO,
  PUNTOS,
  busquedasSugeridas,
  normalizar,
  quienSale,
  siguientesPasos,
  simular,
  ubicacionPunto,
  type Negocio,
} from "@/content/simulador-maps";
import { cn } from "@/lib/cn";
import { FondoMapa } from "@/components/app/panel";

/**
 * Simulador de "Posición en Maps": el visitante busca un rubro, ve en qué
 * puesto sale en cada uno de los 49 puntos, toca un punto para ver quién
 * gana ahí, sigue a sus competidores y recibe los próximos pasos.
 * Los datos son de ejemplo (`content/simulador-maps.ts`).
 */

/** Colores de la leyenda, los mismos cortes que la app. */
function tonoPuesto(p: number | null) {
  if (p === null) return "bg-muted text-paper";
  if (p <= 3) return "bg-teal text-ink";
  if (p <= 10) return "bg-gold text-ink";
  return "bg-coral text-paper";
}

function Estrella({ n, claro = false }: { n: number; claro?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-[12px] tnum", claro ? "text-paper/80" : "text-muted")}>
      <svg viewBox="0 0 12 12" width="11" height="11" fill="var(--color-gold)" aria-hidden="true">
        <path d="M6 0.8l1.6 3.3 3.6.5-2.6 2.5.6 3.6L6 9l-3.2 1.7.6-3.6L0.8 4.6l3.6-.5z" />
      </svg>
      {n.toLocaleString("es-AR", { minimumFractionDigits: 1 })}
    </span>
  );
}

export function SimuladorMaps() {
  const [texto, setTexto] = useState("");
  const [busqueda, setBusqueda] = useState(busquedasSugeridas[0]);
  const [punto, setPunto] = useState<number | null>(CENTRO);
  const [mapaDe, setMapaDe] = useState<number>(0); // id del negocio cuyo mapa se ve; 0 = vos
  const [seguidos, setSeguidos] = useState<string[]>([]);
  const [verDiez, setVerDiez] = useState(false);

  const sim = useMemo(() => simular(busqueda), [busqueda]);
  const pasos = useMemo(() => siguientesPasos(sim), [sim]);
  const mostrado: Negocio = sim.negocios[mapaDe] ?? sim.vos;
  const ranking = sim.ranking.slice(0, verDiez ? 10 : 6);

  const buscar = (b: string) => {
    const n = normalizar(b);
    if (!n) return;
    setBusqueda(n);
    setPunto(CENTRO);
    setMapaDe(0);
  };

  const seguir = (nombre: string) =>
    setSeguidos((s) => (s.includes(nombre) ? s.filter((x) => x !== nombre) : [...s, nombre]));

  const enPunto = punto !== null ? quienSale(sim, punto) : null;

  return (
    <div className="mt-8 md:mt-11">
      {/* ── Búsqueda ───────────────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buscar(texto);
        }}
        className="mx-auto flex max-w-[560px] items-center gap-2 rounded-full bg-paper py-1.5 pl-5 pr-1.5 shadow-pildora transition-shadow duration-300 focus-within:shadow-[0_0_0_2px_var(--color-brand)]"
        role="search"
      >
        <Glifo id="objetivo" size={18} className="shrink-0 text-brand" />
        <label htmlFor="sim-busqueda" className="sr-only">
          Qué busca tu cliente
        </label>
        <input
          id="sim-busqueda"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribí tu rubro: cafetería, hotel…"
          maxLength={40}
          className="min-h-11 min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
        />
        <Button type="submit" variant="primary" size="md">
          Buscar
        </Button>
      </form>
      <div className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden">
        {busquedasSugeridas.map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={busqueda === b}
            onClick={() => {
              setTexto("");
              buscar(b);
            }}
            className={cn(
              "min-h-10 shrink-0 rounded-full px-4 text-[13.5px] font-semibold transition-colors duration-300",
              busqueda === b ? "bg-ink text-paper" : "bg-brand-soft/70 text-ink hover:bg-brand-soft",
            )}
          >
            {b}
          </button>
        ))}
      </div>

      {/* ── Resumen ────────────────────────────────────────── */}
      <div className="dato-brand mt-6 grid grid-cols-1 gap-5 rounded-[1.5rem] p-5 text-paper md:mt-8 md:rounded-[2rem] md:p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-10">
        <div>
          <p className="flex flex-wrap items-center gap-2 text-[12.5px] font-semibold text-paper/80">
            <span className="rounded-full bg-gold px-2.5 py-0.5 font-bold text-ink">Ejemplo ilustrativo</span>
            Búsqueda: «{sim.busqueda.toLowerCase()}»
          </p>
          <h3 className="mt-3 text-balance font-display text-[1.5rem] font-semibold leading-[1.1] tracking-tight md:text-[2.125rem]" aria-live="polite">
            {sim.vos.top3En > 0 ? (
              <>
                Aparecés en el top 3 en <span className="text-gold">{sim.vos.top3En} de los {PUNTOS}</span> puntos.
              </>
            ) : (
              `No aparecés en el top 3 en ninguno de los ${PUNTOS} puntos.`
            )}
          </h3>
          <p className="mt-2 text-[15px] text-paper/80">
            {sim.vos.puestos[CENTRO] === null
              ? "Parado en tu local, no aparecés."
              : `Parado en tu local, salís ${sim.vos.puestos[CENTRO]}°.`}{" "}
            {sim.ranking[0] && `${sim.ranking[0].nombre} sale en el top 3 en ${sim.ranking[0].top3En}.`}
          </p>
        </div>
        <dl className="grid grid-cols-3 gap-2 md:gap-3">
          {[
            ["En el top 3", `${sim.vos.top3En}`, `de ${PUNTOS}`],
            ["Visibilidad", `${sim.vos.visibilidad}`, "/100"],
            ["Puesto promedio", sim.vos.puestoPromedio === null ? "—" : sim.vos.puestoPromedio.toLocaleString("es-AR"), ""],
          ].map(([l, v, u]) => (
            <div key={l} className="vidrio-claro flex flex-col-reverse justify-end rounded-2xl px-3 py-3 md:px-4 md:py-4">
              <dt className="mt-1 text-[11.5px] leading-tight text-paper/80 md:text-[13px]">{l}</dt>
              <dd className="font-display text-[1.5rem] font-semibold leading-none tnum md:text-[2.25rem]">
                {v}
                {u && <span className="ml-0.5 text-[0.5em] font-medium text-paper/75">{u}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Mapa + punto ───────────────────────────────────── */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_1fr]">
        <div className="rounded-[1.5rem] bg-brand-soft/70 p-4 md:rounded-[2rem] md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-[1.125rem] font-semibold tracking-tight md:text-[1.25rem]">
                {mostrado.vos ? "Dónde aparecés" : `Dónde aparece ${mostrado.nombre}`}
              </h3>
              <p className="text-[13px] text-muted">Tocá un punto para ver quién sale ahí.</p>
            </div>
            {!mostrado.vos && (
              <button
                type="button"
                onClick={() => setMapaDe(0)}
                className="min-h-10 rounded-full bg-paper px-4 text-[13px] font-semibold transition-colors duration-300 hover:bg-ink hover:text-paper"
              >
                Volver a tu mapa
              </button>
            )}
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1 text-[12.5px] text-muted" aria-label="Referencias">
            <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-teal" />Top 3</li>
            <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-gold" />4 a 10</li>
            <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-coral" />11 a 20</li>
            <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-muted" />No aparece</li>
            <li className="flex items-center gap-1.5"><i className="size-2.5 rounded-full ring-2 ring-brand" />Tu local</li>
          </ul>

          <div className="relative mt-3 overflow-hidden rounded-[1.25rem] shadow-[var(--shadow-rest)]">
            <FondoMapa />
            <div className="relative grid p-1.5 sm:p-3" style={{ gridTemplateColumns: `repeat(${LADO}, minmax(0, 1fr))` }}>
              {mostrado.puestos.map((p, i) => {
                const sel = punto === i;
                const local = i === CENTRO;
                return (
                  <button
                    key={`${busqueda}-${mapaDe}-${i}`}
                    type="button"
                    onClick={() => setPunto(sel ? null : i)}
                    aria-pressed={sel}
                    aria-label={`${ubicacionPunto(i)}: ${p === null ? "no aparece" : `sale ${p}°`}${local ? " (tu local)" : ""}`}
                    className="ft-fade flex aspect-square items-center justify-center"
                    style={{ animationDelay: `${(i % LADO) * 18 + Math.floor(i / LADO) * 18}ms` }}
                  >
                    <span
                      className={cn(
                        "flex size-[30px] items-center justify-center rounded-full border-2 border-paper text-[11.5px] font-bold shadow-[var(--shadow-rest)] transition-transform duration-150 tnum hover:scale-110 sm:size-9 sm:text-[13px] lg:size-10 lg:text-[14px]",
                        tonoPuesto(p),
                        local && "ring-[3px] ring-brand",
                        sel && "scale-[1.18] ring-[3px] ring-ink",
                      )}
                    >
                      {p === null ? "—" : p}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
        <div className="flex-1 rounded-[1.5rem] bg-brand-soft/70 p-4 md:rounded-[2rem] md:p-6" aria-live="polite">
          {punto === null || !enPunto ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-8 text-center text-muted">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-paper text-brand">
                <Glifo id="ubicacion" size={24} />
              </span>
              <p className="max-w-[260px] text-sm">
                Tocá cualquier punto del mapa y te mostramos quién sale primero ahí y en qué puesto quedás vos.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  aria-label="Punto anterior"
                  onClick={() => setPunto((punto - 1 + PUNTOS) % PUNTOS)}
                  className="flex size-11 items-center justify-center rounded-full bg-paper text-lg transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  ‹
                </button>
                <div className="text-center">
                  <p className="font-display text-[15px] font-semibold">{ubicacionPunto(punto)}</p>
                  <p className="text-[12px] text-muted">Punto {punto + 1} de {PUNTOS}</p>
                </div>
                <button
                  type="button"
                  aria-label="Punto siguiente"
                  onClick={() => setPunto((punto + 1) % PUNTOS)}
                  className="flex size-11 items-center justify-center rounded-full bg-paper text-lg transition-colors duration-300 hover:bg-ink hover:text-paper"
                >
                  ›
                </button>
              </div>
              <p className="mt-4 font-display text-[1.25rem] font-semibold tracking-tight md:text-[1.5rem]">
                {enPunto.vos === null ? "Acá no aparecés" : `Acá salís ${enPunto.vos}°`}
              </p>
              <ol className="mt-3 grid gap-1.5">
                {enPunto.top.map((n) => (
                  <li key={n.id} className={cn("flex min-h-12 items-center gap-2.5 rounded-2xl px-2.5 py-1.5 text-sm", n.vos ? "bg-ink text-paper" : "bg-paper")}>
                    <b className={cn("flex size-7 shrink-0 items-center justify-center rounded-full text-[12.5px] tnum", tonoPuesto(n.puestos[punto]))}>{n.puestos[punto]}</b>
                    <span className="min-w-0 flex-1 truncate font-medium">
                      {n.nombre} {n.vos && <span className="ml-1 rounded-full bg-gold px-2 py-0.5 text-[11px] font-bold text-ink">Vos</span>}
                    </span>
                    <Estrella n={n.estrellas} claro={n.vos} />
                    {!n.vos && (
                      <button
                        type="button"
                        onClick={() => seguir(n.nombre)}
                        aria-pressed={seguidos.includes(n.nombre)}
                        className={cn(
                          "min-h-9 shrink-0 rounded-full px-3 text-[12px] font-semibold transition-colors duration-300",
                          seguidos.includes(n.nombre) ? "bg-brand text-paper" : "bg-brand-soft text-ink hover:bg-brand hover:text-paper",
                        )}
                      >
                        {seguidos.includes(n.nombre) ? "Siguiendo" : "Seguir"}
                      </button>
                    )}
                  </li>
                ))}
              </ol>
              {enPunto.vos !== null && enPunto.vos > 3 && (
                <p className="mt-2 rounded-2xl bg-gold/30 px-3.5 py-2.5 text-[13px] font-medium">
                  Vos estás {enPunto.vos}°: te {enPunto.vos - 3 === 1 ? "falta un puesto" : `faltan ${enPunto.vos - 3} puestos`} para entrar al top 3.
                </p>
              )}
              <p className="mt-3 text-[12px] text-muted">Google puede mostrar algo distinto según quién busca.</p>
            </>
          )}
        </div>
        <div className="rounded-[1.5rem] bg-brand-soft/70 p-4 md:rounded-[2rem] md:p-6">
          <h3 className="font-display text-[1.125rem] font-semibold tracking-tight md:text-[1.25rem]">Qué hacer para subir</h3>
          <ol className="mt-3 grid gap-2">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="flex gap-3 rounded-2xl bg-paper p-3.5">
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold",
                    i === 0 ? "bg-brand text-paper" : "bg-brand-soft text-ink",
                  )}
                >
                  {i + 1}
                </span>
                <span>
                  <b className="block text-[14.5px] leading-snug">{p.titulo}</b>
                  <span className="mt-0.5 block text-[13px] text-muted">{p.texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
        </div>
      </div>

      {/* ── Competidores ──────────────────────────────────── */}
      <div className="mt-4">
        <div className="rounded-[1.5rem] bg-brand-soft/70 p-4 md:rounded-[2rem] md:p-6">
          <h3 className="font-display text-[1.125rem] font-semibold tracking-tight md:text-[1.25rem]">Quién aparece más en esta búsqueda</h3>
          <p className="text-[13px] text-muted">Sos el {sim.tuPuestoZona}° negocio más visible de la zona.</p>
          <ol className="mt-3 grid gap-1.5 lg:grid-cols-2">
            {ranking.map((n, i) => {
              const sigo = seguidos.includes(n.nombre);
              return (
                <li key={n.id} className="grid grid-cols-[28px_1fr_auto] items-center gap-x-2.5 rounded-2xl bg-paper px-2.5 py-2.5 text-sm">
                  <b className={cn("flex size-7 items-center justify-center rounded-full text-[12.5px] tnum", i === 0 ? "bg-gold text-ink" : "bg-brand-soft text-ink")}>{i + 1}</b>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{n.nombre}</span>
                    <span className="flex flex-wrap items-center gap-x-2.5 text-[12px] text-muted">
                      <Estrella n={n.estrellas} />
                      <span className="tnum">Visibilidad {n.visibilidad}</span>
                      <span className="tnum">Top 3 en {n.top3En}</span>
                    </span>
                    <span aria-hidden="true" className="mt-1.5 block h-1 max-w-[220px] overflow-hidden rounded-full bg-brand-soft">
                      <i className="block h-full rounded-full bg-brand" style={{ width: `${n.visibilidad}%` }} />
                    </span>
                  </span>
                  <span className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setMapaDe(n.id);
                        setPunto(null);
                      }}
                      aria-pressed={mapaDe === n.id}
                      className={cn(
                        "min-h-9 rounded-full px-3 text-[12px] font-semibold transition-colors duration-300",
                        mapaDe === n.id ? "bg-ink text-paper" : "bg-brand-soft text-ink hover:bg-ink hover:text-paper",
                      )}
                    >
                      Su mapa
                    </button>
                    <button
                      type="button"
                      onClick={() => seguir(n.nombre)}
                      aria-pressed={sigo}
                      className={cn(
                        "min-h-9 rounded-full px-3 text-[12px] font-semibold transition-colors duration-300",
                        sigo ? "bg-brand text-paper" : "bg-brand-soft text-ink hover:bg-brand hover:text-paper",
                      )}
                    >
                      {sigo ? "Siguiendo" : "Seguir"}
                    </button>
                  </span>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={() => setVerDiez((v) => !v)}
            className="mt-2 min-h-11 text-[13.5px] font-semibold text-brand underline underline-offset-4"
          >
            {verDiez ? "Ver solo los 6 primeros" : "Ver los 10 más visibles"}
          </button>
          {seguidos.length > 0 && (
            <p className="mt-2 rounded-2xl bg-paper px-3.5 py-3 text-[13px]">
              <b>
                Seguís a {seguidos.length} {seguidos.length === 1 ? "competidor" : "competidores"}.
              </b>{" "}
              En la app ves su valoración y sus reseñas al lado de las tuyas, todos los días, y cómo se mueven en el mapa.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
