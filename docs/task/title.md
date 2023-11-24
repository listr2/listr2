---
title: Title
order: 20
tag:
  - basic
  - visual
category:
  - task
---

# {{ $frontmatter.title }}

_Task_ can have a title to stand out from the crowd and give the user visual queues of what is actually running.

<!-- more -->

## Usage

The title of the _Task_ can be initiated while creating the task itself and, can be directly manipulated through the injected `task` object during runtime.

This allows the user to change the title depending on the progress that has been made throughout the task or just inform the user that the task is finished, so looking from a grammar perspective it will all look right.

<<< @../../examples/docs/task/title/task-title.ts{5,9,13}

## Tasks without a Title

The title of a _Task_ is an optional property.

For most of the renderers, except for _TestRenderer_, the tasks that do not have a title would be hidden. For something like a default renderer tasks that have subtasks with no title will be flattened visually.

You can always use `task.title` programmatically to add titles, and visually pop tasks to existence.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/title/task-title-pop.ts{8,12,19,23}

:::
