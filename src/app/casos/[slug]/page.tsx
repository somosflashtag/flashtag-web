import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CasoCard } from "@/components/CasoCard";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Container } from "@/components/ui/Container";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina, Viaja } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { type Caso, casosConDetalle, casosPublicables, rubros } from "@/content/casos";
import { cn } from "@/lib/cn";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

/**
 * Detalle de caso. Solo se genera para casos autorizados CON texto escrito:
 * si `autorizado` es false, generateStaticParams devuelve [] y la ruta no
 * existe. La autorización es lo que habilita la página, no un detalle visual.
 */
export function generateStaticParams() {
  return casosConDetalle.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = casosConDetalle.find((x) => x.slug === slug);
  if (!c?.portada) return {};
  return pageMeta({
    title: c.portada.titular,
    description: c.portada.bajada,
    path: `/casos/${c.slug}`,
  });
}

const tonosCifra = ["dato-brand", "dato-coral", "dato-teal", "dato-brand"];

/**
 * Antes y con FlashTag, en dos barras. La barra larga es siempre la mayor de
 * las dos: el ancho es proporcional, así que un ×12 se ve como un ×12.
 */
function Evolucion({ e }: { e: NonNullable<Caso["evolucion"]> }) {
  const max = Math.max(e.antes.valor, e.despues.valor, 1);
  const filas = [
    { ...e.antes, barra: "bg-ink/25", cifra: "text-ink/70" },
    { ...e.despues, barra: "bg-brand", cifra: "text-brand" },
  ];
  return (
    <figure data-reveal className="mx-auto mt-4 rounded-[1.75rem] bg-brand-soft/70 p-6 md:p-9">
      <figcaption className="font-display text-[1.25rem] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[1.5rem]">
        {e.titulo}
      </figcaption>
      <dl className="mt-6 space-y-5">
        {filas.map((f) => (
          <div key={f.etiqueta}>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-[15px] font-medium text-ink">{f.etiqueta}</dt>
              <dd className={cn("font-display text-[2rem] font-bold leading-none tracking-[-0.04em] tnum", f.cifra)}>
                {f.valor.toLocaleString("es-AR")}
              </dd>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-paper" aria-hidden="true">
              <div className={cn("h-full rounded-full", f.barra)} style={{ width: `${Math.max((f.valor / max) * 100, 2)}%` }} />
            </div>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-sm leading-relaxed text-muted">{e.nota}</p>
    </figure>
  );
}

export default async function CasoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = casosConDetalle.find((x) => x.slug === slug);
  if (!c?.detalle || !c.portada) notFound();

  const html = marked.parse(
    fs.readFileSync(
      path.join(process.cwd(), "src", "content", "casos-detalle", `${c.detalle}.md`),
      "utf-8",
    ),
    { async: false, gfm: true },
  );

  const rubro = rubros.find((r) => r.id === c.rubro)?.label;
  /* Otros casos: primero los del mismo rubro. Nunca el que se está leyendo
     (su logo ya viaja en el hero con el mismo nombre de transición). */
  const otros = casosPublicables
    .filter((x) => x.slug !== c.slug)
    .sort((a, b) => Number(b.rubro === c.rubro) - Number(a.rubro === c.rubro))
    .slice(0, 3);

  return (
    <Pagina>
      <HeroPagina
        largo
        migas={[{ label: "Inicio", href: "/" }, { label: "Casos", href: "/casos" }, { label: c.negocio }]}
        etiqueta={rubro}
        titulo={c.portada.titular}
        bajada={c.portada.bajada}
        pie={
          <ul className="flex flex-wrap gap-2">
            {c.portada.datos.map((d) => (
              <li key={d} className="vidrio-claro rounded-full px-3 py-1.5 text-[13px] font-medium text-paper">
                {d}
              </li>
            ))}
          </ul>
        }
        visual={
          <figure className="relative mx-auto w-full max-w-[460px]">
            <div className="foto-b relative aspect-square overflow-hidden shadow-[var(--shadow-device)]">
              <Image
                src={c.foto?.src ?? "/productos/cartel-google.webp"}
                alt={c.foto?.alt ?? `Cartel de FlashTag con QR y NFC en ${c.negocio}`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover"
              />
            </div>
            {/* El logo viaja desde la tarjeta del caso. Siempre sobre ink. */}
            <figcaption className="absolute -bottom-5 left-4 flex h-[76px] items-center rounded-[1.5rem] border border-paper/15 bg-ink px-5 shadow-[var(--shadow-device)] md:-left-6">
              <Viaja nombre={`caso-${c.slug}`}>
                <div className="flex h-14 items-center">
                  {c.logo ? (
                    <Image
                      src={c.logo}
                      alt={c.negocio}
                      width={160}
                      height={56}
                      sizes="150px"
                      className="h-auto max-h-14 w-auto max-w-[140px] object-contain"
                    />
                  ) : (
                    <span className="font-display text-xl font-bold tracking-[-0.03em] text-paper">{c.negocio}</span>
                  )}
                </div>
              </Viaja>
            </figcaption>
          </figure>
        }
      >
        <Button href={site.urls.shop} variant="oro" size="lg" arrow>
          Comprá tu cartel
        </Button>
        <Button href={cta.primary.href} variant="claro" size="lg">
          {cta.primary.label}
        </Button>
      </HeroPagina>

      {/* Las cifras solo salen cuando están cruzadas con el dashboard. */}
      {c.metricaVerificada && (
        <Seccion aire="chico" className="pb-0 md:pb-0">
          <dl className="carrusel carrusel-angosto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.portada.cifras.map((f, i) => (
              <div
                key={f.label}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className={cn("flex min-h-[150px] flex-col justify-end rounded-[1.75rem] p-6 text-paper", tonosCifra[i % tonosCifra.length])}
              >
                <dd className="order-1 font-display text-[2.5rem] font-bold leading-none tracking-[-0.045em] tnum md:text-[3rem]">{f.valor}</dd>
                <dt className="order-2 mt-2 text-[15px] leading-snug text-paper/90">{f.label}</dt>
              </div>
            ))}
          </dl>

          {/* Antes y después: el número que cuenta la historia, con su fuente. */}
          {c.evolucion && <Evolucion e={c.evolucion} />}
        </Seccion>
      )}

      {/* ── EL RELATO ────────────────────────────────────────── */}
      <section className="py-14 md:py-24">
        <Container>
          <article className="legal mx-auto max-w-[720px]" dangerouslySetInnerHTML={{ __html: html }} />

          {c.medicion && (
            <p className="mx-auto mt-10 max-w-[720px] border-t border-ink/10 pt-6 text-sm leading-relaxed text-muted">
              <strong className="text-ink">Cómo lo medimos.</strong> {c.medicion}
            </p>
          )}

          {c.testimonio && (
            <blockquote data-reveal className="mx-auto mt-12 max-w-[720px] rounded-[2rem] bg-brand-soft/70 p-7 md:p-10">
              <p className="font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] md:text-[1.625rem]">
                &ldquo;{c.testimonio.texto}&rdquo;
              </p>
              <footer className="mt-5 text-sm text-muted">
                <strong className="text-ink">{c.testimonio.autor}</strong> · {c.testimonio.cargo}
              </footer>
            </blockquote>
          )}
        </Container>
      </section>

      {/* ── MÁS CASOS ────────────────────────────────────────── */}
      {otros.length > 0 && (
        <Seccion tono="arena">
          <Titulo titulo="Más casos" />
          <ul className="carrusel mt-9 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {otros.map((o, i) => (
              <li key={o.slug} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
                <CasoCard caso={o} />
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link href="/casos" className="inline-flex min-h-11 items-center text-[15px] font-bold text-brand underline underline-offset-4">
              Ver todos los casos
            </Link>
          </p>
        </Seccion>
      )}

      <Cierre
        tamano="mega"
        titular="¿Querés resultados"
        destacado="como estos?"
        bajada="Empezá con un cartel y escalá cuando quieras."
      >
        <Button href={site.urls.shop} variant="oro" size="lg" arrow>
          Comprá tu cartel
        </Button>
        <Button href={cta.primary.href} variant="claro" size="lg">
          {cta.primary.label}
        </Button>
      </Cierre>
    </Pagina>
  );
}
