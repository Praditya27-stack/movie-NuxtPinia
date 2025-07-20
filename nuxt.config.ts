import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    public: {
      omdbApiKey: '7feff413',
    }
  },
  nitro: {
    compatibilityDate: '2025-07-20'
  }
})