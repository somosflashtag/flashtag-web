import { ViewTransition } from "react";

/**
 * Envuelve el contenido de CADA `page.tsx` (no del layout: los layouts
 * persisten entre navegaciones y ahí la transición nunca dispara).
 *
 * Al navegar, la página que se va se desenfoca y sale rápido; la que llega
 * sube y se aclara (`.pagina-sale` / `.pagina-entra` en globals.css). El
 * header queda quieto. Sin soporte del navegador, o con
 * `prefers-reduced-motion`, el cambio es instantáneo.
 */
export function Pagina({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="pagina-entra" exit="pagina-sale" default="none">
      {children}
    </ViewTransition>
  );
}

/**
 * Un elemento que VIAJA de una página a otra: la foto de un rubro en la home
 * y la del hero de `/para/<rubro>`, el logo de un caso y el de su página.
 * Los dos extremos llevan el mismo `nombre` (único por página: usá el slug).
 */
export function Viaja({ nombre, children }: { nombre: string; children: React.ReactNode }) {
  return (
    <ViewTransition name={nombre} share="viaja" default="none">
      {children}
    </ViewTransition>
  );
}
