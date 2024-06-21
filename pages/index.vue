<script setup lang="ts">
import { version } from '../package.json'

const grammarsStore = useGrammarsStore()
const pageEl = ref<HTMLElement | null>(null)

const { isOverDropZone } = useDropZone(pageEl, {
  dataTypes: ['text/plain', 'application/json'],
  onDrop: async (files) => {
    console.log(files)
    const file = files?.[0]
    if (!file)
      return
    const text = await file.text()
    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      json = {}
    }
    const basename = file.name.replace(/\.json$/, '')
    grammarsStore.projects.push({
      name: json.name || basename || 'untitled',
      displayName: json.displayName || basename || 'Untitled',
      scopeName: json.scopeName || 'source.unknown',
      code: text,
      load: async () => text,
      isBuiltin: false,
    })
  },
})

const { width: windowWidth } = useWindowSize()
const editorRatio = ref(0.5)
const spacingWidth = 54
const selectorWidth = 180
const editorWidth = computed(() => (windowWidth.value - selectorWidth - spacingWidth) * editorRatio.value)
</script>

<template>
  <div ref="pageEl" w-100vw h-100vh flex flex-col gap-4 overflow-hidden>
    <div px-5 pt-4 text-lg select-none flex items-center>
      <div flex-grow>
        <span font-bold>tmLanguage</span><span font-100>Playground</span> <sup op50>v{{ version }}</sup>
      </div>
      <a
i-carbon-logo-github text-2xl op80 hover:op90 mr-1 href="https://github.com/KermanX/tmLanguage-Playground"
        target="_blank" />
    </div>
    <div px-4 pb-4 h-0 flex-grow flex gap-4>
      <GrammarSelector :style="{width: selectorWidth + 'px'}" />
      <GrammarEditor :style="{width: editorWidth + 'px'}"/>
      <ExamplePreview flex-grow />
    </div>
    <div v-if="isOverDropZone" fixed inset-0 class="bg-green/40" flex items-center justify-center>
      <div flex flex-col items-center class="bg-green/80" p-6 rounded-2xl>
        <div i-carbon-add text-7xl />
        <div text-lg>Drop a tmLanguage file here to add it to the playground</div>
      </div>
    </div>
  </div>
</template>
