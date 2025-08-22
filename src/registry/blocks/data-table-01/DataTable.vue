<script setup lang="ts">
import type { UserRecord } from './schema'

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onMounted, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Sheet,
  // SheetClose,
  SheetContent,
  SheetDescription,
  // SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import DataForm from './DataForm.vue'
import DataView from './DataView.vue'

// See the `payment-columns.ts` file to see how columns are defined.
import { actions, columns } from './columns.ts'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')

const data = ref<UserRecord[]>([])
const selectedRow = ref<UserRecord | null>(null)
const isLoading = ref(false)
const isSheetFormVisible = ref(false)
const isViewDialogVisible = ref(false)
const currentRow = ref<UserRecord | null>(null)

async function fetchData() {
  isLoading.value = true

  // In a real implementation, the data may come from an API request.
  const data = await import('./data/users.ts').then(m => m.data)
  await new Promise(resolve => setTimeout(resolve, 1000))

  isLoading.value = false

  return data
}

actions.on('view', (row) => {
  isViewDialogVisible.value = true
  currentRow.value = row
})

actions.on('update', (row) => {
  isViewDialogVisible.value = false
  isSheetFormVisible.value = true
  selectedRow.value = row
})

onMounted(async () => {
  data.value = await fetchData()
})
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    :loading="isLoading"
  />

  <!-- View User -->
  <Dialog
    v-model:open="isViewDialogVisible"
    @close="currentRow = null"
  >
    <DialogContent
      class="
        flex max-h-[calc(100svh-2rem)] w-full flex-col
        sm:max-w-2xl
      "
    >
      <DialogHeader>
        <DialogTitle>User</DialogTitle>
        <DialogDescription>
          Some description.
        </DialogDescription>
      </DialogHeader>

      <DataView v-if="currentRow" :data="currentRow" />

      <DialogFooter>
        <Button @click="currentRow && actions.emit('update', currentRow)">
          Edit
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <!-- Edit User -->
  <Sheet
    v-model:open="isSheetFormVisible"
    @close="currentRow = null"
  >
    <SheetContent
      :side="mdAndLarger ? 'right' : 'bottom'"
      class="md:max-w-2xl"
    >
      <SheetHeader>
        <SheetTitle>Edit User</SheetTitle>
        <SheetDescription>
          Make changes to user. Click save when you're done.
        </SheetDescription>
      </SheetHeader>

      <DataForm v-if="selectedRow" :data="selectedRow" />
    </SheetContent>
  </Sheet>
</template>
