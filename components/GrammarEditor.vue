<script setup lang="ts">
import type { Grammar } from '~/types'
import { shikiToMonaco } from '@shikijs/monaco'
import { getHighlighter } from 'shiki'

const highlighter = await getHighlighter({
  themes: [
    'vitesse-dark',
    'vitesse-light',
  ],
  langs: [
    'json',
  ],
})

const monaco = useMonaco()
shikiToMonaco(highlighter, monaco)

const grammar = defineModel<Grammar>({ required: true })
const codeValue = ref('loading...')
let codeRef: Ref<string | null> | null = null
const code = computed({
  get: () => codeValue.value,
  set: (v: string) => {
    codeValue.value = v
    if (codeRef)
      codeRef.value = v
  }
})

watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    codeValue.value = 'loading...'
  }, 1000)
  let cancelled = false
  onCleanup(() => {
    cancelled = true
    clearTimeout(timer)
  })
  const g = grammar.value
  g.load().then((c) => {
    if (cancelled)
      return
    clearTimeout(timer)
    codeValue.value = c
    codeRef = g.code
  })
})
</script>

<template>
  <div relative border="~ base rounded">
    <MonacoEditor
v-model="code" h-full lang="json" :options="{
      minimap: { enabled: false },
      fontSize: 16,
    }" />
  </div>
</template>
