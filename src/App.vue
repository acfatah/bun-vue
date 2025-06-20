<script setup lang="ts">
import { useDark } from '@vueuse/core'
import BlankLayout from '@/layouts/BlankLayout.vue'

// vue-sonner
import { Sonner } from '@/components/ui/sonner'
import 'vue-sonner/style.css'

useDark()
</script>

<template>
  <Teleport to="body">
    <Sonner />
  </Teleport>
  <component :is="$route.meta.layout || BlankLayout" />
</template>
