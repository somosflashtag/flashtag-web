import { Cartel } from "./ui/Cartel";
import { QRMark } from "./ui/QRMark";
import { Section } from "./ui/Section";
import { precioARS, productos, tienda } from "@/content/productos";

/**
 * Bloque de tienda. Lo más tangible del sitio: un objeto con precio.
 * Cada tarjeta sale a Shopify — acá no se vende, se muestra.
 */
export function Tienda() {
  return (
    <Section id="tienda" className="border-y border-line bg-surface">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark /> La tienda
          </p>
          <h2 className="t-h2 mt-3">{tienda.titular}</h2>
          <p className="t-lead measure mt-4 text-muted">{tienda.bajada}</p>
        </div>
        <a
          href={tienda.href}
          className="t-caption font-semibold text-brand underline underline-offset-4"
        >
          Ver toda la tienda
        </a>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {productos.map((p) => (
          <li key={p.slug}>
            <a
              href={p.href}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-colors duration-[120ms] hover:border-ink"
            >
              <div className="relative flex items-center justify-center bg-surface px-10 pb-2 pt-8">
                {p.etiqueta && (
                  <span className="absolute left-4 top-4 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">
                    {p.etiqueta}
                  </span>
                )}
                <Cartel
                  canal={p.canal}
                  className="w-[150px] transition-transform duration-300 ease-[var(--ease-ft)] group-hover:-translate-y-1"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="t-h3">{p.nombre}</h3>
                <p className="t-body mt-2 flex-1 text-muted">{p.bajada}</p>
                <p className="t-h3 mt-5 tnum">{precioARS(p.precioARS)}</p>
                <p className="t-caption mt-1 text-muted">
                  Envío a todo el país · App gratis incluida
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
