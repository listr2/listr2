import { Listr } from '@root'
import type { MockProcessOutput } from '@tests/utils'
import { expectProcessOutputToMatchSnapshot, mockProcessOutput, unmockProcessOutput } from '@tests/utils'

describe('exit on error', () => {
  const output: MockProcessOutput = {} as MockProcessOutput

  beforeEach(async() => {
    mockProcessOutput(output)
  })

  afterEach(async() => {
    unmockProcessOutput(output)
    jest.clearAllMocks()
  })

  it('should throw out an error when exit on error is disabled', async() => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('failed')
          }
        },
        {
          task: (): void => {
            throw new Error('failed')
          }
        }
      ],
      { renderer: 'test', exitOnError: true }
    )

    let result: any
    let crash: Error

    try {
      result = await task.run()
    } catch(e: any) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'LzVmO4zGsDmmp1zbNsmTMjuiKEGFFPSM')
  })

  it('should contunie execution while exit on error is disabled', async() => {
    const task = new Listr(
      [
        {
          task: (): void => {
            throw new Error('failed')
          }
        },
        {
          task: (): void => {
            throw new Error('failed')
          }
        }
      ],
      { renderer: 'test', exitOnError: false }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
    expectProcessOutputToMatchSnapshot(output, 'EjYNt9Z2RtF4tqNsJ5PmTfYGhP6R70OH')
  })

  it('should contunie execution while exit on error is disabled in subtask', async() => {
    const task = new Listr(
      [
        {
          task: (): Listr =>
            new Listr(
              [
                {
                  task: (): void => {
                    throw new Error('failed')
                  }
                }
              ],
              { exitOnError: false }
            )
        }
      ],
      { renderer: 'test', exitOnError: true }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
    expectProcessOutputToMatchSnapshot(output, 'MNdM4qgvgd0A43ALVQPcEa8EBq7wHja3')
  })

  it('should contunie execution while exit on error is disabled in parenttask', async() => {
    const task = new Listr(
      [
        {
          task: (): Listr =>
            new Listr(
              [
                {
                  task: (): void => {
                    throw new Error('failed')
                  }
                }
              ],
              { exitOnError: true }
            )
        }
      ],
      { renderer: 'test', exitOnError: false }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
  })

  it('should throw out an error if subtask fails while exit on error is disabled', async() => {
    const task = new Listr(
      [
        {
          task: (): Listr =>
            new Listr(
              [
                {
                  task: (): void => {
                    throw new Error('failed')
                  }
                }
              ],
              { exitOnError: true }
            )
        }
      ],
      { renderer: 'test', exitOnError: true }
    )

    let result: any
    let crash: Error

    try {
      result = await task.run()
    } catch(e: any) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, '4R3XUruBArL7ZBSS1X6VlufOYH9cSAo8')
  })

  it('should throw out an error if subtask in subtask fails while exit on error is disabled', async() => {
    const task = new Listr(
      [
        {
          task: (): Listr =>
            new Listr(
              [
                {
                  task: (): Listr =>
                    new Listr([
                      {
                        task: (): void => {
                          throw new Error('failed')
                        }
                      }
                    ])
                }
              ],
              { exitOnError: true }
            )
        }
      ],
      { renderer: 'test', exitOnError: true }
    )

    let result: any
    let crash: Error

    try {
      result = await task.run()
    } catch(e: any) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expectProcessOutputToMatchSnapshot(output, 'cAcT7aLZ2rDDFDH6EllJjYaG4mTe7Rrb')
  })
})
