<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

// eslint-disable-next-line import/no-named-default
import { default as ListItem } from './NavigationMenuItem.vue'

const components: { title: string, href: string, description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            class="
              grid gap-2 py-2
              md:w-[400px]
              lg:w-[500px] lg:grid-cols-[.75fr_1fr]
            "
          >
            <li class="row-span-3">
              <NavigationMenuLink
                as-child class="
                  flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b from-muted/50
                  to-muted p-6 no-underline outline-hidden select-none
                  focus:shadow-md
                "
              >
                <a href="/">
                  <div class="mt-4 mb-2 text-lg font-medium">
                    shadcn/ui
                  </div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </a>
              </NavigationMenuLink>
            </li>
            <ListItem to="/docs" title="Introduction">
              Re-usable components built using Radix UI and Tailwind CSS.
            </ListItem>
            <ListItem to="/docs/installation" title="Installation">
              How to install dependencies and structure your app.
            </ListItem>
            <ListItem to="/docs/primitives/typography" title="Typography">
              Styles for headings, paragraphs, lists...etc
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul
            class="
              grid w-[400px] gap-2 p-4
              md:w-[500px] md:grid-cols-2
              lg:w-[600px]
            "
          >
            <ListItem
              v-for="component in components"
              :key="component.title"
              :title="component.title"
              :to="component.href"
            >
              {{ component.description }}
            </ListItem>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          as-child
          :class="navigationMenuTriggerStyle()"
        >
          <RouterLink to="/docs">
            Documentation
          </RouterLink>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
