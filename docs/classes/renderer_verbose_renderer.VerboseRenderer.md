[listr2](../README.md) / [renderer/verbose.renderer](../modules/renderer_verbose_renderer.md) / VerboseRenderer

# Class: VerboseRenderer

[renderer/verbose.renderer](../modules/renderer_verbose_renderer.md).VerboseRenderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Constructors

### constructor

• **new VerboseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] | - |
| `options` | `Object` | - |
| `options.logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `options.logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `options.logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `options.showTimer?` | `boolean` | show duration for all tasks |
| `options.useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |

#### Defined in

src/renderer/verbose.renderer.ts:45

## Properties

### logger

• `Private` **logger**: [`Logger`](index.Logger.md)

#### Defined in

src/renderer/verbose.renderer.ts:43

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `showTimer?` | `boolean` | show duration for all tasks |
| `useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[]

___

### nonTTY

▪ `Static` **nonTTY**: `boolean` = `true`

designates whether this renderer can output to a non-tty console

#### Defined in

src/renderer/verbose.renderer.ts:10

___

### rendererOptions

▪ `Static` **rendererOptions**: `Object`

renderer options for the verbose renderer

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `showTimer?` | `boolean` | show duration for all tasks |
| `useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |

#### Defined in

src/renderer/verbose.renderer.ts:12

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

per task options for the verbose renderer

#### Defined in

src/renderer/verbose.renderer.ts:42

## Methods

### end

▸ **end**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

src/renderer/verbose.renderer.ts:60

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

src/renderer/verbose.renderer.ts:55

___

### verboseRenderer

▸ `Private` **verboseRenderer**(`tasks`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] |

#### Returns

`void`

#### Defined in

src/renderer/verbose.renderer.ts:63
