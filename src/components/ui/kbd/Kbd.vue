<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { kbdVariants } from '.'

const props = defineProps({
  class: { type: null, required: false },
  size: { type: null, required: false, default: 'sm' },
})

const delegatedProps = reactiveOmit(props, 'class', 'size')
</script>

<template>
  <Primitive
    v-bind="delegatedProps"
    :class="cn(
      kbdVariants({ size: props.size }),
      props.class,
    )"
  >
    <span data-slot="kbd-content">
      <slot />
    </span>
  </Primitive>
</template>
