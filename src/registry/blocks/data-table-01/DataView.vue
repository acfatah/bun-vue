<script setup lang="ts">
import type { UserRecord } from './schema'

import { Label } from '@/components/ui/label'
import { formatter, labels } from './columns'

defineProps<{
  data: UserRecord
}>()
</script>

<template>
  <div class="-mx-6 mt-2 flex-grow space-y-4 overflow-y-auto px-6 text-sm">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.username }}</Label>
          <p>{{ data?.username }}</p>
        </div>
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.id }}</Label>
          <p>{{ data?.id }}</p>
        </div>
      </div>
    </div>

    <div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.email }}</Label>
          <p>{{ data?.email }}</p>
        </div>
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.active }}</Label>
          <p :class="data?.active ? 'text-green-500' : 'text-red-500'">
            {{ formatter.active(data?.active) }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.credit }}</Label>
          <p>{{ formatter.credit(data?.credit) }}</p>
        </div>
        <div class="space-y-1">
          <Label class="text-muted-foreground">{{ labels.expiry }}</Label>
          <p>{{ formatter.expiry(data?.expiry) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
