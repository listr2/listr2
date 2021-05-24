[listr2](../README.md) / [renderer/silent.renderer](../modules/renderer_silent_renderer.md) / SilentRenderer

# Class: SilentRenderer

[renderer/silent.renderer](../modules/renderer_silent_renderer.md).SilentRenderer

## Implements

- [*ListrRenderer*](index.listrrenderer.md)

## Constructors

### constructor

\+ **new SilentRenderer**(`tasks`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)\>[], `options`: *never*): [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)\>[] |
| `options` | *never* |

**Returns:** [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)

Defined in: src/renderer/silent.renderer.ts:11

## Properties

### options

• **options**: *never*

___

### tasks

• **tasks**: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)\>[]

___

### nonTTY

▪ `Static` **nonTTY**: *boolean*= true

designates whether this renderer can output to a non-tty console

Defined in: src/renderer/silent.renderer.ts:7

___

### rendererOptions

▪ `Static` **rendererOptions**: *never*

renderer options for the silent renderer

Defined in: src/renderer/silent.renderer.ts:9

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: *never*

per task options for the silent renderer

Defined in: src/renderer/silent.renderer.ts:11

## Methods

### end

▸ **end**(): *void*

**Returns:** *void*

Implementation of: ListrRenderer.end

Defined in: src/renderer/silent.renderer.ts:17

___

### render

▸ **render**(): *void*

**Returns:** *void*

Implementation of: ListrRenderer.render

Defined in: src/renderer/silent.renderer.ts:15
