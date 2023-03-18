/* eslint-disable @typescript-eslint/naming-convention */
import { sidebar } from 'vuepress-theme-hope'

export const enSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Getting Started',
      icon: 'note',
      prefix: 'getting-started/',
      children: 'structure'
    },
    {
      text: 'API',
      icon: 'eos-icons:api-outlined',
      prefix: 'api/',
      children: 'structure',
      collapsible: true
    },
    {
      text: 'Repository',
      icon: 'mdi:git',
      prefix: 'repository/',
      children: [ { text: 'CHANGELOG', link: '/repository/changelog.html' } ]
    }
  ]
})
