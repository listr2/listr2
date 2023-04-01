---
author:
  name: Cenk Kılıç
  url: https://cenk.kilic.dev
  email: cenk@kilic.dev
title: Manager
order: 100
---

[Manager](/api/classes/Manager.html) is a great way to create a custom-tailored _Listr_ class once and then utilize it more than once.

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/manager.example.ts).

You can also find a real-world use case [here](https://github.com/tailoredmedia/backend-nx-skeleton/blob/master/packages/nx-tools/src/utils/manager.ts).

:::

## Idea

The idea of having an additional task manager is to create a higher-order factory to create _Listr_ on demand with always your options. This allows you to not store your options as variables that you inject every time you create a new _Listr_ but store it in a stateful Manager where you can initiate as many _Listr_ task lists as you want.

It can alternatively be used as a single-task list for ongoing actions where you can add more tasks as you like. This is also possible through _Listr_ but not as convenient to do.
