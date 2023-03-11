/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [ '@cenk1cenk2/eslint-config/typescript-dynamic', '@cenk1cenk2/eslint-config/import-strict' ],
  rules: {
    ...require('@cenk1cenk2/eslint-config/utils').generateImportGroups({ tsconfigDir: '.' })
  }
}
