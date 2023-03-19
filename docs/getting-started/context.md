---
title: Concept of Context
shortTitle: Context
order: 40
tag:
  - mandatory
  - basic
category:
  - context
---

While running a `listr2` task list, a self-contained variable is shared across the running tasks called the `ctx`. This has the same basic idea as shared contexts in other programming languages.

<!-- more -->

## Context Variable

A context is an object that is shared across the task list. Even though external variables can be used to do the same operation, context gives a self-contained way to process internal tasks.

- A successful task will return the context for further operation.
- Context can be injected from outside while creating the task list or running the task list.
- If an error is encountered, the context at the time will be recorded as a frozen object to give the ability to further debug the issue.

You can also manually inject a context variable default in multiple ways.

::: info Hint

If all tasks are in the same task list, the context will be automatically injected into all the subtasks.

:::

## Injecting Context

### Injecting Context as an Option

```typescript
const ctx: Ctx = {}

const tasks = new Listr<Ctx>(
  [
    /* tasks */
  ],
  { ctx }
)
```

This can also be used to inject a different context into subtasks. Imagine that you want to have some set of variables that you want to use only the subtask context, then you can pass it through the option. This variable will be garbage-collected whenever the subtasks finish. So if you want to return some values before it gets lost forever, you can just assign them to the parent context since it is accessible.

::: note :::github

This is related to the discussions on issue #612: "Allow Changing `Context` in `newListr()`".

Thanks BeeeQueue for bringing this up!

:::

<GithubIssueLink issue="612"></GithubIssueLink>

```typescript
const ctx: Ctx = {}
const subtaskContext: SubtaskCtx = {}

const tasks = new Listr<Ctx>(
  [
    task: (ctx, task): Listr => task.newListr(
        task.newListr(
          [
            {
              title: 'This is a subtask.',
              task: async (subCtx, task): Promise<void> => {
                subCtx.operation = true
              }
            },

            {
              title: 'This is a subtask.',
              skip: (subCtx) => !subCtx.operation
              task: async (subCtx, task): Promise<void> => {
                ctx.subtask = true
              }
            },
          ],
          { ctx: subtaskContext }
    )
  ],
  { ctx }
)
```

### Injecting Context at Runtime

```typescript
try {
  await tasks.run({ ctx })
} catch (e) {
  console.error(e)
}
```

## Retrieving Context

### As the Result of the Task

A successful task will always return the context at the end of the tasks.

```typescript
const tasks = new Listr([
  {
    task: (ctx): void => {
      ctx.test = true
    }
  }
])

const ctx = await tasks.run()

console.log(ctx.test) // true
```

### As Property of Task List

The root `listr` class itself holds the context value as a public property.

```typescript
const tasks = new Listr([
  {
    task: (ctx): void => {
      ctx.test = true
    }
  }
])

const ctx = await tasks.run()

console.log(tasks.ctx.test) // true
```
