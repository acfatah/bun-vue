import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-themes',
  ],

  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },

  core: {
    disableTelemetry: true,
  },

  viteFinal: async (config) => {
    const { default: tailwindcss } = await import('@tailwindcss/vite')

    config.plugins ||= []
    config.plugins.push(tailwindcss())

    return config
  },
}

export default config
