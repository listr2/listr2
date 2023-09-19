/* eslint-disable import/no-extraneous-dependencies */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  overrides: [...require('@cenk1cenk2/eslint-config/utils').generateImportGroupsWithOverride({ tsconfigDir: __dirname, tsconfig: 'tsconfig.json' })],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/no-extraneous-dependencies': 'off'
  }
}
