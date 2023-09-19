/* eslint-disable @typescript-eslint/naming-convention */
import { join } from 'path'
import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'

const tsconfig = require(join(process.cwd(), 'tests', './tsconfig.json'))

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  rootDir: '../',
  setupFiles: [ '<rootDir>/tests/jest.setup.ts' ],
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',

  extensionsToTreatAsEsm: [ '.ts' ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tests/tsconfig.json',
        useESM: true
      }
    ]
  },
  collectCoverageFrom: [ 'src/**/*' ],
  moduleFileExtensions: [ 'ts', 'js' ],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: '<rootDir>/'
    }),
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
}

export default config
