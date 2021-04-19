[listr2](../README.md) / [renderer/default.renderer](../modules/renderer_default_renderer.md) / DefaultRenderer

# Class: DefaultRenderer

[renderer/default.renderer](../modules/renderer_default_renderer.md).DefaultRenderer

Default updating renderer for Listr2

## Implements

* [*ListrRenderer*](index.listrrenderer.md)

## Constructors

### constructor

\+ **new DefaultRenderer**(`tasks`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>[], `options`: { `clearOutput?`: *boolean* ; `collapse?`: *boolean* ; `collapseErrors?`: *boolean* ; `collapseSkips?`: *boolean* ; `formatOutput?`: ``"truncate"`` \| ``"wrap"`` ; `indentation?`: *number* ; `lazy?`: *boolean* ; `removeEmptyLines?`: *boolean* ; `showErrorMessage?`: *boolean* ; `showSkipMessage?`: *boolean* ; `showSubtasks?`: *boolean* ; `showTimer?`: *boolean* ; `suffixRetries?`: *boolean* ; `suffixSkips?`: *boolean*  }, `renderHook$?`: *Subject*<void\>): [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)

#### Parameters:

| Name | Type | Description |
| :------ | :------ | :------ |
| `tasks` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>[] | - |
| `options` | *object* | - |
| `options.clearOutput?` | *boolean* | clear output when task finishes  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `options.collapse?` | *boolean* | collapse subtasks after finish  **`default`** true |
| `options.collapseErrors?` | *boolean* | collapse error messages in to single message in task title  **`default`** true |
| `options.collapseSkips?` | *boolean* | collapse skip messages in to single message and override the task title  **`default`** true |
| `options.formatOutput?` | ``"truncate"`` \| ``"wrap"`` | formats data output depending on your requirements. log-update mostly breaks if there is no wrap, so there is many options to choose your preference  **`default`** 'truncate'  **`global`** global option that can not be temperated with from subtasks |
| `options.indentation?` | *number* | indentation per level of subtask  **`default`** 2 |
| `options.lazy?` | *boolean* | only update via renderhook  useful for tests and stuff. this will disable showing spinner and only update the screen if the something else has happened in the task worthy to show  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `options.removeEmptyLines?` | *boolean* | removes empty lines from the data output  **`default`** true |
| `options.showErrorMessage?` | *boolean* | shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode You can disable showing the error messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `options.showSkipMessage?` | *boolean* | show skip messages or show the original title of the task, this will also disable collapseSkips mode  You can disable showing the skip messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `options.showSubtasks?` | *boolean* | show the subtasks of the current task if it returns a new listr  **`default`** true  **`global`** global option that can not be temperated with from subtasks |
| `options.showTimer?` | *boolean* | show duration for all tasks  overwrites per task renderer options  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `options.suffixRetries?` | *boolean* | suffix retry messages with [RETRY-${COUNT}] when retry is enabled for a task  **`default`** true |
| `options.suffixSkips?` | *boolean* | suffix skip messages with [SKIPPED] when in collapseSkips mode  **`default`** true |
| `renderHook$?` | *Subject*<void\> | - |

**Returns:** [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)

Defined in: src/renderer/default.renderer.ts:154

## Properties

### bottomBar

• `Private` **bottomBar**: *object*= {}

#### Type declaration:

Defined in: src/renderer/default.renderer.ts:151

___

### id

• `Private` `Optional` **id**: *Timeout*

Defined in: src/renderer/default.renderer.ts:150

___

### options

• **options**: *object*

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `clearOutput?` | *boolean* | clear output when task finishes  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `collapse?` | *boolean* | collapse subtasks after finish  **`default`** true |
| `collapseErrors?` | *boolean* | collapse error messages in to single message in task title  **`default`** true |
| `collapseSkips?` | *boolean* | collapse skip messages in to single message and override the task title  **`default`** true |
| `formatOutput?` | ``"truncate"`` \| ``"wrap"`` | formats data output depending on your requirements. log-update mostly breaks if there is no wrap, so there is many options to choose your preference  **`default`** 'truncate'  **`global`** global option that can not be temperated with from subtasks |
| `indentation?` | *number* | indentation per level of subtask  **`default`** 2 |
| `lazy?` | *boolean* | only update via renderhook  useful for tests and stuff. this will disable showing spinner and only update the screen if the something else has happened in the task worthy to show  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `removeEmptyLines?` | *boolean* | removes empty lines from the data output  **`default`** true |
| `showErrorMessage?` | *boolean* | shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode You can disable showing the error messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `showSkipMessage?` | *boolean* | show skip messages or show the original title of the task, this will also disable collapseSkips mode  You can disable showing the skip messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `showSubtasks?` | *boolean* | show the subtasks of the current task if it returns a new listr  **`default`** true  **`global`** global option that can not be temperated with from subtasks |
| `showTimer?` | *boolean* | show duration for all tasks  overwrites per task renderer options  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `suffixRetries?` | *boolean* | suffix retry messages with [RETRY-${COUNT}] when retry is enabled for a task  **`default`** true |
| `suffixSkips?` | *boolean* | suffix skip messages with [SKIPPED] when in collapseSkips mode  **`default`** true |

