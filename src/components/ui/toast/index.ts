import type { VariantProps } from 'class-variance-authority'
import type { ToastRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { cva } from 'class-variance-authority'

export { default as Toast } from './Toast.vue'
export { default as ToastAction } from './ToastAction.vue'
export { default as ToastClose } from './ToastClose.vue'
export { default as ToastDescription } from './ToastDescription.vue'
export { default as Toaster } from './Toaster.vue'
export { default as ToastProvider } from './ToastProvider.vue'
export { default as ToastTitle } from './ToastTitle.vue'
export { default as ToastViewport } from './ToastViewport.vue'
export { toast, useToast } from './use-toast'

export const toastVariants = cva(
  `
    group pointer-events-auto relative flex w-full items-center justify-between space-x-2
    overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all
    data-[state=closed]:animate-out data-[state=closed]:fade-out-80
    data-[state=closed]:slide-out-to-right-[125%]
    data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full
    data-[swipe=cancel]:translate-x-0
    data-[swipe=end]:translate-x-(--reka-toast-swipe-end-x) data-[swipe=end]:animate-out
    data-[swipe=move]:translate-x-(--reka-toast-swipe-move-x) data-[swipe=move]:transition-none
    data-[state=open]:sm:slide-in-from-bottom-full
  `,

  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          `
            border-destructive/50 bg-red-100 text-destructive
            focus:border-destructive focus:ring-destructive focus:outline-destructive
            dark:bg-red-900 dark:text-destructive
            [&_[data-slot=toast-action]]:border-destructive
            [&_[data-slot=toast-action]]:text-destructive
            [&_[data-slot=toast-action]]:hover:bg-destructive/10
            [&_[data-slot=toast-action]]:hover:text-destructive
            [&_[data-slot=toast-action]]:focus:ring-destructive
            [&_[data-slot=toast-close]]:text-destructive/50
            [&_[data-slot=toast-close]]:hover:text-destructive
            [&_[data-slot=toast-close]]:focus:ring-destructive
          `,

        // the following requires `styles/severity.css`
        success:
          `
            border-success-foreground/40 bg-success/90 text-success-foreground
            focus:border-success focus:ring-success focus:outline-success
            [&_[data-slot=toast-action]]:border-success-foreground/40
            [&_[data-slot=toast-action]]:text-success-foreground
            [&_[data-slot=toast-action]]:hover:bg-success-foreground/10
            [&_[data-slot=toast-action]]:hover:text-success-foreground
            [&_[data-slot=toast-action]]:focus:ring-success-foreground/40
            [&_[data-slot=toast-close]]:text-success-foreground/50
            [&_[data-slot=toast-close]]:hover:text-success-foreground
            [&_[data-slot=toast-close]]:focus:ring-success
          `,

        info:
          `
            border-info-foreground/40 bg-info/90 text-info-foreground
            focus:border-info focus:ring-info focus:outline-info
            [&_[data-slot=toast-action]]:border-info-foreground/40
            [&_[data-slot=toast-action]]:text-info-foreground
            [&_[data-slot=toast-action]]:hover:bg-info-foreground/10
            [&_[data-slot=toast-action]]:hover:text-info-foreground
            [&_[data-slot=toast-action]]:focus:ring-info-foreground/40
            [&_[data-slot=toast-close]]:text-info-foreground/50
            [&_[data-slot=toast-close]]:hover:text-info-foreground
            [&_[data-slot=toast-close]]:focus:ring-info
          `,

        warning:
          `
            border-warning-foreground/40 bg-warning/90 text-warning-foreground
            focus:border-warning focus:ring-warning focus:outline-warning
            [&_[data-slot=toast-action]]:border-warning-foreground/40
            [&_[data-slot=toast-action]]:text-warning-foreground
            [&_[data-slot=toast-action]]:hover:bg-warning-foreground/10
            [&_[data-slot=toast-action]]:hover:text-warning-foreground
            [&_[data-slot=toast-action]]:focus:ring-warning-foreground/40
            [&_[data-slot=toast-close]]:text-warning-foreground/50
            [&_[data-slot=toast-close]]:hover:text-warning-foreground
            [&_[data-slot=toast-close]]:focus:ring-warning
          `,

        error:
          `
            border-error-foreground/40 bg-error/90 text-error-foreground
            focus:border-error focus:ring-error focus:outline-error
            [&_[data-slot=toast-action]]:border-error-foreground/40
            [&_[data-slot=toast-action]]:text-error-foreground
            [&_[data-slot=toast-action]]:hover:bg-error-foreground/10
            [&_[data-slot=toast-action]]:hover:text-error-foreground
            [&_[data-slot=toast-action]]:focus:ring-error-foreground/40
            [&_[data-slot=toast-close]]:text-error-foreground/50
            [&_[data-slot=toast-close]]:hover:text-error-foreground
            [&_[data-slot=toast-close]]:focus:ring-error
          `,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type ToastVariants = VariantProps<typeof toastVariants>

export interface ToastProps extends ToastRootProps {
  class?: HTMLAttributes['class']
  variant?: ToastVariants['variant']
  onOpenChange?: ((value: boolean) => void) | undefined
}
