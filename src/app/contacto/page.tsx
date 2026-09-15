import { Button } from "@/components/ui/Button";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { cta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contacto",
  description:
    "Hablá con el equipo de FlashTag: ventas, soporte, prensa o pedidos corporativos.",
  path: "/contacto",
});

const canales = [
  {
    titulo: "Ventas y demos",
    texto:
      "Querés ver la app funcionando o necesitás carteles para varios locales.",
    accion: "hola@flashtag.tech",
    href: "mailto:hola@flashtag.tech",
  },
  {
    titulo: "Soporte",
    texto:
      "Ya sos cliente y necesitás una mano con tu cuenta, un QR o un pedido.",
    accion: "soporte@flashtag.tech",
    href: "mailto:soporte@flashtag.tech",
  },
  {
    titulo: "Prensa",
    texto: "Sos periodista y necesitás material, datos o una entrevista.",
    accion: "prensa@flashtag.tech",
    href: "mailto:prensa@flashtag.tech",
  },
];

export default function ContactoPage() {
  /* El WhatsApp se muestra solo cuando site.urls.whatsapp tiene el número
     real: un enlace a un placeholder es peor que no ofrecer el canal. */
  const whatsappListo = !site.urls.whatsapp.includes("XXXX");

  return (
    <>
      <Section className="bg-surface">
        <p className="flex items-center gap-2 text-sm font-semibold text-brand">
          <QRMark /> Contacto
        </p>
        <h1 className="t-display measure mt-4">Hablemos.</h1>
        <p className="t-lead measure mt-6 text-muted">
          Somos un equipo chico, así que contesta una persona y contesta rápido.
          Soporte en castellano.
        </p>
      </Section>

      <Section>
        <ul className="grid gap-5 md:grid-cols-3">
          {canales.map((c) => (
            <li
              key={c.titulo}
              className="flex flex-col rounded-[var(--radius-card)] border border-line p-6"
            >
              <QRMark />
              <h2 className="t-h3 mt-4">{c.titulo}</h2>
              <p className="t-body mt-2 flex-1 text-muted">{c.texto}</p>
              <a
                href={c.href}
                className="t-caption mt-5 font-semibold text-brand underline underline-offset-4"
              >
                {c.accion}
              </a>
            </li>
          ))}
        </ul>

        {whatsappListo && (
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6">
            <p className="t-body flex-1 text-muted">
              ¿Preferís WhatsApp? También atendemos por ahí.
            </p>
            <Button href={site.urls.whatsapp} variant="secondary" size="md">
              Escribinos por WhatsApp
            </Button>
          </div>
        )}
      </Section>

      <Section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">¿Preferís probarlo primero?</h2>
          <p className="t-lead mt-4 text-muted">
            Empezá gratis, sin tarjeta de crédito. Setup en minutos.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={cta.primary.href} variant="primary" size="lg" arrow>
              {cta.primary.label}
            </Button>
            <Button
              href={cta.secondary.href}
              variant="secondary"
              size="lg"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
