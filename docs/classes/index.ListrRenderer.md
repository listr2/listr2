# Class: ListrRenderer

[index](../modules/index.md).ListrRenderer

The bones of a listr renderer.

## Implemented by

- [`DefaultRenderer`](renderer_default_renderer.DefaultRenderer.md)
- [`ListrBaseRenderer`](index.ListrBaseRenderer.md)
- [`SilentRenderer`](renderer_silent_renderer.SilentRenderer.md)
- [`SimpleRenderer`](renderer_simple_renderer.SimpleRenderer.md)
- [`VerboseRenderer`](renderer_verbose_renderer.VerboseRenderer.md)

## Properties

### rendererOptions

▪ `Static` **rendererOptions**: `Record`<`PropertyKey`, `any`\>

designate renderer global options that is specific to the current renderer

#### Defined in

[src/interfaces/renderer.interface.ts:114](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L114)

---

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: `Record`<`PropertyKey`, `any`\>

designate renderer per task options that is specific to the current renderer

#### Defined in

[src/interfaces/renderer.interface.ts:116](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L116)

---

### nonTTY

▪ `Static` **nonTTY**: `boolean`

designate whether this renderer can work in non-tty environments

#### Defined in

[src/interfaces/renderer.interface.ts:118](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L118)

---

### render

• **render**: () => `void`

#### Type declaration

▸ (): `void`

A function to what to do on render

##### Returns

`void`

#### Defined in

[src/interfaces/renderer.interface.ts:120](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L120)

---

### end

• **end**: (`err?`: `Error`) => `void`

#### Type declaration

▸ (`err?`): `void`

A function to what to do on end of the render

##### Parameters

| Name   | Type    |
| :----- | :------ |
| `err?` | `Error` |

##### Returns

`void`

#### Defined in

[src/interfaces/renderer.interface.ts:122](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L122)

## Constructors

### constructor

• **new ListrRenderer**(`tasks`, `options`, `renderHook$?`)

create a new renderer

#### Parameters

| Name           | Type                                                                                                               |
| :------------- | :----------------------------------------------------------------------------------------------------------------- |
| `tasks`        | readonly [`ListrTaskObject`](index.ListrTaskObject.md)<`any`, typeof [`ListrRenderer`](index.ListrRenderer.md)\>[] |
| `options`      | `Record`<`PropertyKey`, `any`\>                                                                                    |
| `renderHook$?` | `Subject`<`void`\>                                                                                                 |

#### Defined in

[src/interfaces/renderer.interface.ts:124](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/interfaces/renderer.interface.ts#L124)
