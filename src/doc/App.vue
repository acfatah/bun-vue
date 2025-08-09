<script setup lang="ts">
import { useDark } from '@vueuse/core'
import BlankLayout from './layouts/BlankLayout.vue'

useDark()
</script>

<template>
  <Suspense>
    <component :is="$route.meta.layout || BlankLayout" />
  </Suspense>
</template>
