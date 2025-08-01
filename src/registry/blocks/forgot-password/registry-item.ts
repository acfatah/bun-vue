import type { RegistryItem } from '@/schema'

export const registryItem = {
  type: 'registry:block',
  name: 'forgot-password',
  title: 'Forgot Password Form',
  description: 'Forgot password form.',
  docs: 'Remember to add CenteredLayout as meta.layout to the login route.',
  files: [
    {
      path: 'layouts/CenteredLayout.vue',
      type: 'registry:component',
      target: 'src/layouts/CenteredLayout.vue',
    },
    {
      path: 'pages/ForgotPassword.vue',
      type: 'registry:page',
      target: 'src/pages/ForgotPassword.vue',
    },
    {
      path: 'router/forgot-password.ts',
      type: 'registry:file',
      target: 'src/router/forgot-password.ts',
    },
  ],
} satisfies RegistryItem
