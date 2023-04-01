---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Error Handling
order: 5
tag:
  - basic
  - mandatory
category:
  - task
  - listr
---

Exceptions that occur while running the _Task_ will be handled internally through _Listr_. You can throw errors out of the tasks to show they are unsuccessful or stop execution. This can further be customized at _Listr_, _Subtask_ or _Task_ level.

Errors will yield a visual output on the terminal depending on the current renderer, and will also handle the _Task_ that has failed depending on the configuration. If an application needs to quit prematurely and fail a specific task just throw out an instance of `Error`.

The default behavior is if any of the tasks have failed, it will deem itself as unsuccessful and exit. This behavior can be changed with the `exitOnError` option. If the `exitOnError` is `true`, the first error encountered will be thrown out, and it will propagate outwards starting from the _Task_.

<!-- more -->

::: warning

An `Error` should be always a real `Error` type extended from the JavaScript/Typescript `Error` class.

:::

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/error-handling.example.ts).

:::

## Throwing a Error

Throwing an error will stop any further action from the current _Task_ and will propagate outwards of the _Task_ to _Listr_ and depending on the `exitOnError` configuration, execution will be slowly halted for upcoming or concurrent tasks.

::: info

You don't have to catch and collect errors explicitly since they will always be collected by _Listr_.

:::

::: warning

Be aware that the execution will only stop after the error is thrown out. This can kill any asynchronous action prematurely.

:::

@[code{4-} typescript{6}](../../examples/docs/task/error-handling/basic-error.ts)

## Changing the Behavior

### Per _Listr_

@[code{4-} typescript{6,16}](../../examples/docs/task/error-handling/change-behavior-exitonerror-listr.ts)

### Per _Subtask_

@[code{4-} typescript{10,20,26,30}](../../examples/docs/task/error-handling/change-behavior-exitonerror-subtask.ts)

### Per _Task_

@[code{4-} typescript{6,8,19}](../../examples/docs/task/error-handling/change-behavior-exitonerror-task.ts)

## Renderer

### _DefaultRenderer_

Default renderer has options where you can change how the errors are displayed.

::: details

<!-- @include: ../api/interfaces/DefaultRendererOptions.md{156-186} -->

:::

## Collected Errors

Errors from the _Task_ are collected inside an array in the main _Listr_ task list as `tasks.error` where `tasks` is the _Listr_ class. **This option is opt-in since <Badge>v6.0.0</Badge>.**

Since there are options to ignore some errors on cases like `exitOnError`, or the ability to retry the given task through `task.retry`, encountered errors can be swallowed while the execution. To deal with those swallowed errors, all the errors that are encountered even though it does not stops the execution gets collected through this property.

### Modes

<Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/615" target="_blank">#615</a></Badge>

Error collection now has three modes to choose from which are, `false`, `minimal` and `full`. This can be set through per _Task_ in the _Listr_ options with the key `collectErrors`. The default mode is `false` since I decided that this is the most-underused functionality, and it should be at least opt-in for saving some memory.

Due to potential memory leaks from cloning the context and task to the `ListrError`, advised mode is `minimal`, which will only collect where the error has occurred, when it has been encountered and what the `error.message` is.

If you want to fetch the full information for debugging you can set the mode to `full`. This will also clone the current context and task to the `ListrError`.

You can disable the error collection completely by setting it to `false`.

### ListrError

[`ListrError`](/api/classes/ListrError.html) class extends the default `Error` and has some additional information like the cause of the error and where it is coming from, and the frozen context at the given time to further debug the issue while execution.

### ListrErrorTypes

A listr error can be caused by multiple reasons, for a better explanation of why that particular error occurred, a type property on the `ListrError` exists in the form of enum [`ListrErrorTypes`](/api/enums/ListrErrorTypes.html).

### Methodology

The order of the array `tasks.error` where `tasks` is the _Listr_ class, represents the order of errors that are encountered.

To keep the error collection mechanism simple and predictable, it might also process the errors coming from the subtasks as well.

For example, the following example will clear some things up about the given mindset.

@[code{3-} typescript](../../examples/docs/task/error-handling/collection.ts)

::: details <FontIcon icon="ph:terminal-window-duotone" /> Output

@[code bash](../../examples/docs/task/error-handling/collection.output.txt)

:::

::: details <FontIcon icon="fluent:text-description-24-filled" /> Flow

- Tasks are concurrent, so we expect them to run in a synchronous fashion.
- First error will be thrown from the first task. Since exitOnError is `false` on that context, `ListrError` will get collected by `tasks.errors`], and the value will be `{ message: '1', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }`.
- Then it will recurse into the second task, which has two subtasks.
- The first task from the subtasks will fail and since the `exitOnError` is set to `true` in that context, that subtasks will fail and throw. The `ListrError` appended to the `tasks.errors` will be `{ message: '3', type: ListrErrorTypes.HAS_FAILED }`
- Since the subtask has crashed, it will not execute the upcoming tasks in the subtasks.
- It will return to the main task list and execute the 3rd task from that list. It will again show the same behavior with the first task, and the `ListrError` will be `{ message: '2', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }`.

:::
