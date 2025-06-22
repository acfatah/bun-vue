<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/toast'

type SubmissionRecord = z.infer<typeof schema>
const schema = z.object({
  term: z.boolean().default(false),
  term2: z.boolean().default(false),
  notification: z.boolean().default(false).optional(),
  mobile: z.boolean().default(false).optional(),
})

const formSchema = toTypedSchema(schema)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as SubmissionRecord

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
    class="w-full space-y-6"
    :validation-schema="formSchema"
    @submit="onSubmit"
  >
    <FormField v-slot="{ value, handleChange }" type="checkbox" name="term">
      <FormItem class="flex gap-x-3">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
          <FormLabel>Accept terms and conditions</FormLabel>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="notification2">
      <FormItem class="flex gap-x-3">
        <FormControl>
          <Checkbox :model-value="value" disabled @update:model-value="handleChange" />
          <FormLabel>Enable Notifications</FormLabel>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="term2">
      <FormItem class="flex flex-row items-start space-y-0 gap-x-3 rounded-md border p-4 shadow">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="grid gap-1.5 font-normal">
          <FormLabel>Accept terms and conditions</FormLabel>
          <FormDescription>
            By clicking this checkbox, you agree to the terms and conditions.
          </FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="notification">
      <FormItem class="">
        <FormControl>
          <Label
            class="
              flex w-full items-start gap-3 rounded-lg border p-3
              hover:bg-accent/50
              has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
              dark:has-[[aria-checked=true]]:border-blue-900
              dark:has-[[aria-checked=true]]:bg-blue-950
            "
          >
            <Checkbox
              class="
                data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600
                data-[state=checked]:text-white
                dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700
              "
              :model-value="value" @update:model-value="handleChange"
            />
            <div class="grid gap-1.5 font-normal">
              <p class="text-sm leading-none font-medium">
                Enable notifications
              </p>
              <FormDescription>
                You can enable or disable at any time.
              </FormDescription>
              <FormMessage />
            </div>
          </Label>
        </FormControl>
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="mobile">
      <FormItem class="flex flex-row items-start space-y-0 gap-x-3 rounded-md border p-4 shadow">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="grid gap-1.5 font-normal">
          <FormLabel>Use different settings for my mobile devices</FormLabel>
          <FormDescription>
            You can manage your mobile notifications in the
            <a
              href="#" class="
                text-primary underline-offset-4
                hover:underline
              "
            >mobile settings</a> page.
          </FormDescription>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="float-right"
      :disabled="!(meta.dirty && meta.valid)"
    >
      Submit
    </Button>
  </Form>
</template>
