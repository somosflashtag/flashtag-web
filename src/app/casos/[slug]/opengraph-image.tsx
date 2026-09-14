import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { casosConDetalle } from "@/content/casos";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Caso de éxito FlashTag";

export function generateStaticParams() {
  return casosConDetalle.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = casosConDetalle.find((x) => x.slug === slug);
  return ogImage({
    eyebrow: "FlashTag · Casos",
    kicker: c?.negocio,
    title: c?.metrica.replace("★", "estrellas") ?? "Caso de éxito",
  });
}
