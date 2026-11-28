import { unstable_cache } from "next/cache";
import { site } from "@/lib/site";

/**
 * MAPA DE COMERCIOS — los locales que usan FlashTag, sobre un mapa navegable.
 *
 * El mapa no vive acá: lo sirve la app (`/mapa?embed=1`) y la web lo muestra
 * en un iframe. Las cifras y los puntos salen de la base de la app y se
 * actualizan solos; por eso en la web no se escribe ningún número a mano (§4).
 *
 * La app lo tiene detrás del flag `mapa_comercios`. Con el flag cerrado la
 * ruta responde 404 y el iframe quedaría como un hueco, así que antes de
 * dibujar la sección se pregunta si el mapa responde. La respuesta se guarda
 * 15 minutos: cuando Tomás abre (o cierra) el flag, el sitio lo refleja solo
 * (entre 15 y 30 minutos, porque después cada página se regenera),
 * sin deploy. Ante cualquier duda (timeout, error) la sección no se muestra.
 */
export const mapaEmbed = `${process.env.MAPA_URL ?? site.urls.mapa}?embed=1`;

export const mapaAbierto = unstable_cache(
  async (): Promise<boolean> => {
    try {
      const res = await fetch(mapaEmbed, { cache: "no-store", signal: AbortSignal.timeout(5000) });
      await res.body?.cancel();
      return res.ok;
    } catch {
      return false;
    }
  },
  ["mapa-abierto", mapaEmbed],
  { revalidate: 900 },
);
