<script setup lang="ts">
import type { DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import { DropdownMenuRoot, useForwardPropsEmits } from 'reka-ui'
import { ref } from 'vue'

const props = defineProps<DropdownMenuRootProps>()
const emits = defineEmits<DropdownMenuRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
const open = ref(false)

function setOpen(value: boolean) {
  open.value = value
}
</script>

<template>
  <DropdownMenuRoot
    v-bind="forwarded"
    v-model:open="open"
    data-slot="dropdown-menu"
  >
    <slot v-bind="{ open, setOpen }" />
  </DropdownMenuRoot>
</template>
