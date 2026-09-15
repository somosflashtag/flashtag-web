import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { QRCode } from "@/components/ui/QRCode";
import { QRMark } from "@/components/ui/QRMark";
import { Section } from "@/components/ui/Section";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Activá tu FlashTag",
  description:
    "Ingresá el código impreso en tu cartel, tarjeta o sticker para activar tu QR dinámico y empezar a gestionarlo desde la app.",
  path: "/activar-tu-flashtag",
});

const queEs = [
  {
    titulo: "QR dinámico impreso",
    texto:
      "El QR físico que viene en tu producto nunca cambia, aunque modifiques el destino desde la app.",
  },
  {
    titulo: "Contenido editable",
    texto:
      "Cambiá el link, la página o la info detrás del QR cuando quieras, desde la app.",
  },
  {
    titulo: "Métricas reales",
    texto:
      "Sabé cuántas personas escanearon, desde dónde y en qué horario. Todo en tu dashboard.",
  },
];

export default function ActivarPage() {
  return (
    <>
      <div className="border-b border-line bg-surface py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-lg text-center">
            <QRCode size={56} color="var(--color-brand)" className="mx-auto" />
            <h1 className="t-h2 mt-6">Activá tu FlashTag</h1>
            <p className="t-lead mt-4 text-muted">
              Ingresá el código de tu producto. Lo encontrás impreso en el
              packaging o en el reverso del cartel.
            </p>

            {/* La activación vive en la app: el formulario real valida el
                código contra la cuenta. Acá solo se recibe y se deriva. */}
            <form
              action={`${site.urls.login}`}
              method="get"
              className="mt-8 flex flex-col gap-3"
            >
              <label htmlFor="codigo" className="sr-only">
                Código de activación
              </label>
              <input
                id="codigo"
                name="codigo"
                type="text"
                inputMode="text"
                autoComplete="off"
                spellCheck={false}
                placeholder="Ej: FT-A1B2C3"
                pattern="[A-Za-z0-9\-]{4,20}"
                required
                className="w-full rounded-[var(--radius-btn)] border border-line bg-paper px-5 py-4 text-center text-lg tracking-widest placeholder:tracking-normal placeholder:text-muted focus:border-brand focus:outline-none"
              />
              <Button type="submit" variant="primary" size="lg" arrow>
                Activar
              </Button>
            </form>

            <p className="t-caption mt-4 text-muted">
              ¿No encontrás el código? Está en la etiqueta del producto, abajo
              del QR.
            </p>
          </div>
        </Container>
      </div>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">¿Qué es tu FlashTag?</h2>
          <p className="t-lead mt-4 text-muted">
            Tu cartel, tarjeta o sticker trae un QR dinámico incluido. Una vez
            que lo activás, lo gestionás desde la app.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {queEs.map((q) => (
            <li
              key={q.titulo}
              className="rounded-[var(--radius-card)] border border-line p-6"
            >
              <QRMark />
              <h3 className="t-h3 mt-4">{q.titulo}</h3>
              <p className="t-body mt-2 text-muted">{q.texto}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <a
            href="/como-funciona"
            className="t-caption font-semibold text-brand underline underline-offset-4"
          >
            Ver cómo funciona
          </a>
        </div>
      </Section>

      <Section className="border-t border-line bg-surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="t-h2">¿Todavía no tenés tu FlashTag?</h2>
          <p className="t-lead mt-4 text-muted">
            Elegí el cartel, tarjeta o sticker que mejor se adapta a tu local.
            Llega con el QR activado y listo para usar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={site.urls.shop} variant="primary" size="lg" arrow>
              Comprá uno en nuestra tienda
            </Button>
            <Button href="/precios" variant="secondary" size="lg">
              Ver planes
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
