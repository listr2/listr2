# Listr2

[![Version](https://img.shields.io/npm/v/init-cli.svg)](https://npmjs.org/package/listr2)
[![Downloads/week](https://img.shields.io/npm/dw/init-cli.svg)](https://npmjs.org/package/listr2)
[![Build Status](https://cd.ev.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://cd.ev.kilic.dev/cenk1cenk2/listr2)

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr). Fully backwards compatible with the Listr itself but with more features.

![Demo](./demo/demo.gif)

# How to use

Check out `example.ts` in the root of the repository for the code in demo.

```typescript
import { Listr } from 'Listr2'

interface ListrCtx {
  injectedContext: boolean
}

const tasks = new Listr<ListrCtx>(
  [
    {
      // a title
      title: 'Hello I am a title',
      // an sync, async or observable function
      task: async (ctx, task): Promise<void> => {}
    }
  ],
  {
    // throw in some options, all have a default
    showSubtasks: true,
    concurrent: false,
    exitOnError: true,
    bottomBarItems: 3,
    ctx: someOtherContextObject
  }
)

// and done!
const ctx = await tasks.run()
```

# Extra Features

## Input Module

Todo ATM.

## Inject Context

Context which is the object that is being used while executing the actions in the Listr can now be enjected to the next Listr through using the custom options.

## Bottom Bar For More Information

Default renderer now supports a bottom bar to dump the output if desired. The output lenght can be limited through options of the Listr class.

## Tasks without Titles

Tasks can be created without titles, and if any output is dumped it will be dumped to the bottom bar instead. If a task with no title is returns a new Listr task, it can be used to change the parallel task count and execute those particular tasks in order or in parallel. The subtasks of the untitled tasks will drop down one indentation level to be consistent.

## Multi-Line Renderer

The default update renderer now supports multi-line rendering. Therefore implementations like pushing through multi-line data now works properly.

## Fully-Typed

You can download the types if you are starting a new Typescript project.
