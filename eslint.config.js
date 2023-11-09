// @ts-check
import datadayrepos from '@datadayrepos/eslint-config'
import sortKeys from 'eslint-plugin-sort-keys'

export default datadayrepos(
  { vue: true, typescript: true },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    rules: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits'],
      }],
    },
  },
  {
    ignores: [
      // eslint ignore globs paths here
    ],
  },
  {
    files: ['src/**/*.ts'],
    plugins: {
      'sort-keys': sortKeys,
    },
    rules: {
      'sort-keys/sort-keys-fix': 'error',
    },
  },
  {
    rules: {
      // overrides
      'node/prefer-global/process': 'off',
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {},
  },
)
