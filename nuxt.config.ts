// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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



