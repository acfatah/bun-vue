<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date'
import { reactive } from 'vue'
import { RangeCalendar } from '@/components/ui/range-calendar'

const dateRange = reactive({
  start: today(getLocalTimeZone()),
  end: today(getLocalTimeZone()).add({ days: 35 }),
})
</script>

<template>
  <RangeCalendar
    v-model="dateRange"
    :number-of-months="2"
    class="w-min rounded-md border"
  />
</template>
