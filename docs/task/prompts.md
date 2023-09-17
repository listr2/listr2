---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Prompts
order: 60
tag:
  - advanced
  - ui
category:
  - task
---

Prompts use adapters and optional peer dependencies to provide interactivity with the user. The problem that we have with this application is that we are utilizing a single console updater, therefore we cannot directly write to `process.stdout`. This behavior requires a adapter in between to instead write to `task.stdout` and control the ANSI escape sequences for clearing lines since we do not have a `vt100` compatible interface through the console updater.

<!-- more -->

Since <Badge><FontIcon icon="mdi:tag-text-outline"/>v7.0.0</Badge>, for the ability to support multiple prompt providers, signature of the function `task.prompt` has changed requiring a adapter first.

## Adapters

### `enquirer`

The input adapter uses the beautiful and not very well-maintained (xD) [`enquirer`](https://www.npmjs.com/package/enquirer).

::: danger

`enquirer` is an optional peer dependency. Please install it first.

::: tabs

@tab npm

```bash
npm i enquirer
```

@tab yarn

```bash
yarn add enquirer
```

@tab:active pnpm

```bash
pnpm i enquirer
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

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-prompt.example.ts).

:::

#### Usage

To access the prompts just utilize the `task.prompt` jumper function by passing in your [`enquirer`](https://www.npmjs.com/package/enquirer) prompts as an argument.

::: info

Please note that I rewrote the types for the `enquirer` and bundle them with this application.

So it is highly likely that it has some mistakes in it since I usually do not use all of them. I will merge the original types when the `enquirer` fixes them with the pending merge request <Badge type="warning"><FontIcon icon="mdi:github" /><a href="https://github.com/listr2/listr2/issues/235" target="_blank">#235</a></Badge>, which can be tracked in issue , which will probably never happen!

:::

##### Single Prompt

::: danger

I have done a little trick here where, whenever you have just one prompt, then you do not have to name your prompt as in `enquirer`, it will be automatically named and then returned.

:::

@[code{3-} typescript{8,13}](../../examples/docs/task/prompts/enquirer-single.ts)

##### Multiple Prompts

::: warning

If you want to pass in an array of prompts, be careful that you should name them, this is also enforced by Typescript as well. This is not true for single prompts, since they only return a single value, it will be direct gets past to the assigned variable.

:::

@[code{3-} typescript{13-24}](../../examples/docs/task/prompts/enquirer-multiple.ts)

##### Use a Custom Prompt

You can either use a custom prompt out of the npm registry, or a custom-created one as long as it works with the [`enquirer`](https://www.npmjs.com/package/enquirer), it will work as expected. Instead of passing in the prompt name use the not-new-invoked class.

```typescript
import Enquirer from 'enquirer'
import EditorPrompt from 'enquirer-editor'
import { Listr, ListrEnquirerPromptAdapter } from 'listr2'

const enquirer = new Enquirer()
enquirer.register('editor', Editor)

const tasks = new Listr<Ctx>(
  [
    {
      title: 'Custom prompt',
      task: async (ctx, task): Promise<void> => {
        ctx.testInput = await task.prompt(ListrEnquirerPromptAdapter).run({
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

const ctx = await tasks.run()

console.log(ctx)
```

#### Cancel a Prompt

<Badge><FontIcon icon="mdi:tag-text-outline"/>v7.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/173" target="_blank">#173</a></Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/676" target="_blank">#676</a></Badge>

Since _Task_ keeps track of the active prompt and this adapter exposes a `cancel` method, you can cancel a prompt while it is still active.

@[code{3-} typescript{13}](../../examples/docs/task/prompts/enquirer-cancel.ts)

### `inquirer`

<Badge><FontIcon icon="mdi:tag-text-outline" />v7.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github" /><a href="https://github.com/listr2/listr2/issues/676" target="_blank">#676</a></Badge>

::: danger

`inquirer` is an optional peer dependency. Please install it first.

This library utilizes `@inquirer/prompts` instead of the legacy implementation `inquirer`.

::: tabs

@tab npm

```bash
npm i @inquirer/prompts
npm i -D @inquirer/type
```

@tab yarn

```bash
yarn add @inquirer/prompts
yarn add -D @inquirer/type
```

@tab:active pnpm

```bash
pnpm i @inquirer/prompts
pnpm i -D @inquirer/type
```

:::

##### Single Prompt

@[code{3-} typescript{10}](../../examples/docs/task/prompts/inquirer-single.ts)

#### Cancel a Prompt

Since _Task_ keeps track of the active prompt and this adapter exposes a `cancel` method, you can cancel a prompt while it is still active.

::: warning

`inquirer` acts a little bit different while canceling the prompt, since it is a implemented in a `CancellablePromise` kind of way and not exposing submit externally, whenever the promise is cancelled it will throw an error out from the promise.

:::

@[code{3-} typescript{15}](../../examples/docs/task/prompts/inquirer-cancel.ts)

## Renderer

Prompts, since their output passes through an internal `WritableStream` as a `process.stdout` will render multiple times in non-TTY renderers. It will work anyhow albeit it might not look great. Since prompts are not even intended for non-TTY terminals, this is a novelty.

### _DefaultRenderer_

Prompts can either have a title or not, but they will always be rendered at the end of the current console output.
