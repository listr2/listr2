module.exports = {
  extends: [ '@cenk1cenk2/eslint-config/typescript' ],
  rules: {
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@root/**',
            group: 'parent'
          },
          {
            pattern: '@constants/**',
            group: 'parent'
          },
          {
            pattern: '@interfaces/**',
            group: 'parent'
          },
          {
            pattern: '@lib/**',
            group: 'parent'
          },
          {
            pattern: '@renderer/**',
            group: 'parent'
          },
          {
            pattern: '@utils/**',
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
  },
  overrides: [
    {
      files: [ 'tests/**/*.ts' ],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    }
  ]
}
