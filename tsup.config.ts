import { defineConfig } from 'tsup'

export default defineConfig({
  entryPoints: [ 'src/index.ts' ],

  dts: true,
  target: 'node12',
  format: [ 'cjs', 'esm' ],

  clean: true,
  minify: false
})
