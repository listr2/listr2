---
title: Subtasks
order: 10
tag:
  - basic
  - flow
category:
  - task
---

# {{ $frontmatter.title }}

`listr2` can be infinitely nested by utilizing subtasks, which is the core part of the design.

<!-- more -->

A _Task_ can return a new _Listr_. But rather than calling it by invoking a `new Listr` to get the full auto-completion features depending on the parent task's selected renderer, it is mandatory to call it through the _Task_ itself by `task.newListr()` since they are sharing components internally that makes the application tick.

Subtasks can be nested indefinitely as long as the terminal width is enough to support them.

Subtasks give the advantage of grouping similar tasks, changing the behavior of _Listr_ for a certain set of tasks, or cleaning up the rendering area when certain tasks have finished.

## Usage

<<< @../../examples/docs/task/subtasks/usage.ts{8}

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/subtasks.example.ts).

:::

## Overwriting the Default Behavior Through Subtask Options

You can change the behavior of _Listr_, and the selected renderer of the parent through the options of a subtask.

This includes selected renderer options as well as **Listr** options like `exitOnError`, `concurrent` to be set per-subtaskly independent of the parent task, while it will always **inherit the defaults from the parent task**.

Due to design limitations of making renderers a bit simpler, some of the options that cannot be changed from the renderer are marked as `@global` in the hover documentation. This is not disabled through typings due to keeping the renderer instances fully self-contained.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

<<< @../../examples/docs/task/subtasks/overwriting-options.ts{8,23,30,45}

:::

## Access Parent Task from Subtasks

<Badge><FontIcon icon="mdi:tag-text-outline"/>v2.6.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/141" target="_blank">#141</a></Badge>

You can access the parent task class from subtasks by passing the function signature `(parent) => Listr` to `task.newListr`. This way you can change the title of the parent task or access its functionality.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

<<< @../../examples/docs/task/subtasks/access-parent-task.ts{9,15}

:::
