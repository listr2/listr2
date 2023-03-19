---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Output
order: 30
tag:
  - basic
  - visual
category:
  - task
---

_Task_ can push output while running for informing the user of what is going on or programmatically for more information about an underlying task.

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/cenk1cenk2/listr2/tree/master/examples/task-output.example.ts).

:::

## Usage

Depending on the renderer selected, the format of the output will change. For _DefaultRenderer_ everything will be rendered in a small bar just after the task, while for _SimpleRenderer_, _VerboseRenderer_, or _TestRenderer_ it will be more like a logger. You can find the individual properties for _Task_ `output` behavior in the next section.

### Show Output Through the Task Itself

This will show the output in a small bar that can only show the last output from the task.

@[code{4-} typescript{6,9,12}](../../examples/docs/task/output/with-task.ts)

### Passing Data Through an Observable or a Stream

Since observables and streams are supported they can also be used to generate output.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example — Stream

@[code typescript](../../examples/docs/task/output/stream.ts)

:::

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example — Observable

@[code typescript](../../examples/docs/task/output/observable.ts)

:::

## Render a WritableStream Directly <Badge><FontIcon icon="mdi:tag-text-outline" /> v2.1.0</Badge> <Badge type="warning"><FontIcon icon="mdi:github" /> [#141](https://github.com/cenk1cenk2/listr2/issues/31)</Badge>

`process.stdout` and `process.stderr` might get hooked depending on the usage of _ProcessOutputHook_ on the selected renderer. So anything that requires a `WritableStream` while the task running to dump the output, should go through the _Listr_ itself by creating a temporary `WritableStream` with `task.stdout()`.

## Renderer

### _DefaultRenderer_

#### Persistent Output

To keep the output after the task has been completed while using the default renderer, you can set `{ persistentOutput: true }` in the _Task_ or _Listr_ renderer options.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

@[code typescript](../../examples/docs/task/output/renderer-default-persistent.ts)

:::

#### Use the Bottom Bar

For default renderer, data can be outputted to a bar below all the render area, this is useful for fast moving logs.

Bottom bar can be selected through _Task_ or _Listr_ renderer options, where it will create a bar at the end of the tasks leaving one line return space in between.

Item count that is desired to be showed in the bottom bar can be set through the renderer option `bottomBar` and is per-task.

The option of persistent output can be combined with this option to persist the output afterwards.

- `true` will only show the last output from the task.
- `number` will limit the output items.
- `Infinity` will keep all the output.
- `false` will use the normal output method.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

@[code typescript](../../examples/docs/task/output/renderer-default-bottombar.ts)

:::
