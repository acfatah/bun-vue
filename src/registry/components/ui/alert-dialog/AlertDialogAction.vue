<script setup lang="ts">
import type { AlertDialogActionProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { AlertDialogAction } from 'reka-ui'
import type { ButtonVariants } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<AlertDialogActionProps & {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
}>(), {
  variant: 'default',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AlertDialogAction
    v-bind="delegatedProps"
    :class="cn(
      buttonVariants({ variant }),
      props.class,
    )"
  >
    <slot />
  </AlertDialogAction>
</template>
