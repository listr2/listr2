# Interface: ListrOptions<Ctx\>

[index](../modules/index.md).ListrOptions

Options to set the behavior of this base task.

## Type parameters

| Name | Type |
| :------ | :------ |
| `Ctx` | [`ListrContext`](../types/index.ListrContext.md) |

## Properties

### ctx

• `Optional` **ctx**: `Ctx`

To inject a context through this options wrapper. Context can also be defined in run time.

**`default`** {}

#### Defined in

src/interfaces/listr.interface.ts:90

___

### concurrent

• `Optional` **concurrent**: `number` \| `boolean`

Concurrency sets how many tasks will be run at the same time in parallel.

**`default`** false > Default is to run everything synchronously.

`true` will set it to `Infinity`, `false` will set it to synchronous.

If you pass in a `number` it will limit it to that number.

#### Defined in

src/interfaces/listr.interface.ts:100

___

### exitOnError

• `Optional` **exitOnError**: `boolean`

Determine the default behavior of exiting on errors.

**`default`** true > exit on any error coming from the tasks.

#### Defined in

src/interfaces/listr.interface.ts:106

___

### exitAfterRollback

• `Optional` **exitAfterRollback**: `boolean`

Determine the behavior of exiting after rollback actions.

This is independent of exitOnError, since failure of a rollback can be a more critical operation comparing to
failing a single task.

**`default`** true > exit after rolling back tasks

#### Defined in

src/interfaces/listr.interface.ts:115

___

### registerSignalListeners

• `Optional` **registerSignalListeners**: `boolean`

By default, Listr2 will track SIGINIT signal to update the renderer one last time before completely failing.

**`default`** true

#### Defined in

src/interfaces/listr.interface.ts:121

___

### rendererFallback

• `Optional` **rendererFallback**: `boolean` \| () => `boolean`

Determine the certain condition required to use the non-TTY renderer.

**`default`** null > handled internally

#### Defined in

src/interfaces/listr.interface.ts:127

___

### rendererSilent

• `Optional` **rendererSilent**: `boolean` \| () => `boolean`

Determine the certain condition required to use the silent renderer.

**`default`** null > handled internally

#### Defined in

src/interfaces/listr.interface.ts:133

___

### disableColor

• `Optional` **disableColor**: `boolean`

Disabling the color, useful for tests and such.

**`default`** false

#### Defined in

src/interfaces/listr.interface.ts:139

___

### injectWrapper

• `Optional` **injectWrapper**: `Object`

Inject data directly to TaskWrapper.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enquirer?` | `Enquirer`<`object`\> |

#### Defined in

src/interfaces/listr.interface.ts:143
