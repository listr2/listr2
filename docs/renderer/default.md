---
title: Default Renderer
order: 10
tag:
  - basic
category:
  - renderer
---

# {{ $frontmatter.title }}

_DefaultRenderer_ is the main renderer of `listr2`.

<!-- more -->

_DefaultRenderer_ is intended for `TTY` environments with `vt100` terminal compatibility, where it updates the task list in place as the state of a _Task_ changes. This renderer has many options for customization, these options can be changed at _Listr_, _Subtask_ or _Task_ level.

This renderer uses _ProcessOutput_ to take control of the terminal.

![demo](../../examples/renderer-default.gif)

## How the Output Updates

<Version version="v12.0.0" />

Finished tasks are printed once and scroll up like any other output. Running and waiting tasks, their output bars, the bottom bar, and prompts stay at the bottom of the terminal and update in place.

You can find the related example [here](https://github.com/listr2/listr2/tree/master/examples/renderer-default-long.example.ts). It runs a task list taller than any terminal for about a minute, so you can scroll and resize the terminal while it runs:

```bash
pnpm run --filter @listr2/examples start examples/renderer-default-long.example.ts
```

### When Tasks Are Persisted

A task is printed once it has finished. A task that retries or rolls back stays at the bottom, with its subtasks, until it is done.

- Tasks of a sequential list are printed in order.
- Tasks of a concurrent list are printed in the order they finish.
- With `collapseSubtasks: true`, the default, a task shows its subtasks while it runs and is printed as a single line once it finishes. It is printed expanded instead when one of its subtasks failed, rolled back, or was cancelled.
- With `collapseSubtasks: false`, a task prints its title with its first finished subtask, then its subtasks as they finish, and then its status line. Tasks next to it in a concurrent list wait at the bottom until it is done.

![A collapsing task while it runs](../../examples/screenshots/collapse-running.png)

_A task whose subtasks collapse, while it runs._

![A collapsing task once it finished](../../examples/screenshots/collapse.png)

_The same task once it finished, printed as a single line._

![A concurrent group persisting its subtasks as they finish](../../examples/screenshots/concurrent.gif)

_A concurrent group with `collapseSubtasks: false`: each subtask is printed as it finishes, so the slowest one comes last._

### Brackets

A task that shows its subtasks under its title draws them as a bracket: a header with its title, a dimmed connector in front of its subtasks, and a footer with its status.

```text
┌ Running migrations
│ ✔ Running migration 001.
│ ✔ Running migration 002.
│ ⠋ Running migration 003.
└ ❯
```

![A group with collapseSubtasks: false while it runs](../../examples/screenshots/bracket-running.png)

_A group with `collapseSubtasks: false` while it runs._

![A group with collapseSubtasks: false from start to end](../../examples/screenshots/bracket.gif)

_The same group from start to end._

The footer shows `❯` while the task runs, or the spinner and `[RETRY:n]` while it retries. Once the task finished, it shows `✔`, `⚠` when some subtasks failed without failing the task, or a red `✖` when the task failed, followed by the time it took with the `timer` option. The footer also shows the title when the task changed it after its header was printed, or while it runs once the header has scrolled off the screen.

```text
┌ Running migrations
│ ✔ Running migration 001.
│ ✔ Running migration 002.
│ ✔ Running migration 003.
└ ✔
```

![A group with collapseSubtasks: false once it finished](../../examples/screenshots/bracket.png)

_The same group once it finished._

![Two groups that stay expanded because a subtask failed](../../examples/screenshots/failure.png)

_Groups that stay expanded because a subtask failed. The first carries on past the failure and closes on `⚠`, the second fails with its subtask and closes on a red `✖`._

![A footer with a changed title, and a footer with a timer](../../examples/screenshots/title.png)

_The first group changed its title after its header was printed, so its footer shows the new title. The second has the `timer` option, so its footer shows the time it took._

Nested groups draw one bracket per level. Tasks without a title draw no bracket, and neither does any task with `indentation: 0`.

![Nested groups while they run](../../examples/screenshots/nested-running.png)

_Nested groups while they run._

![Nested groups once they finished](../../examples/screenshots/nested.png)

_The same groups once they finished._

The bracket uses `┌`, `│` and `└`, or `.`, `|` and `` ` `` when the terminal does not support unicode. Change them through the `icon` and `color` renderer options with the `ListrDefaultRendererLogLevels.CONNECTOR_START`, `CONNECTOR` and `CONNECTOR_END` keys. Set `markIndentation: false` to draw no bracket: a task then shows its title above its subtasks, and with `collapseSubtasks: false` a closing line with its title after them.

![The bracket on a terminal without unicode](../../examples/screenshots/ascii.png)

_The fallback glyphs, on a terminal that does not support unicode._

![A group with collapseSubtasks: false and markIndentation: false](../../examples/screenshots/mark-indentation-false.png)

_The same group with `markIndentation: false`._

With `clearOutput: true` nothing is printed for good: the whole list stays at the bottom and is cleared at the end.

Anything written to `process.stdout` or `process.stderr` while the renderer runs is printed above the task list as it arrives. See [_ProcessOutput_](./process-output.md).

### Taller Than the Terminal

When the running part of the list is taller than the terminal, it is shortened until it fits:

- The finished subtasks of a task whose subtasks collapse are folded into a single `↑ N` line.
- The tasks that have not started yet are folded into a single `… N` line.
- If it still does not fit, only its bottom rows are shown.

Every task is still printed in full once it finishes.

![A list taller than the terminal while it runs](../../examples/screenshots/summary.png)

_A list taller than a terminal of 12 rows while it runs._

![A list taller than the terminal from start to end](../../examples/screenshots/summary.gif)

_The same list from start to end._

The summary lines use `↑` in green and a dimmed `…`, or `^` and `+` when the terminal does not support unicode. Change them through the `icon` and `color` renderer options with the `ListrDefaultRendererLogLevels.SUMMARY_COMPLETED` and `SUMMARY_WAITING` keys.

### Keyboard Input

While the tasks run, what you type is not shown, so it cannot break the task list. It reaches the shell after the run. `Ctrl+C`, `Ctrl+\`, `Ctrl+Z` and prompts work as usual. This applies only when both `stdin` and `stdout` are TTYs, and not on Windows. Set `lockInput: false` to turn it off.

### Known Limits

- A child process spawned with `stdio: 'inherit'` writes over the task list. Pipe its output through [`task.stdout()`](../task/output.md) instead, and set `lockInput: false` if it reads the terminal input, so what you type for it is shown.
- A process killed with `SIGKILL` leaves typed keys hidden. Run `stty sane` or `reset`.
- Resizing the terminal can leave a stray row of the task list behind, or erase a row above it, once per resize.
- When the terminal reports more rows than it shows, as some multiplexers and remote sessions do, the scrollback can fill with copies of the task list while it runs. The final output is still correct.

## How the Options Look

The renderer options below change how tasks are drawn. Each image shows a case of [`renderer-cases.example.ts`](https://github.com/listr2/listr2/tree/master/examples/renderer-cases.example.ts) in a real terminal.

### `collapseSubtasks`

A task collapses its subtasks into a single line once it finishes, by default. With `collapseSubtasks: false`, it keeps them under its title and prints them as they finish. See [When Tasks Are Persisted](#when-tasks-are-persisted) for both.

### `showSubtasks`

![A task with showSubtasks: false while it runs](../../examples/screenshots/show-subtasks.png)

_With `showSubtasks: false`, a task does not show its subtasks, even while they run._

### `collapseErrors`

![collapseErrors true and false](../../examples/screenshots/collapse-errors.png)

_With `collapseErrors: true`, the default, a failed subtask shows its error message in place of its title. With `collapseErrors: false`, it keeps its title and shows the error message below it._

### `collapseSkips`

![collapseSkips true and false](../../examples/screenshots/collapse-skips.png)

_With `collapseSkips: true`, the default, a skipped subtask shows its skip message in place of its title. With `collapseSkips: false`, it keeps its title and shows the skip message below it._

### `suffixRetries`

![A task that retries](../../examples/screenshots/retry.png)

_A task while it retries, with the `[RETRY:n]` suffix of `suffixRetries: true`, the default._

### `formatOutput`

![A title longer than the terminal with formatOutput: truncate](../../examples/screenshots/truncate.png)

_With `formatOutput: 'truncate'`, a line longer than the terminal is cut at its width. With `'wrap'`, the default, it continues on the next row._

### `indentation`

![Nested groups with indentation: 4](../../examples/screenshots/indentation.png)

_Nested groups with `indentation: 4`. The connector takes the first column of the indentation of each level._

### `outputBar`, `bottomBar` and `persistentOutput`

![A task with outputBar: 3 while it runs](../../examples/screenshots/output-bar.png)

_A task with `outputBar: 3` shows its last three lines of output under its title while it runs._

![The output bar and the bottom bar from start to end](../../examples/screenshots/output.gif)

_The output bar of the first task, and the bottom bar of the second, which has `bottomBar: 3`._

![The persisted output of a task with persistentOutput](../../examples/screenshots/output.png)

_Once they finished, the output of the second task stays below the list, since it has `persistentOutput: true`._

### `icon` and `color`

![A group with its icons changed](../../examples/screenshots/icons.png)

_The `icon` option replaces the icons of the bracket and of the tasks, here `CONNECTOR_START`, `CONNECTOR_END` and `COMPLETED`._

### `markIndentation`

See [Brackets](#brackets) for the same group with and without the bracket.

## Renderer Options

<llm-exclude>

::: details

<!-- @include: ../api/listr2/interfaces/ListrDefaultRendererOptions.md -->

:::

</llm-exclude>

## Renderer Task Options

<llm-exclude>

::: details

<!-- @include: ../api/listr2/interfaces/ListrDefaultRendererTaskOptions.md -->

:::

</llm-exclude>
