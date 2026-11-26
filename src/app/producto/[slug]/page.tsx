import { notFound } from "next/navigation";
import { Analitica } from "@/components/Analitica";
import { FidelidadDetalle } from "@/components/FidelidadDetalle";
import { FormatosDescarga } from "@/components/FormatosDescarga";
import { MetricasDetalle } from "@/components/MetricasDetalle";
import { PixelesDetalle } from "@/components/PixelesDetalle";
import { SimuladorMaps } from "@/components/home/SimuladorMaps";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { analiticaPara } from "@/content/analitica";
import { features } from "@/content/features";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";
import { EnQuePlan, glifoDe, Pasos, RestoDeLaApp, Usos, visualDe } from "./secciones";

/** Una página estática por feature, con su pantalla de la app. */
export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) return {};
  return pageMeta({
    title: f.seoTitle ?? f.nombre,
    description: f.seoDescription ?? f.bajada,
    path: `/producto/${f.slug}`,
  });
}

/**
 * La plantilla de las páginas de producto. El orden es el argumento:
 *
 *   hero            qué es, desde qué plan y cómo se ve en la app
 *   cómo funciona   los pasos, y debajo lo que no entró en el hero
 *   el detalle      lo propio de cada feature (formatos, modalidades, campos…)
 *   para qué        los casos de uso, con la analogía
 *   analítica       qué se mide, donde aplica
 *   en qué plan     qué trae cada plan para esta feature (planes.ts)
 *   el resto        las otras páginas de producto
 *   cierre
 *
 * Una feature nueva en `content/features.ts` ya tiene página: con `mock` sale
 * el teléfono en el hero; con `pantalla`, la pantalla del panel.
 */
export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  if (!f) notFound();

  const otras = features.filter((x) => x.slug !== f.slug);
  const tieneAnalitica = Boolean(analiticaPara(f.slug));

  // El final del titular va en gold, si `destacado` es de verdad su cierre.
  const corta = f.destacado && f.titular.endsWith(f.destacado);
  const titulo = corta ? f.titular.slice(0, -f.destacado!.length).trimEnd() : f.titular;

  // Lo que entra en Free se activa con el cartel; lo pago se compara en precios.
  const secundario = f.desde === "Free" ? cta.secondary : { label: "Ver precios", href: "/precios" };

  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Producto", href: "/como-funciona" }, { label: f.nombre }]}
        glifo={glifoDe(f)}
        etiqueta={
          <>
            <span className="max-sm:hidden">{f.nombre}</span>
            <span aria-hidden="true" className="opacity-60 max-sm:hidden">
              ·
            </span>
            <span>Desde {f.desde}</span>
          </>
        }
        titulo={titulo}
        destacado={corta ? f.destacado : undefined}
        bajada={f.entrada}
        visual={visualDe(f)}
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={secundario.href} variant="claro" size="lg">
          {secundario.label}
        </Button>
      </HeroPagina>

      <Pasos f={f} />

      {f.slug === "qr-dinamicos" && <FormatosDescarga />}
      {f.slug === "fidelidad" && <FidelidadDetalle />}
      {f.slug === "pixeles" && <PixelesDetalle />}
      {f.slug === "posicion-en-maps" && (
        <Seccion tono="arena" id="simulador">
          <Titulo
            titulo="Probalo: buscá como tu cliente"
            bajada="Elegí un rubro y mirá cómo se lee una medición: en qué puesto sale el local en cada punto y quién le gana. Es un ejemplo; en la app se mide con tu ficha y tus competidores reales."
          />
          <div data-reveal="zoom">
            <SimuladorMaps />
          </div>
        </Seccion>
      )}

      {/* En métricas, los casos de uso SON las preguntas que contesta el panel:
          van adentro de su detalle, no en una sección aparte. */}
      {f.slug === "metricas" ? <MetricasDetalle casos={f.casos} /> : <Usos f={f} />}

      {tieneAnalitica && <Analitica slug={f.slug} />}

      <EnQuePlan f={f} />

      <RestoDeLaApp otras={otras} />

      <Cierre titular="Probalo" destacado="en tu local." bajada="Empezá gratis, sin tarjeta de crédito. Setup en minutos." />
    </Pagina>
  );
}
