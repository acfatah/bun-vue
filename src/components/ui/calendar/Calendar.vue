<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { CalendarRootEmits, CalendarRootProps } from 'reka-ui'
import type { HTMLAttributes, Ref } from 'vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useVModel } from '@vueuse/core'
import { CalendarRoot, useDateFormatter, useForwardPropsEmits } from 'reka-ui'
import { createDecade, createYear, toDate } from 'reka-ui/date'
import { computed } from 'vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone())
  },
  weekdayFormat: 'short',
})
const emits = defineEmits<CalendarRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, placeholder: __, ...delegated } = props

  return delegated
})

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone()),
}) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const formatter = useDateFormatter('en')
</script>

<template>
  <CalendarRoot
    v-slot="{ date, grid, weekDays }"
    v-model:placeholder="placeholder"
    v-bind="forwarded"
    :class="cn('w-min rounded-md border p-3', props.class)"
  >
    <CalendarHeader>
      <CalendarHeading class="flex w-full items-center justify-between gap-2">
        <CalendarPrevButton class="relative" />
        <div class="flex gap-1">
          <Select
            :default-value="placeholder.month.toString()"
            :model-value="date.month.toString()"
            @update:model-value="(v) => {
              if (!v || !placeholder) return;
              if (Number(v) === placeholder?.month) return;
              placeholder = placeholder.set({
                month: Number(v),
              })
            }"
          >
            <SelectTrigger
              aria-label="Select month" size="sm" class="
                w-min gap-1 py-0 pr-1 pl-2
                dark:bg-transparent
              "
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent class="max-h-[200px]">
              <SelectItem
                v-for="month in createYear({ dateObj: date })"
                :key="month.toString()" :value="month.month.toString()"
              >
                {{ formatter.custom(toDate(month), { month: 'short' }) }}
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            :default-value="placeholder.year.toString()"
            :model-value="date.year.toString()"
            @update:model-value="(v) => {
              if (!v || !placeholder) return;
              if (Number(v) === placeholder?.year) return;
              placeholder = placeholder.set({
                year: Number(v),
              })
            }"
          >
            <SelectTrigger
              aria-label="Select year" size="sm" class="
                w-min gap-1 py-0 pr-1 pl-2
                dark:bg-transparent
              "
            >
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent class="max-h-[200px]">
              <SelectItem
                v-for="yearValue in createDecade({ dateObj: date, startIndex: -10, endIndex: 10 })"
                :key="yearValue.toString()" :value="yearValue.year.toString()"
              >
                {{ yearValue.year }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CalendarNextButton class="relative" />
      </CalendarHeading>
    </CalendarHeader>

    <div
      class="
        flex flex-col space-y-4 pt-4
        sm:flex-row sm:gap-x-4 sm:gap-y-0
      "
    >
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell
              v-for="day in weekDays" :key="day"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
