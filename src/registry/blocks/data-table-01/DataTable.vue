<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { DataTable } from '@/components/ui/data-table'

// See the `payment-columns.ts` file to see how columns are defined.
import columns from './columns.ts'

const data = ref<Record<string, any>[]>([])
const isLoading = ref(false)

async function fetchData() {
  isLoading.value = true

  // In a real implementation, the data may come from an API request.
  const data = await import('./data/users.ts').then(m => m.data)
  await new Promise(resolve => setTimeout(resolve, 1000))

  isLoading.value = false

  return data
}

onMounted(async () => {
  data.value = await fetchData()
})
</script>

<template>
  <DataTable :columns="columns" :data="data" :loading="isLoading" />
</template>
