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

# {{ $frontmatter.title }}

While running a `listr2` task list, a self-contained variable is shared across the running tasks called the `ctx`. This has the same basic idea as shared contexts in other programming languages.

<!-- more -->

## Context Variable

A context is an object that is shared across the task list. Even though external variables can be used to do the same operation, context gives a self-contained way to process internal tasks.

Context can be anything that satisfies the type [ListrContext](/api/types/listr2.ListrContext.html), which is by default of type `any`, but it is advised to be an object, due to the intention of using it as a mutable structure that goes through the task.

Context type can be injected as a type parameter to Listr class to limit what is being used as the context throughout the task and ensure type safety.

- A successful task will return the context for further operation.
- Context can be injected from outside while creating the task list or running the task list.
- If an error is encountered, the context at the time will be recorded as a frozen object to give the ability to further debug the issue.

You can also manually inject a context variable default in multiple ways.

::: info Hint

If all tasks are in the same task list, the context will be automatically injected into all the subtasks.

:::

## Injecting Context

### Injecting Context as an Option

Context can be injected as an option to the _Listr_.

<<< @../../examples/docs/listr/context/as-option.ts{9}

#### Multiple Contexts <GithubIssue :issue="612" />

This can also be used to inject a different context into subtasks. Imagine that you want to have some set of variables that you want to use only the subtask context, then you can pass it through the option. This variable will be garbage-collected whenever the subtasks finish. So if you want to return some values before it gets lost forever, you can just assign them to the parent context since it is accessible.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/listr/context/multiple-contexts.ts

:::

### Injecting Context at Runtime

<<< @../../examples/docs/listr/context/at-runtime.ts{8}

## Retrieving Context

### As the ReturnValue of the Task

A successful task will always return the context at the end of the task.

<<< @../../examples/docs/listr/context/retrieve-return.ts{11,13}

### As Property of Task List

The root _Listr_ class itself holds the context value as a public property.

<<< @../../examples/docs/listr/context/retrieve-property.ts{6,13}
