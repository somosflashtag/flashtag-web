import Link from "next/link";
import { Container } from "./ui/Container";
import { QRMark } from "./ui/QRMark";
import type { DocLegal } from "@/lib/legal";

/** Encabezado + cuerpo compartido por /terminos y /privacidad. */
export function LegalLayout({ doc }: { doc: DocLegal }) {
  return (
    <>
      <div className="border-b border-line bg-surface py-14 md:py-20">
        <Container>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark /> Legal
          </p>
          <h1 className="t-h2 mt-4">{doc.titulo}</h1>
          {doc.vigencia && (
            <p className="t-caption mt-3 text-muted">{doc.vigencia}</p>
          )}
          <nav className="mt-7 flex flex-wrap gap-2" aria-label="Documentos legales">
            <Link
              href="/terminos"
              className="t-caption rounded-full border border-line bg-paper px-4 py-2 transition-colors duration-[120ms] hover:border-ink"
            >
              Términos y Condiciones
            </Link>
            <Link
              href="/privacidad"
              className="t-caption rounded-full border border-line bg-paper px-4 py-2 transition-colors duration-[120ms] hover:border-ink"
            >
              Política de Privacidad
            </Link>
          </nav>
        </Container>
      </div>

      <Container>
        <article
          className="legal max-w-3xl py-14 md:py-20"
          /* HTML generado en build time desde Markdown del repositorio.
             No hay contenido de usuario en esta ruta. Ver lib/legal.ts */
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />
      </Container>
    </>
  );
}
