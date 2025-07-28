<script setup lang="ts">
import type { ToastCloseProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { ToastClose } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastClose
    v-bind="delegatedProps"
    data-slot="toast-close"
    :class="cn(
      `
        absolute top-1 right-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity
        group-hover:opacity-100
        hover:cursor-pointer hover:text-foreground
        focus:opacity-100 focus:ring-2 focus:outline-none
      `,
      props.class)"
  >
    <Icon icon="lucide:x" width="16" height="16" />
  </ToastClose>
</template>
