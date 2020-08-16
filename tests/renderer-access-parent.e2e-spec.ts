import delay from 'delay'
import { mockProcessExit, mockProcessStderr, mockProcessStdout } from 'jest-mock-process'

import { Listr } from '@root/index'

describe('show subtasks', () => {
  let mockExit: jest.SpyInstance<never, [number?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStdout: jest.SpyInstance<boolean, [string, string?, Function?]>

  // eslint-disable-next-line @typescript-eslint/ban-types
  let mockStderr: jest.SpyInstance<boolean, [string, string?, Function?]>

  process.stdout.isTTY = true

  beforeEach(async () => {
    mockExit = mockProcessExit()
    mockStdout = mockProcessStdout()
    mockStderr = mockProcessStderr()
  })

  afterEach(async () => {
    mockExit.mockRestore()
    mockStdout.mockRestore()
    mockStderr.mockRestore()
    jest.clearAllMocks()
  })

  // nvFwliir81dQSzoa7xPXaq0E1lauH674
  it('should be able to change the title of parent from subtask', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr((parent) => [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(20)
                parent.title = 'Title changed from subtask.'
              }
            },

            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            }
          ])
        }
      ],
      {
        concurrent: false, rendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('nvFwliir81dQSzoa7xPXaq0E1lauH674-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('nvFwliir81dQSzoa7xPXaq0E1lauH674-err')
    expect(mockExit.mock.calls).toMatchSnapshot('nvFwliir81dQSzoa7xPXaq0E1lauH674-exit')
  })

  // OCO3TQJ8pmRRRbv018gpCLgSEDnvFBOz
  it('should be able to skip parent from subtask', async () => {
    await new Listr(
      [
        {
          title: 'This task will execute.',
          task: (ctx, task): Listr => task.newListr((parent) => [
            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(20)
                parent.skip('Title changed from subtask.')
              }
            },

            {
              title: 'This is a subtask.',
              task: async (): Promise<void> => {
                await delay(30)
              }
            }
          ])
        }
      ],
      {
        concurrent: false, rendererOptions: { lazy: true }
      }
    ).run()

    expect(mockStdout.mock.calls).toMatchSnapshot('OCO3TQJ8pmRRRbv018gpCLgSEDnvFBOz-out')
    expect(mockStderr.mock.calls).toMatchSnapshot('OCO3TQJ8pmRRRbv018gpCLgSEDnvFBOz-err')
    expect(mockExit.mock.calls).toMatchSnapshot('OCO3TQJ8pmRRRbv018gpCLgSEDnvFBOz-exit')
  })

})
