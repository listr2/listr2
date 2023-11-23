---
title: Retry
order: 70
tag:
  - advanced
  - flow
category:
  - task
---

# {{ $frontmatter.title }}

If you want to retry a task that had failed a couple of times more, you can use the `retry` property in the `Task`.

<Badge><FontIcon icon="mdi:tag-text-outline" />v3.4.0</Badge><Badge type="warning"><FontIcon icon="mdi:github" /><a href="https://github.com/listr2/listr2/issues/303" target="_blank">#303</a></Badge>

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-retry.example.ts).

:::

## Usage

<<< @../../examples/docs/task/retry/basic.ts{18}

## Retry Delay

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/668" target="_blank">#668</a></Badge>

Retry action can have a delay between the tries. For enabling this behavior, you can pass the retry to the given task as an object.

<<< @../../examples/docs/task/retry/retry-delay.ts{18-21}

## Retry Event

Retrying is self-aware, and you can access the task if it is retrying via `task.isRetrying()`. It will either return an object [with the given interface](/api/listr2/interfaces/interface.ListrTaskRetry.html) where the `count` will be `0` for not repeating tasks, and `withError` is the last encountered error if retrying.

### Retry Count

<<< @../../examples/docs/task/retry/retry-count.ts{8,10-13}

### Last Error

<<< @../../examples/docs/task/retry/last-error.ts{8,10-13}

## Renderer

- When retrying, the task title will be reset to the original task title.

### _DefaultRenderer_

::: details

<!-- @include: ../api/listr2/interfaces/interface.ListrDefaultRendererOptions.md{263,294} -->

:::
