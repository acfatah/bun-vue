<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen(document.querySelector('body'))
</script>

<template>
  <button
    class="
      inline-flex h-8 w-8 items-center justify-center gap-2 rounded-md text-sm font-medium
      whitespace-nowrap ring-offset-background transition-colors
      hover:bg-accent hover:text-accent-foreground
      focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      focus-visible:outline-none
      disabled:pointer-events-none disabled:opacity-50
      [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0
    "
    aria-label="Toggle fullscreen mode"
    @click="toggle()"
  >
    <Icon v-if="!isFullscreen" icon="lucide:fullscreen" class="size-4 ease-out" />
    <Icon v-if="isFullscreen" icon="lucide:minimize" class="size-4 ease-out" />
  </button>
</template>
