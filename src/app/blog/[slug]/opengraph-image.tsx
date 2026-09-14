import { ogContentType, ogImage, ogSize } from "@/lib/og";
import { articulosPublicables } from "@/content/blog";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Artículo del blog de FlashTag";

export function generateStaticParams() {
  return articulosPublicables.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articulosPublicables.find((x) => x.slug === slug);
  return ogImage({
    eyebrow: "FlashTag · Blog",
    kicker: a?.categoria,
    title: a?.titulo ?? "Blog",
  });
}
