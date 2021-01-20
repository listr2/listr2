# Listr2

[![Build Status](https://drone.kilic.dev/api/badges/cenk1cenk2/listr2/status.svg)](https://drone.kilic.dev/cenk1cenk2/listr2) [![Version](https://img.shields.io/npm/v/listr2.svg)](https://npmjs.org/package/listr2) [![Downloads/week](https://img.shields.io/npm/dw/listr2.svg)](https://npmjs.org/package/listr2) [![codecov](https://codecov.io/gh/cenk1cenk2/listr2/branch/master/graph/badge.svg)](https://codecov.io/gh/cenk1cenk2/listr2) [![Dependencies](https://img.shields.io/librariesio/release/npm/listr2)](https://npmjs.org/package/listr2) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

**Create beautiful CLI interfaces via easy and logical to implement task lists that feel alive and interactive.**

This is the expanded and re-written in Typescript version of the beautiful plugin by [Sam Verschueren](https://github.com/SamVerschueren) called [Listr](https://github.com/SamVerschueren/listr).

![Demo](./demo/demo.gif)

> **It breaks backward compatibility with [Listr](https://github.com/SamVerschueren/listr) after v1.3.12, albeit refactoring requires only moving renderer options to their own key, concerning the [conversation on the original repository](https://github.com/SamVerschueren/listr/issues/143#issuecomment-623094930).** You can find the README of compatible version [here](https://github.com/cenk1cenk2/listr2/tree/84ff9c70ba4aab16106d1e7114453ac5e0351ec0). Keep in mind that it will not get further bug fixes.

- [Changelog](./CHANGELOG.md)

<!-- toc -->

- [How to Use](#how-to-use)
  - [Install](#install)
  - [Create A New Listr](#create-a-new-listr)
    - [Tasks](#tasks)
    - [Options](#options)
  - [The Concept of Context](#the-concept-of-context)
  - [General Usage](#general-usage)
    - [Subtasks](#subtasks)
      - [Access Parent Task from Subtasks](#access-parent-task-from-subtasks)
    - [Get User Input](#get-user-input)
      - [Create A Prompt](#create-a-prompt)
        - [Single Prompt](#single-prompt)
        - [Multiple Prompts](#multiple-prompts)
      - [Use an Custom Prompt](#use-an-custom-prompt)
      - [Cancel a prompt](#cancel-a-prompt)
    - [Enable a Task](#enable-a-task)
    - [Skip a Task](#skip-a-task)
    - [Show Output](#show-output)
      - [Utilizing the Task Itself](#utilizing-the-task-itself)
      - [Utilizing the Bottom Bar](#utilizing-the-bottom-bar)
      - [Utilizing an Observable or Stream](#utilizing-an-observable-or-stream)
      - [Passing the Output Through as a Stream](#passing-the-output-through-as-a-stream)
    - [Throw Errors](#throw-errors)
    - [Rollback](#rollback)
  - [Task Manager](#task-manager)
    - [Basic Use-Case Scenario](#basic-use-case-scenario)
    - [More Functionality](#more-functionality)
  - [Generic Features](#generic-features)
    - [Tasks Without Titles](#tasks-without-titles)
    - [Signal Interrupt](#signal-interrupt)
  - [Testing](#testing)
  - [Default Renderers](#default-renderers)
  - [Renderer Fallback](#renderer-fallback)
  - [Custom Renderers](#custom-renderers)
  - [Render Hooks](#render-hooks)
  - [Log To A File](#log-to-a-file)
  - [Migration from Version v1](#migration-from-version-v1)
  - [Types](#types)

<!-- tocstop -->

---

# How to Use

Check out `examples/` folder in the root of the repository for the code in demo or follow through with this README.

## Install

```bash
# Install the latest supported version
yarn add listr2

npm install listr2
```

## Create A New Listr

Create a new task list. It will returns a Listr class.

```typescript
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    /* tasks */
  ],
  {
    /* options */
  }
)
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
export interface ListrTask<Ctx = ListrContext, Renderer extends ListrRendererFactory = any> {
  /**
   * Title of the task.
   *
   * Give this task a title if you want to track it by name in the current renderer.
   * Tasks without a title will tend to hide themselves in the default renderer and useful for
   * things like prompts and such.
   */
  title?: string
  /**
   * The task itself.
   *
   * Task can be a sync or async function, an Observable or a Stream.
   */
  task: (ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  /**
   * Runs a specific event if the current task or any of the subtasks has failed.
   * Mostly useful for rollback purposes for subtasks.
   */
  rollback?: (ctx: Ctx, task: ListrTaskWrapper<Ctx, Renderer>) => void | ListrTaskResult<Ctx>
  /**
   * Skip this task depending on the context.
   *
   * The function that has been passed in will be evaluated at the runtime when task tries to initially run.
   */
  skip?: boolean | string | ((ctx: Ctx) => boolean | string | Promise<boolean> | Promise<string>)
  /**
   * Enable a task depending on the context.
   *
   * The function that has been passed in will be evaluated at the initial creation of the Listr class.
   */
  enabled?: boolean | ((ctx: Ctx) => boolean | Promise<boolean>)
  /**
   * Per task options, depending on the selected renderer.
   *
   * This options depend on the implementation of selected renderer. If selected renderer has no options it will
   * be displayed as never.
   */
  options?: ListrGetRendererTaskOptions<Renderer>
}
```

### Options

```typescript
/**
 * Options to set the behavior of this base task.
 */
export interface ListrOptions<Ctx = ListrContext> {
  /**
   * Concurrency will set how many tasks will be run in parallel.
   *
   * @default false > Default is to run everything synchronously.
   *
   * `true` will set it to `Infinity`, `false` will set it to synchronous.
   * If you pass in a `number` it will limit it at that number.
   */
  concurrent?: boolean | number
  /**
   * Determine the behavior of exiting on errors.
   *
   * @default true > exit on any error comming from the tasks.
   */
  exitOnError?: boolean
  /**
   * Determine the behaviour of exiting after rollback actions.
   *
   * @default true > exit after rolling back tasks
   */
  exitAfterRollback?: boolean
  /**
   * To inject a context through this options wrapper. Mostly useful when combined with manager.
   * @default any
   */
  ctx?: Ctx
  /**
   * By default, Listr2 will track SIGINIT signal to update the renderer one last time before compeletely failing.
   * @default true
   */
  registerSignalListeners?: boolean
  /**
   * Determine the certain condition required to use the non-tty renderer.
   * @default null > handled internally
   */
  rendererFallback?: boolean | (() => boolean)
  /**
   * Determine the certain condition required to use the silent renderer.
   * @default null > handled internally
   */
  rendererSilent?: boolean | (() => boolean)
  /**
   * Disabling the color, useful for tests and such.
   * @default false
   */
  disableColor?: boolean
  /**
   * Inject data directly to TaskWrapper.
   */
  injectWrapper?: {
    enquirer?: Enquirer<object>
  }
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

const tasks = new Listr<Ctx>(
  [
    /* tasks */
  ],
  { ctx }
)
```

- Injecting it at runtime.

```typescript
try {
  await tasks.run({ ctx })
} catch (e) {
  console.error(e)
}
```

## General Usage

### Subtasks

Any task can return a new Listr. But rather than calling it as `new Listr` to get the full auto-completion features depending on the parent task's selected renderer, it is a better idea to call it through the `Task` itself by `task.newListr()`.

_Please refer to [examples section](examples/subtasks.example.ts) for more detailed and further examples._

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr([
          {
            title: 'This is a subtask.',
            task: async (): Promise<void> => {
              await delay(3000)
            }
          }
        ])
    }
  ],
  { concurrent: false }
)
```

You can change individual settings of the renderer on per-subtask basis.

This includes renderer options as well as Listr options like `exitOnError`, `concurrent` to be set on a per subtask basis independent of the parent task, while it will always use the most adjacent setting.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true, rendererOptions: { collapse: true } }
        )
    },

    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true, rendererOptions: { collapse: false } }
        )
    }
  ],
  { concurrent: false }
)
```

_Please refer to [Throw Errors Section](#Throw-Errors) for more detailed and further examples on how to handle silently failing errors._

#### Access Parent Task from Subtasks

You can access parent task class from subtasks via passing a function to `task.newListr`. This way you can change the title of the parent task or access its functionality. Skipping will not work reliably since the tasks run asynchronously. But added in for useful case of changing titles from subtasks with bringing it up in the [issue #141](https://github.com/cenk1cenk2/listr2/issues/141).

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr(
          (parent) => [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
                parent.title = 'I am changing title from subtask.'
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true }
        )
    },

    {
      title: 'This task will execute.',
      task: (ctx, task): Listr =>
        task.newListr(
          (parent) => [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(3000)
                parent.skip('This will skip the parent.')
              }
            },
            {
              title: 'This is an another subtask.',
              task: async (): Promise<void> => {
                await delay(2000)
              }
            }
          ],
          { concurrent: true, rendererOptions: { collapse: false } }
        )
    }
  ],
  { concurrent: false }
)
```

_Please refer to [examples section](examples/access-parent-task.example.ts) for more detailed and further examples._

**Supported for >v2.6.0.**

### Get User Input

The input module uses the beautiful [enquirer](https://www.npmjs.com/package/enquirer).

**Attention: Enquirer is a optional dependency. Please install it first.**

> **I did not add this as a peer dependency because in JavaScript you do not need it at all, but it will complain in Typescript, even though you are not using it, since I am importing types from it, so if you are not using it please install it as development dependency, if you use prompts, you should install it anyhow.**

So with running a `task.prompt` function, you can get access to any [enquirer](https://www.npmjs.com/package/enquirer) default prompts as well as using a custom enquirer prompt.

To get an input you can assign the task a new prompt in an async function and write the response to the context.

**It is not advisable to run prompts in a concurrent task because multiple prompts will clash and overwrite each other's console output and when you do keyboard movements it will apply to them both.**

Prompts, since their rendering is getting passed as a data output will render multiple times in verbose renderer since verbose renderer is not terminal-updating intended to be used in nonTTY environments. It will work anyhow albeit it might not look great.

Prompts can either have a title or not but they will always be rendered at the end of the current console while using the default renderer.

_Please refer to [examples section](examples/get-user-input.example.ts) for more detailed and further examples._

#### Create A Prompt

To access the prompts just utilize the `task.prompt` jumper function. The first argument takes in one of the default [enquirer](https://www.npmjs.com/package/enquirer) prompts as a string or you can also pass in a custom [enquirer](https://www.npmjs.com/package/enquirer) prompt class as well, while the second argument is the options for the given prompt.

Prompts always rendered at the bottom of the tasks when using the default renderer with one line return in between it and the tasks.

_Please note that I rewrote the types for enquirer, since some of them was failing for me. So it may have a chance of having some mistakes in it since I usually do not use all of them._

**>v2.1.0, defining the prompt style has been changed a little. It know requires type to be integrated inside the prompt itself, instead of passing two variables. Custom prompts still work the same way.**

##### Single Prompt

```typescript
new Listr<Ctx>(
  [
    {
      task: async (ctx, task): Promise<boolean> => (ctx.input = await task.prompt<boolean>({ type: 'Toggle', message: 'Do you love me?' }))
    },
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        ctx.input = await task.prompt<boolean>({ type: 'Toggle', message: 'Do you love me?' })
        // do something
        if (ctx.input === false) {
          throw new Error(':/')
        }
      }
    }
  ],
  { concurrent: false }
)
```

##### Multiple Prompts

**Important: If you want to pass in an array of prompts, be careful that you should name them, this is also enforced by Typescript as well. This is not true for single prompts, since they only return a single value, it will be directly gets passed to the assigned variable.**

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will get your input.',
      task: async (ctx, task): Promise<void> => {
        ctx.input = await task.prompt<{ first: boolean; second: boolean }>([
          { type: 'Toggle', name: 'first', message: 'Do you love me?' },
          { type: 'Toggle', name: 'second', message: 'Do you love me?' }
        ])
        // do something
        if (ctx.input.first === false) {
          logger.log('oh okay')
        }
        if (ctx.input.second === false) {
          throw new Error('You did not had to tell me for the second time')
        }
      }
    }
  ],
  { concurrent: false }
)
```

#### Use an Custom Prompt

You can either use a custom prompt out of the npm registry or custom-created one as long as it works with [enquirer](https://www.npmjs.com/package/enquirer), it will work expectedly. Instead of passing in the prompt name use the not-generated class.

```typescript
import Enquirer from 'enquirer'
import EditorPrompt from 'enquirer-editor'

const enquirer = new Enquirer()
enquirer.register('editor', Editor)

new Listr<Ctx>(
  [
    {
      title: 'Custom prompt',
      task: async (ctx, task): Promise<void> => {
        ctx.testInput = await task.prompt({
          type: 'editor',
          message: 'Write something in this enquirer custom prompt.',
          initial: 'Start writing!',
          validate: (response): boolean | string => {
            return true
          }
        })
      }
    }
  ],
  { concurrent: false, injectWrapper: { enquirer } }
)
```

**This is changed for > v2.4.2, but would not consider it a breaking change because it was somewhat not working.**

#### Cancel a prompt

You can cancel a prompt while it's display with the task's provided `cancelPrompt` function.

```typescript
import Enquirer from 'enquirer'
import EditorPrompt from 'enquirer-editor'
import delay from 'delay'

const enquirer = new Enquirer()
enquirer.register('editor', Editor)

new Listr<Ctx>(
  [
    {
      title: 'Custom prompt',
      task: async (ctx, task): Promise<void> => {
        // Cancel the prompt after 5 seconds
        delay(5000).then(() => task.cancelPrompt())

        ctx.input = await task.prompt({
          type: 'Input',
          message: 'Give me input before it disappears.'
        })
      }
    }
  ],
  { concurrent: false, injectWrapper: { enquirer } }
)
```

### Enable a Task

Tasks can be enabled depending on the variables programmatically. This enables to skip them depending on the context. Not enabled tasks will never show up in the default renderer, but when or if they get enabled they will magically appear.

**Please pay attention to asynchronous operation while designing a context enabled task list since it does not await for any variable in the context.**

_Please refer to [examples section](examples/task-enable.example.ts) for more detailed and further examples._

```typescript
new Listr<Ctx>(
  [
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
  ],
  { concurrent: false }
)
```

### Skip a Task

Skip is more or less the same with enable when used at `Task` level. But the main difference is it will always render the given task. If it is skipped it renders it as skipped.

There are to main ways to skip a task. One is utilizing the `Task` so that instead of enabled it will show a visual output while the other one is inside the task.

**Please pay attention to asynchronous operation while designing a context skipped task list since it does not await for any variable in the context.**

_Please refer to [examples section](examples/task-skip.example.ts) for more detailed and further examples._

Inside the task itself after some logic is done.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.skip('I am skipping this tasks for reasons.')
      }
    }
  ],
  { concurrent: false }
)
```

Through the task wrapper.

```typescript
new Listr<Ctx>(
  [
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
  ],
  { concurrent: false }
)
```

There are two rendering methods for the default renderer for skipping the task. The default behavior is to replace the task title with skip message if the skip function returns a string. You can select the other way around with `rendererOptions: { collapseSkips: false }` for the default renderer to show the skip message under the task title.

### Show Output

Showing output from a task can be done in various ways.

To keep the output when the task finishes while using default renderer, you can set `{ persistentOutput: true }` in the `Task`.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (ctx, task): Promise<void> => {
        task.output = 'I will push an output. [0]'
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false }
)
```

_Please refer to [examples section](examples/show-output.example.ts) for more detailed and further examples._

#### Utilizing the Task Itself

This will show the output in a small bar that can only show the last output from the task.

```typescript
new Listr<Ctx>(
  [
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
  ],
  { concurrent: false }
)
```

#### Utilizing the Bottom Bar

If task output to the bottom bar is selected, it will create a bar at the end of the tasks leaving one line return space in between. The bottom bar can only be used in the default renderer.

Items count that is desired to be showed in the bottom bar can be set through `Task` option `bottomBar`.

- If set to `true` it will only show the last output from the task.
- If it is set to a number it will limit the output to that number.
- If set to `Infinity`, it will keep all the output.

```typescript
new Listr<Ctx>(
  [
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
  ],
  { concurrent: false }
)
```

#### Utilizing an Observable or Stream

Since observables and streams are supported they can also be used to generate output.

_Please refer to [examples section](examples/stream.example.ts) for more detailed and further examples._

```typescript
new Listr<Ctx>(
  [
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
  ],
  { concurrent: false }
)
```

#### Passing the Output Through as a Stream

Since `process.stdout` method is controlled by `log-update` to create a refreshing interface, for anything else that might need to output data and can use `Writeable` streams, `task.stdout()` will create a new punch-hole to redirect all the write requests to `task.output`. This is especially beneficial for external libraries like `enquirer`, which is already integrated or something like `ink`.

**Supported for >v2.1.0.**

_This unfortunately relies on cleaning all ANSI escape characters, since currently I do not find a good way to sandbox them inside `log-update` which utilizes the cursor position by itself. So use this with caution, because it will only render the last chunk in a stream as well as cleaning up all the ANSI escape characters except for styles._

```typescript
import { Box, Color, render } from 'ink'
import React, { Fragment, useEffect, useState } from 'react'

import { Listr } from 'Listr2'
import { Logger } from '@utils/logger'

type Ctx = {}

const logger = new Logger({ useIcons: false })

async function main(): Promise<void> {
  let task: Listr<Ctx, 'default'>

  task = new Listr<Ctx, 'default'>(
    [
      {
        title: 'This task will show INK as output.',
        task: async (ctx, task): Promise<any> => {
          const Counter = () => {
            const [counter, setCounter] = useState(0)

            useEffect(() => {
              const timer = setInterval(() => {
                setCounter((previousCounter) => previousCounter + 1)
              }, 100)

              return (): void => {
                clearInterval(timer)
              }
            }, [])

            return <Color green>{counter} tests passed</Color>
          }

          const { unmount, waitUntilExit } = render(<Counter />, task.stdout())

          setTimeout(unmount, 2000)

          return waitUntilExit()
        }
      }
    ],
    { concurrent: false }
  )

  try {
    const context = await task.run()
    console.log(`Context: ${JSON.stringify(context)}`)
  } catch (e) {
    console.error(e)
  }
}

main()
```

### Throw Errors

You can throw errors out of the tasks to show they are unsuccessful. While this gives a visual output on the terminal, it also handles how to handle tasks that are failed. The default behavior is any of the tasks have failed, it will deem itself as unsuccessful and exit. This behavior can be changed with `exitOnError` option.

- Throw out an error in serial execution mode will cause all of the upcoming tasks to be never executed.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will fail.',
      task: async (): Promise<void> => {
        await delay(2000)
        throw new Error('This task failed after 2 seconds.')
      }
    },
    {
      title: 'This task will never execute.',
      task: (ctx, task): void => {
        task.title = 'I will change my title if this executes.'
      }
    }
  ],
  { concurrent: false }
)
```

- Throwing out an error while execution in parallel mode will immediately stop all the actions.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will fail.',
      task: async (): Promise<void> => {
        await delay(2000)
        throw new Error('This task failed after 2 seconds.')
      }
    },
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.title = 'I will change my title since it is concurrent.'
      }
    }
  ],
  { concurrent: true }
)
```

- Default behavior can be changed with `exitOnError` option.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will fail.',
      task: async (): Promise<void> => {
        await delay(2000)
        throw new Error('This task failed after 2 seconds.')
      }
    },
    {
      title: 'This task will execute.',
      task: (ctx, task): void => {
        task.title = 'I will change my title if this executes.'
      }
    }
  ],
  { concurrent: false, exitOnError: false }
)
```

- `exitOnError` is subtask based so you can change it on the fly for given set of subtasks.

```typescript
new Listr<Ctx>(
  [
    {
      title: 'This task will execute and not quit on errors.',
      task: (ctx, task): Listr =>
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                throw new Error('I have failed [0]')
              }
            },
            {
              title: 'This is yet an another subtask and it will run.',
              task: async (ctx, task): Promise<void> => {
                task.title = 'I have succeeded.'
              }
            }
          ],
          { exitOnError: false }
        )
    },
    {
      title: 'This task will execute.',
      task: (): void => {
        throw new Error('I will exit on error since I am a direct child of parent task.')
      }
    }
  ],
  { concurrent: false, exitOnError: true }
)
```

- The error that makes the application to quit will be thrown out from the async function.

```typescript
try {
  const context = await task.run()
} catch (e) {
  logger.fail(e)
  // which will show the last error
}
```

- Access all of the errors that makes the application quit or not through `task.err` which is an array of all the errors encountered.

```typescript
const task = new Listr(...)
logger.fail(task.err)
// will show all of the errors that are encountered through execution
```

- ListrError which is thrown out of `task.err´ in prior example is in the structure of

```typescript
public message: string
public errors?: Error[]
public context?: any
```

### Rollback

If you want to rollback a task or execute a callback if its subtasks failed, or the task itself failed, you can create a entry just like the the task itself with the same variables called `rollback`. Rollback will only execute if the task itself has marked as failed. Related issue is [#257](https://github.com/cenk1cenk2/listr2/issues/257).

_Please refer to [examples section](examples/rollback.example.ts) for more detailed and further examples._

- Rollback by default is to throw an exception and stop the execution of the upcoming tasks. But this can be overwritten by `{ exitAfterRollback: false }` option. This is a main Listr option which acts indeferent of the `exitOnError`.
- This is not very useful when it comes to the singular tasks that can utilize a try/catch block, but when it is not possible it is easier to use this.
- When rollback is activated the default renderer will change the spinner color to red, if the rollback successfully concludes then it will be a red back arrow, else it would be like a normal error where it will show the error from the rollback action itself.
- Since when you return new listr as a subtask list, it is not the easiest and most convient to access the on fail action, and each subtask should be handled seperately.

If you want to execute something after the any of the subtasks fail, you can check out the example below.

```typescript
task = new Listr<Ctx>(
  [
    {
      title: 'Something with rollback.',
      task: (_, task): Listr =>
        task.newListr(
          [
            {
              title: 'This task will fail.',
              task: async (): Promise<void> => {
                await delay(2000)
                throw new Error('This task failed after 2 seconds.')
              }
            },
            {
              title: 'This task will execute.',
              task: (_, task): void => {
                task.title = 'I will change my title if this executes.'
              }
            }
          ],
          { exitOnError: true }
        ),
      rollback: async (_, task): Promise<void> => {
        task.title = 'I am trying to rollback stuff, previous action failed.'

        await delay(1000)

        task.title = 'Doing something other than this.'

        await delay(1000)

        task.title = 'Some actions required rollback stuff.'
      }
    }
  ],
  {
    concurrent: false,
    exitOnError: true
  }
)

try {
  const context = await task.run()
  logger.success(`Context: ${JSON.stringify(context)}`)
} catch (e) {
  logger.fail(e)
}
```

**Supported for >v3.4.0.**

## Task Manager

Task manager is a great way to create a custom-tailored Listr class once and then utilize it more than once.

_Please refer to [examples section](examples/manager.example.ts) for more detailed and further examples._

### Basic Use-Case Scenario

- Create something like a manager factory with your own default settings

```typescript
export function TaskManagerFactory<T = any>(override?: ListrBaseClassOptions): Manager<T> {
  const myDefaultOptions: ListrBaseClassOptions = {
    concurrent: false,
    exitOnError: false,
    rendererOptions: {
      collapse: false,
      collapseSkips: false
    }
  }
  return new Manager({ ...myDefaultOptions, ...override })
}
```

- Create your class that benefits from manager

```typescript
export class MyMainClass {
  private tasks = TaskManagerFactory<Ctx>()

  constructor() {
    this.run()
  }

  private async run(): Promise<void> {
    // CODE WILL GO HERE IN THIS EXAMPLE
  }
}
```

- Add multiple set of subtasks with their own options

```typescript
this.tasks.add(
  [
    {
      title: 'A task running manager [0]',
      task: async (): Promise<void> => {
        throw new Error('Do not dare to run the second task.')
      }
    },
    {
      title: 'This will never run first one failed.',
      task: async (): Promise<void> => {
        await delay(2000)
      }
    }
  ],
  { exitOnError: true, concurrent: false }
)
```

- Run the tasks. Running the tasks will clear the pending queue so you can go ahead and add more new tasks!

```typescript
try {
  const ctx = await this.tasks.runAll()
} catch (e) {
  this.logger.fail(e)
}
```

### More Functionality

- Indenting tasks, to change options like `concurrency`, `exitOnError` and so on.

```typescript
this.tasks.add(
  [
    {
      title: 'Some task that will run in sequential execution mode. [0]',
      task: async (): Promise<void> => {
        await delay(2000)
      }
    },
    {
      title: 'Some task that will run in sequential execution mode. [1]',
      task: async (): Promise<void> => {
        await delay(2000)
      }
    },
    this.tasks.indent([
      {
        title: 'This will run in parallel. [0]',
        task: async (): Promise<void> => {
          await delay(2000)
        }
      },
      {
        title: 'This will run in parallel. [1]',
        task: async (): Promise<void> => {
          await delay(2000)
        }
      }
    ])
  ],
  { concurrent: true }
)
```

- Run a Task Directly, which will use the defaults settings you set in the manager.

```typescript
await this.tasks.run([
  {
    title: 'I will survive, dont worry',
    task: (): void => {
      throw new Error('This will not crash since exitOnError is set to false eventhough default setting in Listr is false.')
    }
  }
])
```

- Access the errors of the last task as in the Listr.

```typescript
await this.tasks.run([
  {
    title: 'I will survive, dont worry',
    task: (): void => {
      throw new Error('This will not crash since exitOnError is set to false eventhough default setting in Listr is false.')
    }
  }
])
this.logger.data(this.tasks.err.toString())
// will yield: ListrError: Task failed without crashing. with the error details in the object
```

- Access base Listr class directly, this will use the default Listr settings and just a mere jumper function for omitting the need the import the Listr class when using manager.

```typescript
try {
  await this.tasks
    .newListr([
      {
        title: 'I will die now, goodbye my freinds.',
        task: (): void => {
          throw new Error('This will not crash since exitOnError is set to false eventhough default setting in Listr is false.')
        }
      }
    ])
    .run()
} catch (e) {
  this.logger.fail(e)
}
```

- Get Task Runtime, and tailor it as your own

```typescript
await this.tasks.run(
  [
    {
      task: async (ctx): Promise<void> => {
        // start the clock
        ctx.runTime = Date.now()
      }
    },
    {
      title: 'Running',
      task: async (): Promise<void> => {
        await delay(1000)
      }
    },
    {
      task: async (ctx, task): Promise<string> => (task.title = this.tasks.getRuntime(ctx.runTime))
    }
  ],
  { concurrent: false }
)
// outputs: "1.001s" in seconds
```

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

| On              | Output                                                              |
| --------------- | ------------------------------------------------------------------- |
| Task Started    | \[STARTED\] \${TASK TITLE ?? 'Task without title.'}                 |
| Task Failure    | \[FAILED\] \${TASK TITLE ?? 'Task without title.'}                  |
| Task Skipped    | \[SKIPPED\] \${SKIP MESSAGE ?? TASK TITLE ?? 'Task without title.'} |
| Task Successful | \[SUCCESS\] \${TASK TITLE ?? 'Task without title.'}                 |
| Spit Output     | \[DATA\] \${TASK OUTPUT}                                            |
| Title Change    | \[TITLE\] \${NEW TITLE}                                             |
| Rollback        | \[ROLLBACK\] \${TASK TITLE ?? 'Task without title.'}                |

## Default Renderers

There are three main renderers which are 'default', 'verbose' and 'silent'. Default renderer is the one that can be seen in the demo, which is an updating renderer. But if the environment advertises itself as non-tty it will fallback to the verbose renderer automatically. Verbose renderer is a text based renderer. It uses the silent renderer for the subtasks since the parent task already started a renderer. But silent renderer can also be used for processes that wants to have no output but just a task list.

Depending on the selected renderer, `rendererOptions` as well as the `options` in the `Task` will change accordingly. It defaults to default renderer as mentioned with the fallback to verbose renderer on non-tty environments.

- Options for the default renderer.

  - Global

  ```typescript
  public static rendererOptions: {
    /**
     * indentation per level of subtask
     * @default 2
     */
    indentation?: number
    /**
     * clear output when task finishes
     * @default false
     */
    clearOutput?: boolean
    /**
     * show the subtasks of the current task if it returns a new listr
     * @default true
     */
    showSubtasks?: boolean
    /**
     * collapse subtasks after finish
     * @default true
     */
    collapse?: boolean
    /**
     * collapse skip messages in to single message and override the task title
     * @default true
     */
    collapseSkips?: boolean
    /**
     * show skip messages or show the original title of the task, this will also disable collapseSkips mode
     *
     * You can disable showing the skip messages, eventhough you passed in a message by settings this option,
     * if you want to keep the original task title intacted.
     * @default true
     */
    showSkipMessage?: boolean
    /**
     * suffix skip messages with [SKIPPED] when in collapseSkips mode
     * @default true
     */
    suffixSkips?: boolean
    /**
     * collapse error messages in to single message in task title
     * @default true
     */
    collapseErrors?: boolean
    /**
     * shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode
     * You can disable showing the error messages, eventhough you passed in a message by settings this option,
     * if you want to keep the original task title intacted.
     * @default true
     */
    showErrorMessage?: boolean
    /**
     * only update via renderhook
     *
     * useful for tests and stuff. this will disable showing spinner and only update the screen if the something else has
     * happened in the task worthy to show
     * @default false
     */
    lazy?: boolean
    /**
     * show duration for all tasks
     *
     * overwrites per task renderer options
     * @default false
     */
    showTimer?: boolean
    /**
     * removes empty lines from the data output
     *
     * @default true
     */
    removeEmptyLines?: boolean
    /**
     * formats data output depending on your requirements.
     * log-update mostly breaks if there is no wrap, so there is many options to choose your preference
     *
     * @default 'truncate'
     */
    formatOutput?: 'truncate' | 'wrap'
  } = {
    indentation: 2,
    clearOutput: false,
    showSubtasks: true,
    collapse: true,
    collapseSkips: true,
    showSkipMessage: true,
    suffixSkips: true,
    collapseErrors: true,
    showErrorMessage: true,
    lazy: false,
    showTimer: false,
    removeEmptyLines: true,
    formatOutput: 'truncate'
  }
  ```

  - Per-Task

  ```typescript
  public static rendererTaskOptions: {
    /**
     * write task output to bottom bar instead of the gap under the task title itself.
     * useful for stream of data.
     * @default false
     *
     * `true` only keep 1 line of latest data outputted by the task.
     * `false` only keep 1 line of latest data outputted by the task.
     * `number` will keep designated data of latest data outputted by the task.
     */
    bottomBar?: boolean | number
    /**
     * keep output after task finishes
     * @default false
     *
     * works both for bottom bar and the default behavior
     */
    persistentOutput?: boolean
    /**
     * show the task time if it was succesful
     */
    showTimer?: boolean
  }
  ```

- Options for the verbose renderer.

  - Global

  ```typescript
  public static rendererOptions: {
    /**
     * useIcons instead of text for log level
     * @default false
     */
    useIcons?: boolean
    /**
     * inject a custom loger
     */
    logger?: new (...args: any) => Logger
    /**
     * log tasks with empty titles
     * @default true
     */
    logEmptyTitle?: boolean
    /**
     * log title changes
     * @default true
     */
    logTitleChange?: boolean
  } = {
    useIcons: false,
    logEmptyTitle: true,
    logTitleChange: true
  }
  ```

- Options for the silent renderer.
  - NONE

## Renderer Fallback

There are times other than nonTTY environments that you want to use a verbose renderer instead of the default renderer.

For these times you needed to create a `getRenderer` kind of method and return the renderer value to renderer. But with the added complexity of the types, it is a bit more buggy to show it returns `default` for auto-complete purposes.

You can now pass in a function that returns a boolean, or directly a boolean for automatically stepping down to the `nonTTYRenderer` when the condition is met.

```typescript
task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, rendererFallback: (): boolean => 3 < 1 }
)
```

This is also true for if you want to get the silent renderer directly. But this time you have to pass in `rendererSilent` variable to the options.

```typescript
task = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (): Promise<void> => {
        await delay(500)
      },
      options: { persistentOutput: true }
    }
  ],
  { concurrent: false, rendererSilent: (): boolean => 3 < 1 }
)
```

_Please refer to [examples section](examples/renderer-fallback.example.ts) for more detailed and further examples._

**Supported for >v2.3.0.**

## Custom Renderers

Creating a custom renderer with a beautiful interface can be done in one of two ways.

- First create a Listr renderer class.

```typescript
import { ListrRenderer, ListrTaskObject } from 'listr2'

export class MyAmazingRenderer implements ListrRenderer {
  // Designate this renderer as tty or nonTTY
  public static nonTTY = true
  // designate your renderer options that will be showed inside the `ListrOptions` as rendererOptions
  public static rendererOptions: never
  // designate your custom internal task-based options that will show as `options` in the task itself
  public static rendererTaskOptions: never

  // get tasks to be rendered and options of the renderer from the parent
  constructor(public tasks: ListrTaskObject<any, typeof MyAmazingRenderer>[], public options: typeof MyAmazingRenderer['rendererOptions']) {}

  // implement custom logic for render functionality
  render(): void {}

  // implement custom logic for end functionality
  end(err): void {}
}
```

- Then there is a branching here you can either use:

  - Utilizing the task functions themselves. Take a look at [default renderer](src/renderer/default.renderer.ts) since it is implemented this way.

  ```typescript
  /** Unique id per task, randomly generated in the uuid v4 format */
  id: string
  /** Title of the task */
  title?: string
  /** Output data from the task. */
  output?: string
  /** The current state of the task. */
  state: string
  /**
   * A channel for messages.
   *
   * This requires a separate channel for messages like error, skip or runtime messages to further utilize in the renderers.
   */
  message: {
    /** Run time of the task, if it has been successfully resolved. */
    duration?: number
    /** Error message of the task, if it has been failed. */
    error?: string
    /** Skip message of the task, if it has been skipped. */
    skip?: string
    /** Rollback message of the task, if the rollback finishes */
    rollback?: string
  }
  /** A hook to refresh render if desired. */
  renderHook$: Subject<void>
  /** Returns whether this task has subtasks. */
  hasSubtasks: () => boolean
  /** Returns whether this task is in progress. */
  isPending: () => boolean
  /** Returns whether this task is skipped. */
  isSkipped: () => boolean
  /** Returns whether this task has been completed. */
  isCompleted: () => boolean
  /** Returns whether this task has an active rollback task going on. */
  isRollingBack: () => boolean
  /** Returns whether the rollback action was successful. */
  hasRolledBack: () => boolean
  /** Returns whether enabled function resolves to true. */
  isEnabled: () => boolean
  /** Returns whether this task has a prompt inside. */
  isPrompt: () => boolean
  /** Returns whether this task has been failed. */
  hasFailed: () => boolean
  /** Returns whether this task actually has a title. */
  hasTitle: () => boolean
  ```

  - Observables, where `event` will have a `type` and `data` to push channel through the pipe. Take a look at [verbose renderer](src/renderer/verbose.renderer.ts) since it is implemented this way.

  ```typescript
  /** Type of listr internal events. Not using enum for easy of use in custom JavaScript renderers. */
  export type ListrEventTypes = 'TITLE' | 'STATE' | 'ENABLED' | 'SUBTASK' | 'DATA' | 'MESSAGE'

  /** The internal communication event. */
  export type ListrEvent =
    | {
        type: Exclude<ListrEventTypes, 'MESSAGE'>
        data?: string | boolean
      }
    | {
        type: 'MESSAGE'
        data: ListrTaskObject<any, any>['message']
      }
  ```

  ```typescript
  tasks?.forEach((task) => {
      task.subscribe((event: ListrEvent) => {
        ...
  ```

  - Or if you so desire both!

## Render Hooks

Additional to rendering through `task.subscribe` or with a given interval, a renderer can also render on demand via a observable passed through the renderer.

Render hook can be the third optional variable of a given renderer, while using it is always optional.

```typescript
constructor (
    public tasks: ListrTaskObject<any, typeof DefaultRenderer>[],
    public options: typeof DefaultRenderer['rendererOptions'],
    public renderHook$?: ListrTaskObject<any, any>['renderHook$']
  )
```

Render hook is a void subject, which can be used to trigger re-render dynamically when any changes occur in the underneath.

```typescript
this.renderHook$.subscribe(() => {
  /* DO SOME RENDER MAGIC like render() */
})
```

**Supported for >v2.1.0.**

## Log To A File

Logging to a file can be done utilizing a module like [winston](https://www.npmjs.com/package/winston). This can be obtained through using the verbose renderer and creating a custom logger class that implements `Logger` which is exported from the index.

While calling a new Listr you can call it with `{ renderer: 'verbose', rendererOptions: { logger: MyLoggerClass } }`.

```typescript
import { logLevels, Logger, LoggerOptions } from 'listr2'

export class MyLoggerClass extends Logger {
  constructor(private options?: LoggerOptions) {
    // This is not needed if you don't use these options in your custom logger
  }

  /* CUSTOM LOGIC */
  /* CUSTOM LOGIC */
  /* CUSTOM LOGIC */
}
```

## Migration from Version v1

To migrate from prior versions that are older than v1.3.12, which is advisable due to upcoming potential bug fixes:

Please checkout [the entry in changelog.](./CHANGELOG.md#200-2020-05-06)

## Types

Useful types are exported from the root. It is written with Typescript, so it will work great with any modern IDE/Editor.
