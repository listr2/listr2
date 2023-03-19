---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Rollback
order: 80
---

Whenever the _Task_ itself failed or its subtasks have failed, `rollback` will revert anything that needs to be reverted by that uncompleted action. Rollback will only execute if the task itself has been marked as failed and can be defined as the `rollback` property of a task.

> Since when you return a new _Listr_ as a subtask list, it is not the easiest, and most convenient to do something on failure, and each subtask should be handled separately. But this can still be used for singular tasks where some action needs to be reverted if the task does not complete.

<Badge><FontIcon icon="mdi:tag-text-outline" />v3.3.0</Badge><Badge type="warning"><FontIcon icon="mdi:github" /><a href="https://github.com/cenk1cenk2/listr2/issues/257" target="_blank">#257</a></Badge>

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/cenk1cenk2/listr2/tree/master/examples/task-rollback.example.ts).

:::

## Usage

### For _Subtask_

@[code{4-} typescript{24-34}](../../examples/docs/task/rollback/for-subtasks.ts)

## Options

Rollback, when it fails by default, throws an exception and stops the execution of the upcoming tasks. But this can be overwritten by `{ exitAfterRollback: false }` option. This is the main Listr option that acts independently of `exitOnError` since failing the rollback might have worse consequences.

## Renderer

### _DefaultRenderer_

When rollback is activated the default renderer will change the spinner color to bright red, if the rollback successfully concludes then it will be a redback arrow, else it would be like a normal error where it will show the error from the rollback action itself.
