import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const rutas = ["", "/precios", "/como-funciona", "/casos", "/blog", "/recursos", "/nosotros", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return rutas.map((r) => ({
    url: `${site.domain}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
