<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'
import type { DateRange } from '@/components/ui/range-calendar'
import { RangeCalendar } from '@/components/ui/range-calendar'

const dateRange = ref<DateRange>({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ days: 7 }),
})
</script>

<template>
  <RangeCalendar
    v-model="dateRange"
    class="w-min rounded-md border"
  />
</template>
