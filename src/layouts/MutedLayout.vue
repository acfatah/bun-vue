<script setup lang="ts">
/**
 * Layout with muted background.
 */

import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  const body = document.body
  body.classList.remove('bg-background')
  body.classList.add('bg-muted')
})

onUnmounted(() => {
  const body = document.body
  body.classList.remove('bg-muted')
  body.classList.add('bg-background')
})
</script>

<template>
  <RouterView />
</template>
