<!-- eslint-disable no-console -->
<script setup lang="ts">
import { h, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ToastAction, useToast } from '@/components/ui/toast'

const { toast } = useToast()

const allTypes = [
  {
    name: 'Default',
    action: () => toast('Event has been created'),
  },

  {
    name: 'With Description',
    action: () =>
      toast('Event has been created', 'Monday, January 3rd at 6:00pm'),
  },

  {
    name: 'Description Only',
    action: () =>
      toast({
        description: 'Monday, January 3rd at 6:00pm',
      }),
  },

  {
    name: 'Destructive',
    action: () => toast({
      variant: 'destructive',
      title: 'Unable to create event!',
      action: h(ToastAction, {
        class: 'mr-2',
        altText: 'Retry',
        onClick: () => console.log('Retry'),
      }, 'Retry'),
    }),
  },

  {
    name: 'Action',
    action: () => toast({
      title: 'Event has been created',
      action: h(ToastAction, {
        class: 'mr-2',
        altText: 'Undo',
        onClick: () => console.log('Undo'),
      }, 'Undo'),
    }),
  },
]

const activeType = ref(allTypes[0])
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <Button
      variant="outline"
      class="md:w-fit"
      @click="() => toast('My first toast')"
    >
      Give me a toast
    </Button>

    <Button
      variant="outline"
      @click="() =>
        toast({
          title: 'Event has been created',
          description: 'Sunday, December 03, 2023 at 9:00 AM',
          action: h(ToastAction, {
            altText: 'Undo',
            onClick: () => console.log('Undo'),
          }, 'Undo'),
        })
      "
    >
      Show Toast
    </Button>

    <template v-for="type in allTypes" :key="type.name">
      <Button
        variant="ghost"
        :data-active="activeType.name === type.name"
        @click="() => {
          type.action()
          activeType = type
        }"
      >
        {{ type.name }}
      </Button>
    </template>
  </div>
</template>
