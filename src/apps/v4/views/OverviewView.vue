<script setup lang="ts">
import ComponentWrapper from '../components/ComponentWrapper.vue'

import AccordionDemo from '../registry/examples/AccordionDemo.vue'
import AlertDemo from '../registry/examples/AlertDemo.vue'
</script>

<template>
  <main class="flex flex-1 flex-col justify-center">
    <div class="@container grid flex-1 gap-4 p-4">
      <ComponentWrapper name="Accordion">
        <div class="grid w-full max-w-xl gap-4">
          <AccordionDemo />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="Alert">
        <div class="grid w-full max-w-xl gap-4">
          <AlertDemo />
        </div>
      </ComponentWrapper>
    </div>
  </main>
</template>
