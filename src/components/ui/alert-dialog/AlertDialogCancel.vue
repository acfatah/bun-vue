<script setup lang="ts">
import type { AlertDialogCancelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogCancel } from 'reka-ui'
import type { ButtonVariants } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<AlertDialogCancelProps & {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
}>(), {
  variant: 'outline',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogCancel
    v-bind="delegatedProps"
    :class="cn(
      buttonVariants({ variant }),
      `
        mt-2
        sm:mt-0
      `,
      props.class,
    )"
  >
    <slot />
  </AlertDialogCancel>
</template>
