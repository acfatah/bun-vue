import type { RegistryItem } from '@/schema'

export const metadata = {
  type: 'registry:block',
  name: 'sidebar-08',
  title: 'Sidebar 08',
  description: 'An inset sidebar with secondary navigation.',
  categories: ['sidebar'],
  files: [
    {
      path: 'layouts/SidebarInsetLayout/Header.vue',
      type: 'registry:file',
      target: 'src/layouts/SidebarInsetLayout/Header.vue',
    },
    {
      path: 'layouts/SidebarInsetLayout/index.ts',
      type: 'registry:file',
      target: 'src/layouts/SidebarInsetLayout/index.ts',
    },
    {
      path: 'layouts/SidebarInsetLayout/sidebar-menu.ts',
      type: 'registry:file',
      target: 'src/layouts/SidebarInsetLayout/sidebar-menu.ts',
    },
    {
      path: 'layouts/SidebarInsetLayout/SidebarInsetLayout.vue',
      type: 'registry:file',
      target: 'src/layouts/SidebarInsetLayout/SidebarInsetLayout.vue',
    },
    {
      path: 'pages/Sidebar08.vue',
      type: 'registry:page',
      target: 'src/pages/Sidebar08.vue',
    },
    {
      path: 'router/sidebar-08.ts',
      type: 'registry:file',
      target: 'src/router/sidebar-08.ts',
    },
  ],
} satisfies RegistryItem
