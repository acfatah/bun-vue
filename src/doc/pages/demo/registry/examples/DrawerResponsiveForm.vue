<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { createReusableTemplate, useMediaQuery } from '@vueuse/core'
import { h, ref } from 'vue'
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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

// Reuse `form` section
const [UseTemplate, EditProfileForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')

const isOpen = ref(false)
</script>

<template>
  <UseTemplate>
    <Form
      v-slot="{ meta }"
      :validation-schema="formSchema"
      class="space-y-4"
      @submit="onSubmit"
    >
      <FormField v-slot="{ componentField }" name="name">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Pedro Duarte" v-bind="componentField" />
          </FormControl>
          <FormMessage class="-mt-2" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="@peduarte" v-bind="componentField" />
          </FormControl>
          <FormMessage class="-mt-2" />
          <FormDescription>
            This is your public display name.
          </FormDescription>
        </FormItem>
      </FormField>

      <DialogFooter>
        <DialogClose v-show="isDesktop" :as="Button" variant="outline">
          Cancel
        </DialogClose>
        <Button
          type="submit"
          :disabled="!(meta.dirty && meta.valid)"
        >
          Save changes
        </Button>
      </DialogFooter>
    </Form>
  </UseTemplate>

  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button variant="outline" class="md:w-min">
        Responsive Dialog
      </Button>
    </DialogTrigger>

    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>

      <EditProfileForm />
    </DialogContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <Button variant="outline">
        Edit Profile
      </Button>
    </DrawerTrigger>

    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>Edit profile</DrawerTitle>
        <DrawerDescription>
          Make changes to your profile here. Click save when you're done.
        </DrawerDescription>
      </DrawerHeader>

      <div class="px-4">
        <EditProfileForm />
      </div>

      <DrawerFooter class="pt-2">
        <DrawerClose as-child>
          <Button variant="outline" class="w-full">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
