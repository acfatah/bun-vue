import type { Ref } from 'vue'
import { createContext } from 'reka-ui'
import type { ToggleVariants } from '@/components/ui/toggle'

export { default as ToggleGroup } from './ToggleGroup.vue'
export { default as ToggleGroupItem } from './ToggleGroupItem.vue'

export const [injectToggleGroupContext, provideToggleGroupContext]
  = createContext<{
    variant: Ref<ToggleVariants['variant']>
    size: Ref<ToggleVariants['size']>
  }>('ToggleGroup')
