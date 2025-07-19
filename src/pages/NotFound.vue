<script setup lang="ts">
import { useRouter } from 'vue-router'

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
      <btn
        class="
          ml-auto h-min cursor-default rounded-xs p-0
          hover:underline
        "
        @click="goBack"
      >
        Go Back
      </btn>
    </div>
  </main>
</template>
