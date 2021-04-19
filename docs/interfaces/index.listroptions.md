[listr2](../README.md) / [index](../modules/index.md) / ListrOptions

# Interface: ListrOptions<Ctx\>

[index](../modules/index.md).ListrOptions

Options to set the behavior of this base task.

## Type parameters

| Name | Default |
| :------ | :------ |
| `Ctx` | [*ListrContext*](../types/index.listrcontext.md) |

## Properties

### concurrent

• `Optional` **concurrent**: *number* \| *boolean*

Concurrency will set how many tasks will be run in parallel.

**`default`** false > Default is to run everything synchronously.

`true` will set it to `Infinity`, `false` will set it to synchronous.
If you pass in a `number` it will limit it at that number.

Defined in: src/interfaces/listr.interface.ts:82

___

### ctx

• `Optional` **ctx**: Ctx

To inject a context through this options wrapper. Mostly useful when combined with manager.

**`default`** any

Defined in: src/interfaces/listr.interface.ts:99

___

### disableColor

• `Optional` **disableColor**: *boolean*

Disabling the color, useful for tests and such.

**`default`** false

Defined in: src/interfaces/listr.interface.ts:119

___

### exitAfterRollback

• `Optional` **exitAfterRollback**: *boolean*

Determine the behaviour of exiting after rollback actions.

**`default`** true > exit after rolling back tasks

Defined in: src/interfaces/listr.interface.ts:94

___

### exitOnError

• `Optional` **exitOnError**: *boolean*

Determine the behavior of exiting on errors.

**`default`** true > exit on any error coming from the tasks.

Defined in: src/interfaces/listr.interface.ts:88

___

### injectWrapper

• `Optional` **injectWrapper**: *object*

Inject data directly to TaskWrapper.

#### Type declaration:

| Name | Type |
| :------ | :------ |
| `enquirer?` | *Enquirer*<object\> |

Defined in: src/interfaces/listr.interface.ts:123

___

### registerSignalListeners

• `Optional` **registerSignalListeners**: *boolean*

By default, Listr2 will track SIGINIT signal to update the renderer one last time before compeletely failing.

**`default`** true

Defined in: src/interfaces/listr.interface.ts:104

___

### rendererFallback

• `Optional` **rendererFallback**: *boolean* \| () => *boolean*

Determine the certain condition required to use the non-tty renderer.

**`default`** null > handled internally

Defined in: src/interfaces/listr.interface.ts:109

___

### rendererSilent

• `Optional` **rendererSilent**: *boolean* \| () => *boolean*

Determine the certain condition required to use the silent renderer.

**`default`** null > handled internally

Defined in: src/interfaces/listr.interface.ts:114
