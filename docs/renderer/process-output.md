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

[ProcessOutput](/api/listr2/classes/class..ProcessOutput.html), [ProcessOutputStream](/api/listr2/classes/class..ProcessOutputStream.html), [ProcessOutputBuffer](/api/listr2/classes/class..ProcessOutputBuffer.html) is used to take control of the current `stdout` and `stderr` for _ListrLogger_ to ensure that nothing else is written to the console and creates an abstraction for accessing `process.stdout` and `process.stderr` when needed.

<!-- more -->

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/651" target="_blank">#651</a></Badge>

## Hijack

[ProcessOutput](/api/listr2/classes/class..ProcessOutput.html) for renderers like _DefaultRenderer_ that need updating your `vt100` compatible terminal gives the ability to hijack the current `process.stdout` and `process.stderr`, create a temporary buffer for storing anything that is trying to write to the terminal since it will corrupt the output of _Listr_. If the renderer does not request to hijack the terminal output, `process.stdout` and `process.stderr` will be used directly without any trickery.

## Release

After the renderer releases the _ProcessOutput_ and marks it ready to use, everything that has been outputted to the hooked streams will be dumped. **This intends to solve the most common cause of opening an issue in the repository which is saying that the output is corrupted and not realizing something else is writing to output the terminal.**

## Extending Process Output

You can override the default _ProcessOutput_ by extending the class with your expected behavior (e.g. writing to a log file) on the _ListrLogger_ since all the renderers, that either use or do not use the hijacking function, use _ProcessOutput_ through _ListrLogger_ itself. For most cases, just creating a `new ProcessOutput()` by passing your own `WriteStream` for `process.stdout` and `process.stderr` through the constructor should be good enough.

### Changing the Behavior

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.1.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/670" target="_blank">#670</a></Badge>

You can change the behavior of the _ProcessOutput_ through injecting it to the logger. Since every renderer at some level uses the underlying logger, this can effectively be used to change the behavior of the ProcessOutput as well.

If you do not like the behavior of the _ProcessOutput_, you can always implement and bring your own through this interface as well.

::: details <FontIcon icon="material-symbols:code-blocks-outline" /> Code Example

<<< @../../examples/docs/renderer/process-output/change-behavior.ts

:::
