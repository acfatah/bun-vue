<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'reka-ui/date'
import { h, ref } from 'vue'
import { z } from 'zod'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

type SubmissionRecord = z.infer<typeof schema>
const schema = z.object({
  dob: z
    .string()
    .refine(v => v, { message: 'A date of birth is required.' }),
})

const formSchema = toTypedSchema(schema)

const initialValues = {
  dob: undefined,
}

const placeholder = ref()

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formvalues = values as SubmissionRecord

  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-full rounded-md bg-primary text-primary-foreground p-4' },
      h('code', null, JSON.stringify(formvalues, null, 2)),
    ),
  })
}
</script>

<template>
  <Form
    v-slot="{ meta }"
    class="w-full space-y-6"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ value, meta: fieldMeta, handleBlur, setValue }"
      name="dob"
    >
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <Popover
          v-slot="{ open }"
          @update:open="val => !val && handleBlur()"
        >
          <PopoverTrigger
            as-child
            @blur="!open && !value && handleBlur()"
          >
            <FormControl>
              <Button
                variant="outline" :class="cn(
                  'w-[240px] ps-3 text-start font-normal',
                  !value && 'text-muted-foreground',
                )"
                :aria-invalid="fieldMeta.touched && !fieldMeta.valid"
              >
                <span>{{ value ? df.format(toDate(parseDate(value))) : "Pick a date" }}</span>
                <Icon icon="lucide:calendar" class="ms-auto size-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="placeholder"
              calendar-label="Date of birth"
              initial-focus
              :value="value ? parseDate(value) : undefined"
              :min-value="new CalendarDate(1900, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              @update:model-value="(val) => {
                if (val) {
                  setValue(val.toString())
                }
                else {
                  setValue(undefined)
                }
              }"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Your date of birth is used to calculate your age.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      :disabled="!(meta.dirty && meta.valid)"
      class="float-right"
    >
      Submit
    </Button>
  </Form>
</template>
