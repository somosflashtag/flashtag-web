import { Button } from "@/components/ui/Button";
import { Cierre } from "@/components/ui/Cierre";
import { Glifo, type GlifoId } from "@/components/ui/Glifo";
import { HeroPagina } from "@/components/ui/HeroPagina";
import { IconoWhatsApp } from "@/components/ui/Iconos";
import { Pagina } from "@/components/ui/Pagina";
import { Seccion } from "@/components/ui/Seccion";
import { Titulo } from "@/components/ui/Titulo";
import { cn } from "@/lib/cn";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contacto",
  description:
    "Hablá con el equipo de FlashTag: ventas, soporte, prensa o pedidos corporativos.",
  path: "/contacto",
});

const canales: { titulo: string; texto: string; accion: string; href: string; tono: string; glifo: GlifoId }[] = [
  {
    titulo: "Ventas y demos",
    texto: "Querés ver la app funcionando o necesitás carteles para varios locales.",
    accion: "hola@flashtag.tech",
    href: "mailto:hola@flashtag.tech",
    tono: "paso-brand",
    glifo: "cartel",
  },
  {
    titulo: "Soporte",
    texto: "Ya sos cliente y necesitás una mano con tu cuenta, un QR o un pedido.",
    accion: "soporte@flashtag.tech",
    href: "mailto:soporte@flashtag.tech",
    tono: "paso-teal",
    glifo: "escudo",
  },
  {
    titulo: "Prensa",
    texto: "Sos periodista y necesitás material, datos o una entrevista.",
    accion: "prensa@flashtag.tech",
    href: "mailto:prensa@flashtag.tech",
    tono: "paso-coral",
    glifo: "informe",
  },
];

export default function ContactoPage() {
  /* El WhatsApp se muestra solo cuando site.urls.whatsapp tiene el número
     real: un enlace a un placeholder es peor que no ofrecer el canal. */
  const whatsappListo = !site.urls.whatsapp.includes("XXXX");

  return (
    <Pagina>
      <HeroPagina
        migas={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        etiqueta="Contacto"
        glifo="celular"
        titulo="Hablemos."
        bajada="Somos un equipo chico, así que contesta una persona y contesta rápido. Soporte en castellano."
      >
        {whatsappListo && (
          <Button href={site.urls.whatsapp} variant="oro" size="lg">
            <IconoWhatsApp />
            Escribinos por WhatsApp
          </Button>
        )}
        <Button href={`mailto:${site.contacto.email}`} variant="claro" size="lg">
          {site.contacto.email}
        </Button>
      </HeroPagina>

      {/* ── CANALES ──────────────────────────────────────────── */}
      <Seccion>
        <Titulo titulo="Escribile a quien te puede ayudar" bajada="Tres casillas, según lo que necesites." />
        <ul className="carrusel mt-9 grid gap-4 md:mt-14 md:grid-cols-3">
          {canales.map((c, i) => (
            <li
              key={c.titulo}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={cn("flex min-h-[320px] flex-col rounded-[2rem] p-6 text-paper md:p-8", c.tono)}
            >
              <span className="vidrio-claro flex size-12 items-center justify-center rounded-2xl">
                <Glifo id={c.glifo} size={22} />
              </span>
              <h3 className="mt-auto pt-10 font-display text-[1.75rem] font-bold leading-[1.05] tracking-[-0.04em]">{c.titulo}</h3>
              <p className="mt-2 text-[15px] leading-snug text-paper/85">{c.texto}</p>
              <Button href={c.href} variant="blanco" size="md" className="mt-5 self-start">
                {c.accion}
              </Button>
            </li>
          ))}
        </ul>
      </Seccion>

      {/* ── WHATSAPP ─────────────────────────────────────────── */}
      {whatsappListo && (
        <Seccion tono="lila" aire="chico">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <Titulo alineado="izq" tamano="chico" titulo="¿Preferís WhatsApp?" bajada="También atendemos por ahí. Te responde una persona del equipo." />
            <Button href={site.urls.whatsapp} variant="primary" size="lg" arrow className="w-full shrink-0 sm:w-auto">
              Escribinos por WhatsApp
            </Button>
          </div>
        </Seccion>
      )}

      <Cierre
        tamano="mega"
        titular="¿Preferís probarlo"
        destacado="primero?"
        bajada="Empezá gratis, sin tarjeta de crédito. Setup en minutos."
      />
    </Pagina>
  );
}
