import Link from "next/link";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { QRMark } from "./ui/QRMark";
import { site } from "@/lib/site";
import { features } from "@/content/features";

const columnas = [
  {
    titulo: "Producto",
    links: features.map((f) => ({
      label: f.nombre,
      href: `/producto/${f.slug}`,
    })),
  },
  {
    titulo: "Para tu rubro",
    links: [
      { label: "Gastronomía", href: "/para/gastronomia" },
      { label: "Retail", href: "/para/retail" },
      { label: "Servicios", href: "/para/servicios" },
      { label: "Agencias", href: "/para/agencias" },
    ],
  },
  {
    titulo: "Recursos",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Casos de éxito", href: "/casos" },
      { label: "Blog", href: "/blog" },
      { label: "Guías gratis", href: "/recursos" },
    ],
  },
  {
    titulo: "FlashTag",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Contacto", href: "/contacto" },
      { label: "Prensa", href: "/prensa" },
      { label: "Tienda", href: site.urls.shop },
    ],
  },
];

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

          {columnas.map((col) => (
            <div key={col.titulo}>
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <QRMark size={10} />
                {col.titulo}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-[120ms] hover:text-ink"
                    >
                      {link.label}
                    </Link>
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
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-sm text-muted transition-colors hover:text-ink">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-sm text-muted transition-colors hover:text-ink">
              Términos
            </Link>
          </div>
        </div>
      </Container>
      {/* Espacio para que la barra CTA fija no tape el footer en phone */}
      <div className="h-16 lg:hidden" aria-hidden="true" />
    </footer>
  );
}
