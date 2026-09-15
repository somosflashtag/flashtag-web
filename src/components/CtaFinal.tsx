import { Container } from "./ui/Container";

/**
 * CIERRE DE PÁGINA — el último bloque antes del footer, en TODAS las páginas.
 *
 * Regla: nunca es violeta. El footer sí lo es, y si el bloque anterior
 * también lo fuera, los dos se leerían como una sola mancha oscura y el
 * footer dejaría de distinguirse. Por eso el cierre es un panel de arena
 * sobre fondo blanco: corta con lo de arriba y corta con el footer.
 *
 * Es un componente y no un patrón copiado en cada página: así el cierre
 * cambia en un solo lugar (regla 3 — un dato, una fuente).
 */
export function CtaFinal({
  titulo,
  texto,
  children,
  pie,
}: {
  titulo: string;
  texto?: React.ReactNode;
  /** Los botones. Sobre arena van con las variantes normales, sin overrides. */
  children: React.ReactNode;
  /** Línea opcional bajo los botones (por ejemplo, la firma de prensa). */
  pie?: React.ReactNode;
}) {
  return (
    <section className="w-full bg-paper py-14 md:py-20 lg:py-28">
      <Container>
        <div
          className="relative overflow-hidden rounded-[var(--radius-surface)] border border-line bg-surface px-6 py-14 text-center md:px-12 lg:py-20"
          data-reveal
        >
          <div
            aria-hidden="true"
            className="bg-dots absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
          />
          <div className="relative">
            <h2 className="t-h2 measure mx-auto text-balance">{titulo}</h2>
            {texto && (
              <p className="t-lead measure mx-auto mt-5 text-muted">{texto}</p>
            )}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {children}
            </div>
            {pie && <p className="t-caption mt-6 text-muted">{pie}</p>}
          </div>
        </div>
      </Container>
    </section>
  );
}
