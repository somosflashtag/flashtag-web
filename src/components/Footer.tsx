import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { QRMark } from "./ui/QRMark";
import { site } from "@/lib/site";
import { columnasFooter } from "@/lib/nav";


export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-5 lg:py-20">
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="stacked" className="text-[2rem]" />
            <p className="measure mt-3 text-sm leading-relaxed text-muted">
              Marketing phygital para comercios locales. Hecho en Argentina.
            </p>
          </div>

          {columnasFooter.map((col) => (
            <div key={col.titulo}>
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <QRMark size={10} />
                {col.titulo}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.externo ? (
                      <a
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-[120ms] hover:text-ink"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors duration-[120ms] hover:text-ink"
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

        <div className="flex flex-col gap-4 border-t border-line py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} FlashTag. Todos los derechos reservados.
          </p>
          {/* TODO legal: /privacidad y /terminos son obligatorias antes de
              cobrar online. Se linkean cuando existan, no antes. */}
        </div>
      </Container>
      {/* Espacio para que la barra CTA fija no tape el footer en phone */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
