<script setup lang="ts">
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
]

const selectedFrameworks = ref<typeof frameworks>([])
</script>

<template>
  <Combobox
    v-model="selectedFrameworks"
    multiple
    by="label"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline" class="w-full min-w-[280px] justify-between"
        >
          {{ selectedFrameworks?.length > 0
            ? selectedFrameworks.map((framework) => framework.label).join(", ")
            : "Select frameworks (multi-select)..." }}
          <Icon icon="lucide:chevrons-up-down" class="ml-2 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="w-[300px]">
      <ComboboxInput placeholder="Select framework..." />

      <ComboboxEmpty>
        No framework found.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
          v-for="framework in frameworks"
          :key="framework.value"
          :value="framework"
        >
          <div
            class="
              pointer-events-none size-4 shrink-0 rounded-[4px] border border-input transition-all
              select-none
              data-[selected=true]:border-primary data-[selected=true]:bg-primary
              data-[selected=true]:text-primary-foreground
              *:[svg]:opacity-0
              data-[selected=true]:*:[svg]:opacity-100
            "
            :data-selected="selectedFrameworks.some(
              (f) => f.value === framework.value,
            )"
          >
            <Icon icon="lucide:check" class="size-3.5 text-current" />
          </div>

          {{ framework.label }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
