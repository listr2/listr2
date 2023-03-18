---
title: Task
order: 30
tag:
  - mandatory
  - basic
category:
  - task
---

`listr2` is a collection of tasks that are housed in a single instance as we have just created. Therefore the task is the smallest building block of your task list. A single task is an object with the [given properties](/api/interfaces/ListrTask.html#properties), where the `task` is the main attraction that the desired function gets executed.

<!-- more -->

## Task Function

A task can be in the form of, which is ensured by the typings:

- `Function`/`Promise`
- `Listr` [^subtasks]
- `Stream`
- `Observable`

[^subtasks]: A subtask must be created through the helper function of `task.newListr` since there are injections of singleton instances of parent task performed while creating a subtask.

## Creating Your First Task

```typescript {9-14}
import { Listr } from 'listr2'

interface Ctx {
  /* some variables for internal use */
}

const tasks = new Listr<Ctx>(
  [
    {
      title: 'This task will execute.',
      task: async (ctx): Promise<void> => {
        // perform some operations
      }
    }
  ],
  {
    /* options */
  }
)

try {
  await tasks.run()
} catch (e) {
  console.error(e)
}
```
