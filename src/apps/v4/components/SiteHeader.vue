<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import GithubLink from './GithubLink.vue'
// import { getColors } from '@/lib/colors'
import MainNav from './MainNav.vue'
import MobileNav from './MobileNav.vue'
import ModeSwitcher from './ModeSwitcher.vue'
import SiteConfig from './SiteConfig.vue'

// const colors = getColors()
const navItems = [
  { href: '#/docs', label: 'Docs' },
  { href: '#/docs/components', label: 'Components' },
  { href: '#/docs/blocks', label: 'Blocks' },
  { href: '#/docs/themes', label: 'Themes' },
  { href: '#/colors', label: 'Colors' },
]
</script>

<template>
  <header class="bg-background sticky top-0 z-50 w-full">
    <div class="container-wrapper 3xl:fixed:px-0 px-6">
      <div class="3xl:fixed:container flex h-(--header-height) items-center gap-2 **:data-[slot=separator]:!h-4">
        <MobileNav
          :items="navItems"
          class="flex lg:hidden"
        />
        <Button
          as-child
          variant="ghost"
          size="icon"
          class="hidden size-8 lg:flex"
        >
          <a href="/">
            <img src="/demo/icon/shadcn-vue.svg" alt="Shadcn Vue" class="size-5">
            <span class="sr-only">shadcn/ui</span>
          </a>
        </Button>
        <MainNav :items="navItems" class="hidden lg:flex" />
        <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <!--
          <div class="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
            <CommandMenu :tree="pageTree" :colors="colors" />
          </div>
          <Separator
            orientation="vertical"
            class="ml-2 hidden lg:block"
          />
          -->
          <GithubLink />
          <Separator orientation="vertical" class="3xl:flex hidden" />
          <SiteConfig class="3xl:flex hidden" />
          <Separator orientation="vertical" />
          <ModeSwitcher />
        </div>
      </div>
    </div>
  </header>
</template>
