"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Promo } from "@/content/promos";

/**
 * La promo que el server decidió mostrar, apagada del lado del navegador en
 * cuanto el reloj del visitante pasa `hasta`.
 *
 * Existe por la hora de gracia del ISR (`revalidate` en `app/layout.tsx`): la
 * página cacheada puede seguir diciendo "50% OFF" hasta una hora después del
 * cierre. Con esto, el que entra a las 00:10 del jueves no ve la promo aunque
 * el HTML que le llegó todavía la tenga.
 *
 * `useSyncExternalStore` y no `useState` + `useEffect`: el snapshot de
 * servidor es "no venció", así que la hidratación coincide con el HTML y
 * recién después se corrige si hace falta. Sin estado que setear en un efecto.
 */
export function usePromoVigente(promo: Promo | null): Promo | null {
  const fin = promo ? Date.parse(promo.hasta) : 0;

  const subscribe = useCallback(
    (onChange: () => void) => {
      const restante = fin - Date.now();
      if (restante <= 0) return () => {};
      // setTimeout tolera hasta ~24,8 días; una promo dura unos pocos.
      const t = window.setTimeout(onChange, Math.min(restante, 2 ** 31 - 1));
      return () => window.clearTimeout(t);
    },
    [fin],
  );

  const vencida = useSyncExternalStore(
    subscribe,
    () => Date.now() >= fin,
    () => false,
  );

  return promo && !vencida ? promo : null;
}
