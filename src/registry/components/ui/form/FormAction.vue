<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  justifyEnd?: boolean
  class?: HTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class', 'justifyEnd')
</script>

<template>
  <div
    v-bind="delegatedProps"
    :class="cn(
      'mt-6 flex gap-2',
      [props.justifyEnd && 'flex-row-reverse'],
      props.class,
    )"
  >
    <slot />
  </div>
</template>
