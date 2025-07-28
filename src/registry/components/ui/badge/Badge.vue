<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { BadgeVariants } from '.'
import { badgeVariants } from '.'

const props = withDefaults(defineProps<{
  variant?: BadgeVariants['variant']
  class?: HTMLAttributes['class']
  as?: string
}>(), {
  as: 'span',
})

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <Primitive
    data-slot="badge"
    v-bind="delegatedProps"
    :class="cn(badgeVariants({ variant }), props.class)"
  >
    <slot />
  </Primitive>
</template>
