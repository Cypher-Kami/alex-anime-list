export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2026-01-02',
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Alex Anime List',
      htmlAttrs: {
        lang: 'en',
        'data-theme': 'light',
      },
      meta: [
        { name: 'robots', content: 'index, follow' },
        { name: 'description',
        content:
          'Browse anime titles, episodes, ratings and detailed information using the Jikan API.',
        },
        ],
    },
  },

  routeRules: {
    '/api/anime/**': {
      cache: {
        maxAge: 60 * 60, 
        staleMaxAge: 60 * 5, 
      },
    },
  },

  image: {
    provider: 'auto',
    format: ['webp', 'jpeg'],
    presets: {
      animeCard: {
        modifiers: {
          width: 400,
          quality: 80,
        },
      },
      hero: {
        modifiers: {
          width: 1200,
          quality: 85,
        },
      },
    },
  },
})
