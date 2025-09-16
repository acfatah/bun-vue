import antfu from '@antfu/eslint-config'
import pluginVitest from '@vitest/eslint-plugin'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'

// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'

export default antfu(
  {
    formatters: true,
    vue: true,
  },

  {
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
      'plugin:storybook/recommended': storybook,
    },

    rules: {
      ...eslintPluginBetterTailwindcss.configs['recommended-warn'].rules,
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: 100 }],
      'better-tailwindcss/no-restricted-classes': 'off',
      'better-tailwindcss/no-unregistered-classes': 'off',

      'sort-imports': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          partitionByNewLine: true,
          newlinesBetween: 'ignore',
        },
      ],

      'style/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
      ],

      'vue/object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: true,
      }],
    },

    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/registry/styles/global.css',
      },
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'logs',
      'tsconfig.*',
      '**/tsconfig.*',
    ],
  },

  {
    rules: pluginVitest.configs.recommended.rules,
    files: ['src/**/__tests__/*', 'tests/**/*'],
  },
)
