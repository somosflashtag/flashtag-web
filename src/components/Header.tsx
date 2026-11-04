"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { Glifo } from "./ui/Glifo";
import { QRMark } from "./ui/QRMark";
import { IconoBolsa, IconoCelular } from "./ui/Iconos";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./ui/Logo";
import { PromoBanner } from "./PromoBanner";
import { ingresar, menuProducto, menuRubros, navPrincipal } from "@/lib/nav";
import type { Promo } from "@/content/promos";

/**
 * Header con dos desplegables: "Producto" (las páginas de producto agrupadas
 * por objetivo, como los pilares de la home) y "Rubros".
 * Desktop: cada uno abre con hover, clic o foco y se cierra con Escape.
 * Phone: menú a pantalla completa con todo agrupado.
 *
 * `promo`: la promo vigente (`promoVigente()` en el layout, que es server).
 * Si hay una, la barra `PromoBanner` va arriba de la fila del logo, adentro
 * del sticky. Por eso el menú mobile se posiciona contra el header (`top-full`
 * y alto `100dvh - 100%`) y no contra el viewport con un `top-16` fijo: la
 * altura del header ya no es constante.
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
      className={cn("transition-transform duration-200", abierto && "rotate-180")}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const linkNav =
  "rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-muted transition-colors duration-[120ms] hover:bg-surface/60 hover:text-ink";

export function Header({ promo = null }: { promo?: Promo | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
    closeTimer.current = window.setTimeout(() => setPanel(null), 120);
  };

  /** Botón + panel de un desplegable de desktop. */
  const desplegable = (id: Panel, label: string, ancho: string, children: React.ReactNode) => (
    <div key={id} className="relative" onMouseEnter={() => abrir(id)} onMouseLeave={cerrar}>
      <button
        type="button"
        aria-expanded={panel === id}
        aria-controls={`menu-${id}`}
        onClick={() => setPanel((v) => (v === id ? null : id))}
        onFocus={() => abrir(id)}
        className={cn(linkNav, "flex items-center gap-1.5", panel === id && "text-ink")}
      >
        {label}
        <Chevron abierto={panel === id} />
      </button>
      {panel === id && (
        <div
          id={`menu-${id}`}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) cerrar();
          }}
          className={cn("absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3", ancho)}
        >
          <div className="ft-rise overflow-hidden rounded-[18px] border border-line bg-paper p-4 shadow-[var(--shadow-float)]">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  const itemMenu =
    "group flex gap-3 rounded-xl p-2.5 transition-colors duration-[120ms] hover:bg-surface/60";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-200",
        scrolled || panel
          ? "border-line bg-paper/85 backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <PromoBanner promo={promo} />
      <Container>
        <div className="flex h-16 items-center gap-4 lg:h-[72px] lg:gap-7">
          <Logo className="text-[2.125rem] lg:text-[2.375rem]" onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {desplegable(
              "producto",
              "Producto",
              "left-0 w-[780px] translate-x-0",
              <>
              <div className="grid grid-cols-3 gap-1">
                {menuProducto.grupos.map((g) => (
                  <div key={g.titulo}>
                    <p className="px-2.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                      {g.titulo}
                    </p>
                    <ul>
                      {g.items.map((f) => (
                        <li key={f.href}>
                          <Link href={f.href} onClick={() => setPanel(null)} className={itemMenu}>
                            <span className="mt-0.5 flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-brand-soft">
                              <QRMark size={13} />
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
              <div className="mt-3 flex gap-4 border-t border-line px-2.5 pt-3 text-sm font-semibold">
                {menuProducto.extra.map((x) => (
                  <Link key={x.href} href={x.href} onClick={() => setPanel(null)} className="text-brand underline-offset-4 hover:underline">
                    {x.label}
                  </Link>
                ))}
              </div>
              </>,
            )}

            {desplegable(
              "rubros",
              "Rubros",
              "left-0 w-[520px] translate-x-0",
              <ul className="grid grid-cols-2 gap-1">
                {menuRubros.map((r) => (
                  <li key={r.href}>
                    <Link href={r.href} onClick={() => setPanel(null)} className={itemMenu}>
                      <span className="mt-0.5 flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-brand-soft text-brand">
                        <Glifo id={r.glifo} size={16} />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-ink">{r.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-muted">{r.descripcion}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>,
            )}

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

          <div className="ml-auto flex items-center gap-2">
            <a
              href={ingresar.href}
              className="hidden px-2 py-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:text-brand xl:block"
            >
              {ingresar.label}
            </a>
            <Button href={cta.secondary.href} variant="secondary" size="sm" className="hidden lg:inline-flex">
              <IconoBolsa size={16} />
              {cta.secondary.label}
            </Button>
            <Button href={cta.primary.href} variant="primary" size="sm">
              <IconoCelular size={16} />
              Probá gratis
            </Button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="-mr-2 flex size-11 items-center justify-center rounded-[var(--radius-btn)] lg:hidden"
            >
              <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
                {open ? (
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                ) : (
                  <path d="M3 6h14M3 13h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Menú mobile a pantalla completa */}
      {open && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container>
            {menuProducto.grupos.map((g) => (
              <div key={g.titulo}>
                <p className="t-caption pt-6 uppercase tracking-wide text-muted">{g.titulo}</p>
                <ul className="mt-2 grid grid-cols-2 gap-2">
                  {g.items.map((f) => (
                    <li key={f.href}>
                      <Link
                        href={f.href}
                        onClick={() => setOpen(false)}
                        className="flex min-h-[56px] items-center rounded-[var(--radius-card)] border border-line px-4 py-3 text-[0.9375rem] font-semibold leading-tight"
                      >
                        {f.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="t-caption pt-6 uppercase tracking-wide text-muted">Para tu rubro</p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {menuRubros.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[56px] items-center gap-2.5 rounded-[var(--radius-card)] border border-line px-4 py-3 text-[0.9375rem] font-semibold leading-tight"
                  >
                    <Glifo id={r.glifo} size={18} className="text-brand" />
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
            <nav className="mt-4 flex flex-col" aria-label="Principal móvil">
              {[...menuProducto.extra, ...navPrincipal, ingresar].map((item) =>
                item.externo ? (
                  <a
                    key={item.href}
                    href={item.href}
                    className="border-b border-line py-4 text-xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line py-4 text-xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="flex flex-col gap-3 py-8">
              <Button href={cta.primary.href} variant="primary" size="lg" arrow>
                {cta.primary.label}
              </Button>
              <Button href={cta.secondary.href} variant="secondary" size="lg">
                {cta.secondary.label}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
