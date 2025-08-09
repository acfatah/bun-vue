<script setup lang="ts">
import type { VNode } from 'vue'
import { useRoute } from 'vue-router'
import router from '../router'

const route = useRoute()
const name = route.path.split('/').pop()
let metadata: any

try {
  metadata = await import(`@/blocks/${name}/metadata.ts`) satisfies {
    preview: {
      page: VNode
      layout?: string
    }
  }
}
catch (error) {
  console.error(error)

  if (!metadata)
    router.push({ name: 'not-found' })
}
</script>

<template>
  <template v-if="metadata && metadata.preview">
    <template v-if="metadata.preview.layout">
      <component :is="metadata.preview.layout">
        <component :is="metadata.preview.page" />
      </component>
    </template>

    <template v-else>
      <div class="p-1">
        <component :is="metadata.preview.page" />
      </div>
    </template>
  </template>
</template>
