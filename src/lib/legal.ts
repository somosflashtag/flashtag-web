import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

/**
 * Renderiza los documentos legales desde src/content/legal/*.md.
 *
 * Los .md son un export de la app (scripts/extraer-legales.mjs): la fuente de
 * verdad vive en el TSX de my.flashtag.tech. Se guardan como Markdown, y no
 * transcriptos a TSX, para que al regenerarlos alcance con pisar el archivo —
 * sin tocar código y sin que las dos versiones se desincronicen. Google compara
 * el texto publicado en el dominio del consent screen contra el de la app.
 *
 * El HTML se genera en build time desde contenido del propio repositorio
 * (nunca input de usuario), así que no hay superficie de XSS.
 */

const DIR = path.join(process.cwd(), "src", "content", "legal");

export type DocLegal = {
  titulo: string;
  vigencia: string | null;
  html: string;
};

export function leerLegal(nombre: "terminos" | "privacidad"): DocLegal {
  const crudo = fs.readFileSync(path.join(DIR, `${nombre}.md`), "utf-8");

  // El export trae un comentario HTML con notas internas: no se publica.
  const sinComentarios = crudo.replace(/<!--[\s\S]*?-->/g, "").trim();

  const titulo = sinComentarios.match(/^#\s+(.+)$/m)?.[1] ?? "";
  const vigencia = sinComentarios.match(/^Vigente desde (.+)$/m)?.[0] ?? null;

  // El h1 y la línea de vigencia se maquetan aparte, en el encabezado.
  const cuerpo = sinComentarios
    .replace(/^#\s+.+$/m, "")
    .replace(/^Vigente desde .+$/m, "")
    .trim();

  const html = marked.parse(cuerpo, { async: false, gfm: true });

  return { titulo, vigencia, html };
}
