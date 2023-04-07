import { Observable } from 'rxjs'

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
})
