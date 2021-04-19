[listr2](../README.md) / [index](../modules/index.md) / Logger

# Class: Logger

[index](../modules/index.md).Logger

A internal logger for using in the verbose renderer mostly.

## Constructors

### constructor

\+ **new Logger**(`options?`: LoggerOptions): [*Logger*](index.logger.md)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `options?` | LoggerOptions |

**Returns:** [*Logger*](index.logger.md)

Defined in: src/utils/logger.ts:11

## Methods

### data

▸ **data**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:29

___

### fail

▸ **fail**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:14

___

### logColoring

▸ `Protected`**logColoring**(`__namedParameters`: { `level`: [*LogLevels*](../enums/index.loglevels.md) ; `message`: *string*  }): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `__namedParameters` | *object* |
| `__namedParameters.level` | [*LogLevels*](../enums/index.loglevels.md) |
| `__namedParameters.message` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:79

___

### parseMessage

▸ `Protected`**parseMessage**(`level`: [*LogLevels*](../enums/index.loglevels.md), `message`: *string*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `level` | [*LogLevels*](../enums/index.loglevels.md) |
| `message` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:56

___

### retry

▸ **retry**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:44

___

### rollback

▸ **rollback**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:50

___

### skip

▸ **skip**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:19

___

### start

▸ **start**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:34

___

### success

▸ **success**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:24

___

### title

▸ **title**(`message`: *string*): *void*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `message` | *string* |

**Returns:** *void*

Defined in: src/utils/logger.ts:39

___

### wrapInBrackets

▸ `Private`**wrapInBrackets**(`level`: *string*): *string*

#### Parameters:

| Name | Type |
| :------ | :------ |
| `level` | *string* |

**Returns:** *string*

Defined in: src/utils/logger.ts:162
