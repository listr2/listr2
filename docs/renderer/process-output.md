---
title: Process Output
order: 110
tag:
  - advanced
  - output
category:
  - logger
---

# {{ $frontmatter.title }}

[ProcessOutput](/api/listr2/classes/ProcessOutput.html) and [ProcessOutputStream](/api/listr2/classes/ProcessOutputStream.html) are used to take control of the current `stdout` and `stderr` for _ListrLogger_ to ensure that nothing else is written to the console and creates an abstraction for accessing `process.stdout` and `process.stderr` when needed.

<!-- more -->

<Version version="v6.0.0" /><GithubIssue :issue="651" />

## Hijack

[ProcessOutput](/api/listr2/classes/ProcessOutput.html) for renderers like _DefaultRenderer_ that need updating your `vt100` compatible terminal gives the ability to hijack the current `process.stdout` and `process.stderr`, and to capture anything else that tries to write to the terminal, since it would corrupt the output of _Listr_. If the renderer does not request to hijack the terminal output, `process.stdout` and `process.stderr` will be used directly without any trickery.

## Live Region

<Version version="v12.0.0" />

_ProcessOutput_ also owns the live region at the bottom of `stdout` that the _DefaultRenderer_ draws through [`log-update`](https://www.npmjs.com/package/log-update): `output.update()` redraws it, `output.persist()` writes text above it, where the text stays, and `output.clear()` erases it. It is redrawn when the terminal is resized. Once a renderer draws through it, anything written to the hijacked streams is written above the live region as it arrives, together with everything else written in the same tick. Writes to `stderr` still go to `stderr`. Streams left out of the `dump` option are still discarded. Output that is not written through `process.stdout` or `process.stderr`, such as a child process spawned with `stdio: 'inherit'`, cannot be hijacked and corrupts the live region; use [`task.stdout()`](../task/output.md) for it instead.

## Locking the Input

While the output is hijacked, `output.lockInput()` turns off the echo of the terminal with `stty -echo` until `output.unlockInput()` or the release, so keystrokes are not echoed into the live region. The keyboard signals are left on, so `Ctrl+C`, `Ctrl+\` and `Ctrl+Z` reach the whole foreground job as before. The _DefaultRenderer_ locks the input unless its `lockInput` option is `false`, and unlocks it while a prompt is active. See [the default renderer](./default.md#keyboard-input).

## Release

When the renderer releases the _ProcessOutput_, the streams are restored, and anything captured that has not been written yet is written to its stream, in the order it arrived. With the _DefaultRenderer_ that is at most what was written in the last tick, since everything else was already written above the live region. A renderer that hijacks the streams without drawing a live region, such as the _SimpleRenderer_ while a prompt is active, holds the captured output until the release, so it does not break into the prompt.

## Writing Through Process Output

When you write your own renderer or logger, emit through the _ProcessOutput_ instead of touching `process.stdout` directly, so your output stays coordinated with the hijack/release cycle. `output.toStdout(buffer)` and `output.toStderr(buffer)` write to the correct stream, and the underlying streams are also reachable through `output.stream`.

## Extending Process Output

You can override the default _ProcessOutput_ by extending the class with your expected behavior (e.g. writing to a log file) on the _ListrLogger_ since all the renderers, that either use or do not use the hijacking function, use _ProcessOutput_ through _ListrLogger_ itself. For most cases, just creating a `new ProcessOutput()` by passing your own `WriteStream` for `process.stdout` and `process.stderr` through the constructor should be good enough.

### Changing the Behavior

<Version version="v6.1.0" /><GithubIssue :issue="670" />

You can change the behavior of the _ProcessOutput_ through injecting it to the logger. Since every renderer at some level uses the underlying logger, this can effectively be used to change the behavior of the ProcessOutput as well.

If you do not like the behavior of the _ProcessOutput_, you can always implement and bring your own through this interface as well.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/renderer/process-output/change-behavior.ts

:::

## Routing All Output to `stderr`

<GithubIssue :issue="716" />

Since every renderer writes through the _ProcessOutput_ on the _ListrLogger_, you can keep `stdout` clean and pipeable (e.g. emitting `JSON` to pipe into `jq`) while the live UI and the final output still show up in the terminal by routing everything to `stderr`.

Pass `process.stderr` for both the `stdout` and `stderr` slots of the _ProcessOutput_, then inject the logger into the renderer.

There is one caveat: piping `stdout` makes it non-`TTY`, which normally steps _Listr_ down to the fallback renderer with a default logger. To keep the _DefaultRenderer_ and route the fallback through the same logger, set `forceTTY` and provide the logger on both `rendererOptions` and `fallbackRendererOptions`.

::: details <CodeExampleIcon /> Code Example

<<< @../../examples/docs/renderer/process-output/route-to-stderr.ts

:::
