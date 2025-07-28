<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
</script>

<template>
  <Command class="max-w-[450px] rounded-lg border shadow-md">
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
  </Command>
</template>
