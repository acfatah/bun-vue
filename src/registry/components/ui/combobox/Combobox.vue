<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui'
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui'
import { ref } from 'vue'

const props = defineProps<ComboboxRootProps>()
const emits = defineEmits<ComboboxRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const open = ref(false)

function setOpen(value: boolean) {
  open.value = value
}
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    v-model:open="open"
    data-slot="combobox"
  >
    <slot v-bind="{ open, setOpen }" />
  </ComboboxRoot>
</template>
