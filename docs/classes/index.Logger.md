# Class: Logger

[index](../modules/index.md).Logger

A internal logger for using in the verbose renderer mostly.

## Constructors

### constructor

• **new Logger**(`options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `LoggerOptions` |

#### Defined in

src/utils/logger.ts:11

## Methods

### fail

▸ **fail**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:13

___

### skip

▸ **skip**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:18

___

### success

▸ **success**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:23

___

### data

▸ **data**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:28

___

### start

▸ **start**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:33

___

### title

▸ **title**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:38

___

### retry

▸ **retry**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:43

___

### rollback

▸ **rollback**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |

#### Returns

`void`

#### Defined in

src/utils/logger.ts:49

___

### parseMessage

▸ `Protected` **parseMessage**(`level`, `message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | [`LogLevels`](../enums/index.LogLevels.md) |
| `message` | `string` |

#### Returns

`string`

#### Defined in

src/utils/logger.ts:55

___

### logColoring

▸ `Protected` **logColoring**(`__namedParameters`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.level` | [`LogLevels`](../enums/index.LogLevels.md) |
| `__namedParameters.message` | `string` |

#### Returns

`string`

#### Defined in

src/utils/logger.ts:78

___

### wrapInBrackets

▸ `Private` **wrapInBrackets**(`level`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `level` | `string` |

#### Returns

`string`

#### Defined in

src/utils/logger.ts:176
