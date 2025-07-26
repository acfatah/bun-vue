import type { RegistryItem } from '@/registry/schema'

export const registryItem = {
  type: 'registry:block',
  name: 'Registration',
  title: 'Basic Registration Form',
  description: 'Basic registration form.',
  docs: 'Remember to add CenteredLayout as meta.layout to the login route.',
  files: [
    {
      path: 'layouts/CenteredLayout.vue',
      type: 'registry:component',
      target: 'src/layouts/CenteredLayout.vue',
    },
    {
      path: 'pages/Register.vue',
      type: 'registry:page',
      target: 'src/pages/Register.vue',
    },
    {
      path: 'router/register.ts',
      type: 'registry:file',
      target: 'src/router/register.ts',
    },
  ],
} satisfies RegistryItem
