import Link from "next/link";
import { QRMark } from "./ui/QRMark";
import { Mock } from "./app/mocks";
import { features } from "@/content/features";
import { cn } from "@/lib/cn";

/**
 * Bento de features: siete tarjetas, cada una con su pantalla real asomando.
 * Las dos primeras son grandes porque son las que más se usan. El resto va
 * de a tres por fila; si la última fila queda con dos, se ensanchan para
 * que no quede un hueco.
 */
export function Bento() {
  const resto = features.length - 2;
  const filaFinalDeDos = resto % 3 === 2;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {features.map((f, i) => {
        const grande = i < 2;
        const ancha = !grande && filaFinalDeDos && i >= features.length - 2;
        return (
          <li
            key={f.slug}
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 80}ms` } as React.CSSProperties}
            className={cn(grande || ancha ? "lg:col-span-3" : "lg:col-span-2")}
          >
            <Link
              href={`/producto/${f.slug}`}
              className="card-lift group flex h-full flex-col overflow-hidden rounded-[var(--radius-surface)] border border-line bg-paper"
            >
              <div className="p-6 lg:p-7">
                <p className="flex items-center gap-2 text-sm font-semibold text-brand">
                  <QRMark size={12} />
                  {f.nombre}
                </p>
                <h3 className={cn("mt-3 text-balance", grande ? "t-h3 lg:text-[1.75rem]" : "t-h3")}>
                  {f.corto}
                </h3>
                {grande && (
                  <p className="t-body measure mt-3 text-muted">{f.bajada}</p>
                )}
              </div>

              {/* Ventana a la app: la pantalla real, recortada */}
              <div
                aria-hidden="true"
                className={cn(
                  "relative mx-6 mt-auto shrink-0 overflow-hidden rounded-t-[1.6rem] border-x border-t border-line bg-surface lg:mx-7",
                  grande ? "h-64" : "h-52",
                )}
              >
                <div className="absolute inset-x-0 top-0 mx-auto h-[600px] w-[280px] origin-top scale-[0.92] transition-transform duration-500 ease-[var(--ease-ft)] group-hover:scale-[0.96]">
                  <Mock id={f.mock} />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
