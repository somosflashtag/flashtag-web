import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { cursos, type Curso } from "@/content/cursos";
import { cn } from "@/lib/cn";
import { pageMeta } from "@/lib/seo";
import { cta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Cursos",
  description:
    "Cursos prácticos de marketing digital para dueños de comercios argentinos. Sin tecnicismos, con resultados concretos.",
  path: "/cursos",
});

function Duracion({ modulos, horas }: { modulos: number; horas: number }) {
  const h = horas % 1 === 0 ? horas : horas.toString().replace(".", ",");
  return (
    <span className="tnum">
      {modulos} módulos · {h} h
    </span>
  );
}

/** El nombre de la institución solo aparece con aval confirmado. */
const institucionDe = (c: Curso) => (c.institucion && !c.institucion.avalPendiente ? c.institucion.nombre : null);

const tonos = ["paso-brand", "paso-teal", "paso-coral", "paso-gold"];

export default function CursosPage() {
  const disponibles = cursos.filter((c) => c.disponible);
  const proximos = cursos.filter((c) => !c.disponible);

  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Cursos" }]}
        etiqueta="Cursos"
        glifo="capas"
        titulo="Aprendé a hacer crecer"
        destacado="tu negocio."
        bajada="Cursos prácticos para dueños de comercios argentinos. Sin tecnicismos. Con resultados concretos."
      >
        <Button href={cta.primary.href} variant="oro" size="lg" arrow>
          Empezar gratis
        </Button>
        <Button href="#cursos" variant="claro" size="lg">
          Ver los cursos
        </Button>
      </HeroPagina>

      {/* ── DISPONIBLES ──────────────────────────────────────── */}
      <Seccion id="cursos">
        <Titulo titulo="Para empezar hoy" bajada="Cortos y al grano: los hacés entre un cliente y otro." />
        <ul className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {disponibles.map((c, i) => {
            const institucion = institucionDe(c);
            return (
              <li
                key={c.slug}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className={cn("flex min-h-[360px] flex-col rounded-[2rem] p-6 text-paper md:p-8", tonos[i % tonos.length])}
              >
                <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
                  <span className="vidrio-claro rounded-full px-3 py-1">{c.nivel}</span>
                  <span className="text-paper/85">
                    <Duracion modulos={c.modulos} horas={c.horas} />
                  </span>
                </div>
                <h3 className="mt-auto pt-10 font-display text-[1.5rem] font-bold leading-[1.1] tracking-[-0.035em] md:text-[1.625rem]">
                  {c.titulo}
                  {institucion && <span className="text-paper/75"> · {institucion}</span>}
                </h3>
                <Button href={cta.primary.href} variant="blanco" size="md" arrow className="mt-6 self-start">
                  Empezar gratis
                </Button>
              </li>
            );
          })}
        </ul>
      </Seccion>

      {/* ── PRÓXIMAMENTE ─────────────────────────────────────── */}
      {proximos.length > 0 && (
        <Seccion tono="lila">
          <Titulo titulo="Lo que viene" bajada="Todavía no están abiertos. Cuando salgan, aparecen acá." />
          <ul className="mt-9 grid gap-4 md:mt-14 md:grid-cols-2">
            {proximos.map((c, i) => {
              const institucion = institucionDe(c);
              return (
                <li
                  key={c.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                  className="flex flex-col rounded-[2rem] bg-paper p-6 md:p-8"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-muted">
                    <span className="eyebrow">Próximamente</span>
                    <span>{c.nivel}</span>
                    <span aria-hidden="true">·</span>
                    <Duracion modulos={c.modulos} horas={c.horas} />
                  </div>
                  <h3 className="mt-5 font-display text-[1.375rem] font-bold leading-snug tracking-[-0.03em] md:text-[1.5rem]">
                    {c.titulo}
                    {institucion && <span className="text-muted"> · {institucion}</span>}
                  </h3>
                  <p className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-muted">
                    <Glifo id="repetir" size={16} />
                    Pronto
                  </p>
                </li>
              );
            })}
          </ul>
        </Seccion>
      )}

      <Cierre
        tamano="mega"
        titular="¿Listo para aplicarlo"
        destacado="en tu local?"
        bajada="Empezá gratis, sin tarjeta de crédito. Setup en minutos."
      />
    </Pagina>
  );
}
