"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { cta } from "@/lib/site";

/**
 * Barra CTA flotante en phone: una píldora oscura que aparece después del
 * 40% de scroll. Mientras no se ve, queda `inert` (no recibe foco).
 * Brief 5.2.10: suele subir conversión mobile entre 15 y 30%.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(max > 0 && window.scrollY / max > 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-2.5 bottom-2.5 z-40 transition-[translate,opacity] duration-500 ease-fluida lg:hidden ${
        visible ? "translate-y-0 opacity-100" : "translate-y-[140%] opacity-0"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-1.5 rounded-full border border-paper/15 bg-ink/85 p-1.5 shadow-[var(--shadow-device)] backdrop-blur-xl">
        <Button href={cta.primary.href} variant="oro" size="md" className="flex-1 px-3 shadow-none">
          Probá gratis
        </Button>
        <Button href={cta.secondary.href} variant="claro" size="md" className="flex-1 border-transparent px-3">
          Comprá tu cartel
        </Button>
      </div>
    </div>
  );
}
