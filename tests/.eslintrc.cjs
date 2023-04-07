/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    ...require('@cenk1cenk2/eslint-config/utils').generateImportGroups({ tsconfigDir: './tests' })
  }
}
