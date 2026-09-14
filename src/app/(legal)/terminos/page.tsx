import { LegalLayout } from "@/components/LegalLayout";
import { leerLegal } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Términos y Condiciones",
  description:
    "Términos y condiciones de uso de FlashTag: servicio, cuentas, uso aceptable, módulo Reseñas IA, planes y pagos, y jurisdicción.",
  path: "/terminos",
});

export default function TerminosPage() {
  return <LegalLayout doc={leerLegal("terminos")} />;
}
