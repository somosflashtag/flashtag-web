import Link from "next/link";
import { Container } from "./ui/Container";
import { Icon, type IconName } from "./ui/Icon";
import { Logo } from "./ui/Logo";
import { PaymentMark } from "./ui/PaymentMark";
import { QRMark } from "./ui/QRMark";
import { mediosDePago } from "@/content/pagos";
import { columnasFooter, linksLegales } from "@/lib/nav";
import { site } from "@/lib/site";

/**
 * FOOTER — violeta profundo (`--color-ink`).
 *
 * El footer es el cierre del sitio, no una sección más: va sobre el fondo
 * oscuro de marca para que se lea como un bloque distinto. Por eso ninguna
 * página puede terminar en un bloque violeta — ver `CtaFinal`, que es el
 * cierre estándar y siempre es claro.
 *
 * Sobre este fondo: texto en `muted-dark` (7.8:1 sobre ink) o blanco.
 * El violeta de marca NO se usa como color de texto acá — no llega a 4.5:1.
 */

/** Solo se renderizan las redes que tienen URL cargada en `site.social`. */
const redes: { nombre: string; icono: IconName; href: string }[] = (
  [
    { nombre: "Instagram", icono: "instagram", href: site.social.instagram },
    { nombre: "YouTube", icono: "youtube", href: site.social.youtube },
    { nombre: "TikTok", icono: "tiktok", href: site.social.tiktok },
    { nombre: "LinkedIn", icono: "linkedin", href: site.social.linkedin },
  ] as const
)
  .filter((r) => r.href !== "")
  .map((r) => ({ ...r }));

const contactos: { icono: IconName; label: string; href: string }[] = [
  {
    icono: "mail",
    label: site.contacto.email,
    href: `mailto:${site.contacto.email}`,
  },
  {
    icono: "whatsapp",
    label: site.contacto.telefono,
    href: site.urls.whatsapp,
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container>
        {/* ── Navegación ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-5 lg:py-20">
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="stacked" tone="light" className="text-[2rem]" />
            <p className="measure mt-3 text-sm leading-relaxed text-muted-dark">
              Marketing phygital para comercios locales. Hecho en Argentina.
            </p>
          </div>

          {columnasFooter.map((col) => (
            <div key={col.titulo}>
              <h2 className="flex items-center gap-2 text-sm font-semibold text-paper">
                <QRMark size={10} tone="paper" />
                {col.titulo}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.externo ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted-dark transition-colors duration-[120ms] hover:text-paper"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-dark transition-colors duration-[120ms] hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Redes · Data Fiscal · Contacto ─────────────────────── */}
        <div
          className={`grid items-center gap-10 border-t border-line-dark py-10 ${
            site.dataFiscal.qr ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-paper">
              Seguinos
            </h2>
            <p className="mt-2 text-sm font-medium text-muted-dark">
              en nuestras redes sociales
            </p>
            <ul className="mt-4 flex items-center gap-1">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`FlashTag en ${r.nombre}`}
                    /* 44px de tap target sin que el icono crezca. */
                    className="flex size-11 items-center justify-center rounded-[var(--radius-btn)] text-muted-dark transition-colors duration-[120ms] hover:bg-white/10 hover:text-paper"
                  >
                    <Icon name={r.icono} size={21} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Fiscal: aparece recién cuando el QR real está cargado. Sin
              QR no se renderiza la celda — en phone dejaba un hueco muerto. */}
          {site.dataFiscal.qr && (
            <div className="flex md:justify-center">
              <a
                href={site.dataFiscal.qr}
                target="_F960AFIPInfo"
                rel="noopener noreferrer"
                className="inline-block rounded-[4px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.dataFiscal.imagen}
                  alt="Data Fiscal — ARCA (ex AFIP)"
                  width={60}
                  height={80}
                  loading="lazy"
                />
              </a>
            </div>
          )}

          <ul className="space-y-3 md:justify-self-end md:text-right">
            {contactos.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  {...(c.icono === "whatsapp"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex min-h-[44px] items-center gap-2.5 text-[0.9375rem] text-muted-dark transition-colors duration-[120ms] hover:text-paper md:flex-row-reverse"
                >
                  <Icon name={c.icono} size={19} />
                  <span>{c.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* ── Medios de pago + legales ───────────────────────────── */}
      <div className="border-t border-line-dark">
        <Container>
          <div className="py-8">
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {mediosDePago.map((m) => (
                <li key={m} className="flex">
                  <PaymentMark medio={m} />
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-[13px] text-muted-dark">
              <span>
                © {new Date().getFullYear()} {site.name} · Desarrollado por DT
                Comunicación
              </span>
              {linksLegales.map((l) => (
                <span key={l.href} className="flex items-center gap-x-1.5">
                  <span aria-hidden="true">·</span>
                  <Link
                    href={l.href}
                    className="underline-offset-4 transition-colors duration-[120ms] hover:text-paper hover:underline"
                  >
                    {l.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Espacio para que la barra CTA fija no tape los legales en phone:
          la barra mide 68px (botón de 44 + py-3) más el safe area del iPhone. */}
      <div
        className="lg:hidden"
        style={{ height: "calc(72px + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />
    </footer>
  );
}
