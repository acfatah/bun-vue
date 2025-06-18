<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div
    class="
      mt-4 flex flex-wrap items-center gap-2
      md:flex-row
    "
  >
    <Button size="sm">
      Small
    </Button>
    <Button variant="secondary" size="sm">
      Secondary
    </Button>
    <Button variant="destructive" size="sm">
      Destructive
    </Button>
    <Button variant="outline" size="sm">
      Outline
    </Button>
    <Button variant="ghost" size="sm">
      Ghost
    </Button>
    <Button variant="link" size="sm">
      Link
    </Button>
    <Button variant="secondary" size="icon" class="size-8">
      <Icon icon="lucide:chevron-right" />
    </Button>
    <Button variant="outline" size="sm">
      <Icon icon="lucide:send" /> Send
    </Button>
    <Button variant="outline" size="sm">
      Learn More <Icon icon="lucide:arrow-right" />
    </Button>
    <Button disabled size="sm">
      <Icon icon="lucide:loader-2" class="animate-spin" />
      Please wait
    </Button>
  </div>
</template>
