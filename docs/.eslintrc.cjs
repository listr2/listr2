/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  overrides: [...require('@cenk1cenk2/eslint-config/utils').generateImportGroupsWithOverride({ tsconfigDir: __dirname, tsconfig: 'tsconfig.json' })],
  rules: {
    'import/no-extraneous-dependencies': 'off'
  }
}
