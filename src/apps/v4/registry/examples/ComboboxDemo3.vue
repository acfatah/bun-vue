<script setup lang="ts">
import { computed, ref } from 'vue'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from '@/components/ui/combobox'

const timezones = [
  {
    label: 'Americas',
    timezones: [
      { value: 'America/New_York', label: '(GMT-5) New York' },
      { value: 'America/Los_Angeles', label: '(GMT-8) Los Angeles' },
      { value: 'America/Chicago', label: '(GMT-6) Chicago' },
      { value: 'America/Toronto', label: '(GMT-5) Toronto' },
      { value: 'America/Vancouver', label: '(GMT-8) Vancouver' },
      { value: 'America/Sao_Paulo', label: '(GMT-3) São Paulo' },
    ],
  },
  {
    label: 'Europe',
    timezones: [
      { value: 'Europe/London', label: '(GMT+0) London' },
      { value: 'Europe/Paris', label: '(GMT+1) Paris' },
      { value: 'Europe/Berlin', label: '(GMT+1) Berlin' },
      { value: 'Europe/Rome', label: '(GMT+1) Rome' },
      { value: 'Europe/Madrid', label: '(GMT+1) Madrid' },
      { value: 'Europe/Amsterdam', label: '(GMT+1) Amsterdam' },
    ],
  },
  {
    label: 'Asia/Pacific',
    timezones: [
      { value: 'Asia/Tokyo', label: '(GMT+9) Tokyo' },
      { value: 'Asia/Shanghai', label: '(GMT+8) Shanghai' },
      { value: 'Asia/Singapore', label: '(GMT+8) Singapore' },
      { value: 'Asia/Dubai', label: '(GMT+4) Dubai' },
      { value: 'Australia/Sydney', label: '(GMT+11) Sydney' },
      { value: 'Asia/Seoul', label: '(GMT+9) Seoul' },
    ],
  },
] as const

type Timezone = typeof timezones[0]
const selectedTimezone = ref<Timezone['timezones'][number]>(timezones[0].timezones[0])
const selectedGroup = computed(
  () => timezones.find(
    group => group.timezones.find(tz => tz.value === selectedTimezone.value?.value),
  ),
)
</script>

<template>
  <Combobox v-model="selectedTimezone" by="label">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button
          variant="outline" class="
            h-12 w-full justify-between px-2.5
            md:w-[200px]
          "
        >
          <template v-if="selectedTimezone">
            <div class="flex flex-col items-start gap-0.5">
              <span class="text-xs font-normal text-muted-foreground">
                {{ selectedGroup?.label }}
              </span>
              <span>{{ selectedTimezone.label }}</span>
            </div>
          </template>
          <template v-else>
            Select timezone
          </template>

          <Icon icon="lucide:chevron-down" class="ml-2 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList class="w-72" align="start">
      <ComboboxInput placeholder="Select timezone..." />

      <ComboboxViewport class="max-h-[260px]">
        <ComboboxEmpty>
          No timezone found.
        </ComboboxEmpty>

        <ComboboxGroup
          v-for="region in timezones"
          :key="region.label" :heading="region.label"
        >
          <ComboboxItem
            v-for="timezone in region.timezones" :key="timezone.value"
            :value="timezone"
          >
            {{ timezone.label }}

            <ComboboxItemIndicator>
              <Icon icon="lucide:check" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>

      <ComboboxSeparator />
      <ComboboxGroup class="bg-popover">
        <ComboboxItem :value="null">
          <Icon icon="lucide:plus-circle" />
          Create timezone
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
