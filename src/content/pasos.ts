import type { GlifoId } from "@/components/ui/Glifo";

/**
 * CÓMO FUNCIONA — el copy de /como-funciona.
 *
 * Los cuatro pasos para empezar con un cartel: elegís el modelo en la tienda,
 * lo recibís, lo activás gratis desde la app asociándolo a su ID/código, y
 * medís su interacción. `features.ts` los reexporta numerados.
 *
 * La home tiene su propio "cómo funciona" (`loop`, en home.ts): cuenta qué
 * pasa cuando el cliente escanea. Acá se cuenta cómo se empieza.
 *
 * Lo que es dato compartido NO vive acá: las funciones del recorrido salen de
 * `features.ts`, los formatos de `productos.ts` y los CTAs de `lib/site.ts`.
 */

export type Paso = {
  glifo: GlifoId;
  /** Fondo de la tarjeta: `.paso-<tono>` en globals.css. */
  tono: "brand" | "coral" | "teal" | "gold";
  titulo: string;
  texto: string;
};

export const pasos: Paso[] = [
  {
    glifo: "bolsa",
    tono: "brand",
    titulo: "Elegís tu modelo",
    texto:
      "En la tienda: carteles, stickers o tarjetas. De Google, Instagram, WhatsApp, Web, TikTok, Tripadvisor o Facebook: cada producto con su uso.",
  },
  {
    glifo: "cartel",
    tono: "coral",
    titulo: "Lo recibís en tu local",
    texto: "Llega con el QR y el chip NFC listos. Envíos a todo el país.",
  },
  {
    glifo: "qr",
    tono: "teal",
    titulo: "Lo activás gratis",
    texto:
      "Desde la app y de manera remota: creás tu cuenta y asociás el cartel con su ID/código. Listo en minutos.",
  },
  {
    glifo: "barras",
    tono: "gold",
    titulo: "Medís la interacción",
    texto:
      "Cuántos escanean o apoyan el teléfono, cuándo y en qué producto. Datos para tomar mejores decisiones.",
  },
];

/** El hero: titular + la parte en gold. */
export const pasosIntro = {
  titular: "Así de simple",
  destacado: "es empezar.",
  bajada:
    "De elegir el modelo en la tienda a ver la interacción de tu cartel en la app, en menos de 48 horas.",
};

/** La sección de las cuatro tarjetas. */
export const pasosSeccion = {
  titular: "Cuatro pasos.",
  destacado: "Ninguno difícil.",
  /** Para el que ya tiene el producto en la mano: salta al paso 3. */
  yaLoTenes: "¿Ya tenés tu cartel en la mano?",
  activar: { label: "Activá tu FlashTag", href: "/activar-tu-flashtag" },
};

/**
 * El recorrido por la app (components/AppTour.tsx). La bajada repite lo que
 * responde el FAQ ("¿Necesito comprar un cartel para usar FlashTag?", en
 * faq.ts): si esa respuesta cambia, cambia acá.
 */
export const recorrido = {
  etiqueta: "Qué hacés desde la app",
  titular: "Con o sin cartel,",
  destacado: "todo desde el mismo lugar",
  bajada:
    "Creás tu cuenta gratis y usás QR dinámicos y tu Link Page sin comprar nada. El cartel suma a los clientes que ya están en tu local.",
  siguiente: "Siguiente",
};

/** Los tres formatos de la tienda (`formatos`, en productos.ts). */
export const formatosIntro = {
  titular: "Elegí el formato",
  destacado: "que va con tu local",
  bajada: "Cada pieza trae QR y chip NFC: se escanea con la cámara o se apoya el teléfono.",
};

export const cierreComo = {
  titular: "Empezá",
  destacado: "gratis.",
  bajada: "Sin tarjeta de crédito y con el setup listo en minutos. Con o sin cartel.",
};
