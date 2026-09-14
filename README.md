# FlashTag — Sitio institucional

Next.js 16 · React 19 · Tailwind v4 · TypeScript. Deploy en Vercel.

## Desarrollo

```bash
npm install
npm run dev
```

## Estructura

| Ruta | Qué hay |
|---|---|
| `src/lib/site.ts` | Config global: dominios, CTAs, prueba social |
| `src/content/planes.ts` | **Fuente única de precios.** Toda página que muestre precios lee de acá |
| `src/content/features.ts` | Features del producto y pasos de onboarding |
| `src/content/faq.ts` | FAQ, con flag de en qué página se muestra cada una |
| `src/lib/seo.ts` | Helpers de metadata y JSON-LD |
| `src/components/ui/` | Design system: Button, Container, Section, QRMark |

## Reglas del proyecto

- **Un solo H1 por página.**
- **Cero placeholders en producción.** Si no hay contenido, no hay slot.
- **`site.proof.locales`**: mientras sea `null`, no se muestra prueba social. Es
  preferible no mostrar nada a mostrar tres números distintos.
- **El primario se cambia en un solo lugar**: `--color-brand` en `globals.css`.
