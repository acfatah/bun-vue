<script setup lang="ts">
import type { GenericObject, SubmissionHandler } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { h } from 'vue'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
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
import { useToast } from '@/components/ui/toast'

type LoginForm = z.infer<typeof schema>

const schema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }).max(50),
})

const formSchema = toTypedSchema(schema)

const onSubmit: SubmissionHandler<GenericObject> = function (values) {
  const formValues = values as LoginForm
  const { toast } = useToast()

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
  <Card class="w-sm">
    <CardHeader>
      <CardTitle>Login to your account</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
      <CardAction>
        <Button variant="link">
          Sign Up
        </Button>
      </CardAction>
    </CardHeader>

    <Form
      v-slot="{ meta }"
      :validation-schema="formSchema"
      class="space-y-6"
      @submit="onSubmit"
    >
      <CardContent class="space-y-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="m@example.com"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>
              Password
              <a
                href="#"
                class="
                  ml-auto inline-block text-sm underline-offset-4
                  hover:underline
                "
              >
                Forgot your password?
              </a>
            </FormLabel>
            <FormControl>
              <Input
                type="password"
                required
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </CardContent>

      <CardFooter class="flex flex-col gap-2 px-6">
        <Button
          type="submit"
          :disabled="!(meta.dirty && meta.valid)"
          class="w-full"
        >
          Login
        </Button>
        <Button
          variant="outline"
          class="w-full"
        >
          Login with Google
        </Button>
      </CardFooter>
    </Form>
  </Card>
</template>
