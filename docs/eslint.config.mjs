import root from '../eslint.config.mjs'
import { configs, utils } from '@cenk1cenk2/eslint-config'

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...root,
  ...configs['vue-typescript'],
  ...utils.configImportGroup({ tsconfigDir: import.meta.dirname, tsconfig: 'tsconfig.json' }),
  {
    rules: {
      'import/no-extraneous-dependencies': 'off'
    }
  },
  {
    ignores: ['.vitepress/cache/**', '.vitepress/dist/**', 'dist/**', 'eslint.config.mjs']
  }
]
