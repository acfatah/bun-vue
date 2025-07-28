<script setup lang="ts">
import { useDark } from '@vueuse/core'
import BlankLayout from '@/layouts/BlankLayout.vue'

useDark()
</script>

<template>
  <component :is="$route.meta.layout || BlankLayout" />
</template>
