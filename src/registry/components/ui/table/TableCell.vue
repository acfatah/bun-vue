<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  sticky?: boolean
  stickyEnd?: boolean
  wrap?: boolean
}>()
</script>

<template>
  <td
    data-slot="table-cell"
    :class="cn(
      `
        p-2 align-middle
        [&:has([role=checkbox])]:pr-0
        *:[[role=checkbox]]:translate-y-[2px]
      `,
      sticky ? `sticky left-0 bg-background` : '',
      stickyEnd ? `sticky right-0 bg-background` : '',
      wrap ? 'wrap-break-words whitespace-normal' : 'whitespace-nowrap',
      props.class,
    )"
  >
    <slot />
  </td>
</template>
