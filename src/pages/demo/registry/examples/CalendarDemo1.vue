<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ref } from 'vue'
import { Calendar1 } from '@/components/ui/calendar'

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>
</script>

<template>
  <Calendar1 v-model="value" weekday-format="short" class="rounded-md border" />
</template>
