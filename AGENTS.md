# FlashTag — sitio público

Next.js 16 (App Router, Turbopack) + Tailwind v4. Español rioplatense (`es-AR`),
voseo. Deploy en Vercel: cada push a `main` publica.

```bash
npm run dev     # localhost:3000
npm run build   # obligatorio antes de pushear
```

## Cómo entra el trabajo — rama y pull request

`main` publica. Por eso acá **el trabajo entra por rama y PR**, nunca directo
a `main` (decisión de Tomás, 21/09/2026).

- Una rama por tarea (`claude/lo-que-sea`), PR contra `main`.
- Vercel deja un **preview en cada PR**: ese link es la revisión. Mirar la
  página que se tocó y, si se movió copy compartido, también la home y el FAQ.
- `npm run build` local antes de pushear igual. El preview no lo reemplaza:
  llega tarde y cuesta un ciclo.
- ~~**El merge lo decide Tomás.** Un PR verde no se mergea solo.~~
  `@deprecated 2026-09-21: Tomás pidió "siempre mergeá". La sesión que abre
  el PR lo mergea ella misma en cuanto el preview está READY y el build
  local pasó. El PR sigue existiendo por el preview y por el registro de qué
  cambió y por qué; lo que ya no hay es espera.`
- **La sesión mergea su propio PR** cuando el build local y el preview de
  Vercel están en verde. No se pide confirmación.

No confundir con la app (`flashtag-app`, my.flashtag.tech), que tiene la regla
opuesta escrita en su `CLAUDE.md`: ahí **todo va directo a `main` y no se abren
PRs**. Son dos flujos distintos a propósito. Lo que se publica acá lo lee
alguien que todavía no es cliente, y un error en el sitio público se ve; en la
app, el que lo ve ya compró y el costo de esperar una revisión es más alto que
el de corregir en caliente.

## Reglas innegociables

**1. El logo no se toca.** Ni los colores, ni el espaciado, ni la tipografía,
ni las proporciones. No se le agregan contornos, sombras, degradados ni
rotaciones (prohibiciones explícitas del Manual de Marca, p. 9). Si hace falta
una variante que no existe, se pide — no se improvisa.
El único archivo que lo define es `src/components/ui/Logo.tsx`: los vectores
del `LogoFlashTag.eps` original. El isotipo "ft" (`FT_Violeta.eps`) vive en
`src/app/icon.svg` y `apple-icon.png`, sobre un tile arena, sin tocar los trazos.
Los vectores del wordmark, con sus dos colores propios (`#25164b` y
`#5052a3`, que NO son tokens de UI) y la variante en blanco. Todo el sitio
lo consume desde ahí; `LogoOG.tsx` repite los trazos para las imágenes OG.

**2. Los colores salen del manual, no de la intuición.** Se cambian en
`src/app/globals.css`, en el bloque `@theme`, y en ningún otro lugar. Un hex
hardcodeado en un `.tsx` es un bug.

| Token | Hex | Uso |
|---|---|---|
| `--color-ink` | `#2d014b` | Titulares, superficies oscuras |
| `--color-brand` | `#613ec4` | CTAs, links, foco |
| `--color-surface` | `#efe7d6` | Fondos de sección (arena) |
| `--color-coral` | `#db4f45` | Acento. Nunca texto chico: no llega a 4.5:1 |
| `--color-gold` | `#ffc64a` | Acento (estrellas, destacados) |
| `--color-teal` | `#0094a5` | Acento (datos, métricas) |

Tipografías: **Poppins** (títulos) + **Roboto** (cuerpo).
*La Rose Display* aparece en el manual para títulos creativos pero no está en
Google Fonts — hay que licenciarla antes de usarla.

**3. Un dato, una fuente.** Precios y features salen de `src/content/planes.ts`.
Dominios, CTAs y prueba social, de `src/lib/site.ts`. Si un número aparece
escrito a mano en un componente, es un bug esperando a desincronizarse.

**4. Nada de prueba social inventada.** `site.proof.locales` es `null` hasta
tener el número real, y mientras sea `null` ningún componente lo muestra.
Preferimos no mostrar nada antes que mostrar un número que no podemos sostener.

**5. La app se muestra en código, no en capturas.** Las pantallas de
my.flashtag.tech viven en `src/components/app/mocks.tsx` (una por sección:
inicio, QR, links, reseñas, métricas, fidelidad, ruleta, píxeles) dentro de
`PhoneFrame`. Se construyen con tokens y sin JS. Si la app cambia una
pantalla, se cambia la maqueta; nunca se sube un PNG que envejece.
El comercio de las maquetas ("Café Rivas") es ficticio: es demo, no prueba
social.

**6. Fidelidad, ruleta y píxeles son features publicadas.** Se venden como el
resto: página propia en `/producto/`, lugar en el bento y el tour, plan en
`planes.ts`. Nada de "próximamente" en el sitio.
Los píxeles (`/producto/pixeles`) describen los tres campos que tiene la app
en "Análisis de seguimiento" (GA4, Meta Pixel, GTM) y los eventos que manda.
El copy de `content/pixeles.ts` es la promesa pública: si la app no manda un
evento, no se lista acá.

**7. Marcas de terceros solo con autorización.** En el footer
(`MediosDePago.tsx`) Mercado Pago y Stripe usan sus logos oficiales en
blanco (`public/pagos/*.svg`, de los kits que nos pasaron); las tarjetas son
badges tipográficos hasta tener sus kits. No se listan logos ni nombres
de empresas (clientes, integraciones, medios) sin permiso escrito y sin que la
integración exista de verdad en producción.

## Accesibilidad — piso, no aspiración

- Contraste AA (4.5:1 texto normal, 3:1 texto grande). Verificar al cambiar color.
- Un solo `<h1>` por página.
- Tap targets de 44px mínimo en phone.
- `:focus-visible` siempre visible.
- Respetar `prefers-reduced-motion`.
- Cero scroll horizontal a 390px de ancho.

## Pendientes

- [ ] `site.proof.locales` — número real de comercios
- [ ] Imagen del QR de Data Fiscal → `site.dataFiscal`
- [ ] Autorización escrita de los comercios → `casos.ts` (`autorizado`)
- [ ] URLs de las notas de prensa → `prensa.ts` (`verificada`)
- [ ] Aval institucional UBA → `cursos.ts` (`avalPendiente`)
- [ ] Sanity Studio (las deps se quitaron hasta montarlo)
- [ ] Alinear las maquetas de `mocks.tsx` con capturas reales de la app
      (secciones, nombres de pestañas, copys de botones)
- [ ] Imágenes OG (`lib/og.tsx`) sin Poppins: Satori necesita el archivo de
      la fuente

## Documentos legales

`/terminos` y `/privacidad` se renderizan desde `src/content/legal/*.md`.
Esos archivos son un **export de la app** (`scripts/extraer-legales.mjs` en
my.flashtag.tech): la fuente de verdad es el TSX de la app, no esta copia.

Para actualizarlos: volver a correr el script allá y pisar el `.md` acá.
No editarlos a mano — Google compara el texto publicado en el dominio del
consent screen contra el de la app, y si difieren puede rechazar la
verificación del scope de Google Business Profile.
