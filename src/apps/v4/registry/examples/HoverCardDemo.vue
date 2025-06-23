<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger as-child>
      <Button variant="link" class="w-min">
        @nextjs
      </Button>
    </HoverCardTrigger>

    <HoverCardContent class="w-80" side="bottom">
      <div class="flex justify-between gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/vercel.png" />
          <AvatarFallback>VC</AvatarFallback>
        </Avatar>
        <div class="flex flex-col gap-1">
          <h4 class="text-sm font-semibold">
            @nextjs
          </h4>
          <p class="text-sm">
            The React Framework - created and maintained by @vercel.
          </p>
          <div class="mt-1 flex items-center gap-2">
            <Icon icon="lucide:calendar" class="size-4 text-muted-foreground" />
            <span class="text-xs text-muted-foreground">
              Joined December 2021
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
