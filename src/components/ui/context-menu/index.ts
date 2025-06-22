import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as ContextMenu } from './ContextMenu.vue'
export { default as ContextMenuCheckboxItem } from './ContextMenuCheckboxItem.vue'
export { default as ContextMenuContent } from './ContextMenuContent.vue'
export { default as ContextMenuGroup } from './ContextMenuGroup.vue'
export { default as ContextMenuItem } from './ContextMenuItem.vue'
export { default as ContextMenuLabel } from './ContextMenuLabel.vue'
export { default as ContextMenuRadioGroup } from './ContextMenuRadioGroup.vue'
export { default as ContextMenuRadioItem } from './ContextMenuRadioItem.vue'
export { default as ContextMenuSeparator } from './ContextMenuSeparator.vue'
export { default as ContextMenuShortcut } from './ContextMenuShortcut.vue'
export { default as ContextMenuSub } from './ContextMenuSub.vue'
export { default as ContextMenuSubContent } from './ContextMenuSubContent.vue'
export { default as ContextMenuSubTrigger } from './ContextMenuSubTrigger.vue'
export { default as ContextMenuTrigger } from './ContextMenuTrigger.vue'
export { ContextMenuPortal } from 'reka-ui'

export const contextMenuItemVariants = cva(
  `
    relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden
    select-none
    data-[disabled]:pointer-events-none data-[disabled]:opacity-50
    data-[inset]:pl-8
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground
    data-[variant=destructive]:*:[svg]:!text-destructive-foreground
  `,

  {
    variants: {
      variant: {
        default: 'focus:bg-accent focus:text-accent-foreground',
        destructive: `
          text-destructive-foreground
          focus:bg-destructive/10 focus:text-destructive-foreground
          dark:focus:bg-destructive/40
        `,
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  },
)

export type ContextMenuItemVariants = VariantProps<typeof contextMenuItemVariants>
