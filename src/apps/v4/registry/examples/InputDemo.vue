<script setup lang="ts">
import { Input } from '@/components/ui/input'
</script>

<template>
  <div
    class="
      flex flex-col flex-wrap gap-4
      md:flex-row
    "
  >
    <Input type="email" placeholder="Email" class="max-w-md" />
    <Input type="text" placeholder="Error" class="max-w-md" aria-invalid="true" />
    <Input type="password" placeholder="Password" class="max-w-md" />
    <Input type="number" placeholder="Number" class="max-w-md" />
    <Input type="file" placeholder="File" class="max-w-md" />
    <Input type="tel" placeholder="Tel" class="max-w-md" />
    <Input type="text" placeholder="Text" class="max-w-md" />
    <Input type="url" placeholder="URL" class="max-w-md" />
    <Input type="search" placeholder="Search" class="max-w-md" />
    <Input type="date" placeholder="Date" class="w-min" />
    <Input type="datetime-local" placeholder="Datetime Local" class="w-min" />
    <Input type="month" placeholder="Month" class="w-min" />
    <Input type="time" placeholder="Time" class="w-min" />
    <Input type="week" placeholder="Week" class="w-min" />
    <Input disabled placeholder="Disabled" class="max-w-md" />
  </div>
</template>
