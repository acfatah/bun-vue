<script setup lang="ts">
import type { UserRecord } from '../schema'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  data: UserRecord
}>()

const emit = defineEmits(['viewRow', 'updateRow'])

function copy(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 self-end p-0">
        <span class="sr-only">Open menu</span>
        <Icon icon="lucide:ellipsis" class="size-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(props.data.id || '')">
        Copy user ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="emit('viewRow', props.data)">
        View
      </DropdownMenuItem>
      <DropdownMenuItem @click="emit('updateRow', props.data)">
        Update
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
