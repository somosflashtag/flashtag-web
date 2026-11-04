import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Glifo } from "@/components/ui/Glifo";
import { Burbujas } from "@/components/home/Burbujas";
import { Etiqueta, telefonosRubro } from "@/components/app/panel";
import { casosPublicables } from "@/content/casos";
import { planes } from "@/content/planes";
import { paginasRubro } from "@/content/rubros";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function generateStaticParams() {
  return paginasRubro.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) return {};
  return pageMeta({
    title: r.nav,
    description: r.metaDescripcion,
    path: `/para/${r.slug}`,
  });
}

function Encabezado({ eyebrow, titulo }: { eyebrow: string; titulo: string }) {
  return (
    <div className="text-center" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="t-h2 mt-3.5 text-balance">{titulo}</h2>
    </div>
  );
}

export default async function RubroPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = paginasRubro.find((x) => x.slug === slug);
  if (!r) notFound();

  const Telefono = telefonosRubro[r.slug];

  /* El caso solo se muestra si está autorizado y con cifras verificadas (AGENTS.md §4). */
  const caso = casosPublicables.find((c) => c.slug === r.caso && c.metricaVerificada && c.portada);
  const cifra = caso?.portada?.cifras[0];
  const puntaje = caso?.portada?.cifras.find((c) => /puntuaci/i.test(c.label));

  /* Plan recomendado: nombre y "para quién" salen de planes.ts. */
  const recomendados = r.plan.ids.map((id) => planes.find((p) => p.id === id)!).filter(Boolean);
  const plan = recomendados[recomendados.length - 1];
  /* Sin caso: la capacidad del plan, leída del mismo planes.ts. */
  const capacidad = plan.features.find((f) => f.incluido && /reseñas con IA/i.test(f.label))?.label;
  const [capValor, ...capResto] = (capacidad ?? "").split(" ");

  const actividad = r.actividad.map((titulo) => ({
    glifo: r.glifo,
    tono: "brand" as const,
    titulo,
    detalle: "recién",
  }));

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-halo pb-6 pt-7 md:pb-14 md:pt-14">
        <Container>
          <nav aria-label="Migas de pan" className="mb-4 text-sm text-muted">
            <Link href="/" className="font-bold text-brand hover:underline">
              Inicio
            </Link>{" "}
            · Para tu rubro · {r.nav}
          </nav>
          <ul className="mb-7 flex flex-wrap gap-1.5">
            {paginasRubro.map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/para/${x.slug}`}
                  aria-current={x.slug === r.slug ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 text-[13px] font-bold transition-colors duration-150",
                    x.slug === r.slug ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-brand/50",
                  )}
                >
                  <Glifo id={x.glifo} size={14} />
                  {x.nav}
                </Link>
              </li>
            ))}
          </ul>

          <div className="grid grid-cols-1 items-center gap-11 lg:grid-cols-[1.05fr_1fr]">
            <div data-reveal>
              <span className="eyebrow">
                <Glifo id={r.glifo} size={13} /> FlashTag para {r.nav.toLowerCase()}
              </span>
              <h1 className="t-display mt-4 text-balance !text-[clamp(2.25rem,1.4rem+3.2vw,3.5rem)]">
                {r.titular} <span className="text-glow-warm">{r.destacado}</span>
              </h1>
              <p className="t-lead measure mb-7 mt-5 text-muted">{r.bajada}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                  Probá gratis
                </Button>
                <Button href={site.urls.whatsapp} variant="secondary" size="lg">
                  Hablá con nosotros
                </Button>
              </div>
            </div>

            <div className="group relative grid min-h-[450px] place-items-center pt-6 md:min-h-[480px] md:pt-0">
              <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                <Etiqueta tono="gold">Ejemplo ilustrativo</Etiqueta>
              </span>
              <Telefono />
              <Burbujas
                items={actividad}
                intervalo={2400}
                posiciones={["left-0 bottom-[30px]", "right-0 top-[40px]", "right-[-10px] bottom-[120px]"]}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ── SETUP RECOMENDADO ────────────────────────────────── */}
      <section className="py-11 md:py-20">
        <Container>
          <Encabezado eyebrow="Tu setup recomendado" titulo="Lo que conviene poner en tu local" />
          <ul className="carrusel carrusel-angosto mt-6 grid gap-3.5 sm:grid-cols-2 md:mt-9 lg:grid-cols-4">
            {r.setup.map((s, i) => (
              <li
                key={s.titulo}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="card-lift group flex flex-col gap-2 rounded-[20px] border border-line bg-paper p-5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Glifo id={s.glifo} size={22} />
                </span>
                <h3 className="font-display text-base font-semibold">{s.titulo}</h3>
                <p className="text-[13.5px] text-muted">{s.texto}</p>
                <Etiqueta className="mt-auto self-start">{s.etiqueta}</Etiqueta>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center">
            <Button href={site.urls.shop} variant="secondary">
              Ver estos productos en la tienda ↗
            </Button>
          </p>
        </Container>
      </section>

      {/* ── UN DÍA CON FLASHTAG + CASO + PLAN ────────────────── */}
      <section className="pb-11 md:pb-24">
        <Container>
          <Encabezado eyebrow="Un día con FlashTag" titulo="Así se ve en la práctica" />
          <ol className="carrusel carrusel-angosto mt-6 grid gap-3.5 md:mt-9 md:grid-cols-3">
            {r.dia.map((d, i) => (
              <li
                key={d.momento}
                data-reveal
                style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                className="card-lift rounded-[22px] border border-line bg-surface/40 p-6"
              >
                <small className="text-xs font-extrabold uppercase tracking-[0.06em] text-brand">{d.momento}</small>
                <h3 className="mb-1.5 mt-2 font-display text-lg font-semibold">{d.titulo}</h3>
                <p className="text-sm text-muted">{d.texto}</p>
              </li>
            ))}
          </ol>

          <div className="mt-9 grid items-stretch gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-2.5 rounded-3xl bg-ink p-7 text-paper sm:p-8">
              {caso && cifra ? (
                <>
                  <small className="text-xs font-bold uppercase tracking-[0.06em] text-muted-dark">Caso real</small>
                  <b className="font-display text-[22px]">{caso.negocio}</b>
                  <span className="font-display text-[44px] font-bold leading-none tnum">{cifra.valor}</span>
                  <span className="text-muted-dark">
                    {cifra.label}
                    {puntaje && ` · ★ ${puntaje.valor}`}
                  </span>
                  {caso.detalle && (
                    <Link href={`/casos/${caso.slug}`} className="mt-auto pt-3 text-sm font-bold text-paper underline underline-offset-4">
                      Leer el caso
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <small className="text-xs font-bold uppercase tracking-[0.06em] text-muted-dark">Capacidad</small>
                  <b className="font-display text-[22px]">Plan {plan.nombre}</b>
                  <span className="font-display text-[44px] font-bold leading-none tnum">{capValor}</span>
                  <span className="text-muted-dark">{capResto.join(" ")}</span>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2.5 rounded-3xl border-2 border-brand p-7 sm:p-8">
              <Etiqueta className="self-start">Plan recomendado</Etiqueta>
              <b className="font-display text-[26px]">{recomendados.map((p) => p.nombre).join(" o ")}</b>
              <p className="text-muted">{r.plan.texto ?? plan.paraQuien}</p>
              <ul className="grid gap-1.5 text-sm">
                {r.plan.claves.map((k) => (
                  <li key={k} className="flex gap-2">
                    <Glifo id="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                    {k}
                  </li>
                ))}
              </ul>
              <Button href="/precios" variant="primary" className="mt-auto self-start" arrow>
                Ver precios
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
