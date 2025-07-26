<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { UseDark } from '@vueuse/components'
</script>

<template>
  <UseDark v-slot="{ isDark, toggleDark }">
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
      aria-label="Toggle dark mode"
      @click="toggleDark()"
    >
      <Icon v-if="!isDark" icon="lucide:moon" class="size-4" />
      <Icon v-if="isDark" icon="lucide:sun" class="size-4" />
    </button>
  </UseDark>
</template>
