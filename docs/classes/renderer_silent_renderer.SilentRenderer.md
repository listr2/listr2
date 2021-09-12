# Class: SilentRenderer

[renderer/silent.renderer](../modules/renderer_silent_renderer.md).SilentRenderer

## Implements

- [`ListrRenderer`](index.ListrRenderer.md)

## Properties

### nonTTY

▪ `Static` **nonTTY**: `boolean` = `true`

designates whether this renderer can output to a non-tty console

#### Defined in

src/renderer/silent.renderer.ts:7

___

### rendererOptions

▪ `Static` **rendererOptions**: `never`

renderer options for the silent renderer

#### Defined in

src/renderer/silent.renderer.ts:9

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `never`

per task options for the silent renderer

#### Defined in

src/renderer/silent.renderer.ts:11

___

### tasks

• **tasks**: [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SilentRenderer`](renderer_silent_renderer.SilentRenderer.md)\>[]

___

### options

• **options**: `never`

## Constructors

### constructor

• **new SilentRenderer**(`tasks`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`SilentRenderer`](renderer_silent_renderer.SilentRenderer.md)\>[] |
| `options` | `never` |

#### Defined in

src/renderer/silent.renderer.ts:13

## Methods

### render

▸ **render**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.render

#### Defined in

src/renderer/silent.renderer.ts:15

___

### end

▸ **end**(): `void`

#### Returns

`void`

#### Implementation of

ListrRenderer.end

#### Defined in

src/renderer/silent.renderer.ts:17
