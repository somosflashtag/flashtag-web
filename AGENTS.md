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
Las fotos de `public/fotos/` son **ilustrativas**: escenas de rubro
generadas para el sitio, sin marcas ni carteles a la vista. Se listan en
`content/fotos.ts`. No retratan clientes y nunca acompañan un
testimonio, un nombre de comercio ni una cifra. La foto de un cliente real
va en `public/locales/` y solo con su autorización (`casos.ts`).

**5. La app se muestra en código, no en capturas.** Las pantallas de
my.flashtag.tech viven en `src/components/app/mocks.tsx` (una por sección:
inicio, QR, links, reseñas, métricas, fidelidad, ruleta, píxeles) dentro de
`PhoneFrame`. Las del panel de escritorio (pantallas de los pilares de la
home y el teléfono de cada rubro, en `/para/<rubro>` y en las pestañas de
rubros de la home) viven en
`src/components/app/panel.tsx`. Se construyen con tokens y sin JS: el
componente cliente que las envuelve solo elige cuál se ve. Si la app cambia una
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
**Antes de vender una funcionalidad, se verifica que esté abierta a
clientes.** En la app, un módulo puede existir en el código y estar detrás de
un feature flag (tabla `feature_flags`: `admins`, `planes` con plan mínimo, o
`todos`). Solo se publica lo que está en `todos` o en `planes`, y con el plan
mínimo real. Estado al 26/11/2026: Posición en Maps (`seo_local`, desde
Starter), Ficha de Google (`ficha_completa`, todos) y FlashCard
(`flashcard_enabled`, todos) tienen página propia. **No se venden** hasta que
se abran: los cobros con Mercado Pago (`mercadopago_integracion`, solo
administradores) y «eliminar reseñas» (en la app es una pantalla de
demostración). La carta digital se abrió solo para Evolution y todavía no
tiene página.

**El mapa de comercios** (`components/MapaComercios.tsx`) es un iframe de la
app (`my.flashtag.tech/mapa?embed=1`): los puntos y las cifras salen de allá y
se actualizan solos, así que acá no se escribe ningún número. Está en la home
(dentro de casos), en `/casos#mapa` y como botón al pie de cada rubro. Va solo
sobre papel o arena (no tiene versión oscura) y se carga recién al acercarse
(`MapaMarco`). La app lo tiene detrás del flag `mapa_comercios`: mientras
esté cerrado, `mapaAbierto()` (`lib/mapa.ts`) da `false` y el sitio no dibuja
ni la sección ni el botón; al abrirlo aparece solo, sin deploy, en 15 a 30 minutos (vence la respuesta
guardada y después se regenera cada página).

**Logos de clientes** (`public/logos/*.webp`): son monocromos en arena, hechos
para fondo violeta. Van siempre sobre `ink`, tal cual vienen: nada de
grayscale, invert ni opacidad para meterlos sobre blanco.

**7. Marcas de terceros solo con autorización.** En el footer
(`MediosDePago.tsx`) Mercado Pago y Stripe usan sus logos oficiales en
blanco (`public/pagos/*.svg`, de los kits que nos pasaron); las tarjetas son
badges tipográficos hasta tener sus kits. No se listan logos ni nombres
de empresas (clientes, integraciones, medios) sin permiso escrito y sin que la
integración exista de verdad en producción.

## Sistema visual — cómo se arma una página

Desde diciembre de 2026 todo el sitio comparte un sistema: titulares enormes
y apretados, bloques que alternan de tono, fotos y maquetas, y cosas que
llegan desenfocadas y se aclaran. Las páginas se arman con las piezas de
`src/components/ui/`; no se inventan variantes por página. El modelo de
terminación es la home (`src/app/page.tsx`).

**Esqueleto de toda `page.tsx`:**

```tsx
<Pagina>                 {/* transición entre páginas */}
  <HeroPagina … />       {/* siempre primero: bloque ink con el único h1 */}
  <Seccion tono="papel">…</Seccion>
  <Seccion tono="lila">…</Seccion>
  <Cierre … />           {/* siempre último: se funde con el footer */}
</Pagina>
```

