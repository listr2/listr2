---
title: Conditional Enable
order: 40
tag:
  - basic
  - flow
category:
  - task
---

# {{ $frontmatter.title }}

_Task_ can be enabled depending on the variables programmatically. This enables the creation of tasks that are dependent on the context or outside conditions.

<!-- more -->

::: warning

_Task_ conditional enable is determined upon the initial run of the Listr when you create the class for a given _Task_ or _Subtask_, so be careful with using it while using internal context variables.

After the initial evaluation when the execution time comes for that particular _Task_, it will get re-evaluated.

:::

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-enable.example.ts).

:::

## Usage

<<< @../../examples/docs/task/enable/basic.ts{18}

## Renderer

Disabled tasks will not be rendered.
