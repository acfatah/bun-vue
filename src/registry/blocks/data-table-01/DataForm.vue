<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import type { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'

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
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
// import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toast'

import { labels } from './columns'
import { schema } from './schema'

const props = defineProps<{
  data: typeof userFormSchema
}>()

const userFormSchema = toTypedSchema(schema)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as z.infer<typeof schema>

  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-full rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(formValues, null, 2))),
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
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
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
          You can manage verified email addresses in your email settings.
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
      <FormItem>
        <FormLabel>{{ labels.active }}</FormLabel>
        <FormControl>
          <Switch :model-value="!!value" @update:model-value="handleChange" />
        </FormControl>
        <FormDescription>
          You can <span>@mention</span> other users and organizations to link to them.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="credit">
      <FormItem>
        <FormLabel>{{ labels.credit }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
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
