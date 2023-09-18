/* eslint-disable import/no-extraneous-dependencies */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/no-extraneous-dependencies': 'off',
    ...require('@cenk1cenk2/eslint-config/utils').generateImportGroups({ tsconfigDir: '.' })
  }
}
