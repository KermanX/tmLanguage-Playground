<script setup lang="ts">
import { ref } from 'vue'
import type { Grammar } from '~/types';

const selected = defineModel<Grammar>({ required: true })

const options = ref<Grammar[]>(builtinGrammars)

const search = ref<string>()

const filteredOptions = computed(() => {
  const searchTerm = search.value?.trim().toLowerCase()
  if (!searchTerm)
    return options.value
  return options.value.filter(option => option.name.toLowerCase().includes(searchTerm))
})
</script>

<template>
  <div flex flex-col gap-4>
    <div relative border="~ base rounded">
      <input v-model="search" placeholder="Search" px3 py1 pl8 bg-transparent sticky top-0 w-full>
      <div i-carbon-search absolute left-2 top-2 op40 z--1 />
    </div>
    <div border="~ base rounded" h-0 flex-grow flex flex-col overflow-y-scroll>
      <div
v-for="option in filteredOptions" :key="option.name" border="b base" px3 py1 text-left
        :class="selected.name === option.name ? 'bg-active text-primary' : 'text-faded'"
        @click="selected = option"
        >
        <span>
          {{ option.name }}
        </span>
      </div>
    </div>
  </div>
</template>
