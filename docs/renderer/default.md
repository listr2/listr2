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

You can find the related example [here](https://github.com/listr2/listr2/tree/master/examples/renderer-default-long.example.ts). It runs a task list taller than any terminal for about a minute, so you can scroll and resize the terminal while it runs. Near the end, a group rolls back, a group retries, and a group runs more subtasks at once than a terminal of 20 rows shows:

```bash
pnpm run --filter @listr2/examples start examples/renderer-default-long.example.ts
```

### When Tasks Are Persisted

A task is printed once it has finished. A group is printed in one piece when it closes, with its subtasks in the order they were declared in; only the tasks of the top-level list are printed one by one. A task that retries or rolls back stays at the bottom, with its subtasks, until it is done.

- Tasks of a sequential list are printed in order.
- Tasks of a concurrent top-level list are printed in the order they finish.
- With `collapseSubtasks: true`, the default, a task shows its subtasks while it runs and is printed as a single line once it finishes. It is printed expanded instead when one of its subtasks failed, rolled back, or was cancelled.
- With `collapseSubtasks: false`, a task is printed expanded, with its subtasks.

![A collapsing task while it runs](../../examples/screenshots/collapse-running.png)

_A task whose subtasks collapse, while it runs._

![A collapsing task once it finished](../../examples/screenshots/collapse.png)

_The same task once it finished, printed as a single line._

![A concurrent list persisting its tasks as they finish](../../examples/screenshots/concurrent.gif)

_A concurrent list: each task is printed as it finishes, so the slowest one comes last._

### Groups

A task that shows its subtasks prints its status and title above them, and its subtasks one indentation deeper.

```text
❯ Running migrations
  ✔ Running migration 001.
  ✔ Running migration 002.
  ⠋ Running migration 003.
```

![A group with collapseSubtasks: false while it runs](../../examples/screenshots/group-running.png)

_A group with `collapseSubtasks: false` while it runs._

![A group with collapseSubtasks: false from start to end](../../examples/screenshots/group.gif)

_The same group from start to end._

The status is `❯` while the task runs, the spinner and `[RETRY:n]` while it retries, or a red spinner while it rolls back. Once the task finished, it is `✔`, `⚠` when some subtasks failed without failing the task, `←` when it rolled back, or a red `❯` when the task failed, followed by the time it took with the `timer` option.

![A group with collapseSubtasks: false once it finished](../../examples/screenshots/group.png)

_The same group once it finished._

![Two groups that stay expanded because a subtask failed](../../examples/screenshots/failure.png)

_Groups that stay expanded because a subtask failed. The first carries on past the failure and shows `⚠`, the second fails with its subtask and shows a red `❯`._

![A group with a changed title, and a group with a timer](../../examples/screenshots/title.png)

_The first group changed its title while it ran. The second has the `timer` option, so it shows the time it took._

![Nested groups while they run](../../examples/screenshots/nested-running.png)

_Nested groups while they run._

![Nested groups once they finished](../../examples/screenshots/nested.png)

_The same groups once they finished._

Set [`markIndentation: true`](#markindentation) to draw each group as a bracket.

With `clearOutput: true` nothing is printed for good: the whole list stays at the bottom and is cleared at the end.

Anything written to `process.stdout` or `process.stderr` while the renderer runs is printed above the task list as it arrives. See [_ProcessOutput_](./process-output.md).

### Taller Than the Terminal

When the running part of the list is taller than the terminal, it is shortened until it fits, in this order:

1. The tasks that have not started yet are folded into a `… N` line at the end of their list, from the bottom of the list upwards: a list folds its waiting tasks only once every waiting task below it is folded.
2. The finished subtasks of an open group are folded into a single `↑ N` line.
3. If more tasks run than the terminal shows, the running tasks at the end of a list are counted in the `… N` line too, so the header of their group stays on the screen.

A single task that fits in one row is shown instead of a summary of it. Output bars that are taller than the terminal on their own still push the top of the list off the screen.

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
- Stopping the run with `Ctrl+Z` leaves a copy of the running tasks where the shell took over. They are drawn again below once the run continues.
- After `Ctrl+Z`, what you type is shown for the rest of the run, since changing the terminal mode from the background would stop the run again.
- A run started in the background, such as with `&` or under `timeout` in a script, stops with `Stopped (tty output)` until it is brought to the foreground. Set `lockInput: false` for it.
- When the terminal reports more rows than it shows, as some multiplexers and remote sessions do, the scrollback can fill with copies of the task list while it runs. The final output is still correct.

## How the Options Look

The renderer options below change how tasks are drawn. Each image shows a case of [`renderer-cases.example.ts`](https://github.com/listr2/listr2/tree/master/examples/renderer-cases.example.ts) in a real terminal.

### `collapseSubtasks`

A task collapses its subtasks into a single line once it finishes, by default. With `collapseSubtasks: false`, it keeps them under its title. See [When Tasks Are Persisted](#when-tasks-are-persisted) for both.

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

_Nested groups with `indentation: 4`._

### `outputBar`, `bottomBar` and `persistentOutput`

![A task with outputBar: 3 while it runs](../../examples/screenshots/output-bar.png)

_A task with `outputBar: 3` shows its last three lines of output under its title while it runs._

![The output bar and the bottom bar from start to end](../../examples/screenshots/output.gif)

_The output bar of the first task, and the bottom bar of the second, which has `bottomBar: 3`._

![The persisted output of a task with persistentOutput](../../examples/screenshots/output.png)

_Once they finished, the output of the second task stays below the list, since it has `persistentOutput: true`._

### `icon` and `color`

![A group with its icons changed](../../examples/screenshots/icons.png)

_With `markIndentation: true`, the `icon` option replaces the icons of the bracket and of the tasks, here `CONNECTOR_START`, `CONNECTOR_END` and `COMPLETED`._

### `markIndentation`

With `markIndentation: true`, a task that shows its subtasks draws them as a bracket: a header with its status and title, and a dimmed connector in front of its subtasks, which sit one indentation deeper than the status icon. The bracket closes on its last line.

```text
┌ ❯ Running migrations
│   ✔ Running migration 001.
│   ✔ Running migration 002.
└   ⠋ Running migration 003.
```

![A group with markIndentation: true while it runs](../../examples/screenshots/bracket-running.png)

_The group of [Groups](#groups) with `markIndentation: true` while it runs._

![A group with markIndentation: true from start to end](../../examples/screenshots/bracket.gif)

_The same group from start to end._

![A group with markIndentation: true once it finished](../../examples/screenshots/bracket.png)

_The same group once it finished. A failed group shows a red `✖` on its header._

![Nested groups with markIndentation: true](../../examples/screenshots/bracket-nested.png)

_Nested groups draw one bracket per level, each at the column of the subtasks of its parent._

Tasks without a title draw no bracket, and neither does any task with `indentation: 0`. The connector and the space after it take two columns whatever the indentation is.

The bracket uses `┌`, `│` and `└`, or `.`, `|` and `` ` `` when the terminal does not support unicode. Change them through the `icon` and `color` renderer options with the `ListrDefaultRendererLogLevels.CONNECTOR_START`, `CONNECTOR` and `CONNECTOR_END` keys.

![The bracket on a terminal without unicode](../../examples/screenshots/ascii.png)

_The fallback glyphs, on a terminal that does not support unicode._

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
