"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Glifo } from "./ui/Glifo";
import { IconoBolsa, IconoCelular } from "./ui/Iconos";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./ui/Logo";
import { PromoBanner } from "./PromoBanner";
import { ingresar, menuProducto, menuRubros, navPrincipal } from "@/lib/nav";
import type { Promo } from "@/content/promos";

/**
 * Header flotante: una píldora de vidrio que queda fija arriba y se adapta
 * al fondo que tiene debajo.
 *
 * - Mide cero de alto (`h-0`, sticky): no empuja el contenido. Cada página
 *   arranca con un hero oscuro (`HeroPagina`, `data-hero`) que ya trae el aire
 *   de arriba; para una página sin hero, el layout le da ese aire por CSS.
 * - Lee qué bloque tiene debajo (`data-tono`, que ponen `Seccion`,
 *   `HeroPagina`, `Cierre` y el footer): sobre `noche` es vidrio oscuro con
 *   logo blanco y CTA en gold; sobre claro, vidrio blanco con CTA violeta.
 * - La barra de promo (`PromoBanner`) va arriba, en el flujo: se va con el
 *   scroll y la píldora queda.
 * - Desktop: "Producto" y "Rubros" abren un panel con hover, clic o foco;
 *   Escape lo cierra. Phone: menú a pantalla completa, oscuro, con los links
 *   entrando escalonados; el resto de la página queda `inert` mientras está
 *   abierto.
 *
 * La píldora lleva `view-transition-name: cabecera`: al cambiar de página se
 * queda quieta mientras el contenido se va y llega (globals.css).
 */
type Panel = "producto" | "rubros";

