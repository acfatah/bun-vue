<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'

const stargazers = ref(0)

function click() {
  window.open('https://github.com/unovue/shadcn-vue', '_blank')
}

onMounted(async () => {
  try {
    const data = await fetch('https://api.github.com/repos/unovue/shadcn-vue', {
      headers: {
        'Cache-Control': 'max-age=86400', // Cache for 1 day (86400 seconds)
      },
    })

    const json = await data.json()
    stargazers.value = json.stargazers_count
  }
  catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <Button
    size="sm"
    variant="ghost"
    class="h-8 shadow-none"
    @click="click"
  >
    <Icon icon="cib:github" class="size-4" />
    <span class="text-muted-foreground w-min text-xs tabular-nums">
      {{ stargazers >= 1000 ? `${(stargazers / 1000).toFixed(1)}k` : stargazers.toLocaleString() }}
    </span>
  </Button>
</template>
