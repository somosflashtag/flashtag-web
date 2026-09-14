import Link from "next/link";
import { QRMark } from "./ui/QRMark";
import { Section } from "./ui/Section";
import { casosConDetalle } from "@/content/casos";

/**
 * Prueba social en la home. Es lo más real que tiene el sitio: nombres de
 * comercios que cualquiera reconoce, con el número de reseñas que se puede
 * chequear en Google en diez segundos.
 *
 * Solo muestra casos autorizados con métrica verificada. Si no hay ninguno,
 * la sección no se renderiza — no hay estado vacío que maquetar.
 */
export function CasosDestacados({ limite = 4 }: { limite?: number }) {
  const destacados = casosConDetalle
    .filter((c) => c.metricaVerificada)
    .slice(0, limite);

  if (destacados.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark /> Casos reales
          </p>
          <h2 className="t-h2 mt-3">Locales que ya usan FlashTag</h2>
          <p className="t-lead measure mt-4 text-muted">
            De almacenes de barrio a marcas que conocés. Los números salen de
            sus perfiles de Google.
          </p>
        </div>
        <Link
          href="/casos"
          className="t-caption font-semibold text-brand underline underline-offset-4"
        >
          Ver todos los casos
        </Link>
      </div>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destacados.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/casos/${c.slug}`}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-line p-6 transition-colors duration-[120ms] hover:border-ink"
            >
              <h3 className="t-h3">{c.negocio}</h3>
              <p className="t-caption mt-1 text-muted">{c.ciudad}</p>
              <p className="t-h3 mt-5 text-brand tnum">{c.metrica}</p>
              <p className="t-caption mt-auto pt-5 font-semibold text-brand underline underline-offset-4">
                Ver el caso
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
