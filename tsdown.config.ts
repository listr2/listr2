import { defineConfig } from 'tsdown'

export default defineConfig((options) => ({
  name: options.watch ? 'production' : undefined,

  entryPoints: ['src/index.ts'],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  platform: 'node',
  format: ['esm'],

  sourcemap: options.watch ? true : undefined,

  clean: true,
  minify: false,
  keepNames: true,
  unbundle: false
}))
