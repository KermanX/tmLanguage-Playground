<script setup lang="ts">
import { Tooltip, hideAllPoppers } from 'floating-vue'
import type { ThemedToken } from 'shiki';

defineProps<{
  token: ThemedToken
}>()

const tooltipVisible = ref(false)
function updateShown(s: boolean) {
  tooltipVisible.value = s
  if (s)
    hideAllPoppers()
}
</script>

<template>
  <Tooltip
class="inline" placement="bottom" :delay="{ show: 0, hide: 100 }" :triggers="['click', 'hover', 'focus']"
    :popper-triggers="['hover']" @update:shown="updateShown">
    <template #default>
      <span :style="{ color: token.color }" :class="tooltipVisible ? 'outline' : ''" v-text="token.content" />
    </template>
    <template #popper>
      <TokenExplanation :token="token" />
    </template>
  </Tooltip>
</template>
