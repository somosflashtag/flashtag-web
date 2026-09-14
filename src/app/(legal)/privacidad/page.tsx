import { LegalLayout } from "@/components/LegalLayout";
import { leerLegal } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Política de Privacidad",
  description:
    "Cómo FlashTag recolecta, usa, comparte y protege tus datos personales, conforme a la Ley 25.326 y la Google API Services User Data Policy.",
  path: "/privacidad",
});

export default function PrivacidadPage() {
  return <LegalLayout doc={leerLegal("privacidad")} />;
}
