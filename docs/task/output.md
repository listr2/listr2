---
title: Output
order: 30
tag:
  - basic
  - visual
category:
  - task
---

# {{ $frontmatter.title }}

_Task_ can push output while running for informing the user of what is going on or programmatically for more information about an underlying task.

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/task-output.example.ts).

:::

## Usage

Depending on the renderer selected, the format of the output will change. For _DefaultRenderer_ everything will be rendered in a small bar just after the task, while for _SimpleRenderer_, _VerboseRenderer_, or _TestRenderer_ it will be more like a logger. You can find the individual properties for _Task_ `output` behavior in the next section.

### Show Output Through the Task Itself

This will show the output in a small bar that can only show the last output from the task.

<<< @../../examples/docs/task/output/with-task.ts{8,11,14}

### Passing Data Through an Observable or a Stream

Since observables and streams are supported they can also be used to generate output.

::: details <CodeExampleIcon /> Code Example — Stream

<<< @../../examples/docs/task/output/stream.ts

:::

::: details <CodeExampleIcon /> Code Example — Observable

<<< @../../examples/docs/task/output/observable.ts

:::

## Render a WritableStream Directly

<Version version="v2.1.0" /><GithubIssue :issue="31" />

`process.stdout` and `process.stderr` might get hooked depending on the usage of _ProcessOutput_ on the selected renderer. So anything that requires a `WritableStream` while the task running to dump the output, should go through the _Listr_ itself by creating a temporary `WritableStream` with `task.stdout()`.

## Render Output of a Command

<Version version="v6.5.0" /><GithubIssue :issue="677" />

Task output can be piped to the `task.stdout()` directly since it is a `WritableStream`, whenever you are running something that writes to the `process.output`. This usually can be utilized to show the outputs of the commands.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/output/pass-stdout.ts

:::

Whenever more control over the stream is required, temporary `WritableStream` can be created through helper function `createWritable` via passing it a callback to dictate the behavior of the `write` call.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/output/pass-stdout-with-control.ts

:::

## Renderer

### _DefaultRenderer_

#### Use the Output Bar <Version version="v7.0.0" /><GithubIssue :issue="686" />

For _DefaultRenderer_, if the task has a title, last line of output will be rendered under the task title by default.

Item count that is desired to be showed in the output bar can be set through the renderer option `outputBar` and is per-task.

- `true` only keep the last line.
- `Infinity` will keep all the lines.
- `number` will keep the defined amount of lines.
- `false` will not render output with this method.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/output/renderer-default-outputbar.ts

:::

#### Use the Bottom Bar

For _DefaultRenderer_, data can be outputted to a bar below all the render area, this is useful for fast moving logs. If the task has no title, last line of output will be rendered in the bottom bar by default.

Bottom bar can be selected through _Task_ renderer options, where it will create a bar at the end of the tasks leaving one line return space in between.

Item count that is desired to be showed in the bottom bar can be set through the renderer option `bottomBar` and is per-task.

- `true` only keep the last line.
- `Infinity` will keep all the lines.
- `number` will keep the defined amount of lines.
- `false` will not render output with this method.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/output/renderer-default-bottombar.ts

:::

#### Persistent Output

To keep the output after the task has been completed while using the default renderer, you can set `{ persistentOutput: true }` in the _Task_ or _Listr_ renderer options.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/task/output/renderer-default-persistent.ts

:::
