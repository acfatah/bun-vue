<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'

import { Icon } from '@iconify/vue'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Kbd } from '@/components/ui/kbd'

const showCommand = ref(false)

const { Meta_J, Ctrl_J } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

watch([Meta_J, Ctrl_J], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

function handleOpenChange() {
  showCommand.value = !showCommand.value
}
</script>

<template>
  <div>
    <p class="text-sm text-muted-foreground">
      Press <Kbd size="xs">⌘ J</Kbd>
    </p>
    <CommandDialog v-model:open="showCommand">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem value="calendar">
            <Icon icon="lucide:calendar" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem value="search">
            <Icon icon="lucide:smile" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled value="calculator">
            <Icon icon="lucide:calculator" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem value="profile">
            <Icon icon="lucide:user" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem value="billing">
            <Icon icon="lucide:credit-card" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem value="settings">
            <Icon icon="lucide:settings" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
</template>
