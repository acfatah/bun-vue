import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  `
    inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border
    px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow]
    focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    dark:aria-invalid:ring-destructive/40
    [&>svg]:pointer-events-none [&>svg]:size-3
  `,
  {
    variants: {
      variant: {
        default:
          `
            border-transparent bg-primary text-primary-foreground
            [a&]:hover:bg-primary/90
          `,
        secondary:
          `
            border-transparent bg-secondary text-secondary-foreground
            [a&]:hover:bg-secondary/90
          `,
        destructive:
          `
            border-transparent bg-destructive text-white
            focus-visible:ring-destructive/20
            dark:bg-destructive/60 dark:focus-visible:ring-destructive/40
            [a&]:hover:bg-destructive/90
          `,
        outline:
          `
            text-foreground
            [a&]:hover:bg-accent [a&]:hover:text-accent-foreground
          `,

        success:
          `
            border-success-foreground/40 bg-success text-success-foreground
            [a&]:hover:bg-success/90
          `,
        warning:
          `
            border-warning-foreground/40 bg-warning text-warning-foreground
            [a&]:hover:bg-warning/90
          `,
        info:
          `
            border-info-foreground/40 bg-info text-info-foreground
            [a&]:hover:bg-info/90
          `,
        error:
          `
            border-error-foreground/40 bg-error text-error-foreground
            [a&]:hover:bg-error/90
          `,
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
