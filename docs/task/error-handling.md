---
title: Error Handling
order: 5
tag:
  - basic
  - mandatory
category:
  - task
  - listr
---

# {{ $frontmatter.title }}

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

You don't have to catch errors explicitly since they will always be handled and surfaced by _Listr_. Collecting them into `Listr.errors` for later inspection is a separate, opt-in behavior covered below.

:::

::: warning

Be aware that the execution will only stop after the error is thrown out. This can kill any asynchronous action prematurely.

:::

<<< @../../examples/docs/task/error-handling/basic-error.ts{9}

## Changing the Behavior

### Per _Listr_

<<< @../../examples/docs/task/error-handling/change-behavior-exitonerror-listr.ts{9,19}

### Per _Subtask_

<<< @../../examples/docs/task/error-handling/change-behavior-exitonerror-subtask.ts{13,23,29,33}

### Per _Task_

<<< @../../examples/docs/task/error-handling/change-behavior-exitonerror-task.ts{9,11,22}

## Renderer

### _DefaultRenderer_

Default renderer has options where you can change how the errors are displayed.

<llm-exclude>

::: details Interface

<!-- @include: ../api/listr2/interfaces/ListrDefaultRendererOptions.md{203,233} -->

:::

</llm-exclude>

## Collected Errors

Errors from the _Task_ are collected inside an array in the main _Listr_ task list as `tasks.errors` where `tasks` is the _Listr_ class. **This option is opt-in since <Version version="v6.0.0" />.**

Since there are options to ignore some errors on cases like `exitOnError`, or the ability to retry the given task through `task.retry`, encountered errors can be swallowed while the execution. To deal with those swallowed errors, all the errors that are encountered even though it does not stops the execution gets collected through this property.

### Enabling

<GithubIssue :issue="615" />

Error collection is toggled per _Task_ through the _Listr_ options with the key `collectErrors`, which is a `boolean`. The default is `false` since this is the most-underused functionality, and it should be at least opt-in for saving some memory.

Setting it to `true` will collect where the error has occurred, when it has been encountered and what the `error.message` is. The context is no longer cloned in to the `ListrError` to avoid potential memory leaks and issues with cloning non-serializable values.

While collection is disabled, `Listr.errors` is `null` instead of an empty array. This way an empty array always means that collection is enabled and no errors have been encountered yet, while `null` means the errors were never collected. Guard reads with `listr.errors?.length` or an explicit `null` check.

### ListrError

[`ListrError`](/api/listr2/classes/ListrError.html) class extends the default `Error` and has some additional information like the cause of the error and where it is coming from to further debug the issue while execution.

### ListrErrorTypes

A listr error can be caused by multiple reasons, for a better explanation of why that particular error occurred, a type property on the `ListrError` exists in the form of enum [`ListrErrorTypes`](/api/listr2/enumerations/ListrErrorTypes.html).

### Reporting an Error Manually

A _Task_ can attach an error to the collection without throwing or interrupting its own execution through `task.report(error, type)`, where `type` is one of [`ListrErrorTypes`](/api/listr2/enumerations/ListrErrorTypes.html). This is handy when a task recovers from a failure but you still want it recorded. The error is only stored while `collectErrors` is enabled.

```typescript
task.report(new Error('recovered, but worth noting'), ListrErrorTypes.HAS_FAILED)
```

### Methodology

The order of the array `tasks.errors` where `tasks` is the _Listr_ class, represents the order of errors that are encountered.

To keep the error collection mechanism simple and predictable, it might also process the errors coming from the subtasks as well.

For example, the following example will clear some things up about the given mindset.

::: details Code

<<< @../../examples/docs/task/error-handling/collection.ts

:::

::: details Output

<<< @../../examples/docs/task/error-handling/collection.output.txt{bash}

:::

::: details Flow

- First error will be thrown from the first task. Since exitOnError is `false` on that context, `ListrError` will get collected by `tasks.errors`, and the value will be `{ message: '1', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }`.
- Then it will recurse into the second task, which has two subtasks.
- The first task from the subtasks will fail and since the `exitOnError` is set to `true` in that context, that subtasks will fail and throw. The `ListrError` appended to the `tasks.errors` will be `{ message: '3', type: ListrErrorTypes.HAS_FAILED }`
- Since the subtask has crashed, it will not execute the upcoming tasks in the subtasks.
- It will return to the main task list and execute the 3rd task from that list. It will again show the same behavior with the first task, and the `ListrError` will be `{ message: '2', type: ListrErrorTypes.HAS_FAILED_WITHOUT_ERROR }`.

:::
