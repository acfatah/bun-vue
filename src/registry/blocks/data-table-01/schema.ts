import { z } from 'zod'

export const schema = z.object({
  id: z.string().optional(),

  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    }),

  email: z
    .string({ message: 'Email cannot be empty' })
    .pipe(z.email('Email is invalid')),

  active: z.boolean(),

  credit: z.number({
    message: 'A credit amount is required.',
  }),

  expiry: z.string().pipe(z.coerce.date()),
})

export type UserRecord = z.infer<typeof schema>
