import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { features } from "@/content/features";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Función de FlashTag";

export function generateStaticParams() {
  return features.map((f) => ({ slug: f.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = features.find((x) => x.slug === slug);
  return ogImage({
    eyebrow: "FlashTag · Aplicación",
    kicker: f?.nombre,
    title: f?.titular ?? "FlashTag",
  });
}
