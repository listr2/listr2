import { resolve } from 'node:path'
import { defineConfig } from 'vitest/config'

import tsconfig from './tsconfig.json' with { type: 'json' }

export default defineConfig({
  root: resolve(import.meta.dirname, '..'),
  resolve: {
    alias: Object.fromEntries(Object.entries(tsconfig.compilerOptions.paths).map(([alias, [path]]) => [alias, resolve(import.meta.dirname, path)]))
  },
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['tests/vitest.setup.ts'],
    include: ['{src,tests}/**/*.{spec,e2e-spec}.ts'],
    testTimeout: 60000,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: 'junit.xml'
    },
    coverage: {
      provider: 'v8',
      include: ['src'],
      reporter: ['clover', 'json', 'lcov', 'text', 'cobertura']
    }
  }
})
