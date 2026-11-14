import root from '../../eslint.config.mjs'
import { utils } from '@cenk1cenk2/eslint-config'

import pkg from './package.json' with { type: 'json' }

const [level, options] = utils.generateImportGroups({ paths: Object.keys(pkg.imports) })['import/order']

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...root,
  {
    rules: {
      // minimatch reads a pattern that starts with # as a comment
      'import/order': [
        level,
        {
          ...options,
          distinctGroup: false,
          pathGroups: options.pathGroups.map((group) => ({ ...group, position: 'after', patternOptions: { nocomment: true } }))
        }
      ]
    }
  }
]
