<script setup lang="ts">
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'
import { ref } from 'vue'

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const open = ref(false)

function setOpen(value: boolean) {
  open.value = value
}
</script>

<template>
  <PopoverRoot
    v-bind="forwarded"
    v-model:open="open"
    data-slot="popover"
  >
    <slot v-bind="{ open, setOpen }" />
  </PopoverRoot>
</template>
