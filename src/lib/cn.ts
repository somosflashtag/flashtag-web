import { twMerge } from "tailwind-merge";

/**
 * Une clases resolviendo conflictos de utilidades de Tailwind: la última gana.
 *
 * Un `join(" ")` no alcanza. Los componentes traen clases base y quien los usa
 * las pisa desde `className`, pero en CSS el desempate lo decide el orden del
 * stylesheet, no el del atributo. Por eso `<Button className="hidden
 * lg:inline-flex">` seguía visible en phone: el `inline-flex` de la base le
 * ganaba al `hidden`, y el CTA secundario aparecía en el header móvil pisando
 * al primario.
 */
export function cn(...classes: (string | false | null | undefined)[]) {
  return twMerge(classes.filter(Boolean).join(" "));
}
