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
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

const schema = z.object({
  email: z
    .string({ message: 'Email cannot be empty' })
    .pipe(z.email('Email is invalid')),

  password: z
    .string()
    .min(6, {
      message: 'Password must be at least 6 characters.',
    }),
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
  <Card class="w-full max-w-sm">
    <Form
      v-slot="{ meta }"
      class="w-full"
      :validation-schema="formSchema"
      @submit="onSubmit"
    >
      <CardHeader>
        <CardTitle class="text-2xl">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>

      <CardContent class="grid gap-4">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" v-bind="componentField" placeholder="m@example.com" />
            </FormControl>
            <!-- <FormDescription>
              Your email
            </FormDescription> -->
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="flex items-center">
              Password
              <RouterLink to="/reset-password" class="ml-auto text-sm underline">
                Forgot your password?
              </RouterLink>
            </FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" placeholder="******" />
            </FormControl>
            <!-- <FormDescription>
              Your password
            </FormDescription> -->
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
          Login
        </Button>

        <Button variant="outline" class="w-full">
          Login with Google
        </Button>

        <div class="text-center text-sm">
          Don't have an account?
          <RouterLink to="/register" class="underline">
            Sign up
          </RouterLink>
        </div>
      </CardFooter>
    </Form>
  </Card>
</template>
