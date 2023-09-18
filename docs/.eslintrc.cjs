/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['../.eslintrc.cjs'],
  rules: {
    'import/no-extraneous-dependencies': 'off'
  }
}
