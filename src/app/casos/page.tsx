import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { MapaComercios } from "@/components/MapaComercios";
import { CasosFiltro } from "@/components/home/CasosFiltro";
import { casosPublicables, rubros } from "@/content/casos";
import { mapaAbierto } from "@/lib/mapa";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Casos",
  description:
    "Comercios argentinos que usan FlashTag para crecer: qué hicieron, con qué herramienta y qué resultado obtuvieron.",
  path: "/casos",
});

export default async function CasosPage() {
  const hay = casosPublicables.length > 0;
  const mapa = await mapaAbierto();

  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Casos" }]}
        etiqueta="Casos reales"
        glifo="trofeo"
        titulo="Locales que crecen"
        destacado="con FlashTag."
        bajada="De almacenes de barrio a marcas reconocidas. Casos reales de comercios argentinos."
        pie="Publicamos un caso solo con permiso del comercio. Las cifras salen de sus perfiles de Google."
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          {cta.primary.label}
        </Button>
        <Button href={cta.secondary.href} variant="claro" size="lg">
          {cta.secondary.label}
        </Button>
      </HeroPagina>

      <Seccion>
        {hay ? (
          <>
            <Titulo titulo="Qué hicieron y qué les dio" bajada="Elegí un rubro y mirá los casos más cercanos al tuyo." />
            <CasosFiltro casos={casosPublicables} rubros={rubros} limite={casosPublicables.length} columnas={3} />
          </>
        ) : (
          /* Sin casos autorizados no inventamos una grilla: se ofrece serlo.
             Ver AGENTS.md §4 y el flag `autorizado` en content/casos.ts. */
          <div className="mx-auto max-w-2xl rounded-[2rem] bg-brand-soft/70 p-8 text-center sm:p-12">
            <Titulo tamano="chico" titulo="Estamos preparando esta sección." />
            <p className="t-lead mt-4 text-muted">
              Publicamos un caso solo cuando el comercio nos autoriza a usar su nombre y los números están verificados
              contra el dashboard. Las historias están; los permisos, en camino.
            </p>
            <p className="mt-6 text-muted">
              ¿Tenés un local y querés que contemos el tuyo? Escribinos y lo armamos juntos.
            </p>
          </div>
        )}
      </Seccion>

      {/* Los locales que ya lo usan, sobre el mapa. Los rubros enlazan a #mapa. */}
      {mapa && (
        <Seccion tono="arena" id="mapa">
          <MapaComercios />
        </Seccion>
      )}

      <Cierre
        tamano="mega"
        titular={hay ? "¿Querés ser" : "Empezá hoy,"}
        destacado={hay ? "el próximo caso?" : "contalo mañana."}
        bajada="Empezá gratis, sin tarjeta de crédito."
      />
    </Pagina>
  );
}
