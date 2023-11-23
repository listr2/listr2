---
title: Renderer
order: 1
tag:
  - basic
category:
  - renderer
---

# {{ $frontmatter.title }}

Renderers are the communication interface with your _Listr_.

<!-- more -->

There are five main renderers, which are `default`, `simple`, `verbose`, and `silent` as well as a testing renderer called `test`.

_DefaultRenderer_ is the default choice.

If the environment advertises itself as non-TTY it will fall back to the fallback renderer automatically.

_SimpleRenderer_ is an alternative to _DefaultRenderer_, which has all its capabilities but does not try to update your `vt100` compatible terminal if you are not using prompts. From <Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge> it is designated as the default choice for the fallback renderer.

_VerboseRenderer_ was the default choice for the fallback renderer prior to <Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge>. It is a fully text-based renderer.

_SilentRenderer_ is used for the _Subtask_ of _Task_ since the parent already started a renderer. This renderer can also be used for using `listr2` as only a task list without any output to the terminal directly, so you could use your method of communication, or a logger however you like it.

_TestRenderer_ can be used for tests, where it will only output JSON output per-line for specific events that happen throughout the render.

## _Listr_ and _Subtask_ Renderer Options and Per _Task_ Renderer Options

Renderers can have global options, which it is set through `rendererOptions`, can be modified for a certain _Subtask_, and per _Task_ options, which are injected inside the _Task_ as `options`.

Depending on the selected `renderer`, `rendererOptions` as well as the `options` in the `Task` will change accordingly.

For also configuring the `fallbackRenderer`, you can pass `fallbackRendererOptions` to _Listr_.
