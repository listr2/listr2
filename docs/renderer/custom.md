---
title: Custom Renderer
order: 50
tag:
  - advanced
  - customization
category:
  - renderer
---

You can create a custom renderer that is fit for your application.

<!-- more -->

## Implement or Extend the Default _Listr_ Renderer

<<< @../../examples/docs/renderer/custom/create-renderer.ts#create

::: info

For Javascript, since you cannot implement `ListrRenderer`, you can extend either the _SilentRenderer_ or `ListrBaseRenderer`.

:::

## Utilizing the _Task_

Take a look at _DefaultRenderer_ since it is implemented this way.

::: details <CodeExampleIcon /> Code Example

<<< @../../packages/listr2/src/renderer/default/renderer.ts

:::

## Utilizing the Events

_Listr_ and its _Task_ fires many events to indicate the task status. _Task_ depending on what is currently done will fire [ListrTaskState](/api/listr2/enumerations/ListrTaskState.html) and [ListrTaskEventType](/api/listr2/enumerations/ListrTaskEventType.html) through [ListrTaskEventManager](/api/listr2/classes/ListrTaskEventManager.html) which you can subscribe.

Take a look at _SimpleRenderer_ or _VerboseRenderer_ since it is implemented this way.

::: details <CodeExampleIcon /> Code Example

<<< @../../packages/listr2/src/renderer/simple/renderer.ts

:::

::: details <CodeExampleIcon /> Code Example

<<< @../../packages/listr2/src/renderer/verbose/renderer.ts

:::

## Using Render Hooks

<Version version="v2.1.0" />

Additional to listening to the events, another singleton hook that come from the root _Listr_ is `events`. This provides some generic events like [`ListrEventType.SHOULD_REFRESH_RENDER`](/api/listr2/enumerations/ListrEventType.html#should-refresh-render) which can be used to trigger an update on an updating renderer.

These `events` can be the third optional variable of a given renderer while using it is always optional.

```typescript
export class MyAmazingRenderer implements ListrRenderer {
  constructor(
    private readonly tasks: ListrDefaultRendererTasks,
    private readonly options: ListrDefaultRendererOptions,
    private readonly events: ListrEventManager
  ) {}
}
```

These events can be later listened to trigger an update.

```typescript
this.events.on(ListrEventType.SHOULD_REFRESH_RENDER, () => {
  this.update()
})
```

## Using a Custom Renderer

You can tell Listr to use your custom renderer by setting the `renderer` option in _Listr_ to your custom renderer.

<<< @../../examples/docs/renderer/custom/create-renderer.ts#run
