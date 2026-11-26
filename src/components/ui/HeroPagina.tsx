import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { Confeti, type Pieza } from "./Confeti";
import { Container } from "./Container";
import { Glifo, type GlifoId } from "./Glifo";

/**
 * El hero de TODA página interna: bloque `ink` a todo el ancho, con las
 * esquinas de abajo redondeadas, titular grande y lo que haga falta al lado.
 *
 * Todas las páginas arrancan con este bloque (o con el hero propio de la
 * home). El header flota encima: por eso el padding de arriba es grande, y
 * por eso lleva `data-hero` (el header y el layout lo buscan).
 *
 * - Con `visual` (un teléfono, una foto, una tarjeta): dos columnas desde
 *   `lg`, texto a la izquierda. Sin `visual`, o con `centrado`: una columna
 *   centrada (y el visual, si hay, va debajo).
 * - `titulo` + `destacado`: el destacado va en gold. Una sola frase corta.
 * - `children`: los botones. Sobre este fondo van `variant="oro"` (el
 *   principal) y `variant="claro"` (el secundario).
 * - `migas`: migas de pan. Emite también el JSON-LD `BreadcrumbList`; la
 *   página no tiene que agregarlo.
 * - `compacto`: para páginas de texto (legales, artículo) donde el hero es
 *   solo el encabezado.
 */
export type Miga = { label: string; href?: string };

const confetiBase: Pieza[] = [
  { pos: "left-[3%] top-[26%]", lado: 30, tono: "gold", giro: 14, soloMd: true },
  { pos: "right-[5%] top-[15%]", lado: 16, tono: "teal", giro: 22 },
  { pos: "left-[46%] top-[90%]", lado: 20, tono: "coral", giro: -10, soloMd: true },
  { pos: "right-[2.5%] top-[80%]", lado: 40, tono: "coral", giro: 8, soloMd: true },
  { pos: "left-[9%] top-[8%]", lado: 12, tono: "paper", giro: 30 },
];

function Migas({ items, centradas }: { items: Miga[]; centradas: boolean }) {
  const lista = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.label,
      ...(m.href && { item: `${site.domain}${m.href}` }),
    })),
  };
  return (
    <nav aria-label="Migas de pan" className="ft-llega mb-3">
      <JsonLd id="ld-migas" data={lista} />
      <ol className={cn("flex flex-wrap items-center gap-x-1.5 text-[13px] text-paper/65", centradas && "justify-center")}>
        {items.map((m, i) => (
          <li key={m.label} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true">/</span>}
            {m.href ? (
              <Link href={m.href} className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-paper hover:underline">
                {m.label}
              </Link>
            ) : (
              <span aria-current="page" className="inline-flex min-h-11 items-center text-paper/90">
                {m.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function HeroPagina({
  titulo,
  destacado,
  bajada,
  migas,
  etiqueta,
  glifo,
  children,
  visual,
  pie,
  centrado = false,
  compacto = false,
  confeti = true,
  className,
}: {
  titulo: React.ReactNode;
  /** La parte del titular que va en gold. */
  destacado?: React.ReactNode;
  bajada?: React.ReactNode;
  migas?: Miga[];
  /** Píldora chica arriba del titular (el nombre de la sección, el plan, el rubro). */
  etiqueta?: React.ReactNode;
  glifo?: GlifoId;
  /** Los botones. */
  children?: React.ReactNode;
  /** Lo que acompaña al texto: teléfono, foto, tarjeta. */
  visual?: React.ReactNode;
  /** Una línea chica debajo de los botones (checks, aclaraciones). */
  pie?: React.ReactNode;
  centrado?: boolean;
  compacto?: boolean;
  confeti?: boolean;
  className?: string;
}) {
  const dos = Boolean(visual) && !centrado;
  return (
    <section
      data-hero
      data-tono="noche"
      className={cn("noche-hero grano relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem]", className)}
    >
      {confeti && <Confeti piezas={confetiBase} />}
      <Container className="relative z-10">
        <div
          className={cn(
            compacto ? "pb-10 pt-[100px] md:pb-14 md:pt-[128px]" : "pb-12 pt-[104px] md:pb-20 md:pt-[140px]",
            dos
              ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-14"
              : "mx-auto flex max-w-[920px] flex-col items-center text-center",
          )}
        >
          <div className={cn(!dos && "flex flex-col items-center")}>
            {migas && <Migas items={migas} centradas={!dos} />}
            {etiqueta && (
              <span className="eyebrow-noche ft-llega mb-5">
                {glifo && <Glifo id={glifo} size={13} />}
                {etiqueta}
              </span>
            )}
            <h1 className="t-hero ft-llega text-balance" style={{ animationDelay: "60ms" }}>
              {titulo}
              {destacado && (
                <>
                  {" "}
                  <span className="text-gold">{destacado}</span>
                </>
              )}
            </h1>
            {bajada && (
              <p className="ft-llega t-lead mt-5 max-w-[56ch] text-paper/80 md:mt-6" style={{ animationDelay: "160ms" }}>
                {bajada}
              </p>
            )}
            {children && (
              <div
                className={cn("ft-llega mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-9", !dos && "sm:justify-center")}
                style={{ animationDelay: "260ms" }}
              >
                {children}
              </div>
            )}
            {pie && (
              <div className="ft-llega mt-5 text-[13px] text-paper/75 sm:text-sm" style={{ animationDelay: "340ms" }}>
                {pie}
              </div>
            )}
          </div>
          {visual && (
            <div className={cn("ft-llega relative", !dos && "mt-10 w-full")} style={{ animationDelay: "300ms" }}>
              {visual}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
