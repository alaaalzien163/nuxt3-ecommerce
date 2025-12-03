// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // إضافة Bootstrap CSS
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '~/assets/css/main.css'
  ],
  
  // إضافة Modules
  modules: ['@pinia/nuxt'],
  
  // إضافة Plugins هنا
  plugins: [
    '~/plugins/bootstrap.client.js'
  ],
  
  // إعدادات التطبيق
  app: {
    head: {
      title: 'Developer Test',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})