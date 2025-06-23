<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Progress } from '@/components/ui/progress'

const progress = ref(13)

onMounted(() => {
  const timer = setTimeout(() => progress.value = 66, 500)
  onUnmounted(() => clearTimeout(timer))
})
</script>

<template>
  <Progress :model-value="progress" class="w-[60%]" />
</template>
