import Image from "next/image";
import { AppTour } from "@/components/AppTour";
import { CartelCodigo } from "@/components/CartelCodigo";
import { PhoneFrame } from "@/components/app/PhoneFrame";
import { Mock } from "@/components/app/mocks";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { cartelCodigo } from "@/content/activar";
import { featuresConMaqueta } from "@/content/features";
import { actividad, pilares } from "@/content/home";
import { cierreComo, formatosIntro, pasos, pasosIntro, pasosSeccion, recorrido } from "@/content/pasos";
import { formatos, productos } from "@/content/productos";
import { cn } from "@/lib/cn";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cómo funciona",
  description:
    "De comprar un cartel a ver métricas en el dashboard, en menos de 48 horas. Los cuatro pasos para empezar con FlashTag y un recorrido por la app.",
  path: "/como-funciona",
});

/** El ícono de cada función del recorrido: el mismo que lleva en los pilares de la home. */
const glifos = Object.fromEntries(
  pilares.flatMap((p) => p.funciones.flatMap((f) => (f.feature ? [[f.feature, f.glifo] as const] : []))),
) as Record<string, GlifoId>;

/** El cartel de Google en un local: la foto del paso 2. */
const fotoCartel = productos.find((p) => p.slug === "cartel-google") ?? productos[0];

/** Cómo se acomodan las tres fotos de formato del paso 1: la primera adelante, las otras asomando. */
const abanico = [
  "left-1/2 top-0 z-10 size-[176px] -translate-x-1/2 -rotate-2",
  "left-0 top-14 size-[150px] -rotate-[11deg]",
  "right-0 top-16 size-[150px] rotate-[9deg]",
];

const visualPaso = "paso-visual absolute left-1/2 w-[300px] origin-top -translate-x-1/2 scale-[0.78]";

/** Qué se ve arriba de cada tarjeta, en el orden de `pasos`. Todo adorno: va en un bloque `aria-hidden`. */
const visuales: React.ReactNode[] = [
  <div key="formatos" className={cn(visualPaso, "top-9 h-[240px]")}>
    {formatos.slice(0, 3).map((f, i) => (
      <div key={f.nombre} className={cn("absolute overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-device)]", abanico[i])}>
        <Image src={f.foto} alt="" fill sizes="176px" className="object-cover" />
      </div>
    ))}
  </div>,
  <div
    key="local"
    className="absolute inset-x-0 top-0 h-[66%] [mask-image:linear-gradient(to_bottom,black_52%,transparent)]"
  >
    <Image
      src={fotoCartel.foto}
      alt=""
      fill
      sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 90vw"
      className="object-cover transition-transform duration-[900ms] ease-fluida group-hover:scale-105"
    />
  </div>,
  /* El cartel de cerca: la esquina del QR, con el ID/código marcado. */
  <div key="codigo" className={cn(visualPaso, "top-8 h-[250px] -rotate-6")}>
    <CartelCodigo decorativo sizes="620px" className="absolute left-[-350px] top-[-370px] w-[620px]" />
  </div>,
  <div key="metricas" className={cn(visualPaso, "top-7 -rotate-6 text-ink")}>
    <PhoneFrame glow={false}>
      <Mock id="metricas" />
    </PhoneFrame>
  </div>,
];

/** El hero: el cartel al lado del teléfono, y lo que le llega al dueño. Demo, no prueba social. */
function Escena() {
  const aviso = actividad[0];
  return (
    <div aria-hidden="true" className="relative mx-auto h-[310px] w-full max-w-[480px] lg:h-[560px]">
      {/* El aviso flota arriba del teléfono, como una notificación: no tapa la pantalla. */}
      <p className="vidrio ft-float absolute right-[14%] top-0 z-10 flex -rotate-3 items-center gap-2 whitespace-nowrap rounded-2xl py-1.5 pl-1.5 pr-3 text-[11px] font-semibold md:text-[13px] lg:right-[22%]">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[10px] bg-gold text-ink">
          <Glifo id={aviso.glifo} size={15} />
        </span>
        {aviso.titulo}
      </p>
      <div className="absolute right-0 top-[52px] w-[300px] origin-top-right rotate-[4deg] scale-[0.8] text-ink lg:top-[58px] lg:scale-[0.84]">
        <PhoneFrame>
          <Mock id="dashboard" />
        </PhoneFrame>
      </div>
      <Image
        src={cartelCodigo.src}
        alt=""
        width={600}
        height={600}
        sizes="(min-width: 1024px) 250px, 160px"
        loading="eager"
        className="absolute left-[-5%] top-[38%] h-auto w-[44%] -rotate-[8deg] drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)] lg:left-[-4%] lg:top-[40%] lg:w-[52%]"
      />
    </div>
  );
}

