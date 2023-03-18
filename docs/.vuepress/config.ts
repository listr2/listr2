/* eslint-disable @typescript-eslint/naming-convention */
import { defineUserConfig } from 'vuepress'
import { typedocPlugin } from 'vuepress-plugin-typedoc/next'

import theme from './theme.js'

export default defineUserConfig({
  base: '/',

  // now any file with `.snippet.md` extension will not be rendered as a page
  pagePatterns: [ '**/*.md', '!*.snippet.md', '!.vuepress', '!node_modules' ],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'listr2',
      description: 'Documentation for listr2 npm library.'
    }
  },

  plugins: [
    typedocPlugin({
      entryPoints: [ './src/index.ts' ],
      tsconfig: './tsconfig.build.json',
      hideInPageTOC: true,
      readme: 'none'
    })
  ],

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})
