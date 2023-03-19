/* eslint-disable @typescript-eslint/naming-convention */
import { sidebar } from 'vuepress-theme-hope'

export const enSidebar = sidebar({
  '/': [
    '',
    {
      text: 'Repository',
      icon: 'mdi:git',
      prefix: 'repository/',
      children: 'structure'
    },
    {
      text: 'Getting Started',
      prefix: 'getting-started/',
      children: 'structure'
    },
    {
      text: 'Task',
      prefix: 'task/',
      children: 'structure'
    },
    {
      text: 'API',
      icon: 'eos-icons:api-outlined',
      prefix: 'api/',
      children: 'structure',
      collapsible: true
    }
  ]
})
