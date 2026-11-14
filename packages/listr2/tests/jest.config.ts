import type { JestConfigWithTsJest } from 'ts-jest'

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
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'cobertura'],
  reporters: ['default', ['jest-junit', { outputDirectory: '<rootDir>', outputName: 'junit.xml' }]],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    ['^(\\.{1,2}/.*)\\.js$']: '$1'
  }
}

export default config
