<script setup lang="ts">
import type { ToastActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToastAction } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<ToastActionProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <ToastAction
    v-bind="delegatedProps"
    data-slot="toast-action"
    :class="cn(
      `
        inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3
        text-sm font-medium transition-colors
        hover:bg-secondary
        focus:ring-2 focus:ring-ring focus:outline-none
        disabled:pointer-events-none disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </ToastAction>
</template>
