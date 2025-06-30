import { Icon } from '@iconify/vue'
import { createColumnHelper } from '@tanstack/vue-table'
import { h } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Payment } from '../data/payments.ts'
import DropdownAction from './DefaultDataTableDropdown.vue'

// The column definitions
// https://tanstack.com/table/latest/docs/guide/column-defs
const columnHelper = createColumnHelper<Payment>()

const statusMap = {
  success: 'success',
  processing: 'info',
  failed: 'error',
} as const

export const columns = [
  // Select column
  columnHelper.group({
    id: 'select',
    header: ({ table }) => h(Checkbox, {
      'modelValue': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
      'class': 'mx-2',
    }),
    cell: ({ row }) => h(Checkbox, {
      'modelValue': row.getIsSelected(),
      'onUpdate:modelValue': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
      'class': 'mx-2',
    }),
    enableSorting: false,
    enableHiding: false,
  }),

  // Status column
  columnHelper.accessor('status', {
    header: () => 'Status',
    cell: ({ row }) => h(Badge, {
      class: 'capitalize',
      variant: statusMap[row.getValue('status') as keyof typeof statusMap],
    }, () => row.getValue('status')),
  }),

  // Email column
  columnHelper.accessor('email', {
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        class: 'pl-0',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Email', h(Icon, { icon: 'lucide:arrow-up-down' })])
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
