Listr2
====

[![Build Status](https://cd.ev.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://cd.ev.kilic.dev/cenk1cenk2/listr2)
[![Version](https://img.shields.io/npm/v/listr2.svg)](https://npmjs.org/package/listr2)
[![Downloads/week](https://img.shields.io/npm/dw/listr2.svg)](https://npmjs.org/package/listr2)

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr). Fully backwards compatible with the Listr itself but with more features.

![Demo](./demo/demo.gif)

# Navigation
* [Changelog](./CHANGELOG.md)
* [How to Use](#how-to-use)
* [Features](#extra-features)

# How to Use

Check out `example.ts` in the root of the repository for the code in demo or follow through with the readme.

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
    concurrent: false
    exitOnError: true
    renderer: ListrRendererValue<Ctx>
    nonTTYRenderer: ListrRendererValue<Ctx>
    showSubtasks: true
    collapse: false
    clearOutput: false
    ctx: Ctx
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
manager.add([<--TASK-->])
```

### Run Tasks that are in Queue
* This will also return the context object back.

```typescript
const ctx = await manager.runAll<Ctx>({ concurrent: true })
```
### Indent A Task
To wrap a task around a new listr object with task manager, you can use ```manager.indent([], {...options})```. This way you can change the concurrency in a one big task lists.

```typescript
const ctx = await manager.runAll<Ctx>({ concurrent: true })

manager.add<Ctx>([
  {
    title: 'Some task.',
    task: (): void => {}
  },
  // this is equal to wrapping it inside task:(): Listr => new Listr(<-SOMETASK->)
  manager.indent<Ctx>([
    {
      title: 'Some task.',
      task: (): void => {}
    },
  ], { concurrent: true })
], { concurrent: false })
```

### Listr Wrapper
You can also use the method below to directly create a Listr class. This will just return a Listr class, which you need to run after.

```typescript
const myListr = manager.newListr<Ctx>([
  {
    title: 'Some task.',
    task: (): void => {}
  }
], { concurrent: false })

// then you can perform any class actions
myListr.run()
```


## Input Module

Input module uses the beautiful [enquirer](https://www.npmjs.com/package/enquirer).

So with running a `task.prompt` function, you first select which kind of prompt that you will use and second one is the enquirer object which you can see more in detail in the designated npm page.

To get a input you can assign the task a new prompt in an async function and write the response to the context.

**It is not advisable to run prompts in a concurrent task because they will class and overwrite each others console output and when you do keyboard movements it will apply to the both.**

It will render multiple times in verbose renderers, because the `enquirer`'s output is passed through the Listr itself as data. It will work anyway, but will not look that nice.

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

### Directly access enquirer without explicitly installing in your project
If you want to use enquirer in your project, outside of the Listr, you can do it as follows.

```typescript
import { newPrompt, PromptTypes, PromptOptionsType } from 'listr2'

export async function promptUser <T extends PromptTypes> (type: T, options: PromptOptionsType<T>): Promise<any>{
  try {
    return newPrompt(type, options).on('cancel', () => {
      console.error('Cancelled prompt. Quitting.')
      process.exit(20)
    }).run()
  } catch (e) {
    console.error('There was a problem getting the answer of the last question. Quitting.')
    console.debug(e.trace)
    process.exit(20)
  }
}

await promptUser('Input', { message: 'Hey what is that?' })
  ```

If you want to directly run it, and do not want to create a jumper function you can do as follows.

```typescript
import { createPrompt } from 'listr2'

await createPrompt('Input', { message: 'Hey what is that?' })
```

## Inject Context

Context which is the object that is being used while executing the actions in the Listr can now be enjected to the next Listr through using the custom options.

**If all tasks are in a one big Listr class you dont have to inject context to the childs, since it is automatically injected as in the original.**

```typescript
// get the context from other listr object
const ctx = manager.runAll()

// and inject it to next via options
new Listr<ListrCtx>([
    {
      title: 'Dump prompt.',
      task: (ctx,task): void => {
        task.output = ctx.testInput
      }
    }
  ], {ctx})
```

## Bottom Bar For More Information

Default renderer now supports a bottom bar to dump the output if desired. The output lenght can be limited through options of the task.

**If title has no title, and generates output it will be pushed to the bottom bar instead.**

Else you have to specicify explicitly to the dump the output to the bottom bar. Bottom bar output from the particular task will be cleared after the task finished, but with ```persistentOutput: true``` option it can be persistent.

```typescript
new Listr<ListrCtx>([
    {
      task: async (ctx, task): Promise<any> => {
        task.output = 'Something'
      },
      bottomBar: Infinity, // bottom bar items to keep by this particular task, number | boolean. boolean true will set it to 1.
      persistentOutput: true // defaults to false, has to be set explicitly if desired
    },
  ], {ctx})
```

## Tasks without Titles

Tasks can be created without titles, and if any output is dumped it will be dumped to the bottom bar instead. If a task with no title is returns a new Listr task, it can be used to change the parallel task count and execute those particular tasks in order or in parallel. The subtasks of the untitled tasks will drop down one indentation level to be consistent. In the verbose renderer tasks with no-title will render as 'Task with no title.'

```typescript
new Listr<ListrCtx>([
    {
      task: async (ctx, task): Promise<any> => {
        task.output = 'Something'
      }
    },
  ], {})
```

## Multi-Line Renderer

The default update renderer now supports multi-line rendering. Therefore implementations like pushing through multi-line data now works properly.

## Fully-Typed

Types are exported from the root.
