[listr2](../README.md) / [index](../modules/index.md) / ListrEvent

# Type alias: ListrEvent

[index](../modules/index.md).ListrEvent

Ƭ **ListrEvent**: { `data?`: `string` \| `boolean` ; `type`: `Exclude`<[`ListrEventType`](../enums/index.ListrEventType.md), ``"MESSAGE"``\>  } \| { `data`: [`ListrTaskObject`](../classes/index.ListrTaskObject.md)<`any`, `any`\>[``"message"``] ; `type`: [`MESSAGE`](../enums/index.ListrEventType.md#message)  }

The internal communication event.

#### Defined in

src/interfaces/listr.interface.ts:156
