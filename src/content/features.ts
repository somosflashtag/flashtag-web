import type { MockId } from "@/components/app/mocks";
import type { GlifoId } from "@/components/ui/Glifo";
import type { fotos } from "./fotos";
import { pasos as pasosBase } from "./pasos";

/**
 * FEATURES — las capacidades de la app con página propia, en el orden en que se venden.
 *
 * Cada una tiene su pantalla (`mock`) construida en código en
 * components/app/mocks.tsx, su página en /producto/[slug] y su lugar en el
 * tour de la home. Un dato, una fuente: el copy vive acá.
 *
 * Para sumar una: se agrega al array `base` de abajo. Lo obligatorio es
 * `entrada` (lo que dice el hero), `casos`, `pasos`, `desde` y una de las dos
 * pantallas (`mock` o `pantalla`). El resto (`destacado`, `ampliacion`,
 * `glifo`, `foto`, `planes`) es opcional: la plantilla de /producto/[slug]
 * tiene un valor por defecto para cada uno. `bajada` no se escribe: se arma
 * sola con `entrada` + `ampliacion`.
 */

export type Feature = {
  slug: string;
  nombre: string;
  /** Verbo corto para el menú y el bento. */
  corto: string;
  /**
   * Título para Google, cuando el nombre del feature no alcanza. Métricas y
   * Píxeles lo llevan porque sin esto competían por la misma búsqueda.
   */
  seoTitle?: string;
  /**
   * Descripción para Google, de 150 caracteres o menos.
   *
   * `bajada` es el lead completo: está escrito para leerse en la página, y
   * pasa los 300 caracteres. Google corta en ~155, así que usarla dejaba el
   * resultado partido a la mitad de la frase. Acá va la versión que se lee
   * entera en el buscador.
   */
  seoDescription?: string;
  titular: string;
  /**
   * El final de `titular` que el hero de la página pinta en gold. Tiene que
   * ser, letra por letra, el cierre del titular: si no coincide, el titular
   * sale entero en blanco.
   */
  destacado?: string;
  /** Lo que dice el hero de /producto/[slug]: una o dos oraciones. */
  entrada: string;
  /**
   * Lo que sigue a la entrada: el detalle que no entra en el hero. La página
   * lo muestra debajo de "Cómo funciona". Tiene que leerse solo.
   */
  ampliacion?: string;
  /**
   * `entrada` + `ampliacion` en un solo párrafo. No se escribe a mano: se
   * deriva al exportar. La usan el tour de /como-funciona y, si falta
   * `seoDescription`, la descripción para Google.
   */
  bajada: string;
  analogia?: string;
  casos: string[];
  /** Cómo funciona, en tres pasos. */
  pasos: { titulo: string; texto: string }[];
  /**
   * Pantalla de la app que lo muestra, en teléfono (components/app/mocks.tsx).
   * Las features sin maqueta de teléfono llevan `pantalla` en su lugar.
   */
  mock?: MockId;
  /**
   * Pantalla del panel de escritorio que lo muestra: clave de
   * `pantallasPilares` en components/app/panel.tsx ("maps", "ficha",
   * "proteccion", "flashcard"…). La página de producto usa `mock` si existe y,
   * si no, `pantalla`. Toda feature tiene al menos una de las dos.
   */
  pantalla?: string;
  /** Ícono de la feature: la etiqueta del hero y su tarjeta en "El resto de la app". */
  glifo?: GlifoId;
  /**
   * Foto de "Para qué lo usan" (clave de content/fotos.ts). Ilustrativa: no
   * retrata a ningún cliente (AGENTS.md §4).
   */
  foto?: keyof typeof fotos;
  /**
   * Qué renglones de `planes.ts` hablan de esta feature: un fragmento del
   * `label` por renglón (sin distinguir mayúsculas). La página arma con eso
   * "En qué plan entra", plan por plan. El dato sigue viviendo en planes.ts:
   * acá solo se dice cuál mirar. Sin esto, la sección muestra solo el plan de
   * entrada (`desde`).
   */
  planes?: string[];
  /** En qué plan entra. */
  desde: "Free" | "Starter" | "Full";
};

