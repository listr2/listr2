---
title: Task
order: 1
tag:
  - mandatory
  - basic
category:
  - task
---

# {{ $frontmatter.title }}

`listr2` is a collection of tasks that are housed in a single instance as we have just created. Therefore the [Task](/api/listr2/interfaces/ListrTask.html) is the smallest building block of your task list.

<!-- more -->

## Task

A single task is an object with the [given properties](/api/listr2/interfaces/ListrTask.html#properties), where the `task` is the main attraction that the desired function gets executed.

A task can be in the form of, which is ensured by the typings:

- `Function`/`Promise`
- _Listr_ [^subtasks]
- `Stream`
- `Observable`

[^subtasks]: A subtask must be created through the helper function of `task.newListr` since there are injections of singleton instances of parent task performed while creating a subtask. Please check out the [related section](/task/subtasks.html).

## Creating Your First Task

<<< @../../examples/docs/task/task/basic.ts{9-14}

## Append To Existing _Listr_

<<< @../../examples/docs/task/task/append.ts{7-9,11-18}
