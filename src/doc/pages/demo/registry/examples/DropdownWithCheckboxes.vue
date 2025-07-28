<script setup lang="ts">
import type { DropdownMenuCheckboxItemProps } from 'reka-ui'
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['modelValue']

const showStatusBar = ref<Checked>(true)
const showActivityBar = ref<Checked>(false)
const showPanel = ref<Checked>(false)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        Checkboxes
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        Panel Position
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          v-model="showStatusBar"
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          v-model="showActivityBar"
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          v-model="showPanel"
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
