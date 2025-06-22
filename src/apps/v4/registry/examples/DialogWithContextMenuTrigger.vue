<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
</script>

<template>
  <Dialog>
    <ContextMenu>
      <ContextMenuTrigger>
        <div class="no-wrap w-[120px] rounded border p-4 text-center text-sm select-none">
          Right click
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem disabled>
          Open
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Download
        </ContextMenuItem>
        <DialogTrigger as-child>
          <ContextMenuItem>
            <span>Delete</span>
          </ContextMenuItem>
        </DialogTrigger>
      </ContextMenuContent>
    </ContextMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
