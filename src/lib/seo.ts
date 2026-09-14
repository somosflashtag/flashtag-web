import type { Metadata } from "next";
import { site } from "./site";

/** Construye metadata por página: title, description, canonical y OG. */
export function pageMeta({
  title,
  description,
  path,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${site.domain}${path}`;

  /* La imagen OG la genera cada segmento con opengraph-image.tsx (ver lib/og).
     Solo se fuerza una acá cuando la página trae la suya. */
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.domain}/#organization`,
  name: site.name,
  url: `${site.domain}/`,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: Object.values(site.social).filter(Boolean),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.domain}/#website`,
  url: `${site.domain}/`,
  name: site.name,
  inLanguage: site.lang,
  publisher: { "@id": `${site.domain}/#organization` },
};

export function faqSchema(items: { pregunta: string; respuesta: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  };
}
