---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Task Options
order: 30
tag:
  - mandatory
  - basic
category:
  - task
---

`listr2` can have global or per-task options to change the behavior of how a task, or the whole set of tasks in subtask behaves.

<!-- more -->

## Global Task Options

_Listr_ task list can be configured how to behave globally by using the second argument of the prototype with [given properties](/api/interfaces/ListrOptions.html#properties).

## Per-Subtask Options

This behavior can be further expanded, if the subtask requires a different approach, in this case, these options are generated depending on the current renderer with the [given properties](/api/interfaces/ListrSubClassOptions.html#properties).

Naturally, subtasks options are a subset of the general options, since some options are needed to be set only one time, and do not make sense to change per task.

## Per-Task Options

Some properties of the task options even propagate to the per-task setting, these are pretty limited in form of configuration but should be just enough for you to not wrap everything in subtasks to change behavior.

## Adding Task Options

Task options can be added globally or per task as follows.

@[code typescript{28-32,36-39}](../../examples/docs/getting-started/task-options/task-options.ts)