const base: Omit<Feature, "bajada">[] = [
  {
    slug: "qr-dinamicos",
    nombre: "QR dinámicos",
    corto: "Un QR para lo que necesites hoy",
    seoDescription:
      "Creá un QR y cambiá su destino cuando quieras desde el celular: una promo, un menú, un formulario. Con métricas de cada escaneo. Gratis en el plan Free.",
    titular: "Creá un QR que apunta a lo que vos decidas",
    destacado: "lo que vos decidas",
    entrada:
      "Cada cartel de FlashTag tiene su canal: Google, Instagram, WhatsApp. Cuando necesitás algo distinto, creás un QR dinámico desde la app: una promo, el menú de temporada, un formulario de turnos.",
    ampliacion:
      "El destino lo cambiás cuando quieras desde el celular, y cada escaneo queda medido: cuántos fueron, cuántas personas distintas, a qué hora y desde dónde.",
    analogia:
      "Es un QR que hoy dice una cosa y mañana otra, sin que nadie en el local tenga que hacer nada.",
    casos: [
      "El menú de temporada",
      "La promo de la semana",
      "Un formulario de turnos o reservas",
      "Medir qué campaña o qué pieza trajo gente de verdad",
      "Pasarle el vectorial en CMYK a tu diseñador o a la imprenta",
    ],
    pasos: [
      {
        titulo: "Creás el QR y lo descargás",
        texto:
          "Le ponés nombre y lo bajás en el formato que necesites: PNG para las redes, EPS o PDF en CMYK para la imprenta. Después va donde quieras: un flyer, un packaging, la vidriera.",
      },
      {
        titulo: "Elegís a dónde apunta",
        texto: "Una promo, un menú, un formulario, tu Link Page. Lo que necesites hoy.",
      },
      {
        titulo: "Lo cambiás y lo medís",
        texto:
          "Cambiás el destino desde el celular al instante y ves cuántos lo escanearon, cuándo y desde qué dispositivo.",
      },
    ],
    mock: "qr",
    glifo: "qr",
    foto: "panaderia",
    planes: ["qr dinámicos"],
    desde: "Free",
  },
  {
    slug: "link-pages",
    nombre: "Link Pages",
    corto: "Tu minisitio con métricas por botón",
    seoDescription:
      "Tu minisitio con botones a WhatsApp, menú, reservas y redes. Con tu marca, editable en un minuto y con los clics medidos por botón. Gratis en el plan Free.",
    titular: "Tu minisitio, conectado al cartel de tu local",
    destacado: "al cartel de tu local",
    entrada:
      "Un lugar propio con botones a WhatsApp, Google Maps, menú, catálogo, redes y promos. Con tu marca, editable en un minuto, y con analítica completa: visitas, clics por botón y de dónde llegó cada una.",
    casos: [
      "Reservas y turnos sin llamadas",
      "Catálogo completo desde la góndola",
      "Todas tus redes en un solo lugar",
      "Saber qué botón se lleva los clics y cuál sobra",
    ],
    pasos: [
      {
        titulo: "Armás la página",
        texto: "Logo, colores y los botones que quieras. Sin diseñador ni código.",
      },
      {
        titulo: "La conectás al QR",
        texto: "Un cartel, una vidriera o tu bio de Instagram: todos llevan al mismo lugar.",
      },
      {
        titulo: "Mirás qué tocan",
        texto:
          "Visitas, clics por botón y origen de cada una. Si nadie toca 'Reservar', ya sabés qué cambiar.",
      },
    ],
    mock: "links",
    glifo: "link",
    foto: "barberia",
    planes: ["link page"],
    desde: "Free",
  },
  {
    slug: "resenas-ia",
    nombre: "Reseñas con IA",
    corto: "Respuestas automáticas con la voz de tu marca",
    seoDescription:
      "Conectá tu Google Business y FlashTag responde cada reseña con la voz de tu marca. Vos definís el tono y aprobás antes de publicar. Desde el plan Starter.",
    titular: "Tus reseñas de Google, respondidas solas y con tu voz",
    destacado: "con tu voz",
    entrada:
      "Conectás tu cuenta de Google Business y FlashTag responde cada reseña de forma automática, con la voz de tu marca: vos definís el tono, cómo saludás, qué palabras usás y cuáles no.",
    ampliacion:
      "Podés revisar cada respuesta antes de publicar o dejar que salgan solas. Y con el filtro de reseñas, activás en tus carteles de Google una landing previa: el cliente contento sigue a Google y el disconforme te escribe a vos, antes de que sea una reseña pública.",
    casos: [
      "Las de 5 estrellas, respondidas sin repetirte",
      "Una reseña negativa, con el tono justo",
      "Filtrar las malas reseñas antes de que lleguen a Google",
      "Mejor posición en Google Maps sin esfuerzo",
    ],
    pasos: [
      {
        titulo: "Conectás Google",
        texto: "Un clic en 'Conectar Google' y tus fichas aparecen en la app.",
      },
      {
        titulo: "Definís tu voz",
        texto: "Tono, saludo, firma, palabras prohibidas. La IA responde como vos.",
      },
      {
        titulo: "Se responden solas",
        texto: "Automático, o con tu aprobación antes de publicar. Vos elegís.",
      },
    ],
    mock: "resenas",
    glifo: "estrella",
    foto: "restaurante",
    planes: ["reseñas con ia", "cuenta", "filtro de reseñas"],
    desde: "Starter",
  },
  {
    slug: "metricas",
    nombre: "Métricas",
    corto: "Cómo interactúan con cada producto",
    seoDescription:
      "Escaneos totales y únicos, mapa de calor por hora, ranking de ciudades y export a CSV. Mirá qué funciona en tu local y qué conviene cambiar.",
    seoTitle: "Métricas de QR: qué mide FlashTag en cada escaneo",
    titular: "Métricas de cómo tus clientes interactúan con tu negocio",
    destacado: "con tu negocio",
    entrada:
      "Cuántos escanean el cartel de Google, cuántos siguen tu Instagram, cuántos giran la ruleta y cuándo lo hacen. Todo en un panel en tiempo real que te dice qué está funcionando en tu local y qué conviene cambiar.",
    ampliacion:
      "Totales, únicos y visitas; día y hora en un mapa de calor; ciudad, dispositivo y qué producto lo generó.",
    casos: [
      "Qué producto genera más interacción",
      "Cuánta gente usa la ruleta cada semana",
      "Cuántos clientes vuelven por la fidelidad",
      "En qué horarios conviene reforzar el local",
    ],
    pasos: [
      {
        titulo: "Se mide solo",
        texto: "Cada escaneo, toque NFC, giro y canje queda registrado. Sin configurar nada.",
      },
      {
        titulo: "Lo ves en el celular",
        texto: "Un panel con lo que importa: productos, horarios, ruleta, fidelidad, recurrencia.",
      },
      {
        titulo: "Decidís con datos",
        texto:
          "Ajustás premios, horarios y ubicación de cada producto según lo que muestra el panel. Y volvés a medir la semana siguiente.",
      },
    ],
    mock: "metricas",
    glifo: "barras",
    planes: ["métricas", "csv"],
    desde: "Free",
  },
  {
    slug: "fidelidad",
    nombre: "Programa de fidelidad",
    corto: "Una comunidad que te elige y vuelve",
    seoDescription:
      "Sellos, puntos, cashback o membresías en Apple Wallet y Google Wallet. Tu cliente no descarga ninguna app: escanea y la guarda. Desde el plan Starter.",
    titular: "Tu programa de fidelidad, en la billetera del celular de tu cliente",
    destacado: "de tu cliente",
    entrada:
      "Sellos, puntos, cashback, descuentos, cupones, membresías, gift cards o packs de sesiones: elegís la modalidad, le ponés tu logo y tu esquema de premios. Tu cliente no descarga ninguna app: escanea y la guarda en Apple Wallet o Google Wallet.",
    ampliacion:
      "Con la tarjeta en su billetera, le mandás push gratis, lo saludás en su cumpleaños y lo premiás por traer amigos.",
    analogia:
      "Es la tarjeta de sellos de toda la vida, pero vive al lado de su tarjeta de embarque y su SUBE: no se pierde, y te dice quién volvió.",
    casos: [
      "El café número 10 es gratis",
      "Una membresía mensual con cupo de clases",
      "Una gift card para regalar en fechas especiales",
      "Puntos extra por traer a un amigo",
    ],
    pasos: [
      {
        titulo: "Diseñás tu tarjeta",
        texto: "Tu logo, tus colores y el esquema de puntos o visitas que elijas.",
      },
      {
        titulo: "El cliente la guarda en su Wallet",
        texto: "Escanea o apoya el teléfono y la agrega a Apple Wallet o Google Wallet. Sin descargar nada.",
      },
      {
        titulo: "Canjea desde el celular",
        texto: "Muestra el código, vos lo validás en la app. Queda registrado.",
      },
    ],
    mock: "fidelidad",
    glifo: "corona",
    foto: "cafe",
    planes: ["programa de fidelidad"],
    desde: "Starter",
  },
  {
    slug: "ruleta",
    nombre: "Ruleta de premios",
    corto: "Una experiencia gamificada con tu marca",
    seoDescription:
      "El cliente escanea, gira y se lleva un premio. Vos elegís premios, colores y porcentaje de suerte. Gratis con la compra de tu producto FlashTag.",
    titular: "Divertí a tus clientes y dales algo a cambio",
    destacado: "dales algo a cambio",
    entrada:
      "Una experiencia gamificada con tu marca: el cliente escanea, gira la ruleta y se lleva un premio. Vos la personalizás entera: los premios, los colores de cada casillero y el porcentaje de suerte de cada uno.",
    ampliacion:
      "La excusa perfecta para que dejen la reseña o te sigan en tus redes. Y cada giro se mide: cuántos, a qué hora y qué premio salió. Si compraste un producto FlashTag, la primera ruleta va incluida en el plan Free.",
    casos: [
      "Un giro a cambio de una reseña",
      "Premios distintos por franja horaria",
      "Lanzamientos y fechas especiales",
      "Ajustar los porcentajes de suerte con los datos en la mano",
    ],
    pasos: [
      {
        titulo: "Armás tu ruleta",
        texto: "Premios, colores y porcentaje de suerte de cada casillero. Con tope diario si querés.",
      },
      {
        titulo: "Lo linkeás al QR",
        texto: "Desde un QR dinámico, tu Link Page o el cartel del mostrador.",
      },
      {
        titulo: "Validás el premio y medís",
        texto:
          "El cliente muestra el código, vos lo marcás como canjeado y el giro queda registrado en tus métricas.",
      },
    ],
    mock: "ruleta",
    glifo: "ruleta",
    foto: "heladeria",
    planes: ["ruleta"],
    // Desde el 29/09/2026 la primera ruleta entra en Free con un producto
    // FlashTag asociado; Starter sube a 3. Ver planes.ts.
    desde: "Free",
  },
  {
    slug: "pixeles",
    nombre: "Píxeles de Google y Meta",
    corto: "Tus escaneos, en Google Analytics y Meta Ads",
    seoDescription:
      "Pegás tu ID de Google Analytics, Meta Pixel o Tag Manager y cada escaneo llega a tus campañas. Armá remarketing con quien pasó por tu local.",
    seoTitle: "Píxel de Meta y Google Analytics para tus QR",
    titular: "Conectá tus QR con Google Analytics, Meta y Tag Manager",
    destacado: "Google Analytics, Meta y Tag Manager",
    entrada:
      "Pegás tu ID de Google Analytics 4, tu Meta Pixel o tu contenedor de Google Tag Manager en la app, y cada escaneo de tus QR y cada visita a tu Link Page llega a las herramientas que ya usás.",
    ampliacion:
      "Sirve para armar públicos de remarketing con la gente que pasó por tu local, medir qué escaneo terminó en una venta y comparar el cartel con tus anuncios en el mismo panel.",
    analogia:
      "Es ponerle a tu cartel el mismo píxel que tiene tu sitio: quien lo escaneó en el local entra a tus públicos de Meta y a tus informes de Google como cualquier otra visita.",
    casos: [
      "Remarketing en Instagram a quienes escanearon en el local",
      "Medir cuántas ventas online arrancaron en un flyer",
      "Comparar el cartel del mostrador contra tus anuncios",
    ],
    pasos: [
      {
        titulo: "Copiás el ID",
        texto: "El Measurement ID de Google Analytics (G-…), el ID numérico de tu Meta Pixel o el contenedor de Tag Manager (GTM-…).",
      },
      {
        titulo: "Lo pegás en la app",
        texto: "En 'Análisis de seguimiento', dentro de Estadísticas de tu QR o tu Link Page. Activás el seguimiento de eventos si querés medir los clics.",
      },
      {
        titulo: "Lo ves donde siempre",
        texto: "Escaneos y clics aparecen en Google Analytics, Meta o Tag Manager como una visita más. Sin instalar nada.",
      },
    ],
    mock: "pixeles",
    glifo: "objetivo",
    foto: "agencia",
    planes: ["píxeles"],
    desde: "Starter",
  },
  /* ── Sumadas en diciembre de 2026 ────────────────────────────────────
     Tres funcionalidades que la app ya tiene abiertas a sus clientes y que el
     sitio solo nombraba en los pilares de la home. El copy sale del código y
     de la documentación de la app (docs/google-tu-negocio.md, lib/seo-local,
     docs/producto/flashcard-v1.md) y del estado de sus feature flags en
     producción al 26/11/2026: seo_local desde Starter, ficha_completa y
     flashcard_enabled para todos. Si la app cambia, se corrige acá. */
  {
    slug: "posicion-en-maps",
    nombre: "Posición en Maps",
    corto: "En qué puesto salís, cuadra por cuadra",
    seoTitle: "Posición en Google Maps: medí en qué puesto aparece tu local",
    seoDescription:
      "Elegí una búsqueda y mirá en qué puesto aparece tu local en Google Maps desde cada punto del barrio, y quién te gana. Desde el plan Starter.",
    titular: "Mirá en qué puesto aparece tu local en Maps, cuadra por cuadra",
    destacado: "cuadra por cuadra",
    entrada:
      "Elegís una búsqueda, como «café de especialidad» o «peluquería», y FlashTag te muestra en qué puesto aparece tu local en Google Maps desde distintos puntos del barrio, y quién aparece antes que vos en cada uno.",
    ampliacion:
      "La posición en Maps cambia según dónde está parado el que busca: a dos cuadras podés salir primero y a diez no aparecer. Por eso se mide con una grilla de puntos alrededor de tu local. Con cada medición ves el mapa, qué competidores te ganan y dónde, y recomendaciones para mejorar; a partir de la segunda, también si vas subiendo o bajando. Cada empresa tiene un cupo mensual de mediciones, que se renueva solo.",
    analogia:
      "Es como pararte en cada esquina del barrio, buscar tu rubro en el celular y anotar en qué puesto salís.",
    casos: [
      "Saber en qué cuadras ganás y en cuáles no aparecés",
      "Ver qué competidor te gana en cada punto",
      "Medir si lo que hacés con tu ficha y tus reseñas te hace subir",
      "Seguir una búsqueda todas las semanas, sin acordarte",
    ],
    pasos: [
      {
        titulo: "Elegís la búsqueda",
        texto: "Una palabra clave por búsqueda, como la escribiría tu cliente, y la sucursal que querés medir.",
      },
      {
        titulo: "Armás la grilla",
        texto:
          "Cuántos puntos, a qué distancia entre sí y con qué forma: cuadrada, rombo o círculo. Podés sacar los puntos que no te interesan.",
      },
      {
        titulo: "Medís y comparás",
        texto:
          "La medición tarda entre 5 y 45 minutos. La repetís cuando quieras o la dejás programada: semanal o diaria.",
      },
    ],
    pantalla: "maps",
    glifo: "ubicacion",
    planes: ["seo local"],
    desde: "Starter",
  },
  {
    slug: "ficha-de-google",
    nombre: "Ficha de Google",
    corto: "Tu ficha al día y protegida, sin entrar a Google",
    seoTitle: "Ficha de Google Business: gestionala y protegela desde FlashTag",
    seoDescription:
      "Editá horarios, feriados, fotos y publicaciones de tu ficha de Google desde FlashTag. Con auditoría sobre 100 y protección ante cambios de terceros.",
    titular: "Tu ficha de Google al día y protegida, sin entrar a Google",
    destacado: "sin entrar a Google",
    entrada:
      "Conectás tu ficha de Google Business y la manejás desde FlashTag: descripción, teléfono, sitio web, horarios, feriados, fotos y publicaciones. Los cambios se publican en Google al guardar.",
    ampliacion:
      "Además la cuida: cada 15 minutos revisa si alguien cambió tu horario, tu teléfono, tu web, tu descripción o el estado del local, y lo vuelve a como lo dejaste. Si lo que cambió es el nombre, la dirección o la categoría, te avisa. La auditoría le pone una nota sobre 100 a tu ficha, con la lista de qué falta y dónde se arregla. El nombre, la dirección y la categoría principal se siguen cambiando en Google: son cambios sensibles y la app no los toca.",
    analogia: "Es tener a alguien mirando tu vidriera de Google todo el día, que además te dice qué le falta.",
    casos: [
      "Cargar el horario de un feriado sin entrar a Google",
      "Que nadie te cambie el teléfono o el horario sin que te enteres",
      "Saber qué le falta a tu ficha, con una nota sobre 100",
      "Publicar novedades en Google, o dejarlas programadas",
    ],
    pasos: [
      {
        titulo: "Conectás Google",
        texto: "Entrás con la cuenta de Google que administra tu ficha y elegís qué sucursales sumar.",
      },
      {
        titulo: "La completás",
        texto: "La auditoría te dice qué falta: descripción, horarios, fotos, publicaciones. Lo cargás desde la app.",
      },
      {
        titulo: "Queda protegida",
        texto: "FlashTag revisa tu ficha cada 15 minutos y revierte los cambios que no hiciste vos.",
      },
    ],
    pantalla: "ficha",
    glifo: "escudo",
    planes: ["cuenta"],
    desde: "Starter",
  },
  {
    slug: "flashcard",
    nombre: "FlashCard",
    corto: "Tu tarjeta de presentación, en un QR",
    seoTitle: "FlashCard: tarjeta de presentación digital con QR",
    seoDescription:
      "Tu tarjeta de presentación digital: foto, cargo, WhatsApp y redes en un QR. El que la abre guarda tu contacto en un toque. Una gratis por cuenta.",
    titular: "Tu tarjeta de presentación, siempre al día y en un QR",
    destacado: "en un QR",
    entrada:
      "Cargás tus datos una vez (foto, nombre, cargo, teléfono, WhatsApp, mail, redes y web), elegís una plantilla y un color, y compartís tu tarjeta con un QR o un link. El que la abre guarda tu contacto en un toque.",
    ampliacion:
      "Si cambiás de teléfono o de cargo, la editás desde la app y el mismo QR muestra los datos nuevos: no hay que reimprimir nada. También la podés llevar en la Wallet del celular. Cada cuenta tiene una FlashCard gratis; desde el plan Starter podés sumar más, una por vendedor.",
    analogia: "Es la tarjeta personal de siempre, pero que no se termina, no se pierde y se actualiza sola.",
    casos: [
      "Que cada vendedor tenga su tarjeta, con su WhatsApp",
      "Pasarle tu contacto a un cliente sin dictar el número",
      "Cambiar un dato sin reimprimir tarjetas",
      "Llevarla en la Wallet del celular",
    ],
    pasos: [
      {
        titulo: "Cargás tus datos",
        texto: "Foto, nombre, cargo, empresa, teléfono, mail, WhatsApp, redes, web y dirección.",
      },
      {
        titulo: "Elegís el diseño",
        texto: "Una plantilla y un color. Arranca con los colores y el logo de tu marca.",
      },
      {
        titulo: "La compartís",
        texto: "Por QR o por link. Quien la abre te llama, te escribe o guarda tu contacto en un toque.",
      },
    ],
    pantalla: "flashcard",
    glifo: "tarjeta",
    foto: "tienda",
    desde: "Free",
  },
];

export const features: Feature[] = base.map((f) => ({
  ...f,
  bajada: [f.entrada, f.ampliacion].filter(Boolean).join(" "),
}));

/** Las que tienen maqueta de teléfono: las que recorre el tour de /como-funciona. */
export const featuresConMaqueta = features.filter(
  (f): f is Feature & { mock: MockId } => Boolean(f.mock),
);

export const featurePorSlug = (slug: string) =>
  features.find((f) => f.slug === slug);

/** Los 4 pasos de la home: la misma fuente que /como-funciona, numerada. */
export const pasos = pasosBase.map((p, i) => ({ n: i + 1, ...p }));
