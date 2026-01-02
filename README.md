# Alex Anime List 🎌

Aplicación SSR con Nuxt 3 + Vue 3 para explorar animes usando la API pública Jikan.

## 📦 Stack

- **Nuxt 3** - SSR & auto-routing
- **Vue 3** - Composables & reactivity
- **TypeScript** - Strict mode
- **Tailwind CSS** - Styling
- **Vitest** - Testing

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
pnpm install

# Desarrollo (localhost:3000)
pnpm dev

# Tests
pnpm test

# Build producción
pnpm build

# Preview local
pnpm preview
```

## 📋 Estructura de Carpetas

```
.
├── pages/            → Rutas (/ y /anime/[id]) - SSR automático
├── components/       → Componentes reutilizables (Card, Pagination, Modal)
├── server/api/       → Endpoints backend (cache en memoria + headers HTTP)
├── types/            → Interfaces TypeScript (Anime, Episode, Pagination)
├── composables/      → Lógica compartida (useApiError)
├── layouts/          → Layout principal
├── assets/           → CSS global
└── tests/            → Tests unitarios (Vitest + Vue Test Utils)
```

**Por qué esta estructura:**
- `pages` + `server/api` = SSR automático (HTML inicial con datos)
- `components` + `composables` = Vue patterns modernos
- `types` = Type-safety en modo strict
- `server` separado = API routes isomórficas

## 🏗️ Decisiones de Arquitectura

### SSR (Server-Side Rendering)
**Por qué:** El cliente recibe HTML + contenido renderizado = mejor SEO, LCP, y experiencia inicial. La API Jikan se consume en servidor.

**Implementación:**
- `pages/index.vue` hace `useFetch()` en setup → Nuxt corre en servidor
- `server/api/anime.get.ts` proxea Jikan API + cachea respuesta 1h
- Headers `Cache-Control` permiten CDN cachear

### Paginación en lugar de Infinite Scroll
**Por qué:** Jikan API limita a 30 requests/min. Paginación tradicional es más eficiente y mejor UX para mobile.

### API Routes internas (`/server/api/`)
**Por qué:**
- Evita CORS issues
- Cachea respuestas en memoria
- Control granular de headers
- Abstracción si cambiamos de API

### Tipado TypeScript Strict
**Por qué:** Detecta errores en tiempo de build (no en producción). Refactorings más seguros.

### Imágenes Optimizadas (NuxtImg)
**Por qué:** 
- Lazy loading automático
- WebP con fallback JPEG
- Responsive srcset
- Evita layout shift (width/height)

## 🧪 Tests

3 archivos de tests cubriendo:

```bash
# Ejecutar todos
pnpm test

# Con UI
pnpm test:ui

# Coverage
pnpm test:coverage
```

**Cubierto:**
- `AnimeCard.test.ts` → Renderizado + props
- `Pagination.test.ts` → Estados y deshabilitación
- `animeClient.test.ts` → API mock y estructura

## 🌍 Deploy a Producción

### Vercel

**URL de Producción:** 
https://alex-anime-list.vercel.app/

---

## 🔍 Endpoints de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `GET /api/anime?page=1` | Listado paginado (24 animes/página) |
| `GET /api/anime/:id` | Anime + episodios |
| `GET /api/anime/:id/episode/:ep` | Detalle de episodio |

## 📊 Performance

- **Cache servidor:** 1 hora (animes no cambian frecuente)
- **Cache HTTP:** Navegadores + CDN cachean 1h, pueden servir stale 24h
- **Imágenes:** WebP lazy-loaded + responsive
- **Bundle:** Tree-shaked por Nuxt

## ⚙️ Configuración

Archivo clave: `nuxt.config.ts`

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/image', '@nuxtjs/tailwindcss'],
  routeRules: {
    '/api/anime/**': { cache: { maxAge: 60 * 60 } }, // Cache 1h
  }
})
```

## 📝 Comandos Útiles

```bash
# Lint + format
pnpm lint:fix
pnpm format

# Development con debugging
pnpm dev --host

# Build y preview
pnpm build && pnpm preview
```

## 🐛 Troubleshooting

**Tests fallan con "useRouter not defined"**
→ Ya solucionado en `tests/setup.ts` (mock global)

**Rate limit de Jikan API**
→ API tiene 30 req/min. Cache de 1h mitiga esto.

