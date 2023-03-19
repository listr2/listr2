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

The input module uses the beautiful and not very well-maintained (xD) [enquirer](https://www.npmjs.com/package/enquirer).

::: danger

`enquirer` is an optional peer dependency. Please install it first.

:::

Inside a _Task_, the `task.prompt` function gives you access to any [`enquirer`](https://www.npmjs.com/package/enquirer) default prompts as well as the underlying instance for using a custom `enquirer` prompt.

<!-- more -->

To get input from the user you can assign the task a new prompt in an async function and write the response to the context.

::: warning

It is not advised to run prompts in concurrent tasks because multiple prompts will clash and overwrite each other's console output and when you do keyboard movements it will apply to them both.

This has been disabled to do in some renderers, but you are still able to do it with some renderers.

:::

::: info Example

You can find the related examples [here](https://github.com/cenk1cenk2/listr2/tree/master/examples/task-prompt.example.ts).

:::

## Usage

To access the prompts just utilize the `task.prompt` jumper function by passing in your [`enquirer`](https://www.npmjs.com/package/enquirer) prompts as an argument.

::: info

Please note that I rewrote the types for the `enquirer` and bundle them with this application.

So it is highly likely that it has some mistakes in it since I usually do not use all of them. I will merge the original types when the `enquirer` fixes them with the pending merge request <Badge type="warning"><FontIcon icon="mdi:github" /><a href="https://github.com/cenk1cenk2/listr2/issues/235" target="_blank">#235</a></Badge>, which can be tracked in issue , which will probably never happen!

:::

### Single Prompt

::: danger

I have done a little trick here where, whenever you have just one prompt, then you do not have to name your prompt as in `enquirer`, it will be automatically named and then returned.

:::

@[code{3-} typescript{8,13}](../../examples/docs/task/prompts/single.ts)

### Multiple Prompts

::: warning

If you want to pass in an array of prompts, be careful that you should name them, this is also enforced by Typescript as well. This is not true for single prompts, since they only return a single value, it will be direct gets past to the assigned variable.

:::

@[code{3-} typescript{13-24}](../../examples/docs/task/prompts/multiple.ts)

### Use a Custom Prompt

You can either use a custom prompt out of the npm registry, or a custom-created one as long as it works with the [`enquirer`](https://www.npmjs.com/package/enquirer), it will work as expected. Instead of passing in the prompt name use the not-new-invoked class.

```typescript
import Enquirer from 'enquirer'
import EditorPrompt from 'enquirer-editor'
import { Listr } from 'listr2'

const enquirer = new Enquirer()
enquirer.register('editor', Editor)

const tasks = new Listr<Ctx>(
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

const ctx = await tasks.run()

console.log(ctx)
```

## Cancel a Prompt <Badge><FontIcon icon="mdi:tag-text-outline"/>v3.1.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/cenk1cenk2/listr2/issues/173" target="_blank">#173</a></Badge>

You can cancel a prompt while it is still active through the `cancelPrompt` function.

@[code{3-} typescript{12}](../../examples/docs/task/prompts/cancel.ts)

## Renderer

Prompts, since their output passes through an internal `WritableStream` as a `process.stdout` will render multiple times in non-TTY renderers. It will work anyhow albeit it might not look great. Since prompts are not even intended for non-TTY terminals, this is a novelty.

### _DefaultRenderer_

Prompts can either have a title or not, but they will always be rendered at the end of the current console output.
