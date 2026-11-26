import type { GlifoId } from "@/components/ui/Glifo";
import type { FaqItem } from "./faq";

/**
 * ACTIVAR — el copy de /activar-tu-flashtag.
 *
 * Es una página de TAREA: el que llega ya compró su cartel, tarjeta o sticker
 * y quiere activarlo. Primero el formulario del código; después los pasos y
 * las dudas de activación. Nada que distraiga.
 *
 * La activación vive en la app (my.flashtag.tech): el formulario de acá solo
 * recibe el código y deriva al login (`site.urls.login`) con `?codigo=…`.
 * Lo que esta página cuenta de la app (los pasos, las dudas) describe su
 * flujo de "asociar producto": el código impreso, la cuenta, y la guía que
 * pregunta a dónde lleva el cartel. Si la app cambia ese flujo, se cambia acá.
 */

export const activar = {
  titular: "Activá",
  destacado: "tu FlashTag",
  bajada:
    "Ingresá el ID/código de tu producto. Lo encontrás impreso en el packaging o en el reverso del cartel. La activación es remota y gratis.",
  form: {
    label: "ID/código de activación",
    /** Con la forma de los códigos impresos: es el ejemplo que muestra la app. */
    placeholder: "Ej: AA1B755",
    boton: "Activar",
    /** Lo que dice el navegador si el código no pasa el `pattern`. */
    formato: "De 4 a 20 letras y números, tal cual figura en tu producto",
  },
  ayuda: "¿No encontrás el ID/código? Está impreso en tu producto, junto al QR.",
};

/**
 * El cartel de Google de la tienda, con su código de ejemplo a la vista.
 * `codigo`: el centro del código impreso, en % del ancho y del alto de la
 * imagen (600 × 600). Si se cambia la imagen, se vuelve a medir.
 */
export const cartelCodigo = {
  src: "/carteles/google.webp",
  alt: "Cartel de Google de FlashTag: el ID/código está impreso debajo del QR",
  codigo: { x: 73.7, y: 83.9 },
  chip: "Tu ID/código está acá",
  detalle: "En los carteles, abajo del QR",
};

/** Los pasos de la activación, en el orden en que pasan. */
export const pasosActivar = {
  titular: "Lo activás",
  destacado: "en minutos",
  bajada: "La activación es remota: la hacés vos, desde el celular o la compu, sin instalar nada.",
  pasos: [
    {
      glifo: "cartel",
      titulo: "Buscá el ID/código",
      texto: "Está impreso en tu producto, junto al QR. También figura en el packaging o en el reverso del cartel.",
    },
    {
      glifo: "persona",
      titulo: "Entrá a la app",
      texto: "Con el botón Activar vas a la app. Creás tu cuenta gratis o entrás con la que ya tenés.",
    },
    {
      glifo: "qr",
      titulo: "Asociá tu producto",
      texto: "Cargás el ID/código en la app y el cartel, la tarjeta o el sticker queda en tu cuenta.",
    },
    {
      glifo: "check",
      titulo: "Decile a dónde lleva",
      texto:
        "La app te guía según el producto: tu link de reseñas de Google, tu usuario de Instagram o tu número de WhatsApp.",
    },
  ] satisfies { glifo: GlifoId; titulo: string; texto: string }[],
};

/**
 * Dudas de activación. Cada respuesta sale de lo que ya dice el sitio (esta
 * página, `pasos.ts`, `faq.ts`) o de cómo funciona hoy la app.
 */
export const dudasActivar = {
  titular: "Dudas",
  titular2: "de activación",
  bajada: "Antes de escribirnos, fijate si la tuya está acá.",
  items: [
    {
      pregunta: "¿Dónde encuentro el ID/código?",
      respuesta:
        "Está impreso en tu producto, junto al QR: en los carteles y los stickers lo ves abajo; en las tarjetas, arriba. También figura en el packaging o en el reverso del cartel.",
    },
    {
      pregunta: "¿Activarlo tiene algún costo?",
      respuesta:
        "No. La activación es remota y gratis: creás tu cuenta en la app, sin tarjeta de crédito, y asociás el producto con su ID/código.",
    },
    {
      pregunta: "¿Necesito una cuenta para activarlo?",
      respuesta:
        "Sí. Tu FlashTag se gestiona desde la app, así que la activación termina ahí: creás tu cuenta gratis o entrás con la que ya tenés.",
    },
    {
      pregunta: "¿Lo puedo activar desde el celular?",
      respuesta:
        "Sí. La activación es remota y se hace desde la app, que abrís en el navegador del celular o de la compu, sin instalar nada.",
    },
    {
      pregunta: "Tengo más de un producto, ¿cómo los activo?",
      respuesta:
        "De a uno: cada cartel, tarjeta o sticker tiene su propio ID/código. Los asociás todos a la misma cuenta.",
    },
    {
      pregunta: "¿Qué hago si el código no funciona?",
      respuesta:
        "Revisá que esté escrito tal cual figura en tu producto. Si sigue sin funcionar, escribinos por WhatsApp: te responde una persona del equipo.",
    },
  ] satisfies Pick<FaqItem, "pregunta" | "respuesta">[],
};

/** Qué es el producto que acaba de activar. */
export const queEs = {
  titular: "¿Qué es",
  destacado: "tu FlashTag?",
  bajada:
    "Tu cartel, tarjeta o sticker trae un QR dinámico incluido. Una vez que lo activás, lo gestionás desde la app.",
  items: [
    {
      glifo: "qr",
      tono: "brand",
      titulo: "QR dinámico impreso",
      texto: "El QR físico que viene en tu producto nunca cambia, aunque modifiques el destino desde la app.",
    },
    {
      glifo: "repetir",
      tono: "coral",
      titulo: "Contenido editable",
      texto: "Cambiá el link, la página o la info detrás del QR cuando quieras, desde la app.",
    },
    {
      glifo: "barras",
      tono: "teal",
      titulo: "Métricas reales",
      texto: "Sabé cuántas personas escanearon, desde dónde y en qué horario. Todo en tu dashboard.",
    },
  ] satisfies { glifo: GlifoId; tono: "brand" | "coral" | "teal"; titulo: string; texto: string }[],
  link: { label: "Ver cómo funciona", href: "/como-funciona" },
};

/** El cierre: para el que llegó sin producto. */
export const cierreActivar = {
  titular: "¿Todavía no tenés",
  destacado: "tu FlashTag?",
  bajada:
    "Elegí el cartel, tarjeta o sticker que mejor se adapta a tu local. Llega con el QR y el chip NFC listos, y lo activás acá con su código.",
  planes: { label: "Ver planes", href: "/precios" },
};
