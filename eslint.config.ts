import antfu from '@antfu/eslint-config'
import pluginVitest from '@vitest/eslint-plugin'

export default antfu(
  {
    formatters: true,
    vue: true,
  },

  {
    rules: {
      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'logs'],
  },

  {
    rules: pluginVitest.configs.recommended.rules,
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
)
