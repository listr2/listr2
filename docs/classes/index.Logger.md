# Class: Logger

[index](../modules/index.md).Logger

A internal logger for using in the verbose renderer mostly.

## Constructors

### constructor

• **new Logger**(`options?`)

#### Parameters

| Name       | Type            |
| :--------- | :-------------- |
| `options?` | `LoggerOptions` |

#### Defined in

[src/utils/logger.ts:11](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L11)

## Methods

### fail

▸ **fail**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:13](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L13)

---

### skip

▸ **skip**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:18](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L18)

---

### success

▸ **success**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:23](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L23)

---

### data

▸ **data**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:28](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L28)

---

### start

▸ **start**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:33](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L33)

---

### title

▸ **title**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:38](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L38)

---

### retry

▸ **retry**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:43](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L43)

---

### rollback

▸ **rollback**(`message`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[src/utils/logger.ts:49](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L49)

---

### parseMessage

▸ `Protected` **parseMessage**(`level`, `message`): `string`

#### Parameters

| Name      | Type                                       |
| :-------- | :----------------------------------------- |
| `level`   | [`LogLevels`](../enums/index.LogLevels.md) |
| `message` | `string`                                   |

#### Returns

`string`

#### Defined in

[src/utils/logger.ts:55](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L55)

---

### logColoring

▸ `Protected` **logColoring**(`__namedParameters`): `string`

#### Parameters

| Name                        | Type                                       |
| :-------------------------- | :----------------------------------------- |
| `__namedParameters`         | `Object`                                   |
| `__namedParameters.level`   | [`LogLevels`](../enums/index.LogLevels.md) |
| `__namedParameters.message` | `string`                                   |

#### Returns

`string`

#### Defined in

[src/utils/logger.ts:78](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L78)

---

### wrapInBrackets

▸ `Private` **wrapInBrackets**(`level`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `level` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/logger.ts:161](https://github.com/cenk1cenk2/listr2/blob/12dcf06/src/utils/logger.ts#L161)
