<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu :viewport="false">
    <NavigationMenuList>
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

      <NavigationMenuItem>
        <NavigationMenuTrigger>List</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[300px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  <div class="font-medium">
                    Components
                  </div>
                  <div class="text-muted-foreground">
                    Browse all components in the library.
                  </div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  <div class="font-medium">
                    Documentation
                  </div>
                  <div class="text-muted-foreground">
                    Learn how to use the library.
                  </div>
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  <div class="font-medium">
                    Blog
                  </div>
                  <div class="text-muted-foreground">
                    Read our latest blog posts.
                  </div>
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>Simple List</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4">
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  Components
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  Documentation
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#">
                  Blocks
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul class="grid w-[200px] gap-4 bg-background text-foreground">
            <li>
              <NavigationMenuLink as-child>
                <RouterLink to="#" class="flex-row items-center gap-2">
                  <Icon icon="lucide:circle-help" />
                  Backlog
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#" class="flex-row items-center gap-2">
                  <Icon icon="lucide:circle" />
                  To Do
                </RouterLink>
              </NavigationMenuLink>
              <NavigationMenuLink as-child>
                <RouterLink to="#" class="flex-row items-center gap-2">
                  <Icon icon="lucide:check" />
                  Done
                </RouterLink>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
