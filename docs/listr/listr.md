---
title: Listr
order: 20
tag:
  - mandatory
  - basic
category:
  - listr
---

# {{ $frontmatter.title }}

`listr2` is a stateful task list, therefore it is based on classes. To create a new task list, you must create an instance of [Listr](/api/listr2/classes/class..Listr.html) first.

<!-- more -->

## Generate New Class

Import and create a new task list from the prototype. It will return the created [Listr](/api/listr2/classes/class..Listr.html) class.

<<< @../../examples/docs/listr/new-listr/creating-a-new-instance.ts#create{1,7}

## Run the Generated Task List

Then you can run this task list as an `async` function and as the result, it will return the context through the tasks.

<<< @../../examples/docs/listr/new-listr/creating-a-new-instance.ts#run{2}
