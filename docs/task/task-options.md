---
title: Task Options
order: 2
tag:
  - mandatory
  - basic
category:
  - task
---

# {{ $frontmatter.title }}

`listr2` can have global or per-task options to change the behavior of how a task or the whole set of tasks in subtask behaves.

<!-- more -->

## Per _Listr_

_Listr_ task list can be configured how to behave globally by using the second argument of the prototype with [given properties](/api/listr2/interfaces/ListrOptions.html#properties).

## Per _Subtask_

This behavior can be further expanded, if the subtask requires a different approach, in this case, these options are generated depending on the current renderer with the [given properties](/api/listr2/interfaces/ListrSubClassOptions.html#properties).

Naturally, subtasks options are a subset of the general options, since some options are needed to be set only one time, and do not make sense to change per task.

## Per _Task_

Some of the task options propagate down to the per-task level. These per-task options are limited in scope, but usually enough to change a single task's behavior without wrapping it in a subtask.

## Adding Task Options

Task options can be added as follows.

<<< @../../examples/docs/task/task-options/task-options.ts{26-28,32-34,40-41}
