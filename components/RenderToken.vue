<script setup lang="ts">
import { Tooltip } from 'floating-vue'
import type { ThemedToken } from 'shiki';

defineProps<{
  token: ThemedToken
}>()

const tooltipVisible = ref(false)
</script>

<template>
  <Tooltip class="inline" placement="bottom" :delay="{show:0, hide:100}" @update:shown="s => tooltipVisible = s">
    <template #default>
      <span :style="{ color: token.color }" :class="tooltipVisible ? 'outline' : ''" v-text="token.content" />
    </template>
    <template #popper>
      <TokenExplanation :token="token" />
    </template>
  </Tooltip>
</template>
