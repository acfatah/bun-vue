<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button disabled>
    <Icon icon="lucide:loader-2" class="animate-spin" />
    Please wait
  </Button>
</template>
