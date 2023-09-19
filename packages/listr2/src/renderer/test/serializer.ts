import type { ListrTestRendererOptions, ListrTestRendererTask } from './renderer.interface'
import type { TestRendererSerializerOutput } from './serializer.interface'
import type { ListrTaskEventType } from '@constants'
import type { ListrTaskEventMap } from '@interfaces'

export class TestRendererSerializer {
  constructor (public options?: ListrTestRendererOptions) {}

  public serialize<T extends ListrTaskEventType>(event: T, data: ListrTaskEventMap[T], task?: ListrTestRendererTask): string {
    return JSON.stringify(this.generate(event, data, task))
  }

  public generate<T extends ListrTaskEventType>(event: T, data: ListrTaskEventMap[T], task?: ListrTestRendererTask): TestRendererSerializerOutput<T> {
    const output: TestRendererSerializerOutput<T> = {
      event,
      data
    }

    if (typeof this.options?.task !== 'boolean') {
      const t = Object.fromEntries(
        this.options.task.map((entity) => {
          const property = task[entity]

          if (typeof property === 'function') {
            return [ entity, property.call(task) ]
          }

          return [ entity, property ]
        })
      )

      if (Object.keys(task).length > 0) {
        output.task = t
      }
    }

    return output
  }
}
