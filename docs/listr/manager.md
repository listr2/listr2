---
title: Manager
order: 100
tag:
  - advanced
  - flow
category:
  - manager
---

# {{ $frontmatter.title }}

[Manager](/api/@listr2/manager/classes/Manager.html) is a great way to create a custom-tailored _Listr_ class once and then utilize it more than once.

<!-- more -->

::: info Example

You can find the related examples [here](https://github.com/listr2/listr2/tree/master/examples/manager.example.ts).

You can also find a real-world use case [here](https://github.com/tailoredmedia/backend-nx-skeleton/blob/master/packages/nx-tools/src/utils/manager.ts).

:::

::: danger

`@listr2/manager` is an optional peer dependency. Please install it first.

::: code-group

```bash [npm]
npm i @listr2/manager
```

```bash [yarn]
yarn add @listr2/manager
```

```bash [pnpm]
pnpm i @listr2/manager
```

:::

## Idea

The idea of having an additional task manager is to create a higher-order factory to create _Listr_ on demand with always your options. This allows you to not store your options as variables that you inject every time you create a new _Listr_ but store it in a stateful Manager where you can initiate as many _Listr_ task lists as you want.

It can alternatively be used as a running task list for ongoing actions, where you add more tasks over time through `manager.add()`. This is also possible with a plain _Listr_, but less convenient.

## Usage

### Creating a Manager

Create the _Manager_ once with the base options every list should share, then reuse it. Wrapping it in a factory keeps the preset in a single place.

```typescript
import { Manager } from '@listr2/manager'
import type { ListrBaseClassOptions } from 'listr2'

function TaskManagerFactory<Ctx = any>(override?: ListrBaseClassOptions<Ctx>): Manager<Ctx> {
  return new Manager({ concurrent: false, exitOnError: false, ...override })
}
```

### Creating a List on Demand

`manager.newListr(tasks, options?)` returns a normal [_Listr_](/listr/listr.html) instance built with the manager's preset options, which you then run yourself. Per-call `options` are merged over the preset.

```typescript
const manager = TaskManagerFactory()

const list = manager.newListr([{ title: 'A task', task: async (): Promise<void> => {} }])
await list.run()
```

### Queueing and Running

`manager.add(tasks, options?)` appends to an internal queue instead of running immediately — each `add()` becomes its own indented group. `manager.runAll(options?)` then runs everything queued and clears the queue. `add()` also accepts a function that receives the context, so a group can be built lazily from the state produced by earlier groups.

```typescript
manager.add([{ title: 'First group', task: async (): Promise<void> => {} }])
manager.add((ctx) => [{ title: 'Built from context', task: async (): Promise<void> => {} }])

const ctx = await manager.runAll()
```

### Running Once

`manager.run(tasks, options?)` builds and runs a one-off list with the preset options in a single call — the immediate counterpart to `newListr` followed by `run`.

### Shared Context and Errors

Seed the context passed to every list the manager creates through `manager.ctx`. Errors collected from each run — when `collectErrors` is enabled — accumulate on `manager.errors` across the manager's lifetime.
