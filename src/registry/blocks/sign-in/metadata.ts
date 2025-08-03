import type { RegistryItem } from '@/schema'

export const metadata = {
  type: 'registry:block',
  name: 'sign-in',
  title: 'Sign In Form',
  description: 'Sign In form with email and password fields.',
  docs: 'Remember to add CenteredLayout as meta.layout to the login route.',
  files: [
    {
      path: 'layouts/CenteredLayout.vue',
      type: 'registry:component',
      target: 'src/layouts/CenteredLayout.vue',
    },
    {
      path: 'pages/SignIn.vue',
      type: 'registry:page',
      target: 'src/pages/SignIn.vue',
    },
    {
      path: 'router/sign-in.ts',
      type: 'registry:file',
      target: 'src/router/sign-in.ts',
    },
  ],
} satisfies RegistryItem
