---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Conditional Skip
order: 50
tag:
  - basic
  - flow
category:
  - task
---

Conditional skip is another way of enabling a _Task_ depending on the given context. But the main difference between `enable` and `skip` is `skip` will always render the given task. When the execution time comes, and it turns out that it should be skipped, it will render or mark it as skipped.

<!-- more -->

::: warning

Please pay attention to asynchronous operation while designing a context-enabled task list since it does not wait for any variable in the context.

:::

::: info Example

You can find the related examples [here](https://github.com/cenk1cenk2/listr2/tree/master/examples/task-skip.example.ts).

:::

## Usage

## Skip inside a _Task_

@[code{3-} typescript{6}](../../examples/docs/task/skip/inside.ts)

## Skip conditionally defining the _Task_

@[code{3-} typescript{6,12}](../../examples/docs/task/skip/task.ts)

## Renderer

### _DefaultRenderer_

The default renderer has options where you can change how the skip messages are displayed.

::: details

@include(../api/interfaces/DefaultRendererOptions.md{105-152})

:::
