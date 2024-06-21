<script setup lang="ts">
import type { Grammar } from '~/types'

const grammar = defineModel<Grammar>({ required: true })
const colorMode = useColorMode()
const tokenizer = ref<Awaited<ReturnType<typeof getTokenizer>> | null>(null)

watchEffect((onCleanup) => {
  const timer = setTimeout(() => {
    tokenizer.value = null
  }, 1000)
  let cancelled = false
  onCleanup(() => {
    cancelled = true
    clearTimeout(timer)
  })
  const g = grammar.value
  if (g.code.value) {
    getTokenizer(g, colorMode.value === 'dark').then((t) => {
      if (cancelled)
        return
      clearTimeout(timer)
      tokenizer.value = t
    })
  }
})

const exampleCode = ref(
  'import { defineComponent } from "vue";\n'
)

const tokens = computed(() => tokenizer.value?.(exampleCode.value))
</script>

<template>
  <div border="~ base rounded">
    <component :is="'pre'" v-if="tokens" class="shiki p-4 font-mono">
      <template v-for="line, i in tokens" :key="i">
        <br v-if="i !== 0">
        <RenderToken v-for="token, j in line" :key="j" :token />
      </template>
    </component>
  </div>
</template>
