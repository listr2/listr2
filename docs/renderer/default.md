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

_DefaultRenderer_ is intended for `TTY` environments with `vt100` terminal compatibility, where it continuously redraws the terminal output as the state of a _Task_ changes. This renderer has many options for customization, these options can be changed at _Listr_, _Subtask_ or _Task_ level.

This renderer uses _ProcessOutput_ to take control of the terminal.

![demo](../../examples/renderer-default.gif)

## How Updates Are Rendered

<Version version="v12.0.0" />

The task list is split in two. Tasks that will not change anymore are written once, above the list, and scroll into the scrollback of the terminal like any other output. Everything that can still change stays in the _live region_ at the bottom of the terminal: running and waiting tasks, their output bars, the bottom bar, and the prompt. Only the live region is redrawn, through [`log-update`](https://www.npmjs.com/package/log-update), with differential updates wrapped in synchronized-output markers (`ESC[?2026h`/`ESC[?2026l`) to reduce flicker, and finished tasks are written above it with its `persist()`.

This keeps long task lists intact: finished tasks are never clipped from the top or erased by a wrong line count, and the live region is redrawn when the terminal is resized.

You can find the related example [here](https://github.com/listr2/listr2/tree/master/examples/renderer-default-long.example.ts). It runs a task list taller than any terminal for about a minute, so you can scroll and resize the terminal while it runs:

```bash
pnpm run --filter @listr2/examples start examples/renderer-default-long.example.ts
```

### When Tasks Are Persisted

A task is persisted once it has closed, so a task that retries or rolls back stays in the live region until it is done. A task that retries also keeps its subtasks in the live region until it closes, whatever its `collapseSubtasks`, since they run again on every attempt.

- Tasks of a sequential list are persisted in order.
- Tasks of a concurrent list are persisted in the order they finish.
- A task whose subtasks collapse, which is the default `collapseSubtasks: true`, stays in the live region with its subtasks until it closes. It is then persisted as it is shown at that moment: collapsed into a single line, or expanded when one of its subtasks failed, rolled back, or was cancelled.
- A task with `collapseSubtasks: false` persists its title when its first subtask is persisted, then its subtasks as they finish, and then its final status line after its subtasks, drawn as the header and the footer of a bracket as described below. While it does so, the tasks next to it in a concurrent list wait in the live region, so its subtasks stay under its title.

![A collapsing task while it runs](../../examples/screenshots/collapse-running.png)

_A task whose subtasks collapse, while it runs: its subtasks stay in the live region inside a bracket._

![A collapsing task once it finished](../../examples/screenshots/collapse.png)

_The same task once it finished, persisted as a single line._

![A concurrent group persisting its subtasks as they finish](../../examples/screenshots/concurrent.gif)

_A concurrent group with `collapseSubtasks: false`: each subtask is persisted as it finishes, so the slowest one comes last._

Every task that shows its subtasks under its title draws them as a bracketed group: a header line with its title, a connector in the first column of the indentation of its subtasks, and a footer line with its status. That covers a task whose subtasks collapse while it runs, a task that stays expanded because one of its subtasks failed, rolled back, or was cancelled, a task that retries, and a task with `collapseSubtasks: false`. A task whose subtasks collapse and finish without a problem is persisted as a single line, as before.

```text
┌ Running migrations
│ ✔ Running migration 001.
│ ✔ Running migration 002.
│ ⠋ Running migration 003.
└ ❯ Running migrations
```

![A group with collapseSubtasks: false while it runs](../../examples/screenshots/bracket-running.png)

_A group with `collapseSubtasks: false` while it runs: the header and the finished subtasks are persisted, and the running subtask and the footer are live._

![A group with collapseSubtasks: false from start to end](../../examples/screenshots/bracket.gif)

_The same group from start to end._

While the group runs, its footer stays in the live region with the icon of the task and its title, since the header may have scrolled off the screen: `❯` while it runs, or the spinner of a retry followed by `[RETRY:n]` while it retries. A task with `collapseSubtasks: false` persists its header with its first finished subtask, so the connector runs on from the persisted part into the live part, and persists its footer once it closes. A task persisted as one block, such as one that stays expanded because a subtask failed, is persisted with its header and footer at once.

The persisted footer shows the final icon of the task only, since its title is already in the header: `✔` once it completed, `⚠` when some of its subtasks failed without failing it, and a red `✖` when it failed. The timer follows it when the `timer` renderer option of the task is on, and when the title of the task changed after its header was persisted, the footer shows the new title, so it is not lost.

```text
┌ Running migrations
│ ✔ Running migration 001.
│ ✔ Running migration 002.
│ ✔ Running migration 003.
└ ✔
```

![A group with collapseSubtasks: false once it finished](../../examples/screenshots/bracket.png)

_The same group once it finished: the footer shows only the status._

![Two groups that stay expanded because a subtask failed](../../examples/screenshots/failure.png)

_Groups that stay expanded because a subtask failed. The first carries on past the failure and closes on `⚠`, the second fails with its subtask and closes on a red `✖`._

With the `timer` option, the footer reads `└ ✔ [2s]`. The title shows only when a task with `collapseSubtasks: false` changed it after its first subtask was persisted: when it changed its title to `Ran 3 migrations.` by then, the footer reads `└ ✔ Ran 3 migrations.` A title changed before that updates the header, which is still in the live region, and a group persisted as one block writes its header with the final title.

![A footer with a changed title, and a footer with a timer](../../examples/screenshots/title.png)

_The first group changed its title after its header was persisted, so its footer shows the new title. The second has the `timer` option, so its footer shows the time it took._

Nested groups add one connector column each, and each draws its own header and footer. The header and footer take the column of the icon of the task, so the title stays where it was, and the connector takes the place of a space, so subtasks wrap and truncate as before. A task without a title draws no bracket, since there is no title line above its subtasks, and neither does any task with `indentation: 0`, since there is no column for the connector.

![Nested groups while they run](../../examples/screenshots/nested-running.png)

_Nested groups while they run: each level draws its own connector column, header and footer._

![Nested groups once they finished](../../examples/screenshots/nested.png)

_The same groups once they finished._

The bracket is drawn dimmed, with `┌`, `│` and `└`, or with `.`, `|` and `` ` `` when the terminal does not support unicode, so every line keeps its width. Change them like any other icon through the `icon` and `color` renderer options, with the `ListrDefaultRendererLogLevels.CONNECTOR_START`, `CONNECTOR` and `CONNECTOR_END` keys. Set the renderer option `markIndentation` to `false` to draw no bracket at all: a task then shows its title with its icon above its subtasks as before, and a task with `collapseSubtasks: false` persists its title with the `❯` icon before its subtasks and its final title line, with its title and timer, after them, at the column of the task.

![The bracket on a terminal without unicode](../../examples/screenshots/ascii.png)

_The fallback glyphs, on a terminal that does not support unicode._

![A group with collapseSubtasks: false and markIndentation: false](../../examples/screenshots/mark-indentation-false.png)

_The same group with `markIndentation: false`: no bracket, the title with `❯` before the subtasks, and the closing line with the title after them._

With `clearOutput: true` nothing is persisted: the whole list stays in the live region and is cleared at the end.

Anything written to `process.stdout` or `process.stderr` while the renderer runs is written above the live region as it arrives. See [_ProcessOutput_](./process-output.md). Output that does not go through `process.stdout` or `process.stderr`, such as a child process spawned with `stdio: 'inherit'`, bypasses this and corrupts the live region; pipe it through [`task.stdout()`](../task/output.md) instead.

### Taller Than the Terminal

Rows that scrolled off the top of the terminal cannot be redrawn, so when the live region is taller than the terminal, it is shortened in steps until it fits:

- The finished subtasks of a task whose subtasks collapse are summarized in a single `↑ N` line that counts them until the task closes, since they would disappear when it collapses anyway. The last ones that still fit stay visible above the running subtasks.
- If that is not enough, the tasks at the end of each list that have not started yet are summarized in a single `… N` line that counts them, so the running tasks stay on the screen. The first ones that still fit stay visible below the running tasks, and the rows that are left show the last finished subtasks again.
- If it is still taller, only its bottom `rows - 1` rows are drawn.

![A list taller than the terminal while it runs](../../examples/screenshots/summary.png)

_A list taller than a terminal of 12 rows while it runs: the finished subtasks are summarized above the running one, and the waiting tasks below it._

![A list taller than the terminal from start to end](../../examples/screenshots/summary.gif)

_The same list from start to end. Every task is persisted in full once it finishes._

The summary lines have their own icons, so they do not read as a single task: `↑` in green for the completed tasks, folded above, and a dimmed `…` for the waiting ones, or `^` and `+` when the terminal does not support unicode. Change them through the `icon` and `color` renderer options with the `ListrDefaultRendererLogLevels.SUMMARY_COMPLETED` and `SUMMARY_WAITING` keys. Inside a bracketed group, they take the connector like the subtasks around them, and the footer of a group stays on the screen below them.

This only shortens the live region: every task is persisted in full once it finishes. The height of the terminal is the `rows` that `process.stdout` reports, and there is no other limit on the live region.

::: warning

When the terminal reports more rows than it actually has, which happens with some terminal multiplexers and remote sessions, the live region is not shortened until it is taller than the reported rows. While it is taller than the actual screen, every redraw leaves its top rows behind in the scrollback, so the scrollback fills with copies of the live region for as long as that lasts. The persisted output stays correct.

:::

### Resizing the Terminal

When the terminal is resized, the live region is erased and drawn again at the new size. To erase it, its height at the new width has to be estimated:

- Terminals that reflow, such as VTE-based terminals, iTerm2, Terminal.app, Windows Terminal, kitty, WezTerm, Alacritty, VS Code, and tmux, split each line wider than the new width into more rows. The height is counted that way.
- Terminals that truncate lines instead, such as classic xterm, urxvt, st, GNU screen, and the Linux console, keep one row per line. Outside of tmux, they are detected from `XTERM_VERSION`, `TERM=linux`, `TERM=rxvt*`, `TERM=st*`, and `STY` or `TERM=screen*`.

If the terminal is not detected correctly, getting narrower either erases some rows of the persisted output above the live region, on a truncating terminal taken for a reflowing one, or leaves some rows of the old live region behind, on a reflowing terminal taken for a truncating one. This happens once per resize and does not build up.

When the live region does not fit into the resized terminal, the rows pushed off the top stay in the scrollback, once per resize. tmux also moves rows above the cursor into its history when it gets narrower, where they cannot be erased, so one stale row of the live region can stay behind.

### Keyboard Input

A terminal echoes what is typed, and an echoed line break moves the cursor below the live region without the renderer knowing, which would leave rows of the live region behind on every redraw. While the tasks run, the renderer turns off only the echo of the terminal with `stty -echo`:

- Keystrokes typed while the tasks run are not shown. They stay in the input buffer of the terminal and reach the shell, or whatever reads the terminal next, after the run.
- `Ctrl+C`, `Ctrl+\` and `Ctrl+Z` interrupt, quit, and suspend the whole foreground job as before, child processes included. When it is suspended, the live region is left on the screen as it is, since the shell may already have written below it, and the shell takes the terminal back in its own mode. When `fg` continues the job, the echo is turned off again and the live region is drawn again below the lines of the shell, so the frame from before the suspension stays in the scrollback. A job continued with `bg` leaves the terminal to the shell until `fg`: tasks that finish in the meantime are still written, but the live region is not drawn.
- A job that is not in the foreground process group of the terminal, such as one started with `&` or under `timeout` in a script, draws the live region as before, without the lock, since changing the mode of the terminal from there would stop it. It checks about once a second whether it got the terminal, and turns off the echo once it has.
- Prompts read the input as usual: the lock is lifted while a prompt is active and set again after it.
- The previous mode of the terminal, saved with `stty -g`, is restored when the renderer ends and when the process exits, also through an error or a signal. Only a process killed with `SIGKILL` leaves the echo off; run `stty sane` or `reset` to turn it back on.
- It only applies when both `process.stdin` and `process.stdout` are TTYs and `stty` is available, so not on Windows.

Set the renderer option `lockInput` to `false` when a task needs the terminal input itself, such as a child process spawned with `stdio: 'inherit'` that reads from it.

## How the Options Look

The renderer options below change how tasks are drawn. Each image shows a case of [`renderer-cases.example.ts`](https://github.com/listr2/listr2/tree/master/examples/renderer-cases.example.ts) in a real terminal.

### `collapseSubtasks`

A task collapses its subtasks into a single line once it finishes, by default. With `collapseSubtasks: false`, it keeps them under its title and persists them as they finish. See [When Tasks Are Persisted](#when-tasks-are-persisted) for both.

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

See [When Tasks Are Persisted](#when-tasks-are-persisted) for the same group with and without the bracket.

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
