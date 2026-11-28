"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Glifo, type GlifoId } from "./ui/Glifo";
import { Bandera } from "./ui/Bandera";
import { BENEFICIO_ANUAL, hrefContratar, planes, precioARS, type Feature, type Plan } from "@/content/planes";
import { conDescuento, descuentoTexto, type Promo } from "@/content/promos";
import { cn } from "@/lib/cn";
import { usePromoVigente } from "./usePromoVigente";

/**
 * Qué número va en cada lugar de la tarjeta, con o sin promo.
 *
 * Sin promo es lo de siempre: el "por mes" del anual es `precioAnualPorMes`
 * de planes.ts. Con promo, los TOTALES se rebajan con la misma regla que la
 * app (`conDescuento`, hacia abajo al entero) —porque el total es lo que se
 * cobra— y el "por mes" del anual se deriva de ese total. Así el visitante ve
 * exactamente el monto que después le aparece en Mercado Pago.
 */
function preciosDe(plan: Plan, anual: boolean, promo: Promo | null) {
  const totalAnualUsd = plan.totalAnual;
  const totalAnualArs = plan.totalAnualARS;
  const lista = {
    usd: anual && plan.precioAnualPorMes !== null ? plan.precioAnualPorMes : plan.precioMensual,
    ars: anual && totalAnualArs ? Math.round(totalAnualArs / 12) : plan.precioARS,
    totalUsd: totalAnualUsd,
    totalArs: totalAnualArs,
  };
  if (!promo || plan.precioMensual === 0) return { ...lista, lista: null };

  const totalUsd = totalAnualUsd !== null ? conDescuento(totalAnualUsd, promo) : null;
  const totalArs = totalAnualArs !== null ? conDescuento(totalAnualArs, promo) : null;
  return {
    usd: anual && totalUsd !== null ? Math.round(totalUsd / 12) : conDescuento(plan.precioMensual, promo),
    ars: anual && totalArs !== null ? Math.round(totalArs / 12) : conDescuento(plan.precioARS, promo),
    totalUsd,
    totalArs,
    lista,
  };
}

export type Moneda = "ars" | "usd";

const fmtUSD = (n: number) => `USD ${n}`;
const enMoneda = (moneda: Moneda, ars: number, usd: number) => (moneda === "ars" ? precioARS(ars) : fmtUSD(usd));

/* ─────────────────────────────────────────────────────────────────
   QUÉ CAMBIA DE UN PLAN A OTRO — se deduce de planes.ts, no se escribe acá.

   Los planes listan las mismas filas en el mismo orden (QR, Link Pages,
   métricas…), así que se comparan por posición:

   · Una fila "crece" si su texto cambia entre los planes pagos (20 → 500 →
     2.500 QR). Van primero: son lo que diferencia a un plan del siguiente.
   · El resto es igual en todos los pagos (píxeles, CSV, filtro…): va después.
   · En cada tarjeta, lo que mejora respecto del plan anterior va resaltado;
     lo que queda igual, en gris; lo que no incluye, con una raya.

   Las cuatro tarjetas quedan con las mismas filas a la misma altura, así que
   se leen como una tabla: de izquierda a derecha en desktop, deslizando en
   el teléfono.

   Si algún día los planes dejan de traer las mismas filas, por posición no
   hay nada que comparar: cada tarjeta muestra su lista tal cual, sin agrupar
   y sin decir "en todos los planes".
   ───────────────────────────────────────────────────────────────── */

type Tono = "suma" | "igual" | "falta";
type Fila = { f: Feature; tono: Tono };
type Grupo = { titulo: string | null; filas: Fila[] };

const firma = (f: Feature) => `${f.incluido}|${f.label}|${f.nota ?? ""}`;
const pagos = planes.filter((p) => p.precioMensual > 0);
const comparables = pagos.length > 1 && planes.every((p) => p.features.length === planes[0].features.length);
/** Por fila: ¿cambia entre los planes pagos? */
const crece = planes[0].features.map((_, i) => new Set(pagos.map((p) => firma(p.features[i]))).size > 1);