___

### promptBar

• `Private` **promptBar**: *string*

Defined in: src/renderer/default.renderer.ts:152

___

### renderHook$

• `Optional` **renderHook$**: *Subject*<void\>

___

### spinner

• `Private` **spinner**: *string*[]

Defined in: src/renderer/default.renderer.ts:153

___

### spinnerPosition

• `Private` **spinnerPosition**: *number*= 0

Defined in: src/renderer/default.renderer.ts:154

___

### tasks

• **tasks**: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>[]

___

### nonTTY

▪ `Static` **nonTTY**: *boolean*= false

designates whether this renderer can output to a non-tty console

Defined in: src/renderer/default.renderer.ts:17

___

### rendererOptions

▪ `Static` **rendererOptions**: *object*

renderer options for the defauult renderer

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `clearOutput?` | *boolean* | clear output when task finishes  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `collapse?` | *boolean* | collapse subtasks after finish  **`default`** true |
| `collapseErrors?` | *boolean* | collapse error messages in to single message in task title  **`default`** true |
| `collapseSkips?` | *boolean* | collapse skip messages in to single message and override the task title  **`default`** true |
| `formatOutput?` | ``"truncate"`` \| ``"wrap"`` | formats data output depending on your requirements. log-update mostly breaks if there is no wrap, so there is many options to choose your preference  **`default`** 'truncate'  **`global`** global option that can not be temperated with from subtasks |
| `indentation?` | *number* | indentation per level of subtask  **`default`** 2 |
| `lazy?` | *boolean* | only update via renderhook  useful for tests and stuff. this will disable showing spinner and only update the screen if the something else has happened in the task worthy to show  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `removeEmptyLines?` | *boolean* | removes empty lines from the data output  **`default`** true |
| `showErrorMessage?` | *boolean* | shows the thrown error message or show the original title of the task, this will also disable collapseErrors mode You can disable showing the error messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `showSkipMessage?` | *boolean* | show skip messages or show the original title of the task, this will also disable collapseSkips mode  You can disable showing the skip messages, eventhough you passed in a message by settings this option, if you want to keep the original task title intacted.  **`default`** true |
| `showSubtasks?` | *boolean* | show the subtasks of the current task if it returns a new listr  **`default`** true  **`global`** global option that can not be temperated with from subtasks |
| `showTimer?` | *boolean* | show duration for all tasks  overwrites per task renderer options  **`default`** false  **`global`** global option that can not be temperated with from subtasks |
| `suffixRetries?` | *boolean* | suffix retry messages with [RETRY-${COUNT}] when retry is enabled for a task  **`default`** true |
| `suffixSkips?` | *boolean* | suffix skip messages with [SKIPPED] when in collapseSkips mode  **`default`** true |

Defined in: src/renderer/default.renderer.ts:19

___

### rendererTaskOptions

▪ `Static` **rendererTaskOptions**: *object*

per task options for the default renderer

#### Type declaration:

| Name | Type | Description |
| :------ | :------ | :------ |
| `bottomBar?` | *number* \| *boolean* | write task output to bottom bar instead of the gap under the task title itself. useful for stream of data.  **`default`** false  `true` only keep 1 line of latest data outputted by the task. `false` only keep 1 line of latest data outputted by the task. `number` will keep designated data of latest data outputted by the task. |
| `persistentOutput?` | *boolean* | keep output after task finishes  **`default`** false  works both for bottom bar and the default behavior |
| `showTimer?` | *boolean* | show the task time if it was successful |

Defined in: src/renderer/default.renderer.ts:126

## Methods

### addSuffixToMessage

