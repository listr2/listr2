---
title: Rollback
order: 80
---

# {{ $frontmatter.title }}

Whenever the _Task_ itself failed or its subtasks have failed, `rollback` will revert anything that needs to be reverted by that uncompleted action. Rollback will only execute if the task itself has been marked as failed and can be defined as the `rollback` property of a task.

> Since when you return a new _Listr_ as a subtask list, it is not the easiest, and most convenient to do something on failure, and each subtask should be handled separately. But this can still be used for singular tasks where some action needs to be reverted if the task does not complete.

<Version version="v3.3.0" /><GithubIssue :issue="257" />

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-rollback.example.ts).

:::

## Usage

### For _Subtask_

<<< @../../examples/docs/task/rollback/for-subtasks.ts{26-36}

## Options

Rollback, when it fails by default, throws an exception and stops the execution of the upcoming tasks. But this can be overwritten by `{ exitAfterRollback: false }` option. This is the main Listr option that acts independently of `exitOnError` since failing the rollback might have worse consequences.

## Renderer

### _DefaultRenderer_

When rollback is activated the default renderer will change the spinner color to bright red, if the rollback successfully concludes then it will be a redback arrow, else it would be like a normal error where it will show the error from the rollback action itself.
