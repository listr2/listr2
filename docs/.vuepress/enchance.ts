/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { StylizeOptions } from 'vuepress-plugin-md-enhance'

export const STYLIZE: StylizeOptions = [
  {
    matcher: 'Listr',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/listr/listr.html' }
        }
      }
    }
  },
  {
    matcher: 'Task',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/task/task.html' }
        }
      }
    }
  },
  {
    matcher: 'Subtask',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/task/subtasks.html' }
        }
      }
    }
  },
  {
    matcher: 'DefaultRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/default.html' }
        }
      }
    }
  },
  {
    matcher: 'SimpleRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/simple.html' }
        }
      }
    }
  },
  {
    matcher: 'VerboseRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/verbose.html' }
        }
      }
    }
  },
  {
    matcher: 'SilentRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/silent.html' }
        }
      }
    }
  },
  {
    matcher: 'TestRenderer',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/test.html' }
        }
      }
    }
  },
  {
    matcher: 'ListrLogger',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/logger.html' }
        }
      }
    }
  },
  {
    matcher: 'ProcessOutput',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/process-output.html' }
        }
      }
    }
  },
  {
    matcher: 'presets',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/logger.html#presets' }
        }
      }
    }
  },
  {
    matcher: 'style',
    replacer: ({ tag, ...rest }) => {
      if (tag === 'em') {
        return {
          ...rest,
          tag: 'a',
          attrs: { href: '/renderer/logger.html#style' }
        }
      }
    }
  }
]
