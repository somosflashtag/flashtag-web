import { Section } from "./ui/Section";
import { QRMark } from "./ui/QRMark";
import { formatos, puntosImprenta } from "@/content/formatos";

/**
 * Sección propia de /producto/qr-dinamicos: en qué formatos baja el QR.
 *
 * No tiene página propia a propósito. Quien busca "QR para imprenta" no es un
 * público aparte: es el mismo comercio con un diseñador al lado, o la agencia
 * que le maneja la marca. Va donde ya está mirando el QR dinámico, después de
 * "Cómo funciona", que es el momento en que aparece la pregunta: *bueno, ¿y
 * cómo se lo paso a la gráfica?*
 */
export function FormatosDescarga() {
  return (
    <Section id="formatos" className="border-t border-line">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div data-reveal>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark size={12} /> Para imprenta
          </p>
          <h2 className="t-h2 mt-4 text-balance">
            El archivo que te pide el diseñador, sin tener que pedirlo
          </h2>
          <p className="t-lead mt-4 text-muted">
            Bajás el mismo QR en siete formatos. Para el posteo, PNG. Para la
            gráfica que imprime la vidriera, el vectorial en CMYK. Si trabajás
            con una agencia o con un diseñador, le pasás el EPS y no vuelve con
            el clásico &ldquo;mandámelo en vector&rdquo;.
          </p>
          <p className="t-body mt-6 rounded-[var(--radius-card)] border border-line bg-surface p-5 text-muted">
            Sirve para lo grande y para lo chico: una gigantografía, el menú, un
            packaging, el uniforme, un cartel de obra. El QR es siempre el mismo
            y el destino lo seguís cambiando desde el celular, aunque ya esté
            impreso.
          </p>
        </div>

        <ul
          className="grid gap-3 sm:grid-cols-2"
          data-reveal
          style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
        >
          {formatos.map((f) => (
            <li
              key={f.nombre}
              className="rounded-[var(--radius-card)] border border-line bg-paper p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="t-h3">{f.nombre}</h3>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">
                  {f.tipo}
                </span>
              </div>
              <p className="t-body mt-2 text-muted">{f.para}</p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {puntosImprenta.map((p, i) => (
          <li
            key={p.titulo}
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            className="rounded-[var(--radius-surface)] border border-line bg-surface p-6 lg:p-8"
          >
            <QRMark size={16} />
            <h3 className="t-h3 mt-5">{p.titulo}</h3>
            <p className="t-body mt-2 text-muted">{p.texto}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
