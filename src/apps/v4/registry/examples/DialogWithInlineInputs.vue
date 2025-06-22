<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { toast } from '@/components/ui/toast'

type SubmissionRecord = z.infer<typeof schema>
const schema = z.object({
  name: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
})

const formSchema = toTypedSchema(schema)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as SubmissionRecord

  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-full rounded-md bg-primary text-primary-foreground p-4' },
      h('code', null, JSON.stringify(formValues, null, 2)),
    ),
  })
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Edit Profile (Inline Inputs)
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-md">
      <Form
        v-slot="{ meta }"
        :validation-schema="formSchema"
        class="space-y-4"
        @submit="onSubmit"
      >
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="sm:col-span-full sm:grid-cols-4">
            <FormLabel>
              Name
            </FormLabel>
            <FormControl class="sm:col-span-3">
              <Input type="text" placeholder="Pedro Duarte" v-bind="componentField" />
            </FormControl>
            <FormMessage class="col-span-full col-start-2 -mt-2" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="username">
          <FormItem class="sm:col-span-full sm:grid-cols-4">
            <FormLabel class="col-span-1">
              Username
            </FormLabel>
            <FormControl class="sm:col-span-3">
              <Input type="text" placeholder="@peduarte" v-bind="componentField" />
            </FormControl>
            <FormMessage
              class="
                -mt-2
                sm:col-start-2
              "
            />
            <FormDescription class="col-span-full col-start-2">
              This is your public display name.
            </FormDescription>
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose :as="Button" variant="outline">
            Close
          </DialogClose>
          <Button
            type="submit"
            :disabled="!(meta.dirty && meta.valid)"
          >
            Save changes
          </Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>
