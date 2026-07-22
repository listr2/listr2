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

<Version version="v11.0.0" />

The task list is drawn with partial, differential updates through [`log-update`](https://www.npmjs.com/package/log-update) `v8`. Instead of clearing and rewriting the whole screen on every change, only the lines that actually changed are rewritten, and each redraw is wrapped in synchronized-output markers (`ESC[?2026h`/`ESC[?2026l`) on supporting terminals to reduce flicker. The visible result is identical to previous versions, only smoother.

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
