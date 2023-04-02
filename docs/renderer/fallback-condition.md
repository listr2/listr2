---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Fallback Condition
order: 5
tag:
  - advanced
  - flow
category:
  - renderer
---

There are times other than `non-TTY` environments when you want to fallback to a fallback/silent renderer than the selected renderer.

A function that returns a boolean , or directly a boolean can be passed to _Listr_ for automatically stepping down to the `fallbackRenderer` or directly to _SilentRenderer_ when the condition is met.

<!-- more -->

## Default Behavior

- `fallbackRenderer` will be automatically used whenever you are in a `non-TTY` environment.
- Colors are disabled automatically by underlying the library whenever it is detected as not supported.
  - You can use the `forceColor` option on _Listr_ or set the environment variable `FORCE_COLOR=1` to force colors.
  - You can use the `disableColor` option on _Listr_ or set the environment variable `LISTR_DISABLE_COLOR=1` to disable colors completely even though your environment supports it. This is very useful for tests.
- Unicode characters like icons are not used whenever it is detected that your output does not support them.
  - You can use the `forceUnicode` option on _Listr_ or set the environment variable `LISTR_FORCE_UNICODE=1` to force the usage of the Unicode characters.

::: warning

These checks are primal at best but do not forget that in many cases, your terminal might support any of these UI properties, but the application in between might abstract access to them therefore it can be detected otherwise.

:::

## Usage

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/renderer-fallback-condition.example.ts).

:::

### Renderer Fallback

You can use the `fallbackRendererCondition` condition on _Listr_ to determine changing your renderer to the fallback renderer.

@[code{3-} typescript{13}](../../examples/docs/renderer/fallback-condition/renderer-fallback.ts)

### Silent Renderer Fallback

You can use the `silentRendererCondition` condition on _Listr_ to determine changing your renderer to the fallback renderer.

@[code{3-} typescript{13}](../../examples/docs/renderer/fallback-condition/renderer-silent.ts)
