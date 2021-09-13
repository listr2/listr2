# Class: VerboseRenderer

[renderer/verbose.renderer](../modules/renderer_verbose_renderer.md).VerboseRenderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

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
| `useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |
| `logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `showTimer?` | `boolean` | show duration for all tasks |

#### Defined in

src/renderer/verbose.renderer.ts:12

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

per task options for the verbose renderer

#### Defined in

src/renderer/verbose.renderer.ts:42

___

### logger

• `Private` **logger**: [`Logger`](index.Logger.md)

#### Defined in

src/renderer/verbose.renderer.ts:43

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[]

___

### options

• **options**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |
| `logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `showTimer?` | `boolean` | show duration for all tasks |

## Constructors

### constructor

• **new VerboseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] | - |
| `options` | `Object` | - |
| `options.useIcons?` | `boolean` | useIcons instead of text for log level  **`default`** false |
| `options.logger?` | (...`args`: `any`) => [`Logger`](index.Logger.md) | - |
| `options.logEmptyTitle?` | `boolean` | log tasks with empty titles  **`default`** true |
| `options.logTitleChange?` | `boolean` | log title changes  **`default`** true |
| `options.showTimer?` | `boolean` | show duration for all tasks |

#### Defined in

src/renderer/verbose.renderer.ts:45

## Methods

### render

▸ **render**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

src/renderer/verbose.renderer.ts:55

___

### end

▸ **end**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

src/renderer/verbose.renderer.ts:60

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
