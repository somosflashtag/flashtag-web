# FlashTag — sitio público

Next.js 16 (App Router, Turbopack) + Tailwind v4. Español rioplatense (`es-AR`),
voseo. Deploy en Vercel: cada push a `main` publica.

```bash
npm run dev     # localhost:3000
npm run build   # obligatorio antes de pushear
```

## Reglas innegociables

**1. El logo no se toca.** Ni los colores, ni el espaciado, ni la tipografía,
ni las proporciones. No se le agregan contornos, sombras, degradados ni
rotaciones (prohibiciones explícitas del Manual de Marca, p. 9). Si hace falta
una variante que no existe, se pide — no se improvisa.
El único archivo que lo define es `src/components/ui/Logo.tsx`: los vectores
del `LogoFlashTag.eps` original, con sus dos colores propios (`#25164b` y
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
inicio, QR, links, reseñas, métricas, fidelidad, ruleta) dentro de
`PhoneFrame`. Se construyen con tokens y sin JS. Si la app cambia una
pantalla, se cambia la maqueta; nunca se sube un PNG que envejece.
El comercio de las maquetas ("Café Rivas") es ficticio: es demo, no prueba
social.

**6. Fidelidad y ruleta son features publicadas.** Se venden como el resto:
página propia en `/producto/`, lugar en el bento y el tour, plan en
`planes.ts`. Nada de "próximamente" en el sitio.

**7. Marcas de terceros solo con autorización.** Los medios de pago del
footer (`MediosDePago.tsx`) son badges tipográficos, no los logos oficiales.
 No se listan logos ni nombres
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

- [ ] Favicon oficial (hoy `src/app/icon.svg` usa el marcador QR del sistema)
- [ ] `site.proof.locales` — número real de comercios
- [ ] Confirmar TikTok en `site.social` (hoy usa "somosflashtag"; YouTube ya es `@Somos_FlashTag`)
- [ ] Logos oficiales de Stripe y Mercado Pago → `MediosDePago.tsx`
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
