"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { QRMark } from "./ui/QRMark";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "./ui/Logo";
import { menuProducto, navPrincipal } from "@/lib/nav";

/**
 * Header con desplegable de "Aplicación".
 * Desktop: el ítem abre un panel con hover o foco, se cierra con Escape.
 * Phone: menú a pantalla completa con las features agrupadas.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [producto, setProducto] = useState(false);
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
        setProducto(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const abrir = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setProducto(true);
  };
  const cerrar = () => {
    closeTimer.current = window.setTimeout(() => setProducto(false), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-200",
        scrolled || producto
          ? "border-line bg-paper/85 backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo className="text-[2.125rem] lg:text-[2.375rem]" onClick={() => setOpen(false)} />

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {navPrincipal.map((item) =>
              item.label === "Aplicación" ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={abrir}
                  onMouseLeave={cerrar}
                >
                  <button
                    type="button"
                    aria-expanded={producto}
                    aria-controls="menu-producto"
                    onClick={() => setProducto((v) => !v)}
                    onFocus={abrir}
                    className={cn(
                      "flex items-center gap-1.5 text-[0.9375rem] font-medium transition-colors duration-[120ms] hover:text-ink",
                      producto ? "text-ink" : "text-muted",
                    )}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 12 12"
                      width="11"
                      height="11"
                      fill="none"
                      aria-hidden="true"
                      className={cn("transition-transform duration-200", producto && "rotate-180")}
                    >
                      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {producto && (
                    <div
                      id="menu-producto"
                      onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node)) cerrar();
                      }}
                      className="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-4"
                    >
                      <div className="ft-rise grid grid-cols-[1.5fr_1fr] overflow-hidden rounded-[var(--radius-surface)] border border-line bg-paper shadow-[var(--shadow-float)]">
                        <ul className="grid grid-cols-2 gap-1 p-4">
                          {menuProducto.features.map((f) => (
                            <li key={f.href}>
                              <Link
                                href={f.href}
                                onClick={() => setProducto(false)}
                                className="group flex gap-3 rounded-[var(--radius-card)] p-3 transition-colors duration-[120ms] hover:bg-surface"
                              >
                                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft">
                                  <QRMark size={13} />
                                </span>
                                <span>
                                  <span className="block text-[0.9375rem] font-semibold text-ink">
                                    {f.label}
                                  </span>
                                  <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                                    {f.descripcion}
                                  </span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <div className="border-l border-line bg-surface p-5">
                          <p className="t-caption uppercase tracking-wide text-muted">
                            Para tu rubro
                          </p>
                          <ul className="mt-3 space-y-1">
                            {menuProducto.rubros.map((r) => (
                              <li key={r.href}>
                                <Link
                                  href={r.href}
                                  onClick={() => setProducto(false)}
                                  className="block rounded-lg px-2 py-1.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper"
                                >
                                  {r.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <p className="t-caption mt-5 uppercase tracking-wide text-muted">
                            Empezar
                          </p>
                          <ul className="mt-3 space-y-1">
                            {menuProducto.extra.map((x) =>
                              x.externo ? (
                                <li key={x.href}>
                                  <a
                                    href={x.href}
                                    className="block rounded-lg px-2 py-1.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper"
                                  >
                                    {x.label} ↗
                                  </a>
                                </li>
                              ) : (
                                <li key={x.href}>
                                  <Link
                                    href={x.href}
                                    onClick={() => setProducto(false)}
                                    className="block rounded-lg px-2 py-1.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-paper"
                                  >
                                    {x.label}
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : item.externo ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[0.9375rem] font-medium text-muted transition-colors duration-[120ms] hover:text-ink"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.9375rem] font-medium text-muted transition-colors duration-[120ms] hover:text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={cta.secondary.href} variant="secondary" size="sm" className="hidden lg:inline-flex">
              {cta.secondary.label}
            </Button>
            <Button href={cta.primary.href} variant="primary" size="sm">
              <span className="lg:hidden">Probá gratis</span>
              <span className="hidden lg:inline">{cta.primary.label}</span>
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
          className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container>
            <p className="t-caption pt-6 uppercase tracking-wide text-muted">Aplicación</p>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {menuProducto.features.map((f) => (
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
            <nav className="mt-4 flex flex-col" aria-label="Principal móvil">
              {[
                { label: "Cómo funciona", href: "/como-funciona" },
                ...navPrincipal.filter((i) => i.label !== "Aplicación"),
              ].map((item) =>
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
