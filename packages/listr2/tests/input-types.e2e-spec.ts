import { Observable } from 'rxjs'
import ZenObservable from 'zen-observable'

import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('observable as task', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async () => {
    mockProcessOutput(output)
  })

  afterEach(async () => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  // SM8IHVdptzrFs7Qk2bseYbdCwtTf03QT
  it('should work with returning a observable from task', async () => {
    await new Listr(
      [
        {
          title: 'Observable test.',
          task: (): Observable<string> =>
            new Observable((observer) => {
              observer.next('test')

              observer.next('changed')

              observer.complete()
            })
        }
      ],
      {
        renderer: 'test'
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'H2L4DnyiqkFuyBKwvsX6ytONqKmaxUBm')
  })

  // SVzTyDOzNFqljREVfOCNrLvKsTIXtRJF
  it('should work with returning a zen-observable from task', async () => {
    await new Listr(
      [
        {
          title: 'Observable test.',
          task: (): ZenObservable<string> =>
            new ZenObservable((observer) => {
              observer.next('test')

              observer.next('changed')

              observer.complete()
            })
        }
      ],
      {
        renderer: 'test'
      }
    ).run()

    expectProcessOutputToMatchSnapshot(output, 'SVzTyDOzNFqljREVfOCNrLvKsTIXtRJF')
  })
})
