"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { cta } from "@/lib/site";

/**
 * Barra CTA fija inferior en phone, aparece después del 40% de scroll.
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
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-xl transition-transform duration-200 ease-[var(--ease-ft)] lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex gap-2.5 px-6 py-3">
        <Button href={cta.primary.href} variant="primary" size="md" className="flex-1">
          Probá gratis
        </Button>
        <Button href={cta.secondary.href} variant="secondary" size="md" className="flex-1">
          Comprá tu cartel
        </Button>
      </div>
    </div>
  );
}
