Listr2
====

[![Version](https://img.shields.io/npm/v/listr2.svg)](https://npmjs.org/package/listr2)
[![Downloads/week](https://img.shields.io/npm/dw/listr2.svg)](https://npmjs.org/package/listr2)
[![Build Status](https://cd.ev.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://cd.ev.kilic.dev/cenk1cenk2/listr2)

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr). Fully backwards compatible with the Listr itself but with more features.

![Demo](./demo/demo.gif)

# Navigation
* [Changelog](./CHANGELOG.md)
* [How to use](#how-to-use)
* [Features](#extra-features)

# How to use

Check out `example.ts` in the root of the repository for the code in demo.

```typescript
import { Listr } from 'listr2'

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

## Task Manager
I have added a task manager kind of thing that is utilizing the Listr to the mix since I usually use it this kind of way. This task manager consists of three execution steps as described below.

```typescript
import { Manager } from 'listr2'
```

This enables user to push the tasks in a queue and execute them when needed. In my opinion this provides a more clean code interface, just to add everything to queue and execute at the end of the script, thats why I included it.

### Create A New Task Manager
* You can inject your type through the initial generation.
* The only option for manager is the show run time, which shows the run time off only the middle async part.

```typescript
private manager: Manager<Ctx> = new Manager<Ctx>()
```

### Add Tasks
```typescript
manager.add([])
```

### Run Tasks that are in Queue
* This will also return the context object back.

```typescript
const ctx = await manager.runAll<Ctx>({concurrent: true})
```

## Input Module

Input module uses the beautiful [enquirer](https://www.npmjs.com/package/enquirer). So with running a `task.prompt` function, you first select which kind of prompt that you will use and second one is the enquirer object which you can see more in detail in the designated npm page.

To get a input you can assign the task a new prompt in an async function and write the response to the context. It is not advisable to run prompts in a concurrent task because they will class and overwrite each others console output and when you do keyboard movements it will apply to the both.

Prompts can either have a title or not but they will always be rendered at the end of the current console while using the default renderer.

```typescript
new Listr<ListrCtx>([
    {
      task: async (ctx, task): Promise<any> => ctx.testInput = await task.prompt('Input', { message: 'test' })
    },
    {
      title: 'Dump prompt.',
      task: (ctx,task): void => {
        task.output = ctx.testInput
      }
    }
  ])
  ```

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
