<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const SIDES = ['top', 'right', 'bottom', 'left'] as const
</script>

<template>
  <div class="flex flex-wrap items-start gap-4">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">
          Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>

    <div class="flex gap-2">
      <Tooltip v-for="side in SIDES" :key="side">
        <TooltipTrigger as-child>
          <Button variant="outline" class="capitalize">
            {{ side }}
          </Button>
        </TooltipTrigger>
        <TooltipContent :side>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>

    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="ghost" size="icon">
          <Icon icon="lucide:info" />
          <span class="sr-only">Info</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent
        class="md:max-w-sm"
      >
        To learn more about how this works, check out the docs. If you have
        any questions, please reach out to us.
      </TooltipContent>
    </Tooltip>
  </div>
</template>
