<script setup lang="ts">
import 'floating-vue/dist/style.css'
import './style.css'

useHead({
  title: 'tmLanguage Playground',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
