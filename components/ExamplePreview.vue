<script setup lang="ts">
import { hideAllPoppers } from 'floating-vue';

const grammarsStore = useGrammarsStore()
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
  const g = grammarsStore.active
  if (g.code) {
    getTokenizer(g, colorMode.value === 'dark').then((t) => {
      if (cancelled)
        return
      clearTimeout(timer)
      tokenizer.value = t
    })
  }
})

const editing = ref(false)
const exampleCode = ref(
  'import { defineComponent } from "vue";\n'
)

const tokens = computed(() => tokenizer.value?.(exampleCode.value))

const vFocus = {
  mounted(el: HTMLElement) {
    if (editing.value)
      el.focus()
  },
}

watch(editing, () => {
  hideAllPoppers()
})
</script>

<template>
  <div relative border="~ base rounded" class="group">
    <template v-if="Array.isArray(tokens)">
      <component :is="'pre'" class="shiki p-4 font-mono absolute inset-0">
        <template v-for="line, i in tokens" :key="i">
          <br v-if="i !== 0">
          <RenderToken v-for="token, j in line" :key="j" :token />
        </template>
      </component>
      <textarea
v-if="editing" v-model="exampleCode" v-focus
        class="p-4 font-mono absolute inset-0 text-transparent bg-transparent caret-white !outline-none b-2 b-gray rounded" 
        @blur="editing = false"
        />
    </template>
    <div v-else-if="!tokens" class="p-4 text-center text-faded">loading...</div>
    <div v-else class="p-4 text-center text-red"> {{ tokens }} </div>
    <button v-if="editing" absolute right-2 top-2 p-2 text-xl class="hover:bg-gray/15" rounded-lg @click="editing = false">
      <div text-transparent group-hover:text-white op80 i-carbon-checkmark />
    </button>
    <button v-else absolute right-2 top-2 p-2 text-xl class="hover:bg-gray/15" rounded-lg @click="editing = true" >
      <div text-transparent group-hover:text-white op80 i-carbon-edit />
    </button>
  </div>
</template>
