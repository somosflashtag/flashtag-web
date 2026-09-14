import Link from "next/link";
import { CasoCard } from "./CasoCard";
import { QRMark } from "./ui/QRMark";
import { Section } from "./ui/Section";
import { casosConDetalle } from "@/content/casos";

/**
 * Prueba social en la home: nombres que cualquiera reconoce, con el número
 * de reseñas que se puede chequear en Google en diez segundos.
 * Solo casos autorizados con métrica verificada.
 */
export function CasosDestacados({ limite = 4 }: { limite?: number }) {
  const destacados = casosConDetalle
    .filter((c) => c.metricaVerificada)
    .slice(0, limite);

  if (destacados.length === 0) return null;

  return (
    <Section className="border-t border-line">
      <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-brand">
            <QRMark /> Casos reales
          </p>
          <h2 className="t-h2 mt-3">Marcas que ya lo usan todos los días</h2>
          <p className="t-lead measure mt-4 text-muted">
            De pastelerías de barrio a cadenas nacionales. Los números salen de
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
        {destacados.map((c, i) => (
          <li key={c.slug} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
            <CasoCard caso={c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
