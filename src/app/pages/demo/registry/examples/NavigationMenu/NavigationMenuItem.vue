<script setup lang="ts">
import { NavigationMenuLink } from 'reka-ui'

defineProps<{
  to: string
  title: string
}>()
</script>

<template>
  <li>
    <NavigationMenuLink as-child>
      <RouterLink :to="to">
        <div class="text-sm leading-none font-medium">
          {{ title }}
        </div>
        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
          <slot />
        </p>
      </RouterLink>
    </NavigationMenuLink>
  </li>
</template>
