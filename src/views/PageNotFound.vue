<script setup lang="ts">
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'

const router = useRouter()

function goBack() {
  if (window.history.length > 1) {
    router.back()
  }
  else {
    router.push('/')
  }
}
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center">
    <div class="flex flex-col items-center">
      <div class="flex items-center">
        <span class="text-4xl font-bold">404</span>
        <div class="mx-4 h-8 w-px bg-gray-300" />
        <p class="font-light">
          The requested page could not be found.
        </p>
      </div>
      <a
        :class="cn(
          'ml-auto pr-0',
          'inline-flex shrink-0 items-center justify-center gap-2',
          'rounded-md outline-none',
          'text-sm font-medium whitespace-nowrap cursor-pointer',
          'transition-all',
          'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'disabled:pointer-events-none disabled:opacity-50',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
          'dark:aria-invalid:ring-destructive/40',
          `[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
          'text-primary underline-offset-4 hover:underline',
        )"
        @click="goBack"
      >
        Go Back
      </a>
    </div>
  </main>
</template>
