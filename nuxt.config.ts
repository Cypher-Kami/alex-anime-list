export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/tailwindcss'],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        'data-theme': 'light'
      }
    }
  }
})