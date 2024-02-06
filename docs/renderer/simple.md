---
title: Simple Renderer
order: 20
tag:
  - basic
category:
  - renderer
---

# {{ $frontmatter.title }}

_SimpleRenderer_ is an alternative to _DefaultRenderer_, which does not directly update the terminal but works more in a logger-like manner.

<!-- more -->

_SimpleRenderer_ still requires `vt100` terminal compatibility if you are using prompts, but can work in `non-TTY` environments other than that.

![demo](../../examples/renderer-simple.gif)

## Renderer Options

::: details

<!-- @include: ../api/listr2/interfaces/ListrSimpleRendererOptions.md -->

:::

## Renderer Task Options

::: details

<!-- @include: ../api/listr2/interfaces/ListrSimpleRendererTaskOptions.md -->

:::
