"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";
import { cta } from "@/lib/site";
import { cn } from "@/lib/cn";

const nav = [
  { label: "Producto", href: "/#producto" },
  { label: "Cómo funciona", href: "/como-funciona" },
  { label: "Precios", href: "/precios" },
  { label: "Casos", href: "/casos" },
  { label: "Blog", href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,border-color] duration-200",
        scrolled
          ? "border-line bg-paper/85 backdrop-blur-xl"
          : "border-transparent bg-paper",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link
            href="/"
            className="text-[1.0625rem] font-bold tracking-tight"
            onClick={() => setOpen(false)}
          >
            FlashTag
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.9375rem] font-medium text-muted transition-colors duration-[120ms] hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button href={cta.secondary.href} variant="ghost" size="sm" className="hidden lg:inline-flex">
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

      {/* Menú mobile a pantalla completa, no dropdown chiquito */}
      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper lg:hidden"
        >
          <Container>
            <nav className="flex flex-col py-4" aria-label="Principal móvil">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-3 pb-10">
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
