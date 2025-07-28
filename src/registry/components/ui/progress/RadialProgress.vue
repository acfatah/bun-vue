<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  modelValue?: number
  size?: number
  thickness?: number
}>(), {
  modelValue: 0,
  /** Default to 8rem */
  size: 128,
  thickness: 8,
})

const RADIUS = 45
const circumference = 2 * Math.PI * RADIUS

const dashOffset = computed(() =>
  (props.modelValue / 100) * circumference,
)

const trackPath = computed(() => {
  return `
          M 50 50
          m 0 -${RADIUS}
          a ${RADIUS} ${RADIUS} 0 1 1 0 ${RADIUS * 2}
          a ${RADIUS} ${RADIUS} 0 1 1 0 -${RADIUS * 2}
          `
})
</script>

<template>
  <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
    <ProgressRoot
      :model-value="modelValue"
      as-child
    >
      <svg
        class="h-full w-full"
        viewBox="0 0 100 100"
      >
        <!-- Background circle -->
        <path
          :d="trackPath"
          class="fill-none stroke-muted stroke-[6px]"
        />
        <!-- Progress circle -->
        <ProgressIndicator as-child>
          <path
            :d="trackPath"
            :class="cn(
              `
                fill-none stroke-primary transition-[stroke-dasharray,opacity] duration-700
                data-[value='0']:opacity-0
              `,
            )"
            :style="{
              'stroke-linecap': 'round',
              'stroke-dasharray': `${dashOffset}px, ${circumference}px`,
              'stroke-dashoffset': '0px',
              'stroke-width': `${thickness}px`,
            }"
          />
        </ProgressIndicator>
      </svg>
      <div class="absolute inset-0 flex items-center justify-center">
        <slot v-bind="{ modelValue }">
          <span class="text-lg font-bold text-foreground">{{ modelValue }}%</span>
        </slot>
      </div>
    </ProgressRoot>
  </div>
</template>
