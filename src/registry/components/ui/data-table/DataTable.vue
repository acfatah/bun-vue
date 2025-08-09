<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  RowSelectionState,
  VisibilityState,
} from '@tanstack/vue-table'
import { Icon } from '@iconify/vue'

import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { valueUpdater } from './index'

const props = withDefaults(defineProps<{
  columns: ColumnDef<any, any>[]
  data: Record<string, any>[]
  class?: string
  pagination?: boolean
  filter?: boolean
  loading?: boolean
}>(), {
  pagination: true,
  filter: false,
  loading: false,
})

// Table state
// https://tanstack.com/table/latest/docs/api/core/table#state
const sorting = ref<ColumnSort[]>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref<RowSelectionState>({})

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  globalFilterFn: 'includesString',
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  enableColumnPinning: true,

  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
    get columnVisibility() { return { id: false, ...columnVisibility.value } },
    get rowSelection() { return rowSelection.value },
  },
})
</script>

<template>
  <div
    data-slot="data-table" :class="cn(
      `w-full`,
      // styles to make the first column sticky
      `
        [&_table_td:nth-child(1)]:sticky [&_table_td:nth-child(1)]:left-0
        [&_table_td:nth-child(1)]:bg-background
        sm:[&_table_td:nth-child(1)]:bg-transparent
        [&_table_th:nth-child(1)]:sticky [&_table_th:nth-child(1)]:left-0
        [&_table_th:nth-child(1)]:bg-background
        sm:[&_table_th:nth-child(1)]:bg-transparent
      `,
      props.class)"
  >
    <slot v-if="props.filter" name="filter" :table="table">
      <div class="flex w-full items-center gap-2 py-4">
        <Input
          class="w-full max-w-sm" placeholder="Quick search..."
          @update:model-value="table.setGlobalFilter(String($event))"
        />
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              <span
                class="
                  hidden
                  sm:inline
                "
              >Columns</span>
              <Icon icon="lucide:more-vertical" class="sm:hidden" />
              <Icon
                icon="lucide:chevrons-up-down"
                class="
                  hidden
                  sm:inline
                "
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
              :key="column.id"
              class="capitalize"
              :model-value="column.getIsVisible()"
              @update:model-value="(value) => {
                column.toggleVisibility(!!value)
              }"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </slot>

    <div
      class="
        w-full rounded-md border py-1
        [&_[data-slot='table-container']]:h-[532px]
        [&_[data-slot='table-container']]:overflow-y-hidden
      "
    >
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="props.loading">
            <TableCell :colspan="columns.length" class="h-[490px] text-center">
              <Icon
                icon="lucide:loader-circle"
                class="m-auto animate-spin"
              />
            </TableCell>
          </template>
          <template v-else-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows" :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>

    <slot v-if="props.pagination" name="pagination" :table="table">
      <div
        class="
          flex flex-col items-center justify-between gap-y-2 pt-4
          sm:flex-row
        "
      >
        <div class="text-sm whitespace-nowrap text-muted-foreground">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>

        <Pagination
          v-slot="{ page: currentPage }"
          class="
            flex
            sm:justify-end
          "
          show-edges
          :sibling-count="1"
          :page="table.getState().pagination.pageIndex + 1"
          :items-per-page="10"
          :total="table.getRowCount()"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationFirst
              :disabled="!table.getCanPreviousPage()"
              @click="table.setPageIndex(0)"
            />

            <PaginationPrevious
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            />

            <template v-for="(page, index) in items">
              <PaginationItem
                v-if="page.type === 'page'"
                :key="index"
                :value="page.value"
                :is-active="page.value === currentPage"
                @click="table.setPageIndex(page.value - 1)"
              >
                {{ page.value }}
              </PaginationItem>

              <PaginationEllipsis
                v-else
                :key="page.type"
                :index="index"
              />
            </template>

            <PaginationNext
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            />

            <PaginationLast
              :disabled="!table.getCanNextPage()"
              @click="table.setPageIndex(table.getPageCount() - 1)"
            />
          </PaginationContent>
        </Pagination>
      </div>
    </slot>
  </div>
</template>

<style>
@reference '@/styles/global.css';

table tr[data-state='selected'] td:nth-child(1) {
  @apply bg-muted;
}
</style>
