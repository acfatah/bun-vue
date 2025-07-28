<script setup lang="ts">
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Label, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & {
  class?: HTMLAttributes['class']
  disabled?: boolean
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <Label
    data-slot="label"
    :data-disabled="disabled ? '' : undefined"
    v-bind="forwardedProps"
    :class="cn(
      `
        flex items-center gap-2 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50
        peer-disabled:cursor-not-allowed peer-disabled:opacity-50
      `,
      props.class,
    )"
  >
    <slot />
  </Label>
</template>
