import { useLocalStorage } from '@vueuse/core'
import { inject, provide, ref, watchEffect } from 'vue'

type Layout = 'fixed' | 'full'

interface LayoutProviderState {
  layout: Layout
  setLayout: (layout: Layout) => void
}

const LayoutSymbol = Symbol('Layout')

export function applyLayout(layout: Layout) {
  const d = document.documentElement
  d.classList.remove('layout-full', 'layout-fixed')
  d.classList.add(`layout-${layout}`)
}

export function useLayout() {
  const savedLayout = useLocalStorage<Layout>('layout', 'full')
  const layout = ref<Layout>(savedLayout.value)

  watchEffect(() => {
    layout.value = savedLayout.value
    applyLayout(savedLayout.value)
  })

  const setLayout = (newLayout: Layout) => {
    savedLayout.value = newLayout
    layout.value = newLayout
  }

  provide(LayoutSymbol, { layout, setLayout })

  return { layout, setLayout }
}

export function provideLayout() {
  const { layout, setLayout } = useLayout()
  provide(LayoutSymbol, { layout, setLayout })
}

export function injectLayout() {
  const layoutStore = inject<LayoutProviderState>(LayoutSymbol)

  if (!layoutStore) {
    throw new Error('injectLayout must be used within a component that calls provideLayout')
  }

  return layoutStore
}
