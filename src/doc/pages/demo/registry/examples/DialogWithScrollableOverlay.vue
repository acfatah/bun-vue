<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        Scrollable Overlay
      </Button>
    </DialogTrigger>

    <DialogScrollContent class="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle>Scrollable Overlay Modal</DialogTitle>
        <DialogDescription>
          Here is modal with overlay scroll
        </DialogDescription>
      </DialogHeader>

      <div class="-mx-6 h-[300dvh] px-6 text-sm">
        <p class="mb-4 leading-normal">
          This is some placeholder content to show the scrolling behavior for modals.
          Instead of repeating the text in the modal, we use an inline style to set
          a minimum height, thereby extending the length of the overall modal and
          demonstrating the overflow scrolling. When content becomes longer than
          the height of the viewport, scrolling will move the modal as needed.
        </p>
      </div>

      <DialogFooter>
        <DialogClose :as="Button" variant="outline">
          Close
        </DialogClose>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>
