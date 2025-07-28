import { Icon } from '@iconify/vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { h } from 'vue'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Payment } from '../data/payments.ts'
import DropdownAction from './DefaultDataTableDropdown.vue'

// The column definitions
// https://tanstack.com/table/latest/docs/guide/column-defs
const columnHelper = createColumnHelper<Payment>()

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

  // Status column
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
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

  // Amount column
  columnHelper.accessor('amount', {
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    footer: props => props.column.getFacetedUniqueValues().size,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }),

  // Action column
  columnHelper.display({
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => h('div', { class: 'flex justify-end' }, h(DropdownAction, {
      payment: row.original,
      onExpand: row.toggleExpanded,
    })),
  }),
]

export default columns
