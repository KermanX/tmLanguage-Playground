<script setup lang="ts">
import { version } from '../package.json'
import type { Grammar } from '~/types';

const activeGrammar = ref<Grammar>(builtinGrammars.find(g => g.name === 'javascript')!)
</script>

<template>
  <div w-100vw h-100vh flex flex-col gap-4 overflow-hidden>
    <div px-4 pt-4 text-lg>
      <span font-bold>tmLanguage</span><span font-100>Playground</span> <sup op50>v{{ version }}</sup>
    </div>
    <div px-4 pb-4 h-0 flex-grow grid="~ cols-[200px_2fr_2fr] gap-4">
      <GrammarSelector v-model="activeGrammar" />
      <GrammarEditor v-model="activeGrammar" />
      <ExamplePreview v-model="activeGrammar" />
    </div>
  </div>
</template>
