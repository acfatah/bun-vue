<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date'
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'

const dateRange = ref({
  start: new CalendarDate(new Date().getFullYear(), 0, 20),
  end: new CalendarDate(new Date().getFullYear(), 0, 20).add({ days: 20 }),
}) as Ref<{ start: DateValue, end: DateValue }>

const drf = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const formattedStartDate = computed(
  () => drf.format(dateRange.value.start.toDate(getLocalTimeZone())),
)

const formattedEndDate = computed(
  () => drf.format(dateRange.value.end.toDate(getLocalTimeZone())),
)
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        id="date"
        variant="outline"
        :class="cn(
          `
            w-full justify-between px-2 font-normal
            md:max-w-[280px]
          `,
          !dateRange && 'text-muted-foreground',
        )"
      >
        <template v-if="dateRange.start">
          <template v-if="dateRange.end">
            {{ formattedStartDate }} - {{ formattedEndDate }}
          </template>

          <template v-else>
            {{ formattedStartDate }}
          </template>
        </template>
        <template v-else>
          Pick a date
        </template>
        <Icon icon="lucide:calendar" class="text-muted-foreground" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <RangeCalendar
        v-model="dateRange"
        :number-of-months="2"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
