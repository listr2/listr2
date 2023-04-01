---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Process Output
order: 110
---

[ProcessOutput](/api/classes/ProcessOutput.html), [ProcessOutputHook](/api/classes/ProcessOutputHook.html), [ProcessOutputStream](/api/classes/ProcessOutputStream.html), [ProcessOutputBuffer](/api/classes/ProcessOutputBuffer.html) is used to take control of the current `stdout` and `stderr` for _ListrLogger_ to ensure that nothing else is written to the console and creates an abstraction for accessing `process.stdout` and `process.stderr` when needed.

<!-- more -->

<Badge><FontIcon icon="mdi:tag-text-outline"/>v6.0.0</Badge><Badge type="warning"><FontIcon icon="mdi:github"/><a href="https://github.com/listr2/listr2/issues/651" target="_blank">#651</a></Badge>

## Hijack

[ProcessOutput](/api/classes/ProcessOutput.html) for renderers like _DefaultRenderer_ that need updating your `vt100` compatible terminal gives the ability to hijack the current `process.stdout` and `process.stderr`, create a temporary buffer for storing anything that is trying to write to the terminal since it will corrupt the output of _Listr_. If the renderer does not request to hijack the terminal output, `process.stdout` and `process.stderr` will be used directly without any trickery.

## Release

After the renderer releases the _ProcessOutput_ and marks it ready to use, everything that has been outputted to the hooked streams will be dumped. **This intends to solve the most common cause of opening an issue in the repository which is saying that the output is corrupted and not realizing something else is writing to output the terminal.**

## Extending Process Output

You can override the default _ProcessOutput_ by extending the class with your expected behavior (e.g. writing to a log file) on the _ListrLogger_ since all of the renderers, that either use or do not use the hijacking function, use _ProcessOutput_ through _ListrLogger_ itself. For most cases, just creating a `new ProcessOutput()` by passing your own `WriteStream` for `process.stdout` and `process.stderr` through the constructor should be good enough.
