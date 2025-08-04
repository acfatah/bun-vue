export const iconLibraries = {
  iconify: {
    name: '@iconify/vue',
    package: '@iconify/vue',
    import: '@iconify/vue',
  },
} as const

export const icons: Record<
  string,
  Record<keyof typeof iconLibraries, string>
> = {}
