import type { Preview } from '@storybook/vue3'

// https://storybook.js.org/addons/@storybook/addon-themes
import { withThemeByClassName } from '@storybook/addon-themes'
import { setup } from '@storybook/vue3'
import { TAILWINDCSS_VIEWPORTS } from './tailwindcss-viewports'

import '../src/registry/styles/global.css'
import { createPinia } from 'pinia'

const pinia = createPinia()

setup((app) => {
  app.use(pinia)
})

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },

    docs: {
      codePanel: true,
    },

    themes: {
      target: 'html',
    },

    viewport: {
      options: TAILWINDCSS_VIEWPORTS,
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        Light: 'light',
        Dark: 'dark',
      },

      defaultTheme: 'light',
    }),

    // Decorator to apply bg-color to stories in dark mode
    (_) => {
      const body = document.querySelector('body')
      const stories = document.querySelectorAll('.docs-story')
      const THEME_CLASS = 'bg-background'

      body?.classList.add(THEME_CLASS)
      stories.forEach((element) => {
        element.classList.add(THEME_CLASS)
      })

      return { template: `<story/>` }
    },
  ],
}

export default preview
