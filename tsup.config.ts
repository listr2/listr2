import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: !options.watch && 'production',

  entryPoints: [ 'src/index.ts' ],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  target: 'es2020',
  format: [ 'cjs', 'esm' ],

  sourcemap: options.watch && true,

  clean: true,
  minify: false
}))
