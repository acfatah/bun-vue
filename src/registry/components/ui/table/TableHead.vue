<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  sticky?: boolean
  stickyEnd?: boolean
}>()
</script>

<template>
  <th
    data-slot="table-head"
    :class="cn(
      `
        h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-muted-foreground
        [&:has([role=checkbox])]:pr-0
        *:[[role=checkbox]]:translate-y-[2px]
      `,
      sticky ? 'sticky left-0 bg-background' : '',
      stickyEnd ? 'sticky right-0 bg-background' : '',
      props.class,
    )"
  >
    <slot />
  </th>
</template>
