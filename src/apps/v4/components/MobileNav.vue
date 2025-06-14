<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import MobileLink from './MobileLink.vue'

interface LinkProps {
  type: 'folder' | 'page'
  path: string
  children?: (LinkProps | { name: string, url: string })[]
}

const props = withDefaults(defineProps<{
  /** typeof source.pageTree */
  tree?: LinkProps[]
  items: { href: string, label: string }[]
  class?: HTMLAttributes['class']
}>(), {
  tree: () => [],
})
</script>

<template>
  <Popover v-slot="{ open, setOpen }">
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        :class="cn(
          'extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent',
          props.class,
        )"
      >
        <div class="relative flex h-8 w-4 items-center justify-center">
          <div class="relative size-4">
            <span
              :class="cn(
                'absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100',
                open ? 'top-[0.4rem] -rotate-45' : 'top-1',
              )"
            />
            <span
              :class="cn(
                'bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100',
                open ? 'top-[0.4rem] rotate-45' : 'top-2.5',
              )"
            />
          </div>
          <span class="sr-only">Toggle Menu</span>
        </div>
        <span class="flex h-8 items-center text-lg leading-none font-medium">
          Menu
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent
      class="no-scrollbar h-(--reka-popper-available-height) w-(--reka-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
      align="start"
      side="bottom"
      :align-offset="-16"
      :side-offset="14"
    >
      <div class="flex flex-col gap-12 overflow-auto px-6 py-6">
        <div class="flex flex-col gap-4">
          <div class="text-muted-foreground text-sm font-medium">
            Menu
          </div>
          <div class="flex flex-col gap-3">
            <MobileLink href="/" :on-open-change="setOpen">
              Home
            </MobileLink>
            <template v-for="item in items" :key="item.href">
              <MobileLink :href="item.href" :on-open-change="setOpen">
                {{ item.label }}
              </MobileLink>
            </template>
          </div>
        </div>

        <!--
        <div class="flex flex-col gap-8">
          <template v-for="(group, index) in (props.tree?.children || [])" :key="index">
            <div v-if="group.type === 'folder'" class="flex flex-col gap-4">
              <div class="text-muted-foreground text-sm font-medium">
                {{ group.name }}
              </div>
              <div class="flex flex-col gap-3">
                <template v-for="child in group.children">
                  <MobileLink
                    v-if="group.type === 'page'"
                    :key="`${child.url}-${index}`"
                    :href="child.url"
                    :on-open-change="setOpen"
                  >
                    {{ child.name }}
                  </MobileLink>
                </template>
              </div>
            </div>
          </template>
        </div>
        -->
      </div>
    </PopoverContent>
  </Popover>
</template>
