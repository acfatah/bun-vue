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
    <Button size="xs">
      Extra Small
    </Button>

    <Button variant="secondary" size="xs">
      Secondary
    </Button>

    <Button variant="destructive" size="xs">
      Destructive
    </Button>

    <Button variant="outline" size="xs">
      Outline
    </Button>

    <Button variant="ghost" size="xs">
      Ghost
    </Button>

    <Button variant="link" size="xs">
      Link
    </Button>

    <!-- Extra small icon button -->
    <Button variant="secondary" size="xs" class="px-1.5!">
      <Icon icon="lucide:chevron-right" />
    </Button>

    <Button variant="outline" size="xs">
      <Icon icon="lucide:send" /> Send
    </Button>

    <Button variant="outline" size="xs">
      Learn More <Icon icon="lucide:arrow-right" />
    </Button>

    <Button disabled size="xs">
      <Icon icon="lucide:loader-2" class="animate-spin" />
      Please wait
    </Button>
  </div>
</template>
