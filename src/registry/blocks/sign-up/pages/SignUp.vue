<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { h, ref } from 'vue'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

const schema = z.object({
  firstName: z
    .string({ message: 'First name is required.' }),

  lastName: z
    .string({ message: 'Last name is required.' }),

  email: z
    .string({ message: 'Email cannot be empty' })
    .pipe(z.email('Email is invalid')),

  password: z
    .string({ message: 'Password cannot be empty.' })
    .min(6, {
      message: 'Password must be at least 6 characters.',
    }),

  confirmPassword: z
    .string({ message: 'Confirm password cannot be empty.' }),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmPassword'],
      message: 'Passwords do not match.',
    })
  }
})

type FormValues = z.infer<typeof schema>
const formSchema = toTypedSchema(schema)
const loading = ref(false)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as FormValues

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
    class="w-full"
    :validation-schema="formSchema"
    @submit="onSubmit"
  >
    <Card class="m-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-xl">
          Sign Up
        </CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" placeholder="Max" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField" placeholder="Robinson" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" v-bind="componentField" placeholder="m@example.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="flex items-center">
              Password
            </FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" placeholder="******" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel class="flex items-center">
              Repeat Password
            </FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" placeholder="******" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter class="grid gap-4">
        <Button
          type="submit"
          class="w-full"
          :disabled="loading || (meta.touched && !meta.valid)"
        >
          Create an account
        </Button>

        <Button variant="outline" class="w-full">
          Sign up with GitHub
        </Button>

        <div class="text-center text-sm">
          Already have an account?
          <RouterLink to="/login" class="underline">
            Sign in
          </RouterLink>
        </div>
      </CardFooter>
    </Card>
  </Form>
</template>
