/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  overrides: [...require('@cenk1cenk2/eslint-config/utils').generateImportGroupsWithOverride({ tsconfigDir: __dirname, tsconfig: 'tsconfig.json' })],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/naming-convention': 'off'
  }
}
