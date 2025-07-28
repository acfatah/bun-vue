<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { WithClassAsProps } from './interface'
import { useCarousel } from './use-carousel'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()
const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div
    ref="carouselRef"
    data-slot="carousel-content"
    class="overflow-hidden"
  >
    <div
      v-bind="$attrs"
      :class="cn(
        'flex',
        orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
        props.class,
      )"
    >
      <slot />
    </div>
  </div>
</template>
