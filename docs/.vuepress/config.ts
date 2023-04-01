/* eslint-disable @typescript-eslint/naming-convention */
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { defineUserConfig } from 'vuepress'
import { typedocPlugin } from 'vuepress-plugin-typedoc/next'

import theme from './theme.js'

export default defineUserConfig({
  base: '/',

  // now any file with `.snippet.md` extension will not be rendered as a page
  pagePatterns: [ '**/*.md', '!format.md', '!*.snippet.md', '!.vuepress', '!node_modules' ],

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
      readme: 'none',
      allReflectionsHaveOwnDocument: true,
      categorizeByGroup: false,
      sort: [ 'source-order' ]
    }),
    docsearchPlugin({
      appId: process.env.ALGOLIA_APP_ID as string,
      apiKey: process.env.ALGOLIA_API_KEY as string,
      indexName: 'listr2'
    })
  ],

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})
