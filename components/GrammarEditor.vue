<script setup lang="ts">
import { shikiToMonaco } from '@shikijs/monaco'
import { getHighlighter } from 'shiki'
import tmLanguageSchema from '../assets/tmLanguage.schema.json'
import type { Grammar } from '~/types';

const grammarsStore = useGrammarsStore()

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

watchEffect(() => {
  monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    allowComments: true,
    schemas: [
      {
        uri: "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
        fileMatch: ["*"],
        schema: tmLanguageSchema,
      }
    ]
  })
})

const codeValue = ref('loading...')
let editingGrammar: Grammar | null = null
const code = computed({
  get: () => codeValue.value,
  set: (v: string) => {
    if (codeValue.value === v)
      return
    codeValue.value = v
    if (editingGrammar) {
      if (editingGrammar.isBuiltin) {
        try {
          if (JSON.stringify(JSON.parse(editingGrammar.code!)) === JSON.stringify(JSON.parse(v)))
            return
        } catch {
          // ignore
        }
        const index = grammarsStore.projects.filter(p => p.name.startsWith(`${editingGrammar!.name}_`)).length + 1
        const newGrammar: Grammar = reactive({
          name: `${editingGrammar.name}_${index}`,
          displayName: `${editingGrammar.displayName} ${index}`,
          scopeName: editingGrammar.scopeName,
          code: v,
          load: async () => v,
          isBuiltin: false,
        })
        grammarsStore.projects.push(newGrammar)
        grammarsStore.active = newGrammar
        editingGrammar = newGrammar
      } else {
        editingGrammar.code = v
      }
    }
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
  const g = grammarsStore.active
  g.load().then((c) => {
    if (cancelled)
      return
    clearTimeout(timer)
    codeValue.value = c
    editingGrammar = g
  })
})

const download = () => {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([code.value], { type: 'application/json' }))
  a.download = `${editingGrammar!.name}.tmLanguage.json`
  a.click()
}

</script>

<template>
  <div relative border="~ base rounded" class="group">
    <MonacoEditor
v-model="code" h-full lang="json" :options="{
      minimap: { enabled: false },
      fontSize: 16,
      automaticLayout: true,
    }" />
    <button absolute right-4 top-2 p-2 text-xl class="hover:bg-gray/15" rounded-lg @click="download" >
      <div text-transparent group-hover:text-white op80 i-carbon-download />
    </button>
  </div>
</template>
