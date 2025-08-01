<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ScrollType } from '@/components/ui/scroll-area'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  scrollType?: ScrollType
}>(), {
  scrollType: 'auto',
})
</script>

<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    :class="cn(`
      flex min-h-0 flex-1 flex-col gap-2 overflow-auto
      group-data-[collapsible=icon]:overflow-hidden
    `, props.class)"
  >
    <ScrollArea :type="props.scrollType">
      <slot />
    </ScrollArea>
  </div>
</template>
