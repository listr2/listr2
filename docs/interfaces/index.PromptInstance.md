# Interface: PromptInstance

[index](../modules/index.md).PromptInstance

## Hierarchy

- `Omit`<`BasePromptOptions`, ``"onCancel"`` \| ``"onSubmit"``\>

  ↳ **`PromptInstance`**

## Properties

### message

• **message**: `string` \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.message

#### Defined in

[src/utils/prompt.interface.ts:9](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L9)

___

### initial

• `Optional` **initial**: `string` \| `number` \| `boolean` \| `number`[] \| () => `string` \| () => `Promise`<`string`\>

#### Inherited from

Omit.initial

#### Defined in

[src/utils/prompt.interface.ts:10](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L10)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

Omit.required

#### Defined in

[src/utils/prompt.interface.ts:11](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L11)

___

### stdin

• `Optional` **stdin**: `ReadStream`

#### Inherited from

Omit.stdin

#### Defined in

[src/utils/prompt.interface.ts:12](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L12)

___

### stdout

• `Optional` **stdout**: `WriteStream`

#### Inherited from

Omit.stdout

#### Defined in

[src/utils/prompt.interface.ts:13](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L13)

___

### header

• `Optional` **header**: `string`

#### Inherited from

Omit.header

#### Defined in

[src/utils/prompt.interface.ts:14](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L14)

___

### footer

• `Optional` **footer**: `string`

#### Inherited from

Omit.footer

#### Defined in

[src/utils/prompt.interface.ts:15](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L15)

___

### skip

• `Optional` **skip**: (`value`: `any`) => `boolean` \| `Promise`<`boolean`\>

#### Type declaration

▸ (`value`): `boolean` \| `Promise`<`boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`boolean` \| `Promise`<`boolean`\>

#### Inherited from

Omit.skip

#### Defined in

[src/utils/prompt.interface.ts:16](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L16)

___

### format

• `Optional` **format**: (`value`: `any`) => `any`

#### Type declaration

▸ (`value`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`any`

#### Inherited from

Omit.format

#### Defined in

[src/utils/prompt.interface.ts:17](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L17)

___

### result

• `Optional` **result**: (`value`: `any`) => `any`

#### Type declaration

▸ (`value`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`any`

#### Inherited from

Omit.result

#### Defined in

[src/utils/prompt.interface.ts:18](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L18)

___

### validate

• `Optional` **validate**: (`value`: `any`, `state`: `any`) => `string` \| `boolean` \| `Promise`<`string` \| `boolean`\> \| `Promise`<`boolean`\> \| `Promise`<`string`\>

#### Type declaration

▸ (`value`, `state`): `string` \| `boolean` \| `Promise`<`string` \| `boolean`\> \| `Promise`<`boolean`\> \| `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |
| `state` | `any` |

##### Returns

`string` \| `boolean` \| `Promise`<`string` \| `boolean`\> \| `Promise`<`boolean`\> \| `Promise`<`string`\>

#### Inherited from

Omit.validate

#### Defined in

[src/utils/prompt.interface.ts:19](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L19)

___

### submit

• **submit**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/utils/prompt.interface.ts:162](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L162)

___

### cancel

• **cancel**: (`err?`: `string`) => `void`

#### Type declaration

▸ (`err?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `err?` | `string` |

##### Returns

`void`

#### Defined in

[src/utils/prompt.interface.ts:163](https://github.com/cenk1cenk2/listr2/blob/a554689/src/utils/prompt.interface.ts#L163)
