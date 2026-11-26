import Image from "next/image";
import { CartelCodigo } from "@/components/CartelCodigo";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { activar, cierreActivar, dudasActivar, pasosActivar, queEs } from "@/content/activar";
import type { FaqItem } from "@/content/faq";
import { fotos } from "@/content/fotos";
import { faqHome } from "@/content/home";
import { cn } from "@/lib/cn";
import { faqSchema, pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Activá tu FlashTag",
  description:
    "Ingresá el ID/código impreso en tu cartel, tarjeta o sticker para activarlo y empezar a gestionarlo desde la app.",
  path: "/activar-tu-flashtag",
});

/** Las dudas, con la forma que pide el acordeón. No salen en la home ni en precios. */
const dudas: FaqItem[] = dudasActivar.items.map((d) => ({ ...d, mostrarEn: [] }));

export default function ActivarPage() {
  const ultimo = pasosActivar.pasos.length - 1;

  return (
    <Pagina>
      <JsonLd id="ld-faq-activar" data={faqSchema(dudas)} />

      {/* ── HERO: el formulario del código, antes que nada ───── */}
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Activá tu FlashTag" }]}
        titulo={activar.titular}
        destacado={activar.destacado}
        bajada={activar.bajada}
        pie={activar.ayuda}
        visual={
          <CartelCodigo
            aviso
            eager
            sizes="(min-width: 1024px) 380px, 250px"
            className="mx-auto mb-9 w-full max-w-[250px] rotate-[4deg] lg:mb-6 lg:max-w-[380px]"
          />
        }
      >
        {/* La activación vive en la app: el formulario real valida el código
            contra la cuenta. Acá solo se recibe y se deriva. */}
        <form action={site.urls.login} method="get" className="w-full max-w-[540px]">
          <label htmlFor="codigo" className="mb-2.5 block text-[13px] font-bold uppercase tracking-[0.08em] text-gold">
            {activar.form.label}
          </label>
          <div className="vidrio-claro flex flex-col gap-2 rounded-[1.875rem] p-2 sm:flex-row sm:items-center sm:rounded-full">
            <input
              id="codigo"
              name="codigo"
              type="text"
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder={activar.form.placeholder}
              pattern="[A-Za-z0-9\-]{4,20}"
              title={activar.form.formato}
              required
              className="min-h-14 w-full min-w-0 flex-1 rounded-full bg-paper px-6 text-center font-mono text-lg tracking-[0.14em] text-ink outline-offset-4 placeholder:font-sans placeholder:text-base placeholder:tracking-normal placeholder:text-muted focus-visible:outline-gold sm:text-left"
            />
            <Button type="submit" variant="oro" size="lg" arrow className="w-full shrink-0 sm:w-auto">
              {activar.form.boton}
            </Button>
          </div>
        </form>
      </HeroPagina>

      {/* ── LOS PASOS: una línea de tiempo ───────────────────── */}
      <Seccion tono="lila" id="pasos" ariaLabelledby="pasos-titulo" className="mt-3.5">
        <Titulo
          id="pasos-titulo"
          titulo={
            <>
              {pasosActivar.titular} <span className="text-brand">{pasosActivar.destacado}</span>
            </>
          }
          bajada={pasosActivar.bajada}
        />
        <ol className="mx-auto mt-9 grid max-w-2xl md:mt-14 lg:max-w-none lg:grid-cols-4 lg:gap-5">
          {pasosActivar.pasos.map((p, i) => (
            <li
              key={p.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              className={cn("flex gap-4 lg:flex-col lg:gap-5", i < ultimo && "pb-4 lg:pb-0")}
            >
              {/* El riel: el número y la línea que lo une con el paso que sigue. */}
              <div aria-hidden="true" className="flex flex-col items-center lg:flex-row">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-bold text-paper tnum shadow-marca">
                  {i + 1}
                </span>
                {i < ultimo && <span className="-mb-4 w-0.5 flex-1 rounded-full bg-brand/20 lg:mb-0 lg:ml-3 lg:-mr-5 lg:h-0.5 lg:w-auto" />}
              </div>
              <div className="flex-1 rounded-[1.5rem] bg-paper p-5 lg:p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Glifo id={p.glifo} size={20} />
                </span>
                <h3 className="mt-3.5 font-display text-[1.25rem] font-bold leading-[1.12] tracking-[-0.03em]">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {p.titulo}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </Seccion>

      {/* ── DUDAS DE ACTIVACIÓN ──────────────────────────────── */}
      <Seccion id="dudas" ariaLabelledby="dudas-titulo">
        <div className="grid gap-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="dudas-titulo" data-reveal="blur" className="t-mega">
              {dudasActivar.titular}
              <br />
              {dudasActivar.titular2}
            </h2>
            <p data-reveal="blur" className="t-lead mt-4 max-w-[34ch] text-muted">
              {dudasActivar.bajada}
            </p>
            <div
              data-reveal
              className="foto-a relative mt-9 hidden min-h-[300px] flex-col justify-end overflow-hidden bg-ink p-7 text-paper lg:flex"
            >
              <Image src={fotos.dueno.src} alt={fotos.dueno.alt} fill sizes="480px" className="object-cover" />
              <span aria-hidden="true" className="velo absolute inset-0" />
              <h3 className="relative font-display text-[1.625rem] font-bold leading-tight tracking-[-0.035em]">{faqHome.otra}</h3>
              <p className="relative mt-1.5 max-w-[30ch] text-[15px] text-paper/85">{faqHome.otraBajada}</p>
              <Button href={site.urls.whatsapp} variant="oro" size="md" arrow className="relative mt-4 self-start">
                {faqHome.otraCta}
              </Button>
            </div>
          </div>
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <Faq items={dudas} variante="tarjetas" />
            <p className="mt-6 text-muted lg:hidden">
              {faqHome.otra}{" "}
              <a href={site.urls.whatsapp} className="font-bold text-brand underline-offset-4 hover:underline">
                Escribinos por WhatsApp
              </a>
            </p>
          </div>
        </div>
      </Seccion>

      {/* ── QUÉ ES TU FLASHTAG ───────────────────────────────── */}
      <Seccion tono="arena" id="que-es" ariaLabelledby="que-es-titulo">
        <Titulo
          id="que-es-titulo"
          titulo={
            <>
              {queEs.titular} <span className="text-brand">{queEs.destacado}</span>
            </>
          }
          bajada={queEs.bajada}
        />
        <ul className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {queEs.items.map((q, i) => (
            /* El reveal va en el <li> y el hover en la tarjeta: en el mismo
               elemento, el reveal le pisa el translate al hover. */
            <li key={q.titulo} data-reveal style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}>
              <div
                className={cn(
                  "group relative h-full overflow-hidden rounded-[2rem] p-6 text-paper transition-[translate,rotate,box-shadow] duration-500 ease-fluida hover:-translate-y-2 hover:-rotate-1 hover:shadow-[var(--shadow-float)] md:p-7",
                  `dato-${q.tono}`,
                )}
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-white/20 transition-[rotate,scale] duration-300 group-hover:-rotate-12 group-hover:scale-110">
                  <Glifo id={q.glifo} size={24} />
                </span>
                <h3 className="mt-5 font-display text-[1.5rem] font-bold leading-[1.08] tracking-[-0.035em]">{q.titulo}</h3>
                <p className="relative z-10 mt-2.5 text-[15px] leading-relaxed text-white/90">{q.texto}</p>
                <i
                  aria-hidden="true"
                  className="absolute -bottom-12 -right-10 size-[170px] rounded-full bg-white/15 transition-[translate,scale] duration-500 group-hover:-translate-x-5 group-hover:-translate-y-5 group-hover:scale-[1.4]"
                />
              </div>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-8 flex justify-center md:mt-10">
          <Button href={queEs.link.href} variant="secondary" size="lg" arrow className="w-full sm:w-auto">
            {queEs.link.label}
          </Button>
        </div>
      </Seccion>

      {/* ── CIERRE: para el que todavía no lo tiene ──────────── */}
      <Cierre
        tamano="mega"
        titular={cierreActivar.titular}
        destacado={cierreActivar.destacado}
        bajada={cierreActivar.bajada}
      >
        <Button href={cta.secondary.href} variant="oro" size="lg" arrow>
          {cta.secondary.label}
        </Button>
        <Button href={cierreActivar.planes.href} variant="claro" size="lg">
          {cierreActivar.planes.label}
        </Button>
      </Cierre>
    </Pagina>
  );
}
