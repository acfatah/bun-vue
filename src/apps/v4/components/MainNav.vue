<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const props = defineProps<{
  items: { href: string, label: string }[]
  class?: string
}>()

const delegatedProps = reactiveOmit(props, 'class')
const route = useRoute()
</script>

<template>
  <nav
    v-bind="delegatedProps"
    :class="cn('items-center gap-0.5', props.class)"
  >
    <Button
      v-for="item in props.items"
      :key="item.href"
      variant="ghost" as-child size="sm"
    >
      <RouterLink
        :to="item.href"
        :class="cn(route.path === item.href && 'text-primary')"
      >
        {{ item.label }}
      </RouterLink>
    </Button>
  </nav>
</template>
