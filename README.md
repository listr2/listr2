Listr2
====

[![Build Status](https://cd.ev.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://cd.ev.kilic.dev/cenk1cenk2/listr2)
[![Version](https://img.shields.io/npm/v/listr2.svg)](https://npmjs.org/package/listr2)
[![Downloads/week](https://img.shields.io/npm/dw/listr2.svg)](https://npmjs.org/package/listr2)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr).

**It breaks backward compatability with [Listr](https://github.com/SamVerschueren/listr) after v1.3.12, albeit refactoring requires only moving renderer options to their own key, with respect to the [talk on the original repository](https://github.com/SamVerschueren/listr/issues/143#issuecomment-623094930).**

![Demo](./demo/demo.gif)

* [Changelog](./CHANGELOG.md)

<!-- toc -->
- [Extra Features](#extra-features)
- [Task Manager](#task-manager)
  - [Create A New Task Manager](#create-a-new-task-manager)
  - [Add Tasks](#add-tasks)
  - [Run Tasks that are in Queue](#run-tasks-that-are-in-queue)
  - [Indent A Task](#indent-a-task)
  - [Listr Wrapper](#listr-wrapper)
- [Input Module](#input-module)
  - [Directly access enquirer without explicitly installing in your project](#directly-access-enquirer-without-explicitly-installing-in-your-project)
- [Inject Context](#inject-context)
- [Bottom Bar For More Information](#bottom-bar-for-more-information)
- [Tasks without Titles](#tasks-without-titles)
- [Multi-Line Renderer](#multi-line-renderer)
- [Fully-Typed](#fully-typed)

<!-- tocstop -->

# How to Use

Check out `examples/` folder in the root of the repository for the code in demo or follow through with the readme.


## Create A New Listr
Create a new task list. It will return a Listr class.
```typescript
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>([
    /* tasks */
  ], { /* options */ })
```

Then you can run this task lists as a async function and it will return the context that is used.
```typescript
try {
  await tasks.run()
} catch (e) {
  // it will collect all the errors encountered if { exitOnError: false } is set as an option
  // elsewise it will throw the first error encountered as expected
  console.error(e)
}
```

### Tasks
```typescript
export interface ListrTask<Ctx, Renderer extends ListrRendererFactory> {
  // A title can be given or omitted. For default renderer if the title is omitted,
  title?: string
  // A task can be a sync or async function that returns a string, readable stream or an observable or plain old void
  // if it does actually return string, readable stream or an observable, task output will be refreshed with each data push
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  // to skip the task programmatically, skip can be a sync or async function that returns a boolean or string
  // if string is returned it will be showed as the skip message, else the task title will be used
  skip?: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean> | Promise<string>)
  // to enable the task programmatically, this will show no messages comparing to skip and it will hide the tasks enabled depending on the context
  // enabled can be external boolean, a sync or async function that returns a boolean
  // pay in mind that context enabled functionallity might depend on other functions to finish first, therefore the list shall be treated as a async function
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  // this will change depending on the available options on the renderer
  // these renderer options are per task basis and does not affect global options
  options?: ListrGetRendererTaskOptions<Renderer>
}
```

### Options
```typescript
export interface ListrOptions<Ctx = ListrContext> {
  // how many tasks can be run at the same time.
  // false or 1 for synhronous task list, true or Infinity for compelete parallel operation, a number for limitting tasks that can run at the same time
  concurrent?: boolean | number
  // it will silently fail or throw out an error
  exitOnError?: boolean
  // inject a context from another operation
  ctx?: Ctx
}
```

## The Concept of Context
Context is the variables that are shared across the task list. Even though external variables can be used to do the same operation, context gives a self-contained way to process internal tasks.

A successful task will return the context back for further operation.

You can also manually inject a context variable preset depending on the prior operations through the task options.

**If all tasks are in a one big Listr list you do not have to inject context manually to the child tasks, since it is automatically injected as in the original.**

## General Usage

### Get User Input
Input module uses the beautiful [enquirer](https://www.npmjs.com/package/enquirer).

So with running a `task.prompt` function, you can get access to any [enquirer](https://www.npmjs.com/package/enquirer) default prompts as well as using a custom enquirer prompt.

To get a input you can assign the task a new prompt in an async function and write the response to the context.

**It is not advisable to run prompts in a concurrent task because multiple prompts will clash and overwrite each others console output and when you do keyboard movements it will apply to the both.**

Prompts, since their rendering is getting passed as a data output will render multiple times in verbose renderer since verbose renderer is not terminal-updating intended to be used in nonTTY environments. It will work any how albeit it might not look great.

Prompts can either have a title or not but they will always be rendered at the end of the current console while using the default renderer.

*Please refer to [examples section](examples/get-user-input.example.ts) for more detailed and further examples.*

#### Create A Prompt
To access the prompts just utilize the `task.prompt` jumper function. First argument takes in one of the default [enquirer](https://www.npmjs.com/package/enquirer) prompts as a string or you can also pass in a custom [enquirer](https://www.npmjs.com/package/enquirer) prompt class as well, while the second argument is the options for the given prompt.

*Please note that I rewrote the types for enquirer, since some of them was failing for me. So it may have a chance of having some mistakes in it since I usually do not use all of them.*

```typescript
new Listr<Ctx>([
  {
    title: 'This task will get your input.',
    task: async (ctx, task): Promise<boolean> => ctx.input = await task.prompt<boolean>('Toggle', { message: 'Do you love me?' })
  },
  {
    title: 'This task will get your input.',
    task: async (ctx, task): Promise<void> => {
      ctx.input = await task.prompt<boolean>('Toggle', { message: 'Do you love me?' })
      // do something
      if (ctx.input === false) {
        throw new Error(':/')
      }
    }
  }
], { concurrent: false })
```

#### Use an Custom Prompt
You can either use a custom prompt out of the npm registry or custom-created one as long as it works with [enquirer](https://www.npmjs.com/package/enquirer), it will work expectedly. Instead of passing in the prompt name use the not-generated class.

```typescript
new Listr<Ctx>([
  {
     title: 'Custom prompt',
     task: async (ctx, task): Promise<void> => {
       ctx.testInput = await task.prompt(EditorPrompt, {
         message: 'Write something in this enquirer custom prompt.',
         initial: 'Start writing!',
         validate: (response): boolean | string => {
           if (response.split('\n').length < 4) {
             return 'The bio must be at least 3 lines.'
           }
           return true
         }
       })
     }
   }
  ], { concurrent: false })
```

#### Use Enquirer in Your Project Without Explicitly Installing It
**I am planning to move enquirer to peer dependencies as an optional install, so this will likely go away in the near feature.**

If you want to directly run it, and do not want to create a jumper function you can do as follows.

```typescript
import { createPrompt } from 'listr2'

await createPrompt('Input', { message: 'Hey what is that?' }, { cancelCallback: () => { throw new Error('You made me mad now. Just should have answered me!') }})
```

### Enable a task

### Skip a task

### Show Output

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
