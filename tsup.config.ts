import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  name: options.watch ? 'production' : undefined,

  entryPoints: [ 'src/index.ts' ],
  tsconfig: options.watch ? 'tsconfig.json' : 'tsconfig.build.json',

  dts: true,

  target: 'es2022',
  format: [ 'cjs', 'esm' ],

  sourcemap: options.watch ? true : undefined,

  clean: true,
  minify: false,
  keepNames: true
}))
