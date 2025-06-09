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
      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
      }],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'logs', 'tsconfig.*'],
  },

  {
    rules: pluginVitest.configs.recommended.rules,
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
)
