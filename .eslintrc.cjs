module.exports = {
  extends: [ '@cenk1cenk2/eslint-config/typescript-dynamic' ],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@{cenk1cenk2,root,constants,interfaces,lib,renderer,utils}/**',
            group: 'parent'
          }
        ],
        pathGroupsExcludedImportTypes: [ 'builtin' ],
        groups: [
          [ 'builtin', 'external' ],
          [ 'index', 'parent', 'sibling' ]
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
