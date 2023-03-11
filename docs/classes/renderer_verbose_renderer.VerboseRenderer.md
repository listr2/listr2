# Class: VerboseRenderer

[renderer/verbose.renderer](../modules/renderer_verbose_renderer.md).VerboseRenderer

The bones of a listr renderer.

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### nonTTY

▪ `Static` **nonTTY**: `boolean` = `true`

designates whether this renderer can output to a non-tty console

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[nonTTY](index.ListrRenderer.md#nontty)

#### Defined in

src/renderer/verbose.renderer.ts:10

___

### rendererOptions

▪ `Static` **rendererOptions**: { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean`  } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any`  }

renderer options for the verbose renderer

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[rendererOptions](index.ListrRenderer.md#rendereroptions)

#### Defined in

src/renderer/verbose.renderer.ts:12

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

per task options for the verbose renderer

#### Implementation of

[ListrRenderer](index.ListrRenderer.md).[rendererTaskOptions](index.ListrRenderer.md#renderertaskoptions)

#### Defined in

src/renderer/verbose.renderer.ts:49

___

### logger

• `Private` **logger**: [`Logger`](index.Logger.md)

#### Defined in

src/renderer/verbose.renderer.ts:50

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[]

#### Defined in

src/renderer/verbose.renderer.ts:52

___

### options

• **options**: { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean`  } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any`  }

#### Defined in

src/renderer/verbose.renderer.ts:52

## Constructors

### constructor

• **new VerboseRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)\>[] |
| `options` | { `useIcons?`: `boolean` ; `logEmptyTitle?`: `boolean` ; `logTitleChange?`: `boolean` ; `showTimer?`: `boolean`  } & { `logger?`: (...`args`: `any`) => [`Logger`](index.Logger.md) ; `options?`: `any`  } |

#### Defined in

src/renderer/verbose.renderer.ts:52

## Methods

### render

▸ **render**(): `void`

A function to what to do on render

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

src/renderer/verbose.renderer.ts:64

___

### end

▸ **end**(): `void`

A function to what to do on end of the render

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

src/renderer/verbose.renderer.ts:69

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

src/renderer/verbose.renderer.ts:72
