---
title: Prompts
order: 60
tag:
  - advanced
  - ui
category:
  - task
---

# {{ $frontmatter.title }}

Prompts use adapters and optional peer dependencies to provide interactivity with the user. The problem that we have with this application is that we are utilizing a single console updater, therefore we cannot directly write to `process.stdout`. This behavior requires a adapter in between to instead write to `task.stdout` and control the ANSI escape sequences for clearing lines since we do not have a `vt100` compatible interface through the console updater.

<!-- more -->

Since <Version version="v7.0.0" />, for the ability to support multiple prompt providers, signature of the function `task.prompt` has changed requiring a adapter first.

## Adapters

### `inquirer`

<Version version="v7.0.0" /><GithubIssue :issue="676" />

The recommended input adapter uses [`@inquirer/prompts`](https://github.com/SBoudrias/Inquirer.js), the actively maintained modern _Inquirer_ implementation. Prefer this adapter for new code.

::: danger

`inquirer` is an optional peer dependency. Please install it first.

This library utilizes `@inquirer/prompts` instead of the legacy implementation `inquirer`.

Please also add the necessary prompt package for using a prompt from `inquirer`, you can read more about it in their [documentation](https://github.com/SBoudrias/Inquirer.js/blob/master/packages/prompts/README.md).

::: code-group

```bash [npm]
npm i @listr2/prompt-adapter-inquirer @inquirer/prompts
```

```bash [yarn]
yarn add @listr2/prompt-adapter-inquirer @inquirer/prompts
```

```bash [pnpm]
pnpm i @listr2/prompt-adapter-inquirer @inquirer/prompts
```

:::

##### Single Prompt

<<< @../../examples/docs/task/prompts/inquirer-single.ts{12}

#### Cancel a Prompt

Since _Task_ keeps track of the active prompt and this adapter exposes a `cancel` method, you can cancel a prompt while it is still active.

::: warning

`inquirer` acts a little bit different while canceling the prompt, since it is implemented as a `CancellablePromise` that does not expose `submit` externally; cancelling the promise throws an error out of it.

:::

<<< @../../examples/docs/task/prompts/inquirer-cancel.ts{17}

### `enquirer`

::: warning Deprecated — lifeline support only

[`enquirer`](https://www.npmjs.com/package/enquirer) is effectively unmaintained, with its last release in 2021, and is kept on **lifeline support only**. Prefer the [`inquirer`](#inquirer) adapter above for new code.

A `readline` change introduced in Node.js 24+ (`ERR_USE_AFTER_CLOSE`) breaks `enquirer`'s internal teardown in non-interactive / piped-`stdin` scenarios. Since <Version version="v11.0.0" />, where Node.js 26 was added to the test and build matrix and this issue first surfaced, **the `enquirer` adapter is no longer guaranteed on Node.js 26 and above**. It is expected to keep working on Node.js 22 and 24.

:::

The input adapter uses [`enquirer`](https://www.npmjs.com/package/enquirer).

::: danger

`enquirer` is an optional peer dependency. Please install it first.

::: code-group

```bash [npm]
npm i @listr2/prompt-adapter-enquirer enquirer
```

```bash [yarn]
yarn add @listr2/prompt-adapter-enquirer enquirer
```

```bash [pnpm]
pnpm i @listr2/prompt-adapter-enquirer enquirer
```

:::

Inside a _Task_, the `task.prompt` function gives you access to any [`enquirer`](https://www.npmjs.com/package/enquirer) default prompt as well as ability to modify the underlying instance for using a custom `enquirer` prompt.

<!-- more -->

To get input from the user you can assign the task a new prompt in an async function and write the response to the context.

::: warning

It is not advised to run prompts in concurrent tasks because multiple prompts will clash and overwrite each other's console output and when you do keyboard movements it will apply to them both.

This has been disabled to do in some renderers, but you are still able to do it with some renderers.

:::

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-prompt-enquirer.example.ts).

:::

#### Usage

To access the prompts just utilize the `task.prompt` jumper function by passing in your [`enquirer`](https://www.npmjs.com/package/enquirer) prompts as an argument.

::: info

The types for `enquirer` are re-written and bundled with this adapter, so they may have some inaccuracies. They will be reconciled with the upstream types once `enquirer` merges its pending typings work (<GithubIssue :issue="235" />).

:::

##### Single Prompt

::: danger

As a convenience, whenever you have just one prompt, you do not have to name your prompt as in `enquirer`; it will be automatically named and then returned.

:::

<<< @../../examples/docs/task/prompts/enquirer-single.ts{11,16}

##### Multiple Prompts

::: warning

If you want to pass in an array of prompts, be careful that you should name them, this is also enforced by Typescript as well. This is not true for single prompts, since they only return a single value that is passed directly to the assigned variable.

:::

<<< @../../examples/docs/task/prompts/enquirer-multiple.ts{16-27}

##### Use a Custom Prompt

You can either use a custom prompt out of the npm registry, or a custom-created one as long as it works with the [`enquirer`](https://www.npmjs.com/package/enquirer), it will work as expected. Instead of passing in the prompt name use the not-new-invoked class.

```typescript
import Enquirer from 'enquirer'
import EditorPrompt from 'enquirer-editor'
import { Listr, ListrEnquirerPromptAdapter } from 'listr2'

const enquirer = new Enquirer()
enquirer.register('editor', EditorPrompt)

const tasks = new Listr<Ctx>(
  [
    {
      title: 'Custom prompt',
      task: async (ctx, task): Promise<void> => {
        ctx.testInput = await task.prompt(ListrEnquirerPromptAdapter).run(
          {
            type: 'editor',
            message: 'Write something in this enquirer custom prompt.',
            initial: 'Start writing!',
            validate: (response): boolean | string => {
              return true
            }
          },
          { enquirer }
        )
      }
    }
  ],
  { concurrent: false }
)

const ctx = await tasks.run()

console.log(ctx)
```

#### Cancel a Prompt

<Version version="v7.0.0" /><GithubIssue :issue="173" /><GithubIssue :issue="676" />

Since _Task_ keeps track of the active prompt and this adapter exposes a `cancel` method, you can cancel a prompt while it is still active.

<<< @../../examples/docs/task/prompts/enquirer-cancel.ts{16}

## Renderer

Prompts, since their output passes through an internal `WritableStream` as a `process.stdout` will render multiple times in non-TTY renderers. It will work anyhow albeit it might not look great. Since prompts are not even intended for non-TTY terminals, this is a novelty.

### _DefaultRenderer_

Prompts can either have a title or not, but they will always be rendered at the end of the current console output.
