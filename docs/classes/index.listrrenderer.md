[listr2](../README.md) / [index](../modules/index.md) / ListrRenderer

# Class: ListrRenderer

[index](../modules/index.md).ListrRenderer

The bones of a listr renderer.

## Implemented by

- [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)
- [*ListrBaseRenderer*](index.listrbaserenderer.md)
- [*SilentRenderer*](renderer_silent_renderer.silentrenderer.md)
- [*VerboseRenderer*](renderer_verbose_renderer.verboserenderer.md)

## Constructors

### constructor

\+ **new ListrRenderer**(`tasks`: readonly [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*ListrRenderer*](index.listrrenderer.md)\>[], `options`: *Record*<string, any\>, `renderHook$?`: *Subject*<void\>): [*ListrRenderer*](index.listrrenderer.md)

create a new renderer

#### Parameters

| Name | Type |
| :------ | :------ |
| `tasks` | readonly [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*ListrRenderer*](index.listrrenderer.md)\>[] |
| `options` | *Record*<string, any\> |
| `renderHook$?` | *Subject*<void\> |

**Returns:** [*ListrRenderer*](index.listrrenderer.md)

Defined in: src/interfaces/renderer.interface.ts:109

## Properties

### end

• **end**: (`err?`: Error) => *void*

A function to what to do on end of the render

#### Type declaration

▸ (`err?`: Error): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | Error |

**Returns:** *void*

Defined in: src/interfaces/renderer.interface.ts:109

___

### render

• **render**: () => *void*

A function to what to do on render

#### Type declaration

▸ (): *void*

**Returns:** *void*

Defined in: src/interfaces/renderer.interface.ts:107

___

### nonTTY

▪ `Static` **nonTTY**: *boolean*

designate whether this renderer can work in non-tty environments

Defined in: src/interfaces/renderer.interface.ts:105

___

### rendererOptions

▪ `Static` **rendererOptions**: *Record*<string, any\>

designate renderer global options that is specific to the current renderer

Defined in: src/interfaces/renderer.interface.ts:101

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: *Record*<string, any\>

designate renderer per task options that is specific to the current renderer

Defined in: src/interfaces/renderer.interface.ts:103
