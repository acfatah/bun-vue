<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="flex flex-1 flex-col justify-center">
    <section class="border-grid">
      <div class="container-wrapper">
        <div class="container flex flex-col items-center gap-2 py-8 text-center md:py-16 lg:py-20 xl:gap-4">
          <Badge variant="secondary">
            New shadcn/ui v4<Icon icon="lucide:arrow-right" class="size-6" />
          </Badge>
          <h1 class="text-primary leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
            Shadcn-Vue UI Components
          </h1>
          <p class="text-foreground max-w-3xl text-base text-balance sm:text-lg">
            Elevate Your Vue 3 Projects with <br class="inline xl:hidden">Shadcn/UI Design System.
          </p>
          <div class="flex w-full items-center justify-center gap-2 pt-2 **:data-[slot=button]:shadow-none">
            <Button size="sm" as="a" href="https://shadcn-vue.com/themes" target="_blank" rel="noopener noreferrer">
              Browse Themes
            </Button>
            <Button variant="ghost" size="sm" as="a" href="https://github.com/shadcn/shadcn-ui" target="_blank" rel="noopener noreferrer">
              Documentation
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
