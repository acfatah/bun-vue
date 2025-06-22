<script setup lang="ts">
import type { DateValue } from '@internationalized/date'
import type { Ref } from 'vue'
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { ref } from 'vue'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const date = ref() as Ref<DateValue>

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          `
            w-full justify-between px-2 font-normal
            md:max-w-[280px]
          `,
          !date && 'text-muted-foreground',
        )"
      >
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
        <Icon icon="lucide:calendar" class="text-muted-foreground" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <Calendar
        v-model="date"
        initial-focus
      />
    </PopoverContent>
  </Popover>
</template>