function gruposDe(plan: Plan, n: number): Grupo[] {
  const anterior = comparables && n > 0 ? planes[n - 1] : null;
  const filas = plan.features.map(
    (f, i): Fila => ({
      f,
      tono: !f.incluido ? "falta" : anterior && firma(anterior.features[i]) === firma(f) ? "igual" : "suma",
    }),
  );
  if (!comparables) return [{ titulo: null, filas }];

  const comunes = filas.filter((_, i) => !crece[i]);
  const enTodosLosPagos = plan.precioMensual > 0 && comunes.every((x) => x.f.incluido);
  return [
    { titulo: "Crece con el plan", filas: filas.filter((_, i) => crece[i]) },
    { titulo: enTodosLosPagos ? "En todos los planes pagos" : "Además", filas: comunes },
  ].filter((g) => g.filas.length > 0);
}

/** Lo que va arriba de la lista: ícono y sello, nombre, para quién, precio y botón. */
const CABEZA = 5;
const gruposPorPlan = planes.map(gruposDe);
/** Cuántas filas de la grilla ocupa una tarjeta (todas la misma cantidad). */
const tramos = Math.max(
  ...gruposPorPlan.map((gs) => CABEZA + gs.reduce((n, g) => n + (g.titulo ? 1 : 0) + g.filas.length, 0)),
);

const glifos: Record<Plan["id"], GlifoId> = {
  free: "cartel",
  starter: "chispa",
  full: "corona",
  evolution: "capas",
};

/** Los números de un texto ("Hasta 2.500 QR", "hasta 250 miembros") en negrita: son lo que se compara. */
function Cifras({ texto }: { texto: string }) {
  return texto.split(/(\d+(?:\.\d+)*)/).map((t, i) =>
    i % 2 ? (
      <b key={i} className="font-bold tnum">
        {t}
      </b>
    ) : (
      t
    ),
  );
}

/** "$ 75.000" o "USD 49": el símbolo chico y arriba, el número grande. */
function Monto({ texto }: { texto: string }) {
  const corte = texto.search(/\s/);
  if (corte < 0) return texto;
  return (
    <>
      <span className="mr-1 align-[0.95em] text-[0.42em] font-semibold tracking-normal">{texto.slice(0, corte)}</span>
      {texto.slice(corte + 1)}
    </>
  );
}

function Marca({ tono, oscuro }: { tono: Tono; oscuro: boolean }) {
  const trazo = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
        tono === "suma" && (oscuro ? "bg-gold text-ink" : "bg-brand text-paper"),
        tono === "igual" && (oscuro ? "text-paper/70" : "text-muted"),
        tono === "falta" && (oscuro ? "text-paper/50" : "text-muted/70"),
      )}
    >
      <svg viewBox="0 0 16 16" width={tono === "suma" ? 11 : 14} height={tono === "suma" ? 11 : 14} {...trazo}>
        {tono === "falta" ? <path d="M4 8h8" /> : <path d="M3 8.5l3.2 3.2L13 5" />}
      </svg>
    </span>
  );
}

