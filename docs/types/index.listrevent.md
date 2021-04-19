[listr2](../README.md) / [index](../modules/index.md) / ListrEvent

# Type alias: ListrEvent

[index](../modules/index.md).ListrEvent

Ƭ **ListrEvent**: { `data?`: *string* \| *boolean* ; `type`: *Exclude*<[*ListrEventType*](../enums/index.listreventtype.md), ``"MESSAGE"``\>  } \| { `data`: [*ListrTaskObject*](../classes/index.listrtaskobject.md)<any, any\>[``"message"``] ; `type`: [*MESSAGE*](../enums/index.listreventtype.md#message)  }

The internal communication event.

Defined in: src/interfaces/listr.interface.ts:156
