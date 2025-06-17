import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Avatar } from './Avatar.vue'
export { default as AvatarFallback } from './AvatarFallback.vue'
export { default as AvatarImage } from './AvatarImage.vue'

export const AvatarSize = {
  sm: 'size-8',
  md: 'size-16 text-2xl',
  lg: 'size-32 text-5xl',
}

export const AvatarShape = {
  circle: 'rounded-full',
  square: 'rounded-lg',
}

export const avatarVariant = cva(
  [
    'relative flex shrink-0 overflow-hidden',
  ],

  {
    variants: {
      size: AvatarSize,
      shape: AvatarShape,
    },

    defaultVariants: {
      size: 'md',
      shape: 'circle',
    },
  },
)

export type AvatarVariants = VariantProps<typeof avatarVariant>
