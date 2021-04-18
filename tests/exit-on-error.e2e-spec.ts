import { Listr } from '@root/index'

describe('exit on error', () => {
  let log: jest.SpyInstance<void, string[][]>
  let error: jest.SpyInstance<void, string[][]>

  beforeEach(async () => {
    log = jest.spyOn(console, 'log').mockImplementation()
    error = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('should throw out an error when exit on error is disabled', async () => {
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
      { renderer: 'verbose', exitOnError: true }
    )

    let result: any
    let crash: Error | undefined
    try {
      result = await task.run()
    } catch (e) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expect(log).toBeCalledTimes(1)
    expect(error).toBeCalledTimes(1)
  })

  it('should contunie execution while exit on error is disabled', async () => {
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
      { renderer: 'verbose', exitOnError: false }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
    expect(log).toBeCalledTimes(2)
    expect(error).toBeCalledTimes(2)
  })

  it('should contunie execution while exit on error is disabled in subtask', async () => {
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
      { renderer: 'verbose', exitOnError: true }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
    expect(log).toBeCalledTimes(3)
  })

  it('should contunie execution while exit on error is disabled in parenttask', async () => {
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
      { renderer: 'verbose', exitOnError: false }
    )

    const result = await task.run()

    expect(result).toBeTruthy()
  })

  it('should throw out an error if subtask fails while exit on error is disabled', async () => {
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
      { renderer: 'verbose', exitOnError: true }
    )

    let result: any
    let crash: Error | undefined
    try {
      result = await task.run()
    } catch (e) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expect(log).toBeCalledTimes(2)
    expect(error).toBeCalledTimes(2)
  })

  it('should throw out an error if subtask in subtask fails while exit on error is disabled', async () => {
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
      { renderer: 'verbose', exitOnError: true }
    )

    let result: any
    let crash: Error | undefined
    try {
      result = await task.run()
    } catch (e) {
      crash = e
    }

    expect(crash).toBeTruthy()
    expect(result).toBeFalsy()
    expect(log).toBeCalledTimes(3)
    expect(error).toBeCalledTimes(3)
  })
})
