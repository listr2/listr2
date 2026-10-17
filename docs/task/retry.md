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

<Version version="v3.4.0" /><GithubIssue :issue="303" />

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-retry.example.ts).

:::

## Usage

<<< @../../examples/docs/task/retry/basic.ts{18}

## Retry Delay

<Version version="v6.0.0" /><GithubIssue :issue="668" />

Retry action can have a delay between the tries. For enabling this behavior, you can pass the retry to the given task as an object.

<<< @../../examples/docs/task/retry/retry-delay.ts{18-21}

While waiting between attempts the task enters a paused state, and the _DefaultRenderer_ shows a live countdown until the next try through its `pausedTimer` option. You can check for this state inside a task with `task.isPaused()`.

### Dynamic Retry Delay

<GithubIssue :issue="791" />

The delay can also be a callback that returns the time to wait in milliseconds, which makes it possible to implement backoff strategies like an exponential backoff. The callback will be evaluated before every retry with [the current retry attempt](/api/listr2/interfaces/ListrTaskRetry.html), where the `count` is the number of the failed attempt and `error` is the error it has thrown, and the context. It can also return a `Promise`.

<<< @../../examples/docs/task/retry/retry-delay-callback.ts{13}

- If the callback throws, the task fails with that error without retrying further.
- If the run is interrupted while the callback is pending, the task does not wait for it and stops with the error of the failed attempt.

## Fail Without Retrying

<GithubIssue :issue="791" />

Whenever the task knows that retrying will never succeed, it can fail immediately by returning `task.fail(error)`. The task fails with the given error through the regular error handling, which means rollback, `exitOnError` and error collection behave the same as an error that has been thrown in the last attempt, but the remaining retries are not used.

<<< @../../examples/docs/task/retry/fail.ts{11-13}

- The value of `task.fail()` has to be returned from the task, calling it without returning it will not fail the task. Throwing it, i.e. `throw task.fail(error)`, behaves the same as returning it.
- The given error is passed through as it is, without any validation or wrapping.
- It only applies to the task that calls it. When a subtask fails itself and its error fails the parent task, the parent task still uses its own retries as usual.
- Unlike `task.skip()`, the task ends up in the failed state, and unlike `task.cancel()`, it does not interrupt the other tasks.

## Retry Event

Retrying is self-aware, and you can access the task if it is retrying via `task.isRetrying()`. It will either return an object [with the given interface](/api/listr2/interfaces/ListrTaskRetry.html) where the `count` will be `0` for not repeating tasks, and `error` is the last encountered error if retrying.

### Retry Count

<<< @../../examples/docs/task/retry/retry-count.ts{8,10-13}

### Last Error

<<< @../../examples/docs/task/retry/last-error.ts{8,10-13}

## Renderer

- When retrying, the task title will be reset to the original task title.

### _DefaultRenderer_

<llm-exclude>

::: details

<!-- @include: ../api/listr2/interfaces/ListrDefaultRendererOptions.md{237,264} -->

:::

</llm-exclude>

### _SimpleRenderer_ & _VerboseRenderer_

The non-TTY renderers log a `RETRY` entry with the current attempt count on each retry, rather than resetting an in-place title.
