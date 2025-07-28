<script setup lang="ts">
import type { PaginationNextProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationNext, useForwardProps } from 'reka-ui'
import type { ButtonVariants } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PaginationNextProps & {
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
}>(), {
  size: 'md',
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PaginationNext
    data-slot="pagination-next"
    :class="cn(
      buttonVariants({
        variant: 'ghost',
        size,
      }),
      `
        gap-1 px-2.5
        sm:pr-2.5
      `,
      props.class,
    )"
    v-bind="forwarded"
  >
    <slot>
      <span
        class="
          hidden
          sm:block
        "
      >Next</span>
      <Icon icon="lucide:chevron-right" />
    </slot>
  </PaginationNext>
</template>
