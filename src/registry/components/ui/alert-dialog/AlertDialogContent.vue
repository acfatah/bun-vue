<script setup lang="ts">
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<AlertDialogContentProps & {
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<AlertDialogContentEmits>()
const delegatedProps = reactiveOmit(props, 'class')
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      data-slot="alert-dialog-overlay"
      :class="cn(
        `
          fixed inset-0 z-50 bg-black/80
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=open]:animate-in data-[state=open]:fade-in-0
        `,
      )"
    />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      v-bind="forwarded"
      :class="cn(
        `
          fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2
          -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=closed]:zoom-out-95
          data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95
          sm:max-w-lg
        `,
        props.class,
      )"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>
