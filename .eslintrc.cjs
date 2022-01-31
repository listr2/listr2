/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [ '@cenk1cenk2/eslint-config/typescript-dynamic', '@cenk1cenk2/eslint-config/import-strict' ],
  rules: {
    ...require('@cenk1cenk2/eslint-config/import-helper')([ 'cenk1cenk2', 'root', 'constants', 'interfaces', 'lib', 'renderer', 'utils' ])
  }
}
