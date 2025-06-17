<script setup lang="ts">
import ComponentWrapper from '../components/ComponentWrapper.vue'

import AccordionDemo from '../registry/examples/AccordionDemo.vue'
import AlertDemo from '../registry/examples/AlertDemo.vue'
import AlertDialogDemo from '../registry/examples/AlertDialogDemo.vue'
import AspectRatioDemo from '../registry/examples/AspectRatioDemo.vue'
import AvatarDemo from '../registry/examples/AvatarDemo.vue'
import BadgeDemo from '../registry/examples/BadgeDemo.vue'
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
      <ComponentWrapper name="Alert Dialog">
        <div class="grid w-full max-w-xl gap-4">
          <AlertDialogDemo />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="Aspect Ratio">
        <div class="grid w-full max-w-xl gap-4">
          <AspectRatioDemo />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="Avatar">
        <div class="grid w-full max-w-xl gap-4">
          <AvatarDemo />
        </div>
      </ComponentWrapper>
      <ComponentWrapper name="Badge">
        <div class="grid w-full max-w-xl gap-4">
          <BadgeDemo />
        </div>
      </ComponentWrapper>
    </div>
  </main>
</template>
