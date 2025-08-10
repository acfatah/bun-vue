<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { onMounted, ref } from 'vue'

// import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
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

// See the `payment-columns.ts` file to see how columns are defined.
import { actions, columns } from './columns.ts'

const breakpoints = useBreakpoints(breakpointsTailwind)
const mdAndLarger = breakpoints.greaterOrEqual('md')

const data = ref<Record<string, any>[]>([])
const selectedRow = ref<Record<string, any> | null>(null)
const isLoading = ref(false)
const isSheetFormVisible = ref(false)

async function fetchData() {
  isLoading.value = true

  // In a real implementation, the data may come from an API request.
  const data = await import('./data/users.ts').then(m => m.data)
  await new Promise(resolve => setTimeout(resolve, 1000))

  isLoading.value = false

  return data
}

actions.on('view', (_row) => {
  isSheetFormVisible.value = true
  // console.log(row)
})

actions.on('update', (row) => {
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

  <Sheet v-model:open="isSheetFormVisible">
    <SheetContent :side="mdAndLarger ? 'right' : 'bottom'" class="md:max-w-2xl">
      <SheetHeader>
        <SheetTitle>Edit User</SheetTitle>
        <SheetDescription>
          Make changes to your profile here. Click save when you're done.
        </SheetDescription>
      </SheetHeader>

      <DataForm :data="selectedRow" />

      <!-- <SheetFooter
        class="
          flex flex-col gap-2
          md:flex-row
        "
      >
        <SheetClose as-child>
          <Button
            variant="outline"
            type="reset"
            class="
              w-full
              md:ml-auto md:w-min
            "
          >
            Reset
          </Button>
          <Button
            type="submit"
            class="
              w-full
              md:w-min
            "
          >
            Save changes
          </Button>
        </SheetClose>
      </SheetFooter> -->
    </SheetContent>
  </Sheet>
</template>
