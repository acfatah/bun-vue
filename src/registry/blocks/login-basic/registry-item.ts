import type { RegistryItem } from '@/registry/schema'

export const registryItem = {
  type: 'registry:block',
  name: 'login-basic',
  title: 'Basic Login Form',
  description: 'Basic login form with email and password fields.',
  docs: 'Remember to add CenteredLayout as meta.layout to the login route.',
  files: [
    {
      path: 'layouts/CenteredLayout.vue',
      type: 'registry:component',
      target: 'src/layouts/CenteredLayout.vue',
    },
    {
      path: 'pages/Login.vue',
      type: 'registry:page',
      target: 'src/pages/Login.vue',
    },
    {
      path: 'router/login.ts',
      type: 'registry:file',
      target: 'src/router/login.ts',
    },
  ],
} satisfies RegistryItem
