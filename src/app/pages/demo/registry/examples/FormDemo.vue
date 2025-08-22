<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { toDate } from 'reka-ui/date'
import { h } from 'vue'
import { z } from 'zod'

import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'
import { cn } from '@/lib/utils'

interface ItemRecord {
  id: string
  label: string
}

const items: ItemRecord[] = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' },
]

const schema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),

  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),

  subscriptionType: z.enum(['all', 'mentions', 'none'], {
    required_error: 'You need to select a notification type.',
  }),

  mobile: z.boolean(),

  items: z
    .array(z.string())
    .refine(value => value.some(item => item), {
      message: 'You have to select at least one item.',
    }),

  dob: z.string({
    required_error: 'A date of birth is required.',
  }),

  marketing_emails: z.boolean().default(false).optional(),

  security_emails: z.boolean().optional(),

  subscription: z.boolean().default(false).optional(),
})

const formSchema = toTypedSchema(schema)

const initialValues = {
  mobile: false,
  items: ['recents', 'home'],
  subscription: false,
}

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as z.infer<typeof schema>

  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-full rounded-md bg-primary text-primary-foreground p-4' },
      h('code', null, JSON.stringify(formValues, null, 2)),
    ),
  })
}

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
</script>

<template>
  <Form
    v-slot="{ meta }"
    :validation-schema="formSchema"
    :initial-values="initialValues"
    :disabled="true"
    @submit="onSubmit"
  >
    <div
      class="
        flex w-full flex-col space-y-6
        md:w-3/4
      "
    >
      <!-- Text Input -->
      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="shadcn" v-bind="componentField" />
          </FormControl>
          <FormMessage class="-mt-1.5" />
          <FormDescription>
            This is your public display name.
          </FormDescription>
        </FormItem>
      </FormField>

      <!-- Select -->
      <FormField v-slot="{ componentField, handleBlur, meta: fieldMeta }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <SelectTrigger
                :aria-invalid="fieldMeta.touched && !fieldMeta.valid"
                @blur="handleBlur"
              >
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="m@example.com">
                    m@example.com
                  </SelectItem>
                  <SelectItem value="m@google.com">
                    m@google.com
                  </SelectItem>
                  <SelectItem value="m@support.com">
                    m@support.com
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage class="-mt-1.5" />
          <FormDescription>
            You can manage email addresses in your
            <a
              href="#" class="
                text-primary underline-offset-4
                hover:underline
              "
            >email settings</a>.
          </FormDescription>
        </FormItem>
      </FormField>

      <!-- Textarea -->
      <FormField v-slot="{ componentField }" name="bio">
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize-none"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage class="-mt-1.5" />
          <FormDescription>
            You can <span>@mention</span> other users and organizations.
          </FormDescription>
        </FormItem>
      </FormField>

      <!-- Radio with array values -->
      <FormField v-slot="{ componentField }" type="radio" name="subscriptionType">
        <FormItem class="flex flex-col gap-3">
          <FormLabel>Notify me about...</FormLabel>
          <FormDescription class="-mt-2">
            Select the items you want to be notified about.
          </FormDescription>

          <FormMessage />
          <FormControl>
            <RadioGroup v-bind="componentField" class="flex flex-col gap-3">
              <FormItem class="flex flex-row space-x-2">
                <FormControl>
                  <RadioGroupItem value="all" />
                </FormControl>
                <FormLabel class="font-normal">
                  All new messages
                </FormLabel>
              </FormItem>
              <FormItem class="flex flex-row space-x-2">
                <FormControl>
                  <RadioGroupItem value="mentions" />
                </FormControl>
                <FormLabel class="font-normal">
                  Direct messages and mentions
                </FormLabel>
              </FormItem>
              <FormItem class="flex flex-row space-x-2">
                <FormControl>
                  <RadioGroupItem value="none" />
                </FormControl>
                <FormLabel class="font-normal">
                  Nothing
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      </FormField>

      <!-- Checkbox -->
      <FormField
        v-slot="{ value, handleChange }"
        name="mobile"
      >
        <FormItem class="flex flex-row items-start gap-3 rounded-md border p-4 shadow-xs">
          <FormControl>
            <Checkbox
              :model-value="value"
              @update:model-value="handleChange"
            />
          </FormControl>
          <div class="flex flex-col gap-1">
            <FormLabel class="leading-snug">
              Use different settings for my mobile devices
            </FormLabel>
            <FormDescription class="leading-snug">
              You can manage your mobile notifications in the
              <a
                href="/examples/forms"
                class="
                  text-primary underline-offset-4
                  hover:underline
                "
              >mobile settings</a> page.
            </FormDescription>
          </div>
          <FormMessage class="-mt-1.5" />
        </FormItem>
      </FormField>

      <!-- Checkbox 2 -->
      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="mobile"
      >
        <FormItem class="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <Checkbox
              :model-value="value"
              @update:model-value="handleChange"
            />
          </FormControl>
          <div class="flex w-full flex-col space-y-1 leading-none">
            <FormLabel>Use different settings for my mobile devices</FormLabel>
            <FormDescription>
              You can manage your mobile notifications in the
              <a
                href="/examples/forms"
                class="
                  text-primary underline-offset-4
                  hover:underline
                "
              >mobile settings</a> page.
            </FormDescription>
          </div>
          <FormMessage class="-mt-1.5" />
        </FormItem>
      </FormField>

      <!-- Checkbox with array values -->
      <FormField name="items">
        <FormItem>
          <div class="mb-4">
            <FormLabel class="text-base">
              Sidebar
            </FormLabel>
            <FormDescription>
              Select the items you want to display in the sidebar.
            </FormDescription>
          </div>

          <FormMessage />
          <FormField
            v-for="item in items" v-slot="{ value, handleChange }"
            :key="item.id"
            type="checkbox"
            :value="item.id"
            :unchecked-value="false"
            name="items"
          >
            <FormItem class="flex items-start gap-3">
              <FormControl>
                <Checkbox
                  :model-value="value.includes(item.id)"
                  @update:model-value="handleChange"
                />
              </FormControl>
              <FormLabel class="text-sm leading-tight font-normal">
                {{ item.label }}
              </FormLabel>
            </FormItem>
          </FormField>
        </FormItem>
      </FormField>

      <!-- Date picker -->
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
                  variant="outline"
                  :class="cn(
                    'w-[240px] pl-3 text-left font-normal',
                    !value && 'text-muted-foreground',
                  )"
                  :aria-invalid="fieldMeta.touched && !fieldMeta.valid"
                >
                  <span>
                    {{ value
                      ? df.format(toDate(parseDate(value)))
                      : 'Pick a date'
                    }}
                  </span>
                  <Icon icon="lucide:calendar" class="ml-auto opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0" align="start">
              <Calendar
                initial-focus
                mode="single"
                :max-value="today(getLocalTimeZone())"
                :model-value="value ? parseDate(value) : undefined"
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
          <FormMessage class="-mt-1.5" />
          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
        </FormItem>
      </FormField>

      <h3 class="mb-4 text-lg font-medium">
        Email Notifications
      </h3>

      <!-- Switch -->
      <div class="flex flex-col gap-4">
        <FormField
          v-slot="{ value, handleChange }"
          name="marketing_emails"
        >
          <FormItem
            class="flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs"
          >
            <div class="flex flex-col gap-0.5">
              <FormLabel class="leading-normal">
                Marketing emails
              </FormLabel>
              <FormDescription class="leading-snug">
                Receive emails about new products, features, and more.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <!-- Disabled Switch -->
        <FormField
          v-slot="{ value, handleChange }"
          name="security_emails"
        >
          <FormItem
            class="flex flex-row items-start justify-between rounded-lg border p-4 shadow-xs"
          >
            <div class="flex flex-col gap-0.5 opacity-60">
              <FormLabel class="leading-normal">
                Security emails
              </FormLabel>
              <FormDescription class="leading-snug">
                Receive emails about your account security.
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                :model-value="value"
                disabled
                aria-readonly
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>
      </div>

      <!-- Switch 2 -->
      <FormField
        v-slot="{ value, handleChange }"
        name="marketing_emails"
      >
        <FormItem class="flex flex-row items-start space-y-0 space-x-3">
          <FormControl>
            <FormControl>
              <Switch
                :model-value="value"
                @update:model-value="handleChange"
              />
            </FormControl>
          </FormControl>

          <div class="flex w-full flex-col space-y-0.5">
            <FormLabel>Marketing emails</FormLabel>
            <FormDescription>
              Receive emails about new products, features, and more.
            </FormDescription>
            <FormMessage />
          </div>
        </FormItem>
      </FormField>

      <!-- Other fields -->
    </div>

    <div
      class="
        mt-6 flex flex-col space-y-2
        sm:flex-row sm:space-x-2
      "
    >
      <Button
        type="submit"
        :disabled="!(meta.dirty && meta.valid)"
        class="
          w-full
          sm:w-min
        "
      >
        Submit
      </Button>

      <Button
        type="reset"
        variant="outline"
        class="
          w-full
          sm:w-min
        "
      >
        Reset
      </Button>
    </div>
  </Form>
</template>
