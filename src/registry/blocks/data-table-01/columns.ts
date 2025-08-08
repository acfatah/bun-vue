import { Icon } from '@iconify/vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { h } from 'vue'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { UserRecord } from './schema'
import DropdownAction from './components/DropdownAction.vue'

// The column definitions
// https://tanstack.com/table/latest/docs/guide/column-defs
const columnHelper = createColumnHelper<UserRecord>()

export const columns = [
  // Select column
  columnHelper.group({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  }),

  // id
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: ({ row }) => h('div', null, row.getValue('id')),
  }),

  // username
  columnHelper.accessor('username', {
    header: () => 'Username',
    cell: ({ row }) => h('div', null, row.getValue('username')),
  }),

  // Email column
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(Icon, { icon: 'lucide:chevrons-up-down', class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  }),

  // Status column
  columnHelper.accessor('active', {
    header: () => 'Status',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('active') ? 'active' : 'inactive'),
  }),

  // Credit column
  columnHelper.accessor('credit', {
    header: () => h('div', { class: 'text-right' }, 'Credit'),
    footer: props => props.column.getFacetedUniqueValues().size,
    cell: ({ row }) => {
      const credit = Number.parseFloat(row.getValue('credit'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(credit)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),

  // Expiry column
  columnHelper.accessor('expiry', {
    header: () => 'Expiry',
    cell: ({ row }) => h('div', null, (row.getValue('expiry') as Date).toLocaleDateString()),
  }),

  // Action column
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, h(DropdownAction, {
      data: row.original,
      onExpand: row.toggleExpanded,
    })),
  }),
]

export default columns
