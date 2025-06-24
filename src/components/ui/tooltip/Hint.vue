<script setup lang="ts">
import { TooltipRoot } from 'reka-ui'
import {
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '.'

const props = withDefaults(defineProps<{
  disabled?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  text?: string
  class?: string
}>(), {
  side: 'top',
  text: '',
})
</script>

<template>
  <slot v-if="props.disabled" />

  <TooltipProvider v-else>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>

      <TooltipContent
        :side="props.side"
        class="[&_svg:not([class*='size-'])]:size-4"
      >
        <slot name="content" />
        {{ text }}
        <TooltipArrow />
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
