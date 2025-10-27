/**
 * Data Table
 *
 * Powerful table and datagrids built using TanStack Table.
 *
 * Custom meta:
 * - sticky: boolean - whether the column is sticky
 * - stickyEnd: boolean - whether the column is sticky to the end
 * - wrap: boolean - whether the cell content should wrap
 */

import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export { default as DataTable } from './DataTable.vue'

export function valueUpdater<T extends Updater<any>>(updaterOrValue: T, ref: Ref) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}
