<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'reka-ui'
import { SelectRoot, useForwardPropsEmits } from 'reka-ui'
import { ref } from 'vue'

const props = defineProps<SelectRootProps>()
const emits = defineEmits<SelectRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const open = ref(false)

function setOpen(value: boolean) {
  open.value = value
}
</script>

<template>
  <SelectRoot
    v-bind="forwarded"
    v-model:open="open"
    data-slot="select"
  >
    <slot v-bind="{ open, setOpen }" />
  </SelectRoot>
</template>
