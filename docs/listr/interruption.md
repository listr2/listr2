---
title: Interruption
order: 30
---

# {{ $frontmatter.title }}

While a run is in progress, _Listr_ registers a `SIGINT` handler so it can be interrupted gracefully with `Ctrl+C` instead of the process being killed outright.

<Version version="v11.0.0" /><GithubIssue :issue="769" />

<!-- more -->

::: info Example

You can find the related example [here](https://github.com/listr2/listr2/tree/master/examples/interruption.example.ts).

:::

## Behavior

When a run is interrupted with `Ctrl+C` (`SIGINT`):

- Every in-flight task that defines a [`rollback`](/task/rollback.html) is rolled back before the process exits, reusing the same rollback mechanism as a normal failure.
- Nested rollbacks run from the innermost task outwards, so a subtask always rolls back before its parent.
- Tasks without a `rollback`, as well as any tasks that had not started yet, are marked with the `cancelled` state, shown as a `⊘` in the default renderer. This is distinct from `failed`, so an interrupted run is not mistaken for one that errored.
- The process exits with code `127`, but only after every in-flight rollback has settled.

## The signal mechanism

Interruption can not cancel an already-running _Promise_, so the original task function keeps executing in the background until it settles on its own while its `rollback` runs. To cancel your own asynchronous work cooperatively, use the `AbortSignal` exposed as `task.signal`, which aborts as soon as the run is interrupted.

```typescript
{
  title: 'Downloading a large file.',
  task: async (ctx, task): Promise<void> => {
    await fetch('https://listr2.kilic.dev', { signal: task.signal })
  },
  rollback: async (ctx, task): Promise<void> => {
    // remove the partially downloaded file
  }
}
```

`task.signal` is a standard [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) and can be handed to anything that accepts one, like `fetch`, `node:child_process` or timers, or subscribed to directly through `task.signal.addEventListener('abort', ...)`.

## Triggering it programmatically

The run can be interrupted from your own code, which is useful when a task needs to abort the whole run — and cancel or roll back its siblings — on some condition. Call `task.cancel()` from inside a task, or `listr.cancel()` on the instance you are running.

```typescript
{
  title: 'Guard the deployment.',
  task: async (ctx, task): Promise<void> => {
    if (await detectedFatalCondition()) {
      // cancel every other in-flight task, run their rollbacks, then exit with 127
      task.cancel()
    }
  }
}
```

`cancel()` follows the exact same path as pressing `Ctrl+C` — the other in-flight tasks roll back or are marked as `cancelled`, and the process exits with `127` once every rollback has settled — but without going through an operating-system signal, so it works regardless of the `registerSignalListeners` option. Sending `SIGINT` yourself with `process.kill(process.pid, 'SIGINT')` has the same effect.

::: warning

An interruption always terminates the process with `127`, whether it comes from `Ctrl+C` or `cancel()`.

:::

## Disabling the signal handlers

The `SIGINT` handling, and therefore the rollback-on-interruption behavior, can be turned off through the `registerSignalListeners` _Listr_ option.

::: warning

When `registerSignalListeners` is set to `false`, `Ctrl+C` terminates the process immediately without running any rollback or cleanup.

:::
