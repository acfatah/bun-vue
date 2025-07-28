<script setup lang="ts">
import type { PaginationPrevProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { reactiveOmit } from '@vueuse/core'
import { PaginationPrev } from 'reka-ui'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<PaginationPrevProps & {
  class?: HTMLAttributes['class']
}>(), {
  asChild: true,
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button :class="cn('size-9 p-0', props.class)" variant="outline">
      <slot>
        <Icon icon="lucide:chevron-left" width="16" height="16" />
      </slot>
    </Button>
  </PaginationPrev>
</template>
