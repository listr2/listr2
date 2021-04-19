[listr2](../README.md) / [index](../modules/index.md) / ListrSubClassOptions

# Type alias: ListrSubClassOptions<Ctx, Renderer\>

[index](../modules/index.md).ListrSubClassOptions

Ƭ **ListrSubClassOptions**<Ctx, Renderer\>: [*ListrOptions*](../interfaces/index.listroptions.md)<Ctx\> & *Omit*<[*ListrDefaultRendererOptions*](../interfaces/index.listrdefaultrendereroptions.md)<Renderer\>, ``"renderer"``\>

Sub class options.

Subtasks has reduced set options where the missing ones are explicitly set by the base class.

#### Type parameters:

| Name | Type | Default |
| :------ | :------ | :------ |
| `Ctx` | - | [*ListrContext*](index.listrcontext.md) |
| `Renderer` | [*ListrRendererValue*](index.listrrenderervalue.md) | [*ListrDefaultRendererValue*](index.listrdefaultrenderervalue.md) |

Defined in: src/interfaces/listr.interface.ts:152
