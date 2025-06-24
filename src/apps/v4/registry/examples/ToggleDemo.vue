<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Toggle } from '@/components/ui/toggle'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Toggle aria-label="Toggle italic">
      <Icon icon="lucide:bold" class="size-4" />
    </Toggle>

    <Toggle aria-label="Toggle italic" variant="default">
      <Icon icon="lucide:underline" class="size-4" />
    </Toggle>

    <Toggle aria-label="Toggle italic" variant="default" disabled>
      Disabled
    </Toggle>

    <Toggle variant="outline" aria-label="Toggle italic">
      <Icon icon="lucide:italic" class="size-4" />
      Italic
    </Toggle>

    <Toggle
      aria-label="Toggle book"
      class="data-[state=on]:[&_svg]:fill-accent-foreground"
    >
      <Icon icon="lucide:bookmark" class="size-4" />
    </Toggle>

    <Toggle variant="outline" aria-label="Toggle italic" size="sm">
      Small
    </Toggle>

    <Toggle variant="outline" aria-label="Toggle italic" size="lg">
      Large
    </Toggle>
  </div>
</template>
