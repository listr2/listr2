Listr2
====

[![Build Status](https://cd.ev.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://cd.ev.kilic.dev/cenk1cenk2/listr2)
[![Version](https://img.shields.io/npm/v/listr2.svg)](https://npmjs.org/package/listr2)
[![Downloads/week](https://img.shields.io/npm/dw/listr2.svg)](https://npmjs.org/package/listr2)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**Create beautiful CLI interfaces via easy and logical to implement task lists that feel alive and interactive.**

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr).

![Demo](./demo/demo.gif)
> **It breaks backward compatibility with [Listr](https://github.com/SamVerschueren/listr) after v1.3.12, albeit refactoring requires only moving renderer options to their own key, concerning the [conversation on the original repository](https://github.com/SamVerschueren/listr/issues/143#issuecomment-623094930).** You can find the README of compatible version [here](https://github.com/cenk1cenk2/listr2/tree/84ff9c70ba4aab16106d1e7114453ac5e0351ec0). Keep in mind that it will not get further bug fixes.

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

Check out `examples/` folder in the root of the repository for the code in demo or follow through with this README.

## Install
```bash
# Install the latest supported version
npm install listr2

yarn add listr2

# Install listr compatabile version
npm install listr2@1.3.12

yarn add listr2@1.3.12
```

## Create A New Listr
Create a new task list. It will returns a Listr class.

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
  // defaults to false
  concurrent?: boolean | number
  // it will silently fail or throw out an error
  // defaults to false
  exitOnError?: boolean
  // inject a context from another operation
  // defaults to any
  ctx?: Ctx
  // to have graceful exit on signal terminate and to inform the renderer all the tasks awaiting or processing are failed
  // defaults to true
  registerSignalListeners?: boolean
  // select the renderer or inject a class yourself
  // defaults to 'default' which is a updating renderer
  renderer?: 'default' | 'verbose' | 'silent' | ListrRendererFactory
  // renderer options depends on the selected renderer
  rendererOptions?: ListrGetRendererOptions<T>
  // renderer will fallback to the nonTTYRenderer on non-tty environments as the name suggest
  // defaults to verbose
  nonTTYRenderer?: 'default' | 'verbose' | 'silent' | ListrRendererFactory
  // options for the non-tty renderer
  nonTTYrendererOptions?: ListrGetRendererOptions<T>
}
```

## The Concept of Context
Context is the variables that are shared across the task list. Even though external variables can be used to do the same operation, context gives a self-contained way to process internal tasks.

A successful task will return the context back for further operation.

You can also manually inject a context variable preset depending on the prior operations through the task options.

**If all tasks are in one big Listr list you do not have to inject context manually to the child tasks since it is automatically injected as in the original.**

If an outside variable wants to be injected inside the Listr itself it can be done in two ways.
- Injecting it as an option.
```typescript
const ctx: Ctx = {}

const tasks = new Listr<Ctx>([
    /* tasks */
  ], { ctx })
```
- Injecting it at runtime.
```typescript
try {
  await tasks.run({ctx})
} catch (e) {
  console.error(e)
}
```


## General Usage

### Subtasks


### Get User Input
The input module uses the beautiful [enquirer](https://www.npmjs.com/package/enquirer).

So with running a `task.prompt` function, you can get access to any [enquirer](https://www.npmjs.com/package/enquirer) default prompts as well as using a custom enquirer prompt.

To get an input you can assign the task a new prompt in an async function and write the response to the context.

**It is not advisable to run prompts in a concurrent task because multiple prompts will clash and overwrite each other's console output and when you do keyboard movements it will apply to them both.**

Prompts, since their rendering is getting passed as a data output will render multiple times in verbose renderer since verbose renderer is not terminal-updating intended to be used in nonTTY environments. It will work anyhow albeit it might not look great.

Prompts can either have a title or not but they will always be rendered at the end of the current console while using the default renderer.

*Please refer to [examples section](examples/get-user-input.example.ts) for more detailed and further examples.*

#### Create A Prompt
To access the prompts just utilize the `task.prompt` jumper function. The first argument takes in one of the default [enquirer](https://www.npmjs.com/package/enquirer) prompts as a string or you can also pass in a custom [enquirer](https://www.npmjs.com/package/enquirer) prompt class as well, while the second argument is the options for the given prompt.

Prompts always rendered at the bottom of the tasks when using the default renderer with one line return in between it and the tasks.

*Please note that I rewrote the types for enquirer, since some of them was failing for me. So it may have a chance of having some mistakes in it since I usually do not use all of them.*

```typescript
new Listr<Ctx>([
  {
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
          //  i do declare you valid!
           return true
         }
       })
     }
   }
  ], { concurrent: false })
```

#### Use Enquirer in Your Project Without Explicitly Installing It
**I am planning to move enquirer to peer dependencies as an optional install, so this will likely go away in the near future.**

If you want to directly run it, and do not want to create a jumper function you can do as follows.

```typescript
import { createPrompt } from 'listr2'

await createPrompt('Input', { message: 'Hey what is that?' }, { cancelCallback: () => { throw new Error('You made me mad now. Just should have answered me!') }})
```

### Enable a Task
Tasks can be enabled depending on the variables programmatically. This enables to skip them depending on the context. Not enabled tasks will never show up in the default renderer, but when or if they get enabled they will magically appear.

*Please pay attention to asynchronous operation while designing a context enabled task list since it does not await for any variable in the context.*

*Please refer to [examples section](examples/task-enable.example.ts) for more detailed and further examples.*

```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      enabled: (ctx): boolean => !ctx.skip,
      task: (): void => {}
    }
  ], { concurrent: false })
