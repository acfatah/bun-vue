<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui'
import { Icon } from '@iconify/vue'
import { Primitive, useForwardProps } from 'reka-ui'

const props = defineProps<PrimitiveProps>()
const forwardedProps = useForwardProps(props)
</script>

<template>
  <Primitive
    data-slot="pin-input-separator"
    v-bind="forwardedProps"
  >
    <slot>
      <Icon icon="lucide:minus" />
    </slot>
  </primitive>
</template>
