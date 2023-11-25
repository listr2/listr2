// https://vitepress.dev/guide/custom-theme
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import CodeExampleIcon from './components/CodeExampleIcon.vue'
import GithubIssue from './components/GithubIssue.vue'
import Version from './components/Version.vue'

import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp: ({ app }): void => {
    app.component('FontAwesomeIcon', FontAwesomeIcon).component('GithubIssue', GithubIssue).component('Version', Version).component('CodeExampleIcon', CodeExampleIcon)
  }
} satisfies Theme