```

### Skip a Task
Skip is more or less the same with enable when used at `Task` level. But the main difference is it will always render the given task. If it is skipped it renders it as skipped.

There are to main ways to skip a task. One is utilizing the `Task` so that instead of enabled it will show a visual output while the other one is inside the task.

*Please pay attention to asynchronous operation while designing a context skipped task list since it does not await for any variable in the context.*

*Please refer to [examples section](examples/task-skip.example.ts) for more detailed and further examples.*

Inside the task itself after some logic is done.
```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.skip('I am skipping this tasks for reasons.')
      }
    }
  ], { concurrent: false })
```

Through the task wrapper.
```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: (ctx): void => {
        ctx.skip = true
      }
    },

    {
      title: 'This task will never execute.',
      skip: (ctx): boolean => ctx.skip,
      task: (): void => {}
    }
  ], { concurrent: false })
```

There are two rendering methods for the default renderer for skipping the task. The default behavior is to replace the task title with skip message if the skip function returns a string. You can select the other way around with `rendererOptions: { collapseSkips: false }` for the default renderer to show the skip message under the task title.

### Show Output
Showing output from a task can be done in various ways.

To keep the output when the task finishes while using default renderer, you can set `{ persistentOutput: true }` in the `Task`.

```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
      },
      options: { persistentOutput: true }
    }
  ], { concurrent: false })
```

*Please refer to [examples section](examples/show-output.example.ts) for more detailed and further examples.*

#### Utilizing the Task Itself
This will show the output in a small bar that can only show the last output from the task.
```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
        await delay(500)

        task.output = 'I will push an output. [1]'
        await delay(500)

        task.output = 'I will push an output. [2]'
        await delay(500)
      }
    }
  ], { concurrent: false })
```

#### Utilizing the Bottom Bar
If task output to the bottom bar is selected, it will create a bar at the end of the tasks leaving one line return space in between. The bottom bar can only be used in the default renderer.

Items count that is desired to be showed in the bottom bar can be set through `Task` option `bottomBar`.
- If set to `true` it will only show the last output from the task.
- If it is set to a number it will limit the output to that number.
- If set to `Infinity`, it will keep all the output.

```typescript
new Listr<Ctx>([
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
        await delay(500)

        task.output = 'I will push an output. [1]'
        await delay(500)

        task.output = 'I will push an output. [2]'
        await delay(500)
      },
      options: {
        bottomBar: Infinity
      }
    }
  ], { concurrent: false })
```

#### Utilizing an Observable or Stream
Since observables and streams are supported they can also be used to generate output.
```typescript
new Listr<Ctx>([
    {
      // Task can also handle and observable
      title: 'Observable test.',
      task: (): Observable<string> =>
        new Observable((observer) => {
          observer.next('test')

          delay(500)
            .then(() => {
              observer.next('changed')
              return delay(500)
            })
            .then(() => {
              observer.complete()
            })
        })
    }
  ], { concurrent: false })
```

## Task Manager
Task manager is a great way to create a custom-tailored Listr class once and then utilize it more than once.

## Generic Features

### Tasks Without Titles
For default renderer, all tasks that do not have titles will be hidden from the visual task list and executed behind. You can still set `task.title` inside the task wrapper programmatically afterward, if you so desire.

Since tasks can have subtasks as in the form of Listr classes again, if a task without a title does have subtasks with the title it will be rendered one less level indented. So you can use this operation to change the individual options of the set of tasks like `exitOnError` or `concurrency` or even render properties, like while you do want collapse parent's subtasks after completed but do not want this for a given set of subtasks.

For verbose renderer, since it is not updating, it will show tasks that do not have a title as `Task without title.`

### Signal Interrupt
When the interrupt signal is caught Listr will render for one last time therefore you will always have clean exits. This registers event listener `process.on('exit')`, therefore it will use a bit more of CPU cycles depending on the Listr task itself.

You can disable this default behavior by passing in the options for the root task `{ registerSignalListeners: false }`.

## Testing
For testing purposes you can use the verbose renderer by passing in the option of `{ renderer: 'verbose' }`. This will generate text-based and linear output which is required for testing.

If you want to change the logger of the verbose renderer you can do that by passing a class implementing `Logger` class which is exported from the index and passing it through as a renderer option with `{ renderer: 'verbose', rendererOptions: { logger: MyLoggerClass } }`.

Verbose renderer will always output predicted output with no fancy features.

On | Output
---------|----------
 Task Started | \[STARTED\] ${TASK TITLE ?? 'Task without title.'}
 Task Failure | \[FAILED\] ${TASK TITLE ?? 'Task without title.'}
 Task Skipped | \[SKIPPED\] ${TASK TITLE ?? 'Task without title.'}
 Task Successful | \[SUCCESS\] ${TASK TITLE ?? 'Task without title.'}
 Spit Output | \[DATA\] ${TASK OUTPUT}
 Title Change | \[TITLE\] ${NEW TITLE}

## Log To A File

## Custom Renderers


## Types
Useful types are exported from the root. It is written with Typescript, so it will work great with any modern IDE/Editor.
