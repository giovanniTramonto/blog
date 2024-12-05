// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Posts',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
  ],
  runtimeConfig: {
    public: {
      apiBase: 'https://jsonplaceholder.typicode.com',
    }
  }
})



