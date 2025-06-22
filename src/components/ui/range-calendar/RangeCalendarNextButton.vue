<script lang="ts" setup>
import type { RangeCalendarNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { RangeCalendarNext, useForwardProps } from 'reka-ui'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<RangeCalendarNextProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <RangeCalendarNext
    data-slot="range-calendar-next-button"
    :class="cn(
      buttonVariants({ variant: 'outline' }),
      `
        absolute right-1 size-7 bg-transparent p-0 opacity-50
        hover:opacity-100
        [&>svg]:size-4 [&>svg]:shrink-0
      `,
      props.class,
    )"
    v-bind="forwardedProps"
  >
    <slot>
      <Icon icon="lucide:chevron-right" />
    </slot>
  </RangeCalendarNext>
</template>
