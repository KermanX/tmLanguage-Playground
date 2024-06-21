import TransformerDirectives from '@unocss/transformer-directives'

export default defineNuxtConfig({
  app: {
    baseURL: process.env.BASE_URL || '/',
  },
  modules: [
    "nuxt-shiki",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    '@unocss/nuxt',
    "@nuxtjs/color-mode",
    "nuxt-monaco-editor",
    'floating-vue/nuxt',
  ],
  ssr: false,
  unocss: {
    attributify: true,
    icons: true,
    shortcuts: {
      'border-base': 'border-gray:30',
      'bg-active': 'bg-gray:10',
      'text-faded': 'text-gray',
      'text-primary': 'text-orange:500',
    },
    transformers: [
      TransformerDirectives(),
    ],
    theme: {
      fontFamily: {
        mono: 'Consola,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
      },
    }
  },
  css: [
    '@unocss/reset/tailwind.css',
  ],
  colorMode: {
    classSuffix: '',
  },
})
