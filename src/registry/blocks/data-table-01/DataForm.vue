<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import type { UserRecord } from './schema'

import { Icon } from '@iconify/vue'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseAbsoluteToLocal,
  today,
} from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'reka-ui/date'
import { h, ref } from 'vue'

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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
// import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

import { labels } from './columns'
import { schema } from './schema'

const props = defineProps<{
  data: UserRecord
}>()

const userFormSchema = toTypedSchema(schema)

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const expiryPlaceholder = ref()

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as UserRecord

  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-full rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(formValues, null, 2)),
    ),
  })
}
</script>

<template>
  <Form
    v-slot="{ meta }"
    :validation-schema="userFormSchema"
    :initial-values="props.data"
    class="flex h-full flex-col space-y-8 p-4"
    @submit="onSubmit"
  >
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>{{ labels.username }}</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          Description for Username.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ labels.email }}</FormLabel>

        <FormControl>
          <Input type="email" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          An email input.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- <FormField v-slot="{ componentField }" name="bio">
      <FormItem>
        <FormLabel>Bio</FormLabel>
        <FormControl>
          <Textarea placeholder="Tell us a little bit about yourself" v-bind="componentField" />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField> -->

    <FormField v-slot="{ value, handleChange }" name="active">
      <FormItem class="flex flex-row items-start space-y-0 space-x-3">
        <FormControl>
          <FormControl>
            <Switch
              :model-value="!!value"
              @update:model-value="handleChange"
            />
          </FormControl>
        </FormControl>

        <div class="flex w-full flex-col space-y-0.5">
          <FormLabel>{{ labels.active }}</FormLabel>
          <FormDescription>
            User status either active or inactive.
          </FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="credit">
      <FormItem>
        <FormLabel>{{ labels.credit }}</FormLabel>
        <FormControl>
          <Input type="number" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, meta: fieldMeta, handleBlur, setValue }"
      name="expiry"
    >
      <FormItem class="flex flex-col">
        <FormLabel>{{ labels.expiry }}</FormLabel>
        <Popover
          v-slot="{ open, setOpen }"
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
                <span>{{ value ? df.format(value) : "Pick a date" }}</span>
                <Icon icon="lucide:calendar" class="ms-auto size-4 opacity-50" />
              </Button>
              <input hidden>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="expiryPlaceholder"
              :calendar-label="labels.expiry"
              :model-value="value ? parseAbsoluteToLocal(value.toISOString()) : undefined"
              :min-value="new CalendarDate(1800, 1, 1)"
              :max-value="today(getLocalTimeZone())"
              initial-focus
              @update:model-value="(val) => {
                if (val) {
                  setValue(toDate(val))
                }
              }"
              @click="(event: MouseEvent) => {
                if ((event.target as Element)?.matches('[data-slot=calendar-cell-trigger]')) {
                  setOpen(false)
                }
              }"
            />
          </PopoverContent>
        </Popover>
        <FormDescription>
          Description for date input.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <div
      class="
        mt-auto flex w-full flex-col gap-2
        md:flex-row
      "
    >
      <Button
        type="reset"
        variant="outline"
        class="
          w-full
          md:ml-auto md:w-min
        "
      >
        Reset
      </Button>

      <Button
        type="submit"
        :disabled="!(meta.dirty && meta.valid)"
        class="
          w-full
          md:w-min
        "
      >
        Save changes
      </Button>
    </div>
  </Form>
</template>
