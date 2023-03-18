---
title: Task Options
order: 30
tag:
  - mandatory
  - basic
category:
  - task
---

`listr2` can have global or per-task options to change the behavior of how a task or the whole set of tasks in subtask behaves.

<!-- more -->

## Task Options

`listr` task list can be configured how to behave globally by using the second argument of the prototype with [given properties](/api/interfaces/ListrOptions.html#properties). This behavior can be further expanded, if the subtask requires a different approach, in this case, these options are generated dynamically through the [given type alias](/api/#listrsubclassoptions).

Naturally, subtasks options are a subset of the general options, since some options are needed to be set only one time, and do not make sense to change per task.

## Adding Task Options

Task options can be added globally or per task as follows.

@[code typescript{28-32,36-39}](../../examples/docs/getting-started/task-options.ts)
