<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/toast'

type SubmissionRecord = z.infer<typeof schema>
const schema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
})

const formSchema = toTypedSchema(schema)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as SubmissionRecord
  const { toast } = useToast()

  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-full rounded-md bg-slate-950 dark:bg-slate-800 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(formValues, null, 2)),
    ),
  })
}
</script>

<template>
  <Form
    v-slot="{ meta }"
    class="space-y-6"
    :validation-schema="formSchema"
    @submit="onSubmit"
  >
    <FormField v-slot="{ componentField, handleBlur, meta: fieldMeta }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger
              class="w-[280px]"
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
        <FormDescription>
          You can manage email addresses in your
          <a
            class="
              font-medium underline-offset-4
              hover:underline
            " href="#/email/settings"
          >email settings</a>.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      :disabled="!(meta.dirty && meta.valid)"
    >
      Submit
    </Button>
  </Form>
</template>
