import root from '../eslint.config.mjs'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...root,
  {
    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-types': 'off',
      'import/no-extraneous-dependencies': 'off',
      'stylistic/max-len': 'off'
    }
  },
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json', './tests/tsconfig.json']
      }
    }
  }
]
