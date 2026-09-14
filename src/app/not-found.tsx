import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { QRMark } from "@/components/ui/QRMark";
import { cta } from "@/lib/site";

const destacados = [
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Precios", href: "/precios" },
  { label: "Casos de éxito", href: "/casos" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl text-center">
        <p className="flex items-center justify-center gap-2 text-sm font-semibold text-brand">
          <QRMark size={13} />
          Error 404
        </p>
        <h1 className="t-display mt-5 text-balance">
          Este QR apunta a ningún lado
        </h1>
        <p className="t-lead mx-auto mt-6 max-w-lg text-muted">
          La página que buscás se mudó o nunca existió. Lo bueno es que con
          FlashTag esto no te pasa: cambiás el destino y listo.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {destacados.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="inline-flex min-h-[44px] items-center rounded-full border border-line px-5 text-[0.9375rem] font-medium transition-colors hover:border-ink"
              >
                {d.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Button href={cta.primary.href} variant="primary" size="lg" arrow>
            {cta.primary.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
