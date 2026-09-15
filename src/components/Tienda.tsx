import Image from "next/image";
import { Button } from "./ui/Button";
import { QRMark } from "./ui/QRMark";
import { Section } from "./ui/Section";
import { formatos, precioARS, productos, tienda } from "@/content/productos";

/**
 * Bloque de tienda. Lo más tangible del sitio: el objeto, fotografiado en un
 * local real, con su precio. Acá no se vende — cada tarjeta sale a Shopify.
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
          Ver todos los productos
        </a>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3">
        {productos.map((p, i) => (
          <li key={p.slug}>
            <a
              href={p.href}
              className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper transition-colors duration-[120ms] hover:border-ink"
            >
              <div className="relative aspect-square overflow-hidden">
                {p.etiqueta && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-paper">
                    {p.etiqueta}
                  </span>
                )}
                <Image
                  src={p.foto}
                  alt={p.alt}
                  width={700}
                  height={700}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  /* La primera entra en el LCP de quien scrollea rápido. */
                  priority={i === 0}
                  className="size-full object-cover transition-transform duration-500 ease-[var(--ease-ft)] group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="t-h3">{p.nombre}</h3>
                <p className="t-body mt-2 flex-1 text-muted">{p.bajada}</p>
                <p className="t-h3 mt-5 tnum">
                  {p.precioARS !== undefined ? precioARS(p.precioARS) : "Ver precio en la tienda"}
                </p>
                <p className="t-caption mt-1 text-muted">
                  QR + NFC · Envío a todo el país · App gratis incluida
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex justify-center">
        <Button href={tienda.href} variant="primary" size="lg" arrow>
          Ver todos los productos
        </Button>
      </div>

      {/* Los tres formatos: acá se entiende que es un objeto con medidas. */}
      <div className="mt-14 border-t border-line pt-10">
        <h3 className="t-h3">Tres formatos, tres lugares del local</h3>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          {formatos.map((f) => (
            <li
              key={f.nombre}
              className="card-lift flex flex-col rounded-[var(--radius-card)] border border-line bg-paper p-5"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={f.foto}
                  alt={f.nombre}
                  width={200}
                  height={200}
                  sizes="88px"
                  className="size-22 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold">{f.nombre}</p>
                  <p className="t-caption text-brand tnum">{f.medida}</p>
                  <p className="t-caption mt-1 text-muted">{f.texto}</p>
                </div>
              </div>
              <Button href={f.href} variant="primary" size="md" arrow className="mt-5 w-full">
                {f.cta}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