function Chevron({ abierto }: { abierto: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      width="11"
      height="11"
      fill="none"
      aria-hidden="true"
      className={cn("transition-transform duration-300 ease-fluida", abierto && "rotate-180")}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const itemMenu = "group flex gap-3 rounded-2xl p-2.5 transition-colors duration-200 hover:bg-brand-soft/70";

export function Header({ promo = null }: { promo?: Promo | null }) {
  const pathname = usePathname();
  const barra = useRef<HTMLDivElement>(null);
  const [sobreNoche, setSobreNoche] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const closeTimer = useRef<number | null>(null);

  /* Qué hay debajo de la píldora: se lee al scrollear, al cambiar el ancho y
     al cambiar de página. */
  useEffect(() => {
    let pedido = 0;
    const leer = () => {
      pedido = 0;
      setScrolled(window.scrollY > 24);
      const caja = barra.current?.getBoundingClientRect();
      if (!caja) return;
      let noche = false;
      for (const el of document.elementsFromPoint(window.innerWidth / 2, caja.top + 44)) {
        if (barra.current?.contains(el)) continue;
        const marcado = el.closest("[data-tono]");
        if (marcado) {
          noche = marcado.getAttribute("data-tono") === "noche";
          break;
        }
      }
      setSobreNoche(noche);
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(leer);
    };
    pedir();
    window.addEventListener("scroll", pedir, { passive: true });
    window.addEventListener("resize", pedir);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", pedir);
      window.removeEventListener("resize", pedir);
    };
  }, [pathname, open]);

  /* Menú mobile abierto: la página de atrás no scrollea ni recibe foco. */
  useEffect(() => {
    const fondo = [document.getElementById("contenido"), document.querySelector("footer")];
    document.body.style.overflow = open ? "hidden" : "";
    fondo.forEach((el) => el?.toggleAttribute("inert", open));
    return () => {
      document.body.style.overflow = "";
      fondo.forEach((el) => el?.removeAttribute("inert"));
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPanel(null);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const abrir = (p: Panel) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setPanel(p);
  };
  const cerrar = () => {
    closeTimer.current = window.setTimeout(() => setPanel(null), 160);
  };

  /* Con un panel abierto la píldora pasa a claro, igual que el panel. */
  const noche = open || (sobreNoche && !panel);

  const linkNav = cn(
    "rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-200",
    noche ? "text-paper/85 hover:bg-paper/10 hover:text-paper" : "text-ink/70 hover:bg-ink/[0.05] hover:text-ink",
  );

  /** Botón de un desplegable de desktop. El panel cuelga de la píldora. */
  const disparador = (id: Panel, label: string) => (
    <div key={id} onMouseEnter={() => abrir(id)} onMouseLeave={cerrar}>
      <button
        type="button"
        aria-expanded={panel === id}
        aria-controls={`menu-${id}`}
        onClick={() => setPanel((v) => (v === id ? null : id))}
        onFocus={() => abrir(id)}
        className={cn(linkNav, "flex items-center gap-1.5", panel === id && "bg-ink/[0.05] text-ink")}
      >
        {label}
        <Chevron abierto={panel === id} />
      </button>
    </div>
  );

  const paneles: Record<Panel, { ancho: string; contenido: React.ReactNode }> = {
    producto: {
      ancho: "w-[min(800px,calc(100vw-2rem))]",
      contenido: (
        <>
          <div className="grid grid-cols-3 gap-1">
            {menuProducto.grupos.map((g) => (
              <div key={g.titulo}>
                <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted">{g.titulo}</p>
                <ul>
                  {g.items.map((f) => (
                    <li key={f.href}>
                      <Link href={f.href} onClick={() => setPanel(null)} className={itemMenu}>
                        <span className={`mt-0.5 flex size-[34px] shrink-0 items-center justify-center rounded-[10px] text-paper transition-transform duration-300 ease-fluida group-hover:-rotate-6 group-hover:scale-110 ${g.color}`}>
                          <Glifo id={f.glifo} size={18} />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-ink">{f.label}</span>
                          <span className="mt-0.5 block text-xs leading-snug text-muted">{f.descripcion}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-5 border-t border-line px-2.5 pt-3 text-sm font-semibold">
            {menuProducto.extra.map((x) => (
              <Link key={x.href} href={x.href} onClick={() => setPanel(null)} className="text-brand underline-offset-4 hover:underline">
                {x.label}
              </Link>
            ))}
          </div>
        </>
      ),
    },
    rubros: {
      ancho: "w-[min(540px,calc(100vw-2rem))]",
      contenido: (
        <ul className="grid grid-cols-2 gap-1">
          {menuRubros.map((r) => (
            <li key={r.href}>
              <Link href={r.href} onClick={() => setPanel(null)} className={itemMenu}>
                <span className="mt-0.5 flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-brand-soft text-brand transition-transform duration-300 ease-fluida group-hover:-rotate-6 group-hover:scale-110">
                  <Glifo id={r.glifo} size={16} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{r.label}</span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">{r.descripcion}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ),
    },
  };

  const linksMovil = [...navPrincipal.slice(0, 2), ...menuProducto.extra, ...navPrincipal.slice(2), ingresar];

  return (
    <>
      <PromoBanner promo={promo} />

      <header className="sticky top-0 z-50 h-0">
        <div
          ref={barra}
          style={{ viewTransitionName: "cabecera" }}
          className="absolute inset-x-0 top-0 px-2.5 pt-2.5 md:px-4 md:pt-3.5"
        >
          <div
            className={cn(
              "relative mx-auto flex max-w-[1240px] items-center gap-3 rounded-full border pl-5 pr-2 backdrop-blur-xl",
              "transition-[height,background-color,border-color,color,box-shadow] duration-500 ease-fluida lg:gap-4 lg:pl-7 lg:pr-2.5",
              scrolled ? "h-[58px] lg:h-[60px]" : "h-[60px] lg:h-[68px]",
              noche ? "border-paper/15 bg-ink/55 text-paper" : "border-ink/[0.08] bg-paper/85 text-ink shadow-pildora",
            )}
          >
            <Logo
              tone={noche ? "light" : "dark"}
              className="inline-flex min-h-11 items-center text-[2rem] lg:text-[2.25rem]"
              onClick={() => setOpen(false)}
            />

            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
              {disparador("producto", "Producto")}
              {disparador("rubros", "Rubros")}
              {navPrincipal.map((item) =>
                item.externo ? (
                  <a key={item.href} href={item.href} className={linkNav}>
                    {item.label} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} className={linkNav}>
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="ml-auto flex items-center gap-1.5">
              <a href={ingresar.href} className={cn(linkNav, "hidden font-semibold xl:block")}>
                {ingresar.label}
              </a>
              <Button
                href={cta.secondary.href}
                variant={noche ? "claro" : "secondary"}
                size="sm"
                className="hidden lg:inline-flex"
              >
                <IconoBolsa size={16} />
                {cta.secondary.label}
              </Button>
              <Button
                href={cta.primary.href}
                variant={noche ? "oro" : "primary"}
                size="md"
                className="shadow-none lg:min-h-10 lg:px-4 lg:text-sm"
              >
                <IconoCelular size={16} />
                Probá gratis
              </Button>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                className={cn(
                  "flex size-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden",
                  noche ? "hover:bg-paper/10" : "hover:bg-ink/[0.05]",
                )}
              >
                <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
                  {open ? (
                    <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  ) : (
                    <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            </div>

            {/* Paneles de desktop: cuelgan de la píldora. */}
            {panel && (
              <div
                id={`menu-${panel}`}
                onMouseEnter={() => abrir(panel)}
                onMouseLeave={cerrar}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) cerrar();
                }}
                className={cn("absolute left-0 top-full z-10 hidden pt-2.5 lg:block", paneles[panel].ancho)}
              >
                <div
                  key={panel}
                  className="ft-entra rounded-[1.75rem] border border-ink/[0.08] bg-paper p-4 text-ink shadow-[var(--shadow-float)]"
                >
                  {paneles[panel].contenido}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Menú mobile: pantalla completa, oscuro. Va fuera del header para que
          `fixed` se mida contra la pantalla. */}
      {open && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          data-tono="noche"
          className="ft-menu-fondo noche grano fixed inset-0 z-[45] overflow-y-auto overscroll-contain lg:hidden"
        >
          <div className="mx-auto max-w-[560px] px-6 pb-12 pt-[136px]">
            <nav aria-label="Principal móvil" className="flex flex-col">
              {linksMovil.map((item, i) => {
                const clase =
                  "ft-menu-item flex min-h-[60px] items-center justify-between border-b border-paper/10 font-display text-[1.75rem] font-bold tracking-[-0.04em]";
                const estilo = { "--i": i } as React.CSSProperties;
                return item.externo ? (
                  <a key={item.href} href={item.href} className={clase} style={estilo}>
                    {item.label}
                    <span aria-hidden="true" className="text-xl text-gold">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={clase} style={estilo}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="ft-menu-item mt-8" style={{ "--i": linksMovil.length } as React.CSSProperties}>
              <p className="eyebrow-noche">Producto</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {menuProducto.grupos
                  .flatMap((g) => g.items)
                  .map((f) => (
                    <li key={f.href}>
                      <Link
                        href={f.href}
                        onClick={() => setOpen(false)}
                        className="vidrio-claro flex min-h-[52px] items-center gap-2.5 rounded-2xl px-3.5 py-2.5 text-[0.9375rem] font-semibold leading-tight"
                      >
                        <Glifo id={f.glifo} size={18} className="shrink-0 text-gold" />
                        {f.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="ft-menu-item mt-7" style={{ "--i": linksMovil.length + 1 } as React.CSSProperties}>
              <p className="eyebrow-noche">Para tu rubro</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {menuRubros.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={() => setOpen(false)}
                      className="vidrio-claro flex min-h-[52px] items-center gap-2.5 rounded-2xl px-4 py-2.5 text-[0.9375rem] font-semibold leading-tight"
                    >
                      <Glifo id={r.glifo} size={18} className="shrink-0 text-gold" />
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-menu-item mt-9 flex flex-col gap-3" style={{ "--i": linksMovil.length + 2 } as React.CSSProperties}>
              <Button href={cta.primary.href} variant="oro" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="claro" size="lg">
                {cta.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
