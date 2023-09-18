/* eslint-disable import/no-extraneous-dependencies */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [ '../../.eslintrc.cjs' ],
  parserOptions: { project: [ './tsconfig.json', './tests/tsconfig.json' ] },
  rules: {
    ...require('@cenk1cenk2/eslint-config/utils').generateImportGroups({ tsconfigDir: '.' })
  }
}
