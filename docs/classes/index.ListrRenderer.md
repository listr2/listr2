[listr2](../README.md) / [index](../modules/index.md) / ListrRenderer

# Class: ListrRenderer

[index](../modules/index.md).ListrRenderer

The bones of a listr renderer.

## Implemented by

- [`DefaultRenderer`](renderer_default_renderer.DefaultRenderer.md)
- [`ListrBaseRenderer`](index.ListrBaseRenderer.md)
- [`SilentRenderer`](renderer_silent_renderer.SilentRenderer.md)
- [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)

## Constructors

### constructor

• **new ListrRenderer**(`tasks`, `options`, `renderHook$?`)

create a new renderer

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | readonly [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>[] |
| `options` | `Record`<`string`, `any`\> |
| `renderHook$?` | `Subject`<`void`\> |

#### Defined in

src/interfaces/renderer.interface.ts:111

## Properties

### end

• **end**: (`err?`: `Error`) => `void`

A function to what to do on end of the render

#### Type declaration

▸ (`err?`): `void`

A function to what to do on end of the render

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `Error` |

##### Returns

`void`

#### Defined in

src/interfaces/renderer.interface.ts:109

___

### render

• **render**: () => `void`

A function to what to do on render

#### Type declaration

▸ (): `void`

A function to what to do on render

##### Returns

`void`

#### Defined in

src/interfaces/renderer.interface.ts:107

___

### nonTTY

▪ `Static` **nonTTY**: `boolean`

designate whether this renderer can work in non-tty environments

#### Defined in

src/interfaces/renderer.interface.ts:105

___

### rendererOptions

▪ `Static` **rendererOptions**: `Record`<`string`, `any`\>

designate renderer global options that is specific to the current renderer

#### Defined in

src/interfaces/renderer.interface.ts:101

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `Record`<`string`, `any`\>

designate renderer per task options that is specific to the current renderer

#### Defined in

src/interfaces/renderer.interface.ts:103