function PlanCard({
  plan,
  grupos,
  anual,
  promo,
  moneda,
}: {
  plan: Plan;
  grupos: Grupo[];
  anual: boolean;
  promo: Promo | null;
  moneda: Moneda;
}) {
  const p = preciosDe(plan, anual, promo);
  const gratis = plan.precioMensual === 0;
  /* El destacado es la única tarjeta oscura: ink con halos y brillo de marca. */
  const oscuro = plan.destacado;
  const tenue = oscuro ? "text-paper/75" : "text-muted";

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      style={{ gridRow: `span ${tramos}` }}
      className={cn(
        "relative grid snap-start grid-rows-subgrid rounded-[2rem] p-5 sm:p-6 xl:p-5",
        "transition-[translate,box-shadow] duration-500 ease-fluida md:hover:-translate-y-1.5",
        "md:max-xl:[&:nth-child(n+3)]:mt-4",
        oscuro
          ? "noche grano shadow-[0_22px_44px_-24px_var(--color-brand)] md:shadow-[0_40px_80px_-32px_var(--color-brand)]"
          : "bg-paper md:hover:shadow-[var(--shadow-float)]",
      )}
    >
      {/* 1 · ícono y sello */}
      <div className="flex items-center justify-between gap-2">
        <span
          aria-hidden="true"
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl",
            oscuro ? "vidrio-claro" : "bg-brand-soft text-brand",
          )}
        >
          <Glifo id={glifos[plan.id]} size={22} />
        </span>
        {plan.destacado && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-ink">
            <Glifo id="estrella" size={12} className="text-brand" />
            Más elegido
          </span>
        )}
      </div>

      {/* 2 · nombre */}
      <h3 id={`plan-${plan.id}`} className="mt-4 font-display text-[1.75rem] font-bold leading-none tracking-[-0.04em]">
        {plan.nombre}
      </h3>

      {/* 3 · para quién */}
      <p className={cn("mt-2 text-sm leading-snug", tenue)}>{plan.paraQuien}</p>

      {/* 4 · precio. El número va siempre primero, para que quede a la misma
          altura en las cuatro tarjetas, con o sin promo. */}
      <div className="mt-5">
        <p className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
          <span className="font-display text-[2.375rem] font-bold leading-none tracking-[-0.045em] tnum">
            {gratis ? "Gratis" : <Monto texto={enMoneda(moneda, p.ars, p.usd)} />}
          </span>
          {!gratis && <span className={cn("text-sm", tenue)}>/mes</span>}
        </p>
        {p.lista && promo && (
          <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <s className={cn("text-[0.9375rem] font-medium tnum", tenue)}>
              <span className="sr-only">Antes: </span>
              {enMoneda(moneda, p.lista.ars, p.lista.usd)}
            </s>
            <span className="rounded-full bg-gold px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-ink">
              {promo.nombre} −{descuentoTexto(promo)}
            </span>
          </p>
        )}
        <p className={cn("mt-2.5 text-[13px] leading-snug", tenue)}>
          {gratis
            ? "Para siempre, sin tarjeta"
            : anual
              ? `${enMoneda(moneda, p.totalArs ?? 0, p.totalUsd ?? 0)} por año`
              : "Facturación mensual · sin permanencia"}
          {!gratis && (moneda === "ars" ? " · Mercado Pago" : " · tarjeta internacional")}
        </p>
        {p.lista && promo && (
          <p className={cn("mt-1.5 text-[13px] font-semibold leading-snug", oscuro ? "text-gold" : "text-brand")}>
            Precio {promo.nombre} si contratás hasta el {promo.hastaTexto}
          </p>
        )}
      </div>

      {/* 5 · botón */}
      <Button
        href={hrefContratar(plan, anual ? "anual" : "mensual")}
        variant={oscuro ? "oro" : "secondary"}
        size="md"
        className="mt-5 min-h-12 w-full self-start"
      >
        {plan.cta.label}
      </Button>

      {/* Lo que no incluye se muestra con una raya, nunca se omite: comparar
          es más persuasivo que ocultar. */}
      {grupos.map((g, n) => (
        <Fragment key={n}>
          {g.titulo && (
            <h4 className={cn("mt-6 text-[11px] font-bold uppercase tracking-[0.08em]", oscuro ? "text-gold" : "text-brand")}>
              {g.titulo}
            </h4>
          )}
          <ul
            style={{ gridRow: `span ${g.filas.length}` }}
            className={cn("grid grid-rows-subgrid", g.titulo ? "mt-2.5" : "mt-5")}
          >
            {g.filas.map(({ f, tono }) => (
              <li
                key={f.label}
                className={cn(
                  "flex gap-2.5 border-t py-2.5 text-[0.9375rem] leading-snug xl:text-sm xl:leading-snug",
                  oscuro ? "border-paper/[0.14]" : "border-ink/[0.08]",
                )}
              >
                <Marca tono={tono} oscuro={oscuro} />
                <span
                  className={cn(
                    tono === "suma" && "font-medium",
                    tono === "igual" && (oscuro ? "text-paper/75" : "text-muted"),
                    tono === "falta" && (oscuro ? "text-paper/65" : "text-muted"),
                  )}
                >
                  {tono === "falta" && <span className="sr-only">No incluye: </span>}
                  <Cifras texto={f.label} />
                  {f.nota && (
                    <span
                      className={cn(
                        "mt-0.5 block text-[13px] font-normal leading-snug",
                        tono === "suma" ? (oscuro ? "text-paper/80" : "text-ink/75") : "",
                      )}
                    >
                      <Cifras texto={f.nota} />
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </article>
  );
}

/** Un selector de dos opciones en píldora (ciclo, moneda). */
function Selector<T extends string | boolean>({
  label,
  opciones,
  valor,
  onChange,
}: {
  label: string;
  opciones: { valor: T; texto: React.ReactNode }[];
  valor: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full bg-paper p-1 shadow-pildora">
      {opciones.map((o) => (
        <button
          key={String(o.valor)}
          type="button"
          onClick={() => onChange(o.valor)}
          aria-pressed={o.valor === valor}
          className={cn(
            "group min-h-11 rounded-full px-3 text-[13px] font-semibold transition-colors duration-500 ease-fluida sm:px-5 sm:text-sm",
            o.valor === valor ? "bg-ink text-paper" : "text-ink/70 hover:text-ink",
          )}
        >
          {o.texto}
        </button>
      ))}
    </div>
  );
}

/**
 * Misma frase que `notaFiscal` en planes.ts, con los logos oficiales a color
 * (`public/pagos/*-color.svg`) en lugar de los nombres entre paréntesis.
 */
function NotaFacturacion() {
  const logo = "mx-1 inline-block w-auto align-[-0.3em]";
  return (
    <p className="mx-auto mt-1 max-w-[46rem] text-balance text-center text-sm leading-[1.9] text-muted md:mt-10">
      <strong className="font-semibold text-ink">Todos los precios son finales: ya incluyen IVA.</strong>{" "}
      Facturación A/B/C en Argentina. Pagá en dólares con tarjeta internacional vía
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pagos/stripe-color.svg" alt="Stripe" width={43} height={18} className={logo} style={{ height: 18 }} />
      o en pesos con
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/pagos/mercado-pago-color.svg" alt="Mercado Pago" width={87} height={22} className={logo} style={{ height: 22 }} />
    </p>
  );
}

/**
 * Los planes: selector de ciclo y de moneda, las cuatro tarjetas y la nota de
 * facturación. Se usa en /precios y en la home, siempre sobre un bloque claro
 * (lila o arena): las tarjetas son blancas y la destacada, oscura.
 *
 * `promo`: la vigente según el server (`promoVigente()` en la página). Se
 * pasa como prop y no se calcula acá para que el HTML y la hidratación
 * coincidan; `usePromoVigente` la apaga en el navegador cuando vence.
 *
 * En el teléfono las tarjetas se deslizan y, como comparten las filas de la
 * grilla, cada renglón queda a la misma altura en todas: al pasar de un plan
 * a otro no se pierde el lugar. La barrita con los nombres acompaña el scroll
 * (dice en cuál estás y salta a cualquiera).
 */
export function Pricing({ conNota = true, promo: promoServer = null }: { conNota?: boolean; promo?: Promo | null }) {
  const [anual, setAnual] = useState(false);
  const [moneda, setMoneda] = useState<Moneda>("ars");
  const promo = usePromoVigente(promoServer);

  const pista = useRef<HTMLDivElement>(null);
  const [aLaVista, setALaVista] = useState(0);

  /* Qué tarjeta quedó a la vista al deslizar (solo scrollea en el teléfono). */
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    let pedido = 0;
    const leer = () => {
      pedido = 0;
      const tarjetas = Array.from(el.children) as HTMLElement[];
      const borde = el.scrollLeft + parseFloat(getComputedStyle(el).paddingLeft);
      let cerca = 0;
      tarjetas.forEach((t, i) => {
        if (Math.abs(t.offsetLeft - borde) < Math.abs(tarjetas[cerca].offsetLeft - borde)) cerca = i;
      });
      /* Al fondo del recorrido, la última no llega a alinearse a la izquierda. */
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) cerca = tarjetas.length - 1;
      setALaVista(cerca);
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(leer);
    };
    el.addEventListener("scroll", pedir, { passive: true });
    return () => {
      cancelAnimationFrame(pedido);
      el.removeEventListener("scroll", pedir);
    };
  }, []);

  const irA = (i: number) => {
    const el = pista.current;
    const tarjeta = el?.children[i] as HTMLElement | undefined;
    if (!el || !tarjeta) return;
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: tarjeta.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft),
      behavior: quieto ? "auto" : "smooth",
    });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        <Selector
          label="Ciclo de facturación"
          valor={anual}
          onChange={setAnual}
          opciones={[
            { valor: false, texto: "Mensual" },
            {
              valor: true,
              texto: (
                <>
                  Anual
                  <span className="ml-1.5 text-brand group-aria-pressed:text-gold">
                    {BENEFICIO_ANUAL}
                  </span>
                </>
              ),
            },
          ]}
        />
        <Selector
          label="Moneda"
          valor={moneda}
          onChange={setMoneda}
          opciones={(["ars", "usd"] as const).map((m) => ({
            valor: m,
            texto: (
              <span className="inline-flex items-center gap-2">
                <Bandera pais={m === "ars" ? "ar" : "us"} size={14} decorativa />
                <span>
                  {m === "ars" ? "Pesos" : "Dólares"}
                  <span className="hidden sm:inline"> ({m.toUpperCase()})</span>
                </span>
              </span>
            ),
          }))}
        />
      </div>

      {/* La barrita y las tarjetas van en un mismo bloque: `sticky` dura lo que duran las tarjetas. */}
      <div>
        {/* Teléfono: en qué plan estás, siempre a la vista mientras recorrés las tarjetas. */}
        <nav
          aria-label="Planes"
          className="sticky top-[4.625rem] z-30 mx-auto mt-4 flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full border border-paper/15 bg-ink/90 p-1 shadow-[var(--shadow-float)] backdrop-blur-xl [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        >
          {planes.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => irA(i)}
              aria-current={i === aLaVista ? "true" : undefined}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-3.5 text-[13px] font-bold transition-colors duration-500 ease-fluida",
                i === aLaVista ? "bg-paper text-ink" : "text-paper/80",
              )}
            >
              {p.nombre}
            </button>
          ))}
        </nav>

        {/* Siempre Free → Starter → Full → Evolution, también en phone. */}
        <div
          ref={pista}
          className={cn(
            "relative mt-4 grid gap-x-3 md:mt-8 md:grid-cols-2 md:gap-x-4 xl:grid-cols-4",
            "max-md:-mx-5 max-md:snap-x max-md:snap-mandatory max-md:scroll-px-5 max-md:grid-flow-col max-md:auto-cols-[min(86%,340px)]",
            "max-md:overflow-x-auto max-md:overscroll-x-contain max-md:px-5 max-md:pb-9 max-md:pt-1",
            "max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden",
          )}
        >
          {planes.map((p, i) => (
            <PlanCard key={p.id} plan={p} grupos={gruposPorPlan[i]} anual={anual} promo={promo} moneda={moneda} />
          ))}
        </div>
      </div>

      {conNota && <NotaFacturacion />}
    </div>
  );
}
