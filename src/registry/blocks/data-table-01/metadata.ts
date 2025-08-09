import { h } from 'vue'
import type { RegistryItem } from '@/schema'

import DataTable from './DataTable.vue'

export const metadata = {
  type: 'registry:block',
  name: 'data-table-01',
  title: 'Basic Datatable',
  description: 'A basic CRUD datatable with sorting, filtering, and row selection.',
  dependencies: [
    '@vee-validate/zod',
    'zod',
  ],
  registryDependencies: [
    'checkbox',
  ],
  files: [
    {
      path: './components/DropdownAction.vue',
      type: 'registry:page',
      target: 'src/pages/data-table-01/components/DropdownAction.vue',
    },
    {
      path: './data/users.ts',
      type: 'registry:file',
      target: 'src/pages/data-table-01/data/users.ts',
    },
    {
      path: './columns.ts',
      type: 'registry:file',
      target: 'src/pages/data-table-01/columns.ts',
    },
    {
      path: './DataForm.vue',
      type: 'registry:page',
      target: 'src/pages/data-table-01/DataForm.vue',
    },
    {
      path: './DataTable.vue',
      type: 'registry:page',
      target: 'src/pages/data-table-01/DataTable.vue',
    },
    {
      path: './schema.ts',
      type: 'registry:file',
      target: 'src/pages/data-table-01/schema.ts',
    },
  ],
} satisfies RegistryItem

export const preview = {
  page: h(DataTable),
}
