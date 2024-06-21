import TransformerDirectives from '@unocss/transformer-directives'

const baseURL = process.env.BASE_URL || '/'

export default defineNuxtConfig({
  app: {
    baseURL,
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: `${baseURL}favicon.ico` }]
    },
  },
  modules: [
    "nuxt-shiki",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    '@unocss/nuxt',
    "@nuxtjs/color-mode",
    "nuxt-monaco-editor",
    'floating-vue/nuxt',
    '@pinia/nuxt',
  ],
  nitro: {
    baseURL,
    prerender: {
      crawlLinks: false,
      failOnError: false,
    },
  },
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