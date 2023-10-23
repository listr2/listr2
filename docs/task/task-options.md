---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Task Options
order: 2
tag:
  - mandatory
  - basic
category:
  - task
---

`listr2` can have global or per-task options to change the behavior of how a task or the whole set of tasks in subtask behaves.

<!-- more -->

## Per _Listr_

_Listr_ task list can be configured how to behave globally by using the second argument of the prototype with [given properties](/api/interfaces/listr2.ListrOptions.html#properties).

## Per _Subtask_

This behavior can be further expanded, if the subtask requires a different approach, in this case, these options are generated depending on the current renderer with the [given properties](/api/interfaces/listr2.ListrSubClassOptions.html#properties).

Naturally, subtasks options are a subset of the general options, since some options are needed to be set only one time, and do not make sense to change per task.

## Per _Task_

Some properties of the task options even propagate to the per-task setting, these are pretty limited in form of configuration but should be just enough for you to not wrap everything in subtasks to change behavior.

## Adding Task Options

Task options can be added as follows.

@[code typescript{26-27,30-34,38-41}](../../examples/docs/task/task-options/task-options.ts)
