<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { RouterLink } from 'vue-router'
import { cn } from '@/lib/utils'

const props = defineProps<{
  href: string
  class?: HTMLAttributes['class']
  onOpenChange?: (open: boolean) => void
}>()

const emits = defineEmits<{
  onOpenChange: [open: boolean]
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <RouterLink
    v-bind="delegatedProps"
    :to="props.href"
    :class="cn('text-2xl font-medium', props.class)"
    @click="() => {
      emits('onOpenChange', false)
    }"
  >
    <slot />
  </RouterLink>
</template>
