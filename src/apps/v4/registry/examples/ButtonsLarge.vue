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
    <Button size="lg">
      Large
    </Button>

    <Button variant="secondary" size="lg">
      Secondary
    </Button>

    <Button variant="destructive" size="lg">
      Destructive
    </Button>

    <Button variant="outline" size="lg">
      Outline
    </Button>

    <Button variant="ghost" size="lg">
      Ghost
    </Button>

    <Button variant="link" size="lg">
      Link
    </Button>

    <Button variant="secondary" size="icon" class="size-8">
      <Icon icon="lucide:chevron-right" />
    </Button>

    <Button variant="outline" size="lg">
      <Icon icon="lucide:send" /> Send
    </Button>

    <Button variant="outline" size="lg">
      Learn More <Icon icon="lucide:arrow-right" />
    </Button>

    <Button disabled size="lg">
      <Icon icon="lucide:loader-2" class="animate-spin" />
      Please wait
    </Button>
  </div>
</template>
