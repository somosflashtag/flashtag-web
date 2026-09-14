import type { MetadataRoute } from "next";
import { rutas } from "@/lib/nav";
import { site } from "@/lib/site";

/** El sitemap sale de lib/nav.ts: si una ruta no existe, no se declara. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return rutas.map((r) => ({
    url: `${site.domain}${r === "/" ? "" : r}`,
    lastModified: now,
    changeFrequency: r === "/" ? "weekly" : "monthly",
    priority: r === "/" ? 1 : 0.8,
  }));
}
