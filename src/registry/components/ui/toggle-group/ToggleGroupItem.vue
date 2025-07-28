<script setup lang="ts">
import type { ToggleGroupItemProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ToggleGroupItem, useForwardProps } from 'reka-ui'
import type { ToggleVariants } from '@/components/ui/toggle'
import { toggleVariants } from '@/components/ui/toggle'
import { cn } from '@/lib/utils'
import { injectToggleGroupContext } from '.'

const props = defineProps<ToggleGroupItemProps & {
  class?: HTMLAttributes['class']
  variant?: ToggleVariants['variant']
  size?: ToggleVariants['size']
}>()

const context = injectToggleGroupContext()
const delegatedProps = reactiveOmit(props, 'class', 'size', 'variant')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ToggleGroupItem
    data-slot="toggle-group-item"
    :data-variant="context?.variant.value || variant"
    :data-size="context?.size.value || size"
    v-bind="forwardedProps"
    :class="cn(
      toggleVariants({
        variant: context?.variant.value || variant,
        size: context?.size.value || size,
      }),
      `
        min-w-0 flex-1 shrink-0 rounded-none shadow-none
        first:rounded-l-md
        last:rounded-r-md
        focus:z-10
        focus-visible:z-10
        data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l
      `,
      props.class)"
  >
    <slot />
  </ToggleGroupItem>
</template>