export default function ComoFuncionaPage() {
  const screens = Object.fromEntries(
    featuresConMaqueta.map((f) => [f.slug, <Mock key={f.slug} id={f.mock} />]),
  );

  return (
    <Pagina>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Cómo funciona" }]}
        titulo={pasosIntro.titular}
        destacado={pasosIntro.destacado}
        bajada={pasosIntro.bajada}
        visual={<Escena />}
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant="claro" size="lg">
          {cta.secondary.label}
        </Button>
      </HeroPagina>

      {/* ── LOS CUATRO PASOS: tarjetas que se ensanchan ───────── */}
      <Seccion id="pasos" ariaLabelledby="pasos-titulo">
        <Titulo
          id="pasos-titulo"
          titulo={
            <>
              {pasosSeccion.titular} <span className="text-brand">{pasosSeccion.destacado}</span>
            </>
          }
        />
        <ol className="pasos carrusel carrusel-ancho mt-9 gap-4 md:mt-14 md:grid md:grid-cols-2" data-reveal>
          {pasos.map((p, i) => (
            <li
              key={p.titulo}
              tabIndex={0}
              className={cn(
                "paso group relative flex h-[470px] flex-col justify-end overflow-hidden rounded-[2rem] p-6 text-paper outline-offset-4 md:h-[500px] lg:h-auto lg:p-7",
                `paso-${p.tono}`,
              )}
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {visuales[i]}
                <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink from-35% via-ink/80 to-transparent" />
              </div>
              <div className="relative">
                <span className="vidrio-claro flex size-12 items-center justify-center rounded-2xl">
                  <Glifo id={p.glifo} size={22} />
                </span>
                <h3 className="mt-3.5 font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em]">
                  <span className="mr-2 text-[13px] font-semibold tracking-normal text-gold tnum">0{i + 1}</span>
                  {p.titulo}
                </h3>
                <div className="paso-texto">
                  <div>
                    <p className="pt-2 text-[15px] leading-snug text-paper/85 lg:max-w-[40ch]">{p.texto}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5 md:mt-10">
          <p className="t-lead text-muted">{pasosSeccion.yaLoTenes}</p>
          <Button href={pasosSeccion.activar.href} variant="secondary" size="md" arrow className="w-full sm:w-auto">
            {pasosSeccion.activar.label}
          </Button>
        </div>
      </Seccion>

      {/* ── EL RECORRIDO POR LA APP ──────────────────────────── */}
      <Seccion tono="noche" id="recorrido" ariaLabelledby="recorrido-titulo">
        <Titulo
          id="recorrido-titulo"
          claro
          etiqueta={recorrido.etiqueta}
          titulo={
            <>
              {recorrido.titular} <span className="text-gold">{recorrido.destacado}</span>
            </>
          }
          bajada={recorrido.bajada}
        />
        <div className="mt-8 md:mt-12">
          <AppTour features={featuresConMaqueta} screens={screens} glifos={glifos} siguiente={recorrido.siguiente} />
        </div>
      </Seccion>

      {/* ── LOS FORMATOS DE LA TIENDA ────────────────────────── */}
      <Seccion tono="arena" id="formatos" ariaLabelledby="formatos-titulo">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <Titulo
            id="formatos-titulo"
            alineado="izq"
            titulo={
              <>
                {formatosIntro.titular} <span className="text-brand">{formatosIntro.destacado}</span>
              </>
            }
          />
          <p
            data-reveal="blur"
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="t-lead max-w-[34ch] text-muted md:pb-2"
          >
            {formatosIntro.bajada}
          </p>
        </div>
        <ul className="carrusel mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {formatos.map((f, i) => (
            <li key={f.nombre} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
              <a
                href={f.href}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-paper transition-[translate,box-shadow] duration-500 ease-fluida hover:-translate-y-1.5 hover:shadow-[var(--shadow-float)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.foto}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 350px, (min-width: 768px) 31vw, 82vw"
                    className="object-cover transition-transform duration-[900ms] ease-fluida group-hover:scale-105"
                  />
                  <span className="vidrio absolute left-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-bold tnum">
                    {f.medida}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-[1.375rem] font-bold leading-[1.1] tracking-[-0.035em] md:text-[1.5rem]">
                    {f.nombre}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.texto}</p>
                  <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-3 text-[15px] font-bold text-brand transition-[gap] duration-300 group-hover:gap-3.5">
                    {f.cta}
                    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ── CIERRE ───────────────────────────────────────────── */}
      <Cierre titular={cierreComo.titular} destacado={cierreComo.destacado} bajada={cierreComo.bajada} />
    </Pagina>
  );
}
