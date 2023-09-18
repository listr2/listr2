/* eslint-disable @typescript-eslint/naming-convention */
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { defineUserConfig } from 'vuepress'
import { typedocPlugin } from 'vuepress-plugin-typedoc/next'

import theme from './theme.js'

export default defineUserConfig({
  base: '/',

  // now any file with `.snippet.md` extension will not be rendered as a page
  pagePatterns: ['**/*.md', '!format.md', '!*.snippet.md', '!.vuepress', '!node_modules'],

  locales: {
    '/': {
      lang: 'en-US',
      title: 'listr2',
      description: 'Documentation for listr2 npm library.'
    }
  },

  plugins: [
    typedocPlugin({
      entryPoints: ['../packages/listr2'],
      entryPointStrategy: 'packages',
      out: 'api'
    }),
    docsearchPlugin({
      appId: '4G64M4W5QP',
      apiKey: '4cdadab526edbb306f6fb0d195f634e6',
      indexName: 'listr2'
    })
  ],

  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})
