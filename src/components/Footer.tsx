import Image from "next/image";
import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { QRMark } from "./ui/QRMark";
import { Glifo } from "./ui/Glifo";
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
import { mapaAbierto } from "@/lib/mapa";

/**
 * Footer sobre violeta profundo. Cada página termina con `Cierre`
 * (components/ui/Cierre.tsx), que abajo llega a `ink` liso: cierre y footer
 * se leen como una sola pieza, separados apenas por una línea.
 * `data-tono="noche"` le avisa al header flotante que está sobre oscuro.
 */
const redes = [
  { nombre: "Instagram", href: site.social.instagram, Icono: IconoInstagram },
  { nombre: "YouTube", href: site.social.youtube, Icono: IconoYouTube },
  { nombre: "TikTok", href: site.social.tiktok, Icono: IconoTikTok },
  { nombre: "LinkedIn", href: site.social.linkedin, Icono: IconoLinkedIn },
].filter((r) => r.href);

const linkClass =
  "inline-flex min-h-11 items-center text-[0.9375rem] text-paper/70 underline-offset-4 transition-colors duration-200 hover:text-paper hover:underline md:min-h-0";

export async function Footer() {
  // El botón al mapa solo existe si la app lo tiene abierto (AGENTS.md, «El mapa de comercios»).
  const mapa = await mapaAbierto();
  return (
    <footer data-tono="noche" className="bg-ink text-paper">
      <Container>
        {/* Navegación */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-9 border-t border-paper/10 py-12 md:grid-cols-4 md:gap-10 lg:grid-cols-[1.3fr_repeat(4,1fr)] lg:py-20">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo tone="light" className="text-[3rem] md:text-[3.5rem]" />
            <p className="mt-4 max-w-[26ch] font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.02em] text-paper/90">
              Marketing phygital para comercios locales.
            </p>
            <p className="mt-2 text-sm text-paper/60">Hecho en Argentina.</p>
          </div>

          {columnasFooter.map((col) => (
            <div key={col.titulo}>
              <h2 className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.08em] text-gold">
                <QRMark size={16} tone="paper" />
                {col.titulo}
              </h2>
              <ul className="mt-2 md:mt-4 md:space-y-2.5">
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
              {col.conMapa && mapa && (
                <Link
                  href="/casos#mapa"
                  className="vidrio-claro mt-4 inline-flex min-h-11 items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold leading-tight text-paper transition-[translate,background-color,color] duration-500 ease-fluida hover:-translate-y-0.5 hover:bg-gold hover:text-ink"
                >
                  <Glifo id="ubicacion" size={18} className="shrink-0" />
                  Locales que ya usan FlashTag
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Redes · Data Fiscal · Contacto */}
        <div
          className={`grid gap-8 border-t border-paper/10 py-9 md:items-center md:gap-10 md:py-12 ${
            site.dataFiscal ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <div>
            <p className="font-display text-[1.5rem] font-bold tracking-[-0.03em]">Seguinos</p>
            <p className="mt-1 text-sm text-paper/60">en nuestras redes sociales</p>
            <ul className="mt-4 flex gap-3">
              {redes.map(({ nombre, href, Icono }) => (
                <li key={nombre}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={nombre}
                    className="vidrio-claro flex size-12 items-center justify-center rounded-full text-paper transition-[translate,background-color,color] duration-500 ease-fluida hover:-translate-y-1 hover:bg-gold hover:text-ink"
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

          <ul className="space-y-1 md:justify-self-end">
            <li>
              <a
                href={`mailto:${site.contacto.email}`}
                className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-paper/75 transition-colors hover:text-paper"
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
                className="flex min-h-11 items-center gap-3 text-[0.9375rem] text-paper/75 transition-colors hover:text-paper"
              >
                <IconoWhatsApp />
                <span className="tnum">{site.contacto.telefono}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Pagos · legales */}
        <div className="border-t border-paper/10 py-8">
          <MediosDePago />
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-paper/60">
            <li>© {new Date().getFullYear()} FlashTag. Todos los derechos reservados.</li>
            {linksLegales.map((l) => (
              <li key={l.href} className="flex items-center gap-2">
                <span aria-hidden="true">·</span>
                <Link href={l.href} className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-paper hover:underline md:min-h-0">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      {/* Espacio para que la barra CTA fija no tape el footer en phone */}
      <div className="h-20 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
