import type { RegistryItem } from '@/schema'

export const metadata = {
  type: 'registry:block',
  name: 'sign-up',
  title: 'Sign Up Form',
  description: 'Sign up form.',
  docs: 'Remember to add CenteredLayout as meta.layout to the login route.',
  files: [
    {
      path: 'layouts/CenteredLayout.vue',
      type: 'registry:component',
      target: 'src/layouts/CenteredLayout.vue',
    },
    {
      path: 'pages/SignUp.vue',
      type: 'registry:page',
      target: 'src/pages/SignUp.vue',
    },
    {
      path: 'router/sign-up.ts',
      type: 'registry:file',
      target: 'src/router/sign-up.ts',
    },
  ],
} satisfies RegistryItem
