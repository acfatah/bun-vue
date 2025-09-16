<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { ButtonVariants } from '.'
import { buttonVariants } from '.'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const attrs = useAttrs()
</script>

<template>
  <button
    data-scope="button"
    :disabled="props.disabled || props.loading"
    :data-loading="props.loading ? true : undefined"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    v-bind="attrs"
  >
    <slot v-bind="{ loading: props.loading }" />
  </button>
</template>