| Pieza | Para qué |
|---|---|
| `Pagina` | Envuelve el contenido de cada `page.tsx`: lo que se va se desenfoca, lo que llega sube y se aclara (`<ViewTransition>` de React). |
| `Viaja` | Un elemento que viaja entre dos páginas (la foto de un rubro, el logo de un caso). Mismo `nombre` en los dos extremos, único por página. |
| `HeroPagina` | Hero oscuro: `titulo` + `destacado` (gold), `bajada`, botones (`children`), `visual`, `migas` (emite el JSON-LD de migas), `etiqueta`, `compacto`. |
| `Seccion` | Bloque de página. `tono`: `papel` (blanco, ancho completo), `noche` (ink con halos y grano), `arena`, `lila`. Lo que no es papel va redondeado y despegado de los bordes. |
| `Titulo` | Encabezado de sección: h2 `t-mega` que entra desenfocado, con bajada. `claro` sobre `noche`; `alineado="izq"` cuando hay otra columna. |
| `Button` | Siempre píldora. Sobre claro: `primary` (el CTA), `secondary`, `ghost`. Sobre oscuro: `oro` (el CTA), `claro`, `blanco`. Un solo CTA principal por bloque. |
| `Cierre` | Último bloque: titular gigante (`titular` + `destacado`), bajada y los dos CTAs del sitio. Cada página puede pasar su texto. |
| `Confeti` | Cuadraditos de marca que flotan. Solo en hero y cierre. |

**Cómo se compone:**

- **Ritmo.** Alternar tonos. Nunca dos `noche` seguidos ni dos bloques del
  mismo tono seguidos. Una idea por sección; entre 4 y 7 secciones por página.
- **Titulares.** `t-hero` (el h1, lo pone `HeroPagina`), `t-mega` (h2),
  `t-giga` (cierre). Cortos. Como mucho una parte resaltada: `text-gold` sobre
  oscuro, `text-brand` sobre claro.
- **Movimiento.** Lo que entra al scrollear lleva `data-reveal`: `"blur"` en
  titulares y párrafos, sin valor en tarjetas, `"zoom"` en piezas grandes;
  se escalona con `--reveal-delay`. Curva `ease-fluida`, 500 a 900 ms. Las
  clases del kit ya contemplan `prefers-reduced-motion`.
- **Tarjetas.** Radio `rounded-[2rem]` (las chicas, `1.5rem`), sin bordes
  finos grises. Tres recetas: de color (`paso-brand|coral|teal|gold`,
  `dato-brand|coral|teal`, texto blanco); de foto (imagen `fill object-cover`
  + `<span className="velo absolute inset-0" />` + texto blanco abajo); clara
  (`bg-paper` sobre un bloque lila o arena, `bg-brand-soft/70` sobre papel).
- **Chips.** `eyebrow` sobre claro, `eyebrow-noche` sobre oscuro, `vidrio` y
  `vidrio-claro` sobre foto o sobre oscuro.
- **Fotos.** Solo las de `content/fotos.ts` (§4), con `foto-a`, `foto-b` o
  `foto-c` para la esquina orgánica.
- **La app.** Maquetas de `components/app/` (§5). Sobre un bloque oscuro, el
  contenedor de la maqueta lleva `text-ink`.
- **Mobile.** Las listas de tarjetas se deslizan (`carrusel`), los CTAs van
  a todo el ancho y nada baja de 44px de alto.
- **Header.** Es una píldora flotante que mide cero de alto y lee `data-tono`
  del bloque que tiene debajo (lo ponen las piezas del kit). Un bloque oscuro
  armado a mano lleva `data-tono="noche"`.
- **Lienzo.** El fondo de `html` es `ink` y el blanco lo pone el `body`. Es lo
  que aparece cuando el celular o el trackpad estiran la página más allá del
  principio o del final: así el rebote continúa el hero y el footer, que son
  oscuros. Por eso toda página arranca con un hero oscuro y termina en `Cierre`.
- **Estilos.** Utilidades de Tailwind y clases del kit (`globals.css`, desde
  «HOME FLUIDA»). No se agrega CSS por página.
- **Fuera de uso:** `ui/Section`, `.t-display`, `.t-h2`, `.hero-halo`,
  `.cta-final`, `.text-glow`, `.text-glow-warm`. No usarlos en código nuevo.

## Accesibilidad — piso, no aspiración

- Contraste AA (4.5:1 texto normal, 3:1 texto grande). Verificar al cambiar color.
- Un solo `<h1>` por página.
- Tap targets de 44px mínimo en phone.
- `:focus-visible` siempre visible.
- Respetar `prefers-reduced-motion`.
- Cero scroll horizontal a 390px de ancho.

## Pendientes

- [ ] `site.proof.locales` — número real de comercios
- [ ] Cobros con Mercado Pago: volver a sumarlos al sitio (pilar de FlashCard
      en `home.ts`, setup de retail en `rubros.ts`, `fidelidad.ts`) cuando el
      flag `mercadopago_integracion` se abra a clientes
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