▸ `Private`**addSuffixToMessage**(`message`: *string*, `suffix`: *string*, `condition?`: *boolean*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |
| `suffix` | *string* |
| `condition?` | *boolean* |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:535

___

### createRender

▸ **createRender**(`options?`: { `bottomBar?`: *boolean* ; `prompt?`: *boolean* ; `tasks?`: *boolean*  }): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options?` | *object* |
| `options.bottomBar?` | *boolean* |
| `options.prompt?` | *boolean* |
| `options.tasks?` | *boolean* |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:190

___

### dumpData

▸ `Private`**dumpData**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>, `level`: *number*, `source?`: ``"output"`` \| ``"skip"`` \| ``"error"``): *string*

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> | - |
| `level` | *number* | - |
| `source` | ``"output"`` \| ``"skip"`` \| ``"error"`` | 'output' |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:437

___

### end

▸ **end**(): *void*

**Returns:** *void*

Implementation of: ListrRenderer.end

Defined in: src/renderer/default.renderer.ts:242

___

### formatString

▸ `Private`**formatString**(`str`: *string*, `icon`: *string*, `level`: *number*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `icon` | *string* |
| `level` | *number* |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:461

___

### getSelfOrParentOption

▸ **getSelfOrParentOption**<T\>(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>, `key`: T): { `clearOutput?`: *boolean* ; `collapse?`: *boolean* ; `collapseErrors?`: *boolean* ; `collapseSkips?`: *boolean* ; `formatOutput?`: ``"truncate"`` \| ``"wrap"`` ; `indentation?`: *number* ; `lazy?`: *boolean* ; `removeEmptyLines?`: *boolean* ; `showErrorMessage?`: *boolean* ; `showSkipMessage?`: *boolean* ; `showSubtasks?`: *boolean* ; `showTimer?`: *boolean* ; `suffixRetries?`: *boolean* ; `suffixSkips?`: *boolean*  }[T]

#### Type parameters:

| Name | Type |
| :------ | :------ |
| `T` | ``"indentation"`` \| ``"clearOutput"`` \| ``"showSubtasks"`` \| ``"collapse"`` \| ``"collapseSkips"`` \| ``"showSkipMessage"`` \| ``"suffixSkips"`` \| ``"collapseErrors"`` \| ``"showErrorMessage"`` \| ``"suffixRetries"`` \| ``"lazy"`` \| ``"showTimer"`` \| ``"removeEmptyLines"`` \| ``"formatOutput"`` |

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |
| `key` | T |

**Returns:** { `clearOutput?`: *boolean* ; `collapse?`: *boolean* ; `collapseErrors?`: *boolean* ; `collapseSkips?`: *boolean* ; `formatOutput?`: ``"truncate"`` \| ``"wrap"`` ; `indentation?`: *number* ; `lazy?`: *boolean* ; `removeEmptyLines?`: *boolean* ; `showErrorMessage?`: *boolean* ; `showSkipMessage?`: *boolean* ; `showSubtasks?`: *boolean* ; `showTimer?`: *boolean* ; `suffixRetries?`: *boolean* ; `suffixSkips?`: *boolean*  }[T]

Defined in: src/renderer/default.renderer.ts:178

___

### getSymbol

▸ `Private`**getSymbol**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>, `data?`: *boolean*): *string*

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> | - |
| `data` | *boolean* | false |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:503

___

### getTaskOptions

▸ **getTaskOptions**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>): *object*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |

**Returns:** *object*

| Name | Type | Description |
| :------ | :------ | :------ |
| `bottomBar?` | *number* \| *boolean* | write task output to bottom bar instead of the gap under the task title itself. useful for stream of data.  **`default`** false  `true` only keep 1 line of latest data outputted by the task. `false` only keep 1 line of latest data outputted by the task. `number` will keep designated data of latest data outputted by the task. |
| `persistentOutput?` | *boolean* | keep output after task finishes  **`default`** false  works both for bottom bar and the default behavior |
| `showTimer?` | *boolean* | show the task time if it was successful |

Defined in: src/renderer/default.renderer.ts:160

___

### getTaskTime

▸ **getTaskTime**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:186

___

### hasPersistentOutput

▸ **hasPersistentOutput**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |

**Returns:** *boolean*

Defined in: src/renderer/default.renderer.ts:170

___

### hasTimer

▸ **hasTimer**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |

**Returns:** *boolean*

Defined in: src/renderer/default.renderer.ts:174

___

### indentMultilineOutput

▸ `Private`**indentMultilineOutput**(`str`: *string*, `i`: *number*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `str` | *string* |
| `i` | *number* |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:498

___

### isBottomBar

▸ **isBottomBar**(`task`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>): *boolean*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `task` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\> |

**Returns:** *boolean*

Defined in: src/renderer/default.renderer.ts:164

___

### multiLineRenderer

▸ `Private`**multiLineRenderer**(`tasks`: [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>[], `level?`: *number*): *string*

#### Parameters:

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tasks` | [*ListrTaskObject*](index.listrtaskobject.md)<any, *typeof* [*DefaultRenderer*](renderer_default_renderer.defaultrenderer.md)\>[] | - |
| `level` | *number* | 0 |

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:259

___

### render

▸ **render**(): *void*

**Returns:** *void*

Implementation of: ListrRenderer.render

Defined in: src/renderer/default.renderer.ts:221

___

### renderBottomBar

▸ `Private`**renderBottomBar**(): *string*

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:409

___

### renderPrompt

▸ `Private`**renderPrompt**(): *string*

**Returns:** *string*

Defined in: src/renderer/default.renderer.ts:431
