<script setup lang="ts">
import type { DrawerDescriptionProps } from 'vaul-vue'
import type { HtmlHTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerDescription } from 'vaul-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DrawerDescriptionProps & {
  class?: HtmlHTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="delegatedProps"
    :class="cn('text-sm text-muted-foreground', props.class)"
  >
    <slot />
  </DrawerDescription>
</template>
