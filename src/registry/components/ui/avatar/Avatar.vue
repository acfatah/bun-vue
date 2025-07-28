<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AvatarRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { AvatarVariants } from '.'
import { avatarVariant } from '.'

const props = withDefaults(defineProps<{
  class?: HTMLAttributes['class']
  size?: AvatarVariants['size']
  shape?: AvatarVariants['shape']
}>(), {
  size: 'sm',
  shape: 'circle',
})
</script>

<template>
  <AvatarRoot
    data-slot="avatar"
    :class="cn(
      avatarVariant({ size, shape }),
      props.class,
    )"
  >
    <slot />
  </AvatarRoot>
</template>
