# Enumeration: ListrErrorTypes

[index](../modules/index.md).ListrErrorTypes

The actual error type that is collected and to help identify where the error is triggered from.

## Enumeration Members

### WILL\_RETRY

• **WILL\_RETRY** = ``"WILL_RETRY"``

Task has failed and will try to retry.

#### Defined in

[src/interfaces/listr-error.interface.ts:32](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/listr-error.interface.ts#L32)

___

### WILL\_ROLLBACK

• **WILL\_ROLLBACK** = ``"WILL_ROLLBACK"``

Task has failed and will try to rollback.

#### Defined in

[src/interfaces/listr-error.interface.ts:34](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/listr-error.interface.ts#L34)

___

### HAS\_FAILED\_TO\_ROLLBACK

• **HAS\_FAILED\_TO\_ROLLBACK** = ``"HAS_FAILED_TO_ROLLBACK"``

Task has failed, ran the rollback action but the rollback action itself has failed.

#### Defined in

[src/interfaces/listr-error.interface.ts:36](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/listr-error.interface.ts#L36)

___

### HAS\_FAILED

• **HAS\_FAILED** = ``"HAS_FAILED"``

Task has failed.

#### Defined in

[src/interfaces/listr-error.interface.ts:38](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/listr-error.interface.ts#L38)

___

### HAS\_FAILED\_WITHOUT\_ERROR

• **HAS\_FAILED\_WITHOUT\_ERROR** = ``"HAS_FAILED_WITHOUT_ERROR"``

Task has failed, but exitOnError is set to false, so will ignore this error.

#### Defined in

[src/interfaces/listr-error.interface.ts:40](https://github.com/cenk1cenk2/listr2/blob/a554689/src/interfaces/listr-error.interface.ts#L40)
