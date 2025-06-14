<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLayout } from '../composables/use-layout'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { layout, setLayout } = useLayout()
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    title="Toggle layout"
    :class="cn('size-8', props.class)"
    @click="() => {
      const newLayout = layout === 'fixed' ? 'full' : 'fixed'

      setLayout(newLayout)
    }"
  >
    <span class="sr-only">Toggle layout</span>
    <Icon icon="lucide:gallery-horizontal" class="size-4" />
  </Button>
</template>
