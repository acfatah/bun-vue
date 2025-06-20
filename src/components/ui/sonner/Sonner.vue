<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'
import { useDark } from '@vueuse/core'
import { Toaster } from 'vue-sonner'

const props = defineProps<ToasterProps>()
const isDark = useDark()
</script>

<template>
  <Toaster
    class="toaster group"
    v-bind="props"
    :theme="isDark ? 'dark' : 'light'"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-foreground',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
        cancelButton:
          'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
      },
    }"
  />
</template>
