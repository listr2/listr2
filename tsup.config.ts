import { defineConfig } from 'tsup'

// FIXME: fix tsconfig and tsconfig.build after: https://github.com/egoist/tsup/issues/524
export default defineConfig((options) => ({
  name: !options.watch && 'production',

  entryPoints: [ 'src/index.ts' ],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  target: 'node12',
  format: [ 'cjs', 'esm' ],

  sourcemap: options.watch && true,

  clean: true,
  minify: false
}))
