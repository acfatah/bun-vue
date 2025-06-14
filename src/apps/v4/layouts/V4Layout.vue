<script setup lang="ts">
import { onMounted } from 'vue'
import { cn } from '@/lib/utils'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'

onMounted(() => {
  const body = document.body
  const styles = cn(
    'group/body overscroll-none antialiased',
    'font-sans text-foreground',
    '[--footer-height:calc(var(--spacing)*14)]',
    '[--header-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]',
  )

  body.classList.add(...styles.split(' '))
})
</script>

<template>
  <div class="relative z-10 flex min-h-svh flex-col bg-background">
    <SiteHeader />
    <RouterView />
    <SiteFooter />
  </div>
</template>
