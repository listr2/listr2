---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Logger
order: 100
tag:
  - advanced
  - output
category:
  - logger
---

[ListrLogger](/api/classes/ListrLogger.html) is a common interface that enables the renderers to have a certain output format.

<!-- more -->

_ListrLogger_ is used for every renderer to a certain degree. _ListrLogger_ is a middleware between the console outputs of the renderers and handles the output streams `stdout` and `stderr` through _ProcessOutput_, and it might take full control of those streams while the renderer is rendering to avoid something else trying to write to the terminal. _ListrLogger_ also handles the styling and formatting of to be dumped data to the terminal depending on their level, which includes the colors and styling.

## Log Levels

Log levels for the _ListrLogger_ are dynamically injected while creating an instance of _ListrLogger_ and will affect the styling section of the instance.

By default, [LogLevels](/api/enums/LogLevels.html) is used for text-based renderers. For renderers like _DefaultRenderer_ styling require more cases than usual compared to the text-based renderers, therefore custom log levels [ListrDefaultRendererLogLevels](/api/enums/ListrDefaultRendererLogLevels.html) are injected.

## Style

The _style_ of _ListrLogger_ can be customized through [ListrLoggerOptions](/api/interfaces/ListrLoggerOptions.html). Since every renderer in some form is using _ListrLogger_ this functionality can be used to customize the renderers directly without implementing your renderer.

### Icons and Colors

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/613" target="_blank">#613</a></Badge>

_ListrLogger_ can be customized for any renderer through the `loggerOptions` field inside the respective renderer options that use the _ListrLogger_.

The `style` section is in the form of [ListrLoggerStyleMap](/api/interfaces/ListrLoggerStyleMap.html). By injecting new style options into the _ListrLogger_ you can change the icons and colors of every possible task.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

@[code typescript](../../examples/docs/renderer/style/icon-and-color.ts)

:::

## Fields

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge>

_ListrLogger_ can have fields for each entry in the form of prefixes and suffixes.

Please refer to the _presets_ section for how to use this with the renderers.

## Presets

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge>

The Preset mechanism is used for displaying additional data like [timestamps](/api/variables/PRESET_TIMESTAMP.html) or [timers](/api/variables/PRESET_TIMER.html). This also gives flexibility to making things dynamic with a conditional display of fields or conditional styling.

Different renderers support different presets, depending on whether it fits in the style of the selected renderer. Presets are not directly tied with the _ListrLogger_ itself but it is mostly leveraging the mechanism to have fields in the sense of prefixes and suffixes in the logging entry.

You can either pass the predefined preset to a given field or override a preset's behavior by overwriting the fields of the preset since it is designed as an object.

### Preset Timer

<Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/646" target="_blank">#646</a></Badge>

This preset can be used to show how much time has elapsed for a given thing to happen.

This preset is available for the _DefaultRenderer_, _VerboseRenderer_, and _SimpleRenderer_ on both _Listr_ and _Task_ level options.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

@[code typescript](../../examples/docs/renderer/logger/preset-timer.ts)

:::

### Preset Timestamp

This preset can be used to stamp log entries with the current timestamp.

This preset is available for the _VerboseRenderer_, _SimpleRenderer_ on _Listr_ level options.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

@[code typescript](../../examples/docs/renderer/logger/preset-timestamp.ts)

:::
