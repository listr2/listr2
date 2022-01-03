const { join } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest')
const { readFileSync } = require('fs')

const TS_CONFIG_PATH = join(process.cwd(), 'tsconfig.json')
const SRC_PATH = 'src'

module.exports = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  rootDir: '../',
  testEnvironment: 'node',
  testRegex: '(/tests/.*|/src/.*).(e2e-)?spec.tsx?$',
  transform: {
    '^.+\\.(t)s$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(JSON.parse(readFileSync(TS_CONFIG_PATH)).compilerOptions.paths, {
    prefix: `<rootDir>/${SRC_PATH}`
  })
}
