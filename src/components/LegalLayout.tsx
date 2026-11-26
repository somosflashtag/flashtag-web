import { Button } from "./ui/Button";
import { Cierre } from "./ui/Cierre";
import { Container } from "./ui/Container";
import { HeroPagina } from "./ui/HeroPagina";
import { Pagina } from "./ui/Pagina";
import type { DocLegal } from "@/lib/legal";

/**
 * Encabezado + cuerpo compartido por /terminos y /privacidad.
 *
 * Solo cambia el envoltorio: el texto sale tal cual de `src/content/legal/*.md`
 * (un export de la app; ver «Documentos legales» en AGENTS.md).
 */
export function LegalLayout({ doc }: { doc: DocLegal }) {
  return (
    <Pagina>
      <HeroPagina
        compacto
        confeti={false}
        migas={[{ label: "Inicio", href: "/" }, { label: "Legal" }]}
        etiqueta="Legal"
        glifo="escudo"
        titulo={doc.titulo}
        bajada={doc.vigencia}
      >
        <Button href="/terminos" variant="claro" size="md">
          Términos y Condiciones
        </Button>
        <Button href="/privacidad" variant="claro" size="md">
          Política de Privacidad
        </Button>
      </HeroPagina>

      <section className="py-12 md:py-20">
        <Container>
          <article
            className="legal mx-auto max-w-[760px]"
            /* HTML generado en build time desde Markdown del repositorio.
               No hay contenido de usuario en esta ruta. Ver lib/legal.ts */
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </Container>
      </section>

      <Cierre />
    </Pagina>
  );
}
