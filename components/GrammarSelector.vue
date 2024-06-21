<script setup lang="ts">
import { ref } from 'vue'
import type { Grammar } from '~/types';

const grammarsStore = useGrammarsStore()

const search = ref<string>()

const filteredBuiltins = computed(() => {
  const searchTerm = search.value?.trim().toLowerCase()
  if (!searchTerm)
    return grammarsStore.builtins
  return grammarsStore.builtins.filter(g => g.name.toLowerCase().includes(searchTerm))
})

const renaming = ref<Grammar | null>(null)
const renamingName = ref('')

const startRenaming = (g: Grammar) => {
  renaming.value = g
  renamingName.value = g.name
}

const finishRenaming = () => {
  if (!renaming.value)
    return
  renaming.value.name = renamingName.value
  renaming.value = null
}

const vInputFocus = {
  mounted(el: HTMLInputElement) {
    el.focus()
    el.setSelectionRange(0, el.value.length)
  }
}

const el = useCurrentElement()
watchEffect(() => {
  (el.value as HTMLElement | null)?.querySelector(`[data-grammar-name=${JSON.stringify(grammarsStore.active.name)}]`)?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest',
  })
})
</script>

<template>
  <div flex flex-col gap-2>
    <div select-none flex items-center class="group">
      <span flex-grow op90>
        Your grammars
      </span>
      <div invisible group-hover:visible i-codicon-clear-all mt-1 text-faded hover:text-white @click.stop="grammarsStore.deleteAllProjects" />
    </div>
    <div border="~ base rounded" max-h-60vh h-fit flex flex-col overflow-y-auto>
      <div
v-for="project in grammarsStore.projects" :key="project.name" :data-grammar-name="project.name" border="b base" px3 py1 text-left flex items-center gap-2 class="group" relative hover="bg-gray/20"
        :class="grammarsStore.active === project ? 'bg-active text-primary' : 'text-faded'" @click="grammarsStore.active = project">
        <template v-if="renaming !== project">
          <span flex-grow>
            {{ project.name }}
          </span>
          <div invisible group-hover:visible i-carbon-edit text-faded hover:text-white @click.stop="startRenaming(project)" />
          <div invisible group-hover:visible i-carbon-close-outline text-faded hover:text-white @click.stop="grammarsStore.deleteProject(project)" />
        </template>
        <template v-else>
          <input v-model="renamingName" v-input-focus outline-none @keydown.enter="finishRenaming" @blur="finishRenaming">
          <div i-carbon-checkmark absolute right-4 z-1 text-faded hover:text-white @click.stop="finishRenaming" />
        </template>
      </div>
      <button border="b base dash" px3 py1 text-left op60 flex items-center hover="bg-gray/20" @click="grammarsStore.createProject">
        <div i-codicon-add ml-1 mr-2 text-white />
        <span flex-grow >Create</span>
      </button>
    </div>
    <div select-none op90>
      Built-in grammars
    </div>
    <div relative border="~ base rounded" hover="bg-gray/20">
      <input v-model="search" placeholder="Search" px3 py1 pl8 bg-transparent sticky top-0 w-full>
      <div i-carbon-search absolute left-2 top-2 op40 z--1 />
    </div>
    <div border="~ base rounded" h-0 flex-grow flex flex-col overflow-y-scroll>
      <div
v-for="builtin in filteredBuiltins" :key="builtin.name" :data-grammar-name="builtin.name" border="b base" px3 py1 text-left hover="bg-gray/20"
        :class="grammarsStore.active === builtin ? 'bg-active text-primary' : 'text-faded'" @click="grammarsStore.active = builtin">
        <span>
          {{ builtin.name }}
        </span>
      </div>
    </div>
  </div>
</template>
