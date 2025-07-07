import type { JestConfigWithTsJest } from 'ts-jest'
import { pathsToModuleNameMapper } from 'ts-jest'

import tsconfig from './tsconfig.json' with { type: 'json' }

const config: JestConfigWithTsJest = {
  testEnvironment: 'node',
  rootDir: '../',
  setupFiles: ['<rootDir>/tests/jest.setup.ts'],
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    ['^.+\\.tsx?$']: [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tests/tsconfig.json',
        useESM: true
      }
    ]
  },
  collectCoverageFrom: ['src/**/*'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
      prefix: '<rootDir>/'
    }),
    ['^(\\.{1,2}/.*)\\.js$']: '$1'
  }
}

export default config
