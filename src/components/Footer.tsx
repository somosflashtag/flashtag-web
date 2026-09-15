import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { QRMark } from "./ui/QRMark";
import {
  IconoInstagram,
  IconoLinkedIn,
  IconoMail,
  IconoTikTok,
  IconoWhatsApp,
  IconoYouTube,
} from "./ui/Iconos";
import { MediosDePago } from "./MediosDePago";
import { site } from "@/lib/site";
import { columnasFooter, linksLegales } from "@/lib/nav";

/**
 * Footer sobre violeta profundo. La sección que lo precede en cada página
 * nunca es violeta, para que el corte se note.
 */
const redes = [
  { nombre: "Instagram", href: site.social.instagram, Icono: IconoInstagram },
  { nombre: "YouTube", href: site.social.youtube, Icono: IconoYouTube },
  { nombre: "TikTok", href: site.social.tiktok, Icono: IconoTikTok },
  { nombre: "LinkedIn", href: site.social.linkedin, Icono: IconoLinkedIn },
].filter((r) => r.href);

const linkClass =
  "text-sm text-muted-dark transition-colors duration-[120ms] hover:text-paper";

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container>
        {/* Navegación */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-5 lg:py-20">
          <div className="col-span-2 lg:col-span-1">
            <Logo tone="light" className="text-[3.25rem]" />
            <p className="measure mt-3 text-sm leading-relaxed text-muted-dark">
              Marketing phygital para comercios locales. Hecho en Argentina.
            </p>
          </div>

          {columnasFooter.map((col) => (
            <div key={col.titulo}>
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <QRMark size={10} tone="paper" />
                {col.titulo}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.externo ? (
                      <a href={link.href} className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Redes · Data Fiscal · Contacto */}
        <div
          className={`grid gap-10 border-t border-line-dark py-12 md:items-center ${
            site.dataFiscal ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <div>
            <p className="t-h3">Seguinos</p>
            <p className="mt-1 text-sm font-medium text-muted-dark">
              en nuestras redes sociales
            </p>
            <ul className="mt-4 flex gap-3">
              {redes.map(({ nombre, href, Icono }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={nombre}
                    className="flex size-11 items-center justify-center rounded-full border border-line-dark text-paper transition-colors duration-[120ms] hover:border-paper hover:bg-white/10"
                  >
                    <Icono />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {site.dataFiscal && (
            <div className="flex md:justify-center">
              <a href={site.dataFiscal.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={site.dataFiscal.src}
                  alt="Data Fiscal — AFIP"
                  width={56}
                  height={76}
                />
              </a>
            </div>
          )}

          <ul className="space-y-3 md:justify-self-end">
            <li>
              <a
                href={`mailto:${site.contacto.email}`}
                className="flex items-center gap-3 text-[0.9375rem] text-muted-dark transition-colors hover:text-paper"
              >
                <IconoMail />
                {site.contacto.email}
              </a>
            </li>
            <li>
              <a
                href={site.urls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.9375rem] text-muted-dark transition-colors hover:text-paper"
              >
                <IconoWhatsApp />
                <span className="tnum">{site.contacto.telefono}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Pagos · legales */}
        <div className="border-t border-line-dark py-8">
          <MediosDePago />
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-muted-dark">
            <li>© {new Date().getFullYear()} FlashTag. Todos los derechos reservados.</li>
            {linksLegales.map((l) => (
              <li key={l.href} className="flex items-center gap-2">
                <span aria-hidden="true">·</span>
                <Link href={l.href} className="transition-colors hover:text-paper">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      {/* Espacio para que la barra CTA fija no tape el footer en phone */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
