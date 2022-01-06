import { readFileSync } from 'fs'
import { pathsToModuleNameMapper } from 'ts-jest'

const tsconfig = JSON.parse(readFileSync('./tsconfig.json'))

/** @type import("@jest/types").Config.InitialOptions */
export default {
  preset: 'ts-jest',
  rootDir: '../',
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  setupFiles: [ '<rootDir>/tests/jest.setup.js' ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  })
}
