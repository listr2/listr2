const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')

const tsconfig = require(path.join(process.cwd(), 'tests', './tsconfig.json'))

/** @type import("@jest/types").Config.InitialOptions */
module.exports = {
  rootDir: '../',
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  setupFiles: [ '<rootDir>/tests/jest.setup.cjs' ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tests/tsconfig.json'
      }
    ]
  },
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}
