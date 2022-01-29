const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')

const tsconfig = require(path.join(process.cwd(), './tsconfig.json'))

/** @type import("@jest/types").Config.InitialOptions */
module.exports = {
  preset: 'ts-jest',
  rootDir: '../',
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  setupFiles: [ '<rootDir>/tests/jest.setup.cjs' ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/src/'
  })
}
