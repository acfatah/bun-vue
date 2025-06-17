<script setup lang="ts">
import type { DrawerTitleProps } from 'vaul-vue'
import type { HtmlHTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { DrawerTitle } from 'vaul-vue'
import { cn } from '@/lib/utils'

const props = defineProps<DrawerTitleProps & {
  class?: HtmlHTMLAttributes['class']
}>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="delegatedProps"
    :class="cn(
      'font-semibold text-foreground',
      props.class,
    )"
  >
    <slot />
  </DrawerTitle>
</template>
