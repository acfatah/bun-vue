/**
 * Kbd
 *
 * A component to represent keyboard input.
 */

import { cva } from 'class-variance-authority'

export { default as Kbd } from './Kbd.vue'

export const kbdVariants = cva(
  `
    pointer-events-none inline-flex items-center gap-1 rounded border bg-muted px-1.5 font-mono
    font-medium text-muted-foreground opacity-100 select-none
  `,
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
      },
    },

    defaultVariants: {
      size: 'md',
    },
  },
)
